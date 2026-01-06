"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/productService";

import Loader from "@/components/Loader";
import { useCartStore } from "@/store/useCartStore";

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};
export default function ProductDetail() {
  const params: any = useParams();
  const id = params.id;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCartStore();
  const addItemsToCart = (product: ProductType) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="flex justify-center bg-gray-100 rounded-xl p-6">
          <img
            src={product.image}
            alt={product.title}
            width={350}
            height={350}
            className="object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <span className="text-sm uppercase text-gray-500">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="font-medium">{product.rating.rate}</span>
            <span className="text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-semibold text-green-600">
            ${product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => addItemsToCart(product)}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
