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

  const router = useRouter(); 

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
{loading && (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
    <p className="ml-3 text-lg text-gray-600 font-semibold">Loading shops...</p>
  </div>
)}
      {!loading && error && <p className="text-red-500">{error}</p>}

      {shops.map((shop) => (
        <Card key={shop._id} className="w-[330px] shadow-lg">
          <CardHeader>
            <CardTitle>{shop.name}</CardTitle>
            <p className="text-sm text-gray-500">
              {shop.city}, {shop.state}, {shop.country}
            </p>
          </CardHeader>
          <CardContent>
            <img
              className="h-48 w-full object-cover rounded-lg"
              src={shop.images?.[0] || "/placeholder.jpg"} 
              alt={shop.name}
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")} // ✅ Falon error
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
