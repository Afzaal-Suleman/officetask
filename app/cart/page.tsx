"use client";

import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, increase, decrease, remove } = useCartStore();

  if (items.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-xl p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold line-clamp-2">
                {item.title}
              </h2>
              <p className="text-green-600 font-medium">
                ${item.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item.id)}
                className="w-8 h-8 border rounded-lg hover:bg-gray-100"
              >
                -
              </button>

              <span className="w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => increase(item.id)}
                className="w-8 h-8 border rounded-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => remove(item.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
