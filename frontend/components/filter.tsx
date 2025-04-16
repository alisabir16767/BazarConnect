"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  Store,
  Smartphone,
  Shirt,
  BookOpen,
  ShoppingBasket,
  Sofa,
  Croissant,
  Stethoscope,
} from "lucide-react";

const shops = [
  { id: "all", name: "All Shops", icon: Store },
  { id: "electronics", name: "Electronics", icon: Smartphone },
  { id: "fashion", name: "Fashion", icon: Shirt },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "grocery", name: "Grocery", icon: ShoppingBasket },
  { id: "furniture", name: "Furniture", icon: Sofa },
  { id: "bakery", name: "Bakery", icon: Croissant },
  { id: "pharmacy", name: "Pharmacy", icon: Stethoscope },
  // Add more as needed
];

export function CarouselShopFilter({
  onFilter,
}: {
  onFilter: (shopId: string) => void;
}) {
  const [selected, setSelected] = useState("all");

  const handleSelect = (id: string) => {
    setSelected(id);
    onFilter(id);
  };

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent className="-ml-1">
        {shops.map((shop) => {
          const Icon = shop.icon;
          return (
            <CarouselItem
              key={shop.id}
              className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="p-1">
                <Card
                  onClick={() => handleSelect(shop.id)}
                  className={cn(
                    "cursor-pointer transition-all duration-200 border",
                    selected === shop.id
                      ? "bg-primary text-white border-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-semibold text-center">
                      {shop.name}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
