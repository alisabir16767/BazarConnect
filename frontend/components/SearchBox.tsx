'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

export default function SearchBox() {
  const router = useRouter();

  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query string dynamically
    const params = new URLSearchParams();
    if (state) params.append('state', state);
    if (district) params.append('district', district);
    if (city) params.append('city', city);
    if (query) params.append('q', query);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center justify-between bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 gap-2 md:gap-4 w-full max-w-4xl mx-auto transition hover:shadow-xl"
    >
      {/* Location Selector */}
      <div className="flex items-center gap-2 flex-1 border-r border-gray-200 pr-3">
        <MapPin className="text-gray-500 w-4 h-4" />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="bg-transparent outline-none text-gray-700 text-sm w-full"
        >
          <option value="">Select State</option>
          <option value="Bihar">Bihar</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="UP">Uttar Pradesh</option>
        </select>
      </div>

      <div className="flex items-center gap-2 flex-1 border-r border-gray-200 pr-3">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="bg-transparent outline-none text-gray-700 text-sm w-full"
        >
          <option value="">Select District</option>
          <option value="Patna">Patna</option>
          <option value="Gaya">Gaya</option>
          <option value="Muzaffarpur">Muzaffarpur</option>
        </select>
      </div>

      <div className="flex items-center gap-2 flex-1 border-r border-gray-200 pr-3">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-transparent outline-none text-gray-700 text-sm w-full"
        >
          <option value="">Select City/Town</option>
          <option value="Patna City">Patna City</option>
          <option value="Danapur">Danapur</option>
          <option value="Gaya Town">Gaya Town</option>
        </select>
      </div>

      {/* Search Query Input */}
      <div className="flex items-center gap-2 flex-[2]">
        <Input
          type="text"
          placeholder="Search for shops or products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-none outline-none bg-transparent flex-grow text-sm"
        />
        <Button
          type="submit"
          className="rounded-full bg-primary text-white hover:bg-primary/90 px-5"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}
