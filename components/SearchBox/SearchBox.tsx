"use client";

import { useEffect, useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (val: string) => void;
  value: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBox({ onSearch, value }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState(value);

  const debouncedValue = useDebounce(inputValue, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input className={css.input} type="text" placeholder="Search notes..." value={inputValue} onChange={handleChange} />
  );
}
