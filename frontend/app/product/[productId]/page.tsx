import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming Button component is created

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
}

async function fetchProduct(productId: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Product not found");
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId);

  if (!product) {
    notFound(); // 👈 uses Next.js built-in 404 page
  }

 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="p-6 shadow-lg">
        <CardContent className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <Separator />

          {/* Images */}
          {product.images && product.images.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {product.images.map((imgUrl, index) => (
                <AspectRatio key={index} ratio={4 / 3} className="rounded-md overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`${product.name} image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </AspectRatio>
              ))}
            </div>
          ) : (
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
              <span>No images available</span>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                ${product.price.toFixed(2)}
              </Badge>
              {/* Additional badges (e.g., In Stock, Category) can go here */}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <Button className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700">
              Add to Cart
            </Button>
            <Button className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700">
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
