import { ShoppingCart, Search } from "lucide-react";

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <span className="text-blue-600">Shop</span>Mart
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </header>
  );
}
