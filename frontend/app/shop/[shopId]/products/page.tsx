"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopAndProducts } from "../../../redux/slices/shopSlice"; 
import { RootState, AppDispatch } from "../../../redux/store"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShopProductsPage() {
  const { shopId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { shop, products, loading, error } = useSelector(
    (state: RootState) => state.shop
  );

  useEffect(() => {
    if (typeof shopId === "string") {
      dispatch(fetchShopAndProducts(shopId));
    }
  }, [dispatch, shopId]);

  return (
    <>
      <div className="container mx-auto p-4">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
            <p className="ml-3 text-lg text-gray-600 font-semibold">
              Loading Products...
            </p>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {shop && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{shop.name}</h1>
            <p className="text-gray-600">{shop.description}</p>
            <p className="text-sm text-gray-500">Owner: {shop.owner_id}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <Card className="w-[300px] cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                     
                   
                  <img
                    className="h-40 w-full object-cover rounded-lg"
                    src={product.images?.[0] || "https://via.placeholder.com/150"}
                    alt={product.name}
                  />
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-lg font-bold">${product.price}</p>
                  <p className="text-sm text-gray-500">Category: {product.category}</p>
                  <Button
              
            >
              Add to Cart
            </Button>
                </CardContent>
              </Card>
            </Link>
           
          ))}
        </div>
      </div>
    </>
  );
}
