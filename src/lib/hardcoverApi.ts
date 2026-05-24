const API_URL = 'https://api.hardcover.app/v1/graphql';
const API_KEY = import.meta.env.VITE_HARDCOVER_API_KEY as string;

export interface Book {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  rating: number | null;
  ratings_count: number | null;
  image: { url: string } | null;
  matchedTag: string; // mood tag slug that surfaced this book
}

const BLOCKLIST = [
  'harry potter',
  'twilight',
  'hunger games',
  'divergent',
  'fifty shades',
  'diary of a wimpy kid',
  'dog man',
  'big nate',
];

// Single-tag query — we fetch each mood tag independently so the pool
// is not dominated by the most popular tag in the list.
const BOOKS_BY_MOOD_QUERY = `
  query BooksByMood($slug: String!, $limit: Int!, $offset: Int!) {
    books(
      where: {
        _and: [
          {
            taggings: {
              tag: {
                slug: { _eq: $slug }
                tag_category_id: { _eq: 4 }
              }
            }
          }
          { rating: { _gte: 3.5 } }
          {
            _not: {
              taggings: {
                tag: {
                  tag_category_id: { _eq: 1 }
                  slug: { _eq: "comics-graphic-novels" }
                }
              }
            }
          }
        ]
      }
      order_by: [{ ratings_count: desc_nulls_last }]
      limit: $limit
      offset: $offset
    ) {
      id
      slug
      title
      subtitle
      description
      rating
      ratings_count
      image { url }
    }
  }
`;

async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);

  return json.data as T;
}

function isBlocked(book: Book): boolean {
  const lower = book.title.toLowerCase();
  return BLOCKLIST.some(b => lower.includes(b));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Fetch books for a single mood tag slug, at a random offset for variety.
// The top 30 results from offset 0 are always the same popular books,
// so we skip a random chunk of them on each call.
async function fetchTagPool(slug: string): Promise<Book[]> {
  const offset = Math.floor(Math.random() * 60);
  const data = await gql<{ books: Omit<Book, 'matchedTag'>[] }>(BOOKS_BY_MOOD_QUERY, {
    slug,
    limit: 20,
    offset,
  });
  return (data.books ?? [])
    .filter(b => !isBlocked(b as Book) && !!b.image?.url)
    .map(b => ({ ...b, matchedTag: slug }));
}

export async function fetchBooksByTags(tags: string[]): Promise<Book[]> {
  // Fetch the first 4 mood tags in parallel, each at its own random offset.
  // This gives us 4 separate pools that reflect different facets of the mood.
  const pools = await Promise.all(tags.slice(0, 4).map(fetchTagPool));

  // Shuffle each pool so the pick within a tag is also random.
  const shuffledPools = pools.map(shuffle);

  // Interleave round-robin: book[0] from tag[0], book[0] from tag[1], ...
  // This guarantees the first 3 picks come from 3 different tag pools.
  const seen = new Set<number>();
  const result: Book[] = [];
  const maxLen = Math.max(...shuffledPools.map(p => p.length), 0);

  for (let i = 0; i < maxLen; i++) {
    for (const pool of shuffledPools) {
      const book = pool[i];
      if (book && !seen.has(book.id)) {
        seen.add(book.id);
        result.push(book);
      }
    }
  }

  // Fallback: if offset landed in a sparse region, retry without offset
  if (result.length < 3) {
    const fallbackPools = await Promise.all(
      tags.slice(0, 3).map(async slug => {
        const data = await gql<{ books: Omit<Book, 'matchedTag'>[] }>(BOOKS_BY_MOOD_QUERY, {
          slug,
          limit: 20,
          offset: 0,
        });
        return (data.books ?? [])
          .filter(b => !isBlocked(b as Book) && !!b.image?.url)
          .map(b => ({ ...b, matchedTag: slug }));
      })
    );
    for (const pool of fallbackPools) {
      for (const book of shuffle(pool)) {
        if (!seen.has(book.id)) {
          seen.add(book.id);
          result.push(book);
        }
      }
    }
  }

  return result;
}

export function pickRecommendations(books: Book[]): { primary: Book; secondary: [Book, Book] } | null {
  if (books.length < 3) return null;
  // books[0..2] are already from 3 different tag pools (via round-robin interleave)
  return {
    primary: books[0],
    secondary: [books[1], books[2]],
  };
}
