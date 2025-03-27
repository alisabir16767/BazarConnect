"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ShopCard() {
  interface Shop {
    _id: string;
    name: string;
    city: string;
    state: string;
    country: string;
    description: string;
    images?: string[];
  }

  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://bazarconnect.onrender.com/api/shops")
      .then((res) => {
        console.log(res.data); 
        setShops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load shop data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {shops.map((shop) => (
        <Card key={shop._id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{shop.name}</CardTitle>
            <p className="text-sm text-gray-500">{shop.city}, {shop.state}, {shop.country}</p>
          </CardHeader>
          <CardContent>
            <img
              className="h-48 w-full object-cover rounded-lg"
              src={shop.images?.[0] || "https://via.placeholder.com/300"}
              alt={shop.name}
            />
            <CardDescription>{shop.description}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Visit Store</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
