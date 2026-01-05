"use client";

import { useEffect, useState } from "react";
import ProductFilterSort from "@/components/ProductFilterSort";
import { useProductStore } from "@/store/productStore";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
export default function ProductsPage() {
    const { products, fetchProducts, loading } = useProductStore();
    const router = useRouter();

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);
    const getProductId = (id: number) => {
        router.push(`/productDetails/${id}`);
    };
    const categories = Array.from(
        new Set(products.map((p) => p.category))
    );

    const filteredProducts = products
        .filter((p) => {
            const matchCategory =
                category === "all" || p.category === category;

            const matchSearch =
                p.title.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchSearch;
        })
        .sort((a, b) => {
            if (sortOrder === "low-high") return a.price - b.price;
            if (sortOrder === "high-low") return b.price - a.price;
            return 0;
        });

    const { addToCart } = useCartStore();
    const addItemsToCart = (product: any) => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ProductFilterSort
                categories={categories}
                selectedCategory={category}
                sortOrder={sortOrder}
                search={search}
                onCategoryChange={setCategory}
                onSortChange={setSortOrder}
                onSearchChange={setSearch}
            />

            {loading && <p>Loading...</p>}

            {filteredProducts.length === 0 && (
                <p className="text-gray-500">No products found</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 px-2">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group cursor-pointer bg-white rounded-2xl border hover:shadow-xl transition"
                    >
                        {/* Image */}
                        <div className="h-52 bg-gray-100 rounded-t-2xl flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-40 object-contain group-hover:scale-105 transition"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                            <h2 className="font-semibold line-clamp-2">
                                {product.title}
                            </h2>

                            {/* Rating */}
                            <div className="flex items-center gap-1 text-sm">
                                <span className="text-yellow-500">★</span>
                                <span>{product.rating.rate}</span>
                                <span className="text-gray-500">
                                    ({product.rating.count})
                                </span>
                            </div>

                            {/* Price */}
                            <p className="text-lg font-bold text-green-600">
                                ${product.price}
                            </p>

                            {/* Actions */}
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => {
                                        getProductId(product.id);
                                    }}
                                    className="flex-1 py-2 text-sm rounded-xl border hover:bg-gray-100 transition"
                                >
                                    View
                                </button>

                                <button
                                    onClick={(e) => {
                                       addItemsToCart(product);
                                    }}
                                    className="flex-1 py-2 text-sm rounded-xl bg-black text-white hover:bg-gray-800 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
