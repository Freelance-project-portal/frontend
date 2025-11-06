"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

const SearchInput = ({ placeholder, onSearch }: SearchInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchInput;


