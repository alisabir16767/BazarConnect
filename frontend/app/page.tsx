"use client";

import { useState } from "react";
import { ShopCard } from "@/components/card";
import { CarouselShopFilter } from "@/components/filter";

export default function Home() {
  const [filteredShopId, setFilteredShopId] = useState<string>("all");

  return (
    <>
      <hr />
      <CarouselShopFilter onFilter={(shopId: string) => setFilteredShopId(shopId)} />
      <hr />
      <ShopCard filter={filteredShopId} />
    </>
  );
}
