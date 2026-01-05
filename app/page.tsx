import Products from '@/components/Products';
import { getCategories, getProducts } from '@/services/productService';
export default async function Home() {

  const products = await getProducts()
  const categories = await getCategories();
  return (
    <div>
      <Products products={products} categories={categories} />
    </div>
  );
}
