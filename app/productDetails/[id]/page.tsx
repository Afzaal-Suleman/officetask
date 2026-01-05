import { getProductById } from "@/services/productService";
type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  console.log(id, "id");

  const product = await getProductById(id)
  
  

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
            <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
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
