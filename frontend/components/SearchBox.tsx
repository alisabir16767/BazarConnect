'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to a search results page with the query as a parameter
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-lg mx-auto">
      {/* Input Field */}
      <Input
        type="text"
        placeholder="Search for products or shops..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow"
      />

      {/* Search Button */}
      <Button type="submit" variant="default">
        Search
      </Button>
    </form>
  );
}
