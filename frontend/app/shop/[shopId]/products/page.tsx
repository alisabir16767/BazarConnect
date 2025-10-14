"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

interface Shop {
  _id: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  category: string;
  shop_image?: string;
}

export default function ProductsPage({ params }: { params: { shopId: string } }) {
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopAndProducts = async () => {
      try {
        const [shopRes, productRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shops/${params.shopId}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/shop/${params.shopId}`),
        ]);

        setShop(shopRes.data);
        setProducts(Array.isArray(productRes.data) ? productRes.data : []);
      }  catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unknown error:", error);
        }
      }
       finally {
        setLoading(false);
      }
    };

    fetchShopAndProducts();
  }, [params.shopId]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 animate-pulse">
        Loading shop details and products...
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-6 text-center text-red-500">
        Shop not found or unavailable.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 🏪 Shop Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gray-50 p-6 rounded-xl shadow">
        <img
          src={shop.shop_image || "/shop-placeholder.png"}
          alt={shop.name}
          className="w-48 h-48 object-cover rounded-xl shadow"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{shop.name}</h1>
          <p className="text-gray-600 mb-2">{shop.description}</p>
          <p className="text-sm text-gray-500">
            📍 {shop.city}, {shop.state}, {shop.country}
          </p>
          <p className="text-sm text-gray-500">🏷️ Category: {shop.category}</p>
        </div>
      </div>

      {/* 🛍️ Products Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <Link
          href={`/shops/${params.shopId}/add-product`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-gray-600 bg-gray-50 p-4 rounded-lg text-center shadow">
          <p>No products found for this shop.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="border border-gray-200 bg-white rounded-xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1 block"
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              <p className="mt-3 text-lg font-bold text-green-600">₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
