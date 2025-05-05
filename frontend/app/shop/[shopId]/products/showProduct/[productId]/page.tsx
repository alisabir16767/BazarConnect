// app/showProduct/[productId]/page.tsx

interface Product {
   _id: string;
   name: string;
   description: string;
   price: number;
   image?: string;
}

async function fetchProduct(productId: string): Promise<Product | null> {
   try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
       cache: 'no-store', // Ensure the product is freshly fetched each time
     });
     if (!res.ok) {
       throw new Error('Product not found');
     }
     return await res.json();
   } catch (error) {
     console.error('Error fetching product:', error);
     return null;
   }
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
   const product = await fetchProduct(params.productId);

   // If no product is found, return an error message
   if (!product) {
     return (
       <div className="p-6 text-red-500">
         <h2 className="text-xl">Product not found.</h2>
         <p>Please check the product ID or try again later.</p>
       </div>
     );
   }

   return (
     <div className="p-6 max-w-4xl mx-auto">
       <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

       {/* Product Image */}
       {product.image ? (
         <img
           src={product.image}
           alt={product.name}
           className="mb-6 rounded-md w-full max-h-[400px] object-cover"
         />
       ) : (
         <div className="mb-6 rounded-md bg-gray-300 w-full h-[400px] flex items-center justify-center text-white">
           <span>No image available</span>
         </div>
       )}

       <p className="text-gray-700 mb-4">{product.description}</p>
       <p className="text-xl font-semibold">Price: ${product.price}</p>
     </div>
   );
}
