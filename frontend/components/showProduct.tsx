"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function ShopCard(){
   interface Product {
      _id: string;
      shop_id: string;
      review: string[]; 
      name: string;
      description: string;
      price: number;
      quantity: number;
      category: string;
      images: string[]; 
      created_at: string; 
      updated_at: string; 
      __v: number;
    }

const [products, setProducts] = useState<Product[]>([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState<string| null>(null);

useEffect(()=>{
   axios.get("https://bazarconnect.onrender.com/api/products")
   .then ((res)=>{
      console.log(res.data);
      setProducts(res.data);
      setLoading(false);
   })
   .catch((err)=>{
      console.error(err);
      setError("Failed to load product data.");
      setLoading(false);
   })
})
   
   return(
      <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading && <p>Loading...</p>}

   
      </>
   )

}
