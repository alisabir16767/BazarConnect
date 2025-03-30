"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ✅ Define TypeScript Interface
interface Shop {
  _id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  description: string;
  images?: string[];
}

export function ShopCard() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // ✅ Next.js router

  // ✅ Navigate to shop's product page
  const handleVisitStore = (shopId: string) => {
    router.push(`/shop/${shopId}/products`);
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/shops`
        );
        if (Array.isArray(res.data)) {
          setShops(res.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching shops:", err);
        setError("Failed to load shop data.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading && <p className="text-center text-gray-500">Loading shops...</p>}
      {!loading && error && <p className="text-red-500">{error}</p>}

      {shops.map((shop) => (
        <Card key={shop._id} className="w-[350px] shadow-lg">
          <CardHeader>
            <CardTitle>{shop.name}</CardTitle>
            <p className="text-sm text-gray-500">
              {shop.city}, {shop.state}, {shop.country}
            </p>
          </CardHeader>
          <CardContent>
            <img
              className="h-48 w-full object-cover rounded-lg"
              src={shop.images?.[0] || "/placeholder.jpg"} // ✅ Uses local fallback image
              alt={shop.name}
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")} // ✅ Fallback on error
            />
            <CardDescription>{shop.description}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleVisitStore(shop._id)}>Visit Store</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
