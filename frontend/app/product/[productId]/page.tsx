'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  shop?: {
    name: string;
    city: string;
    category: string;
    owner?: string;
  };
}

async function fetchProduct(productId: string): Promise<Product | null> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId);
  if (!product) notFound();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-b from-white to-gray-50 rounded-2xl">
          {/* 🔹 Shop Info at Top */}
          {product.shop && (
            <div className="bg-blue-50 border-b border-blue-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-800">{product.shop.name}</h2>
                <p className="text-sm text-gray-600">
                  {product.shop.city} • {product.shop.category}
                </p>
              </div>
              <Badge variant="secondary" className="mt-2 sm:mt-0">
                Shop Verified
              </Badge>
            </div>
          )}

          <CardContent className="p-6 md:p-8 space-y-8">
            {/* 🔹 Product Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <Badge className="text-xl px-4 py-2 bg-green-100 text-green-700 font-semibold">
                ₹{product.price.toFixed(2)}
              </Badge>
            </div>

            <Separator />

            {/* 🔹 Product Images */}
            {product.images && product.images.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {product.images.map((imgUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AspectRatio ratio={4 / 3} className="rounded-xl overflow-hidden shadow-md">
                      <img
                        src={imgUrl}
                        alt={`${product.name} image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </AspectRatio>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center text-gray-500 rounded-xl">
                <span>No images available</span>
              </div>
            )}

            <Separator />

            {/* 🔹 Product Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* 🔹 Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl text-lg">
                Add to Cart
              </Button>
              <Button className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-xl text-lg">
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
