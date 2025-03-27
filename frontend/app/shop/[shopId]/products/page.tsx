"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar/Navbar";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  images?: string[];
}

interface Shop {
  _id: string;
  name: string;
  description: string;
  owner_id: string;
  products: string[]; // Product IDs
  images?: string[];
}

export default function ShopProductsPage() {
  const { shopId } = useParams();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shopId) return;

    const fetchShopData = async () => {
      try {
        setLoading(true);
        
        // Fetch shop details
        const shopResponse = await axios.get(
          `https://bazarconnect.onrender.com/api/shops/${encodeURIComponent(Array.isArray(shopId) ? shopId[0] : shopId)}`
        );
        setShop(shopResponse.data);

        const productIds = shopResponse.data.products;

        if (!productIds || productIds.length === 0) {
          setProducts([]);
          return;
        }

        // Fetch product details for each product ID
        const productRequests = productIds.map((productId: string) =>
          axios.get(`https://bazarconnect.onrender.com/api/products/${productId}`)
        );

        const productResponses = await Promise.all(productRequests);
        const productData = productResponses.map(res => res.data);
        setProducts(productData);

      } catch (error) {
        console.error("Error fetching shop/products:", error);
        setError("Failed to load shop details.");
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shopId]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {shop && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{shop.name}</h1>
            <p className="text-gray-600">{shop.description}</p>
            <p className="text-sm text-gray-500">Owner: {shop.owner_id}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product._id} className="w-[300px]">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  className="h-40 w-full object-cover rounded-lg"
                  src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                  alt={product.name}
                />
                <p className="text-gray-700">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
