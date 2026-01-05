"use client";
import { ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";


export default function Header() {
   const cartCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <Link href="/" className="text-xl font-bold text-gray-800">
          <span className="text-blue-600">Shop</span>Mart
        </Link>
        <Link href="/cart" className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-gray-700" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </header>
  );
}
