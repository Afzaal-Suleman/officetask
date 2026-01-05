"use client";

type Props = {
  categories: string[];
  selectedCategory: string;
  sortOrder: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
};

export default function ProductFilterSort({
  categories,
  selectedCategory,
  sortOrder,
  search,
  onCategoryChange,
  onSortChange,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">



      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border px-4 py-2 rounded-md w-full sm:w-56"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
        {/* Price Sort */}
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="border px-4 py-2 rounded-md w-full sm:w-56"
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}
