import Products from '@/components/Products';
import { getCategories, getProducts } from '@/services/productService';
export default async function Home() {

  try {
    const products = await getProducts()
    const categories = await getCategories();
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
