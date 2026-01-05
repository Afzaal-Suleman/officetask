"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";

export default function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <img src={product.image} alt={product.title} className="h-40 mx-auto" />
          <h2 className="font-semibold mt-2">{product.title}</h2>
          <p>${product.price}</p>
          <p className="text-sm text-gray-500">
            ⭐ {product.rating.rate} ({product.rating.count})
          </p>
        </div>
      ))}
    </div>
  );
}
