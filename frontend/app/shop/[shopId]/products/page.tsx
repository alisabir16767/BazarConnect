// app/shop/[shopId]/products/page.tsx

import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

async function fetchProducts(shopId: string): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}/products`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage({ params }: { params: { shopId: string } }) {
  const products = await fetchProducts(params.shopId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products for Shop ID: {params.shopId}</h1>

      {products.length === 0 ? (
        <p>No products found for this shop.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/showProduct/${product._id}`}
              className="border p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 font-bold">${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
