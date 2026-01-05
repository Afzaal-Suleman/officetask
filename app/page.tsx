import Products from '@/components/Products';
import { getProducts, getCategories } from '@/services/productService';

export const dynamic = "force-dynamic"; 

export default async function Home() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    return <Products products={products} categories={categories} />;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load products. Please try again later.
      </div>
    );
  }
}
