"use client";

import { useState, useEffect } from "react";

import { Input } from "@/src/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  loading?: boolean;
}

const SearchInput = ({
  placeholder = "Search...",
  onSearch,
  debounceMs = 300,
  loading = false,
}: SearchInputProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : value ? (
          <button onClick={handleClear} className="hover:bg-muted rounded-full p-0.5">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SearchInput;


