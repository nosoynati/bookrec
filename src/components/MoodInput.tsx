import { useEffect, useState, type FormEvent } from "react";

interface MoodInputProps {
  onSubmit: (input: string) => void;
  loading: boolean;
}
interface Cookie {
  name: string,
  value: string,
  maxAge?: number
  path?: string | null
}
async function setCookie(v:Cookie){
  if (window.cookieStore) {
  await cookieStore.set({
    name: v.name,
    value: v.value,
  });
}
}
export default function MoodInput({ onSubmit, loading }: MoodInputProps) {
  const [value, setValue] = useState("");

  useEffect(()=> {
    setCookie({
      name: "State",
      value: value,
    })
  },[value])

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  }

  return (
    <form className="mood-form" onSubmit={handleSubmit}>
      <label className="mood-label" htmlFor="mood-input">
        How are you feeling today?
      </label>
      <input
        id="mood-input"
        className="mood-textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Nostalgic"
        disabled={loading}
      />
      <button type="submit" className="mood-btn" disabled={loading || !value.trim()}>
        {loading ? (
          <span className="btn-loading">
            <span className="spinner" />
            Finding your books…
          </span>
        ) : (
          "Recommend me a book"
        )}
      </button>
    </form>
  );
}
