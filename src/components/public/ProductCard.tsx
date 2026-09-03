import { Product } from '@/types';
import { Plus, Star, PackageX } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useUI } from '@/store/UIContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useStore();
  const { openCart, openDetail } = useUI();

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.outOfStock) return;
    addToCart(product.id, 1);
    openCart();
  };

  return (
    <div
      onClick={() => openDetail(product.id)}
      className="group bg-white rounded-xl border border-cream-200 overflow-hidden cursor-pointer hover:shadow-xl hover:border-brass-300 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            product.category === 'Book' ? 'bg-navy-800 text-cream-100' : 'bg-brass-500 text-navy-900'
          }`}>
            {product.category}
          </span>
        </div>
        {product.outOfStock && (
          <div className="absolute inset-0 bg-navy-900/60 flex items-center justify-center">
            <div className="flex items-center gap-2 text-cream-100 font-semibold">
              <PackageX className="w-5 h-5" />
              Out of Stock
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={`w-3.5 h-3.5 ${
                n <= Math.round(avgRating) ? 'text-brass-400 fill-brass-400' : 'text-cream-300'
              }`}
            />
          ))}
          <span className="text-xs text-navy-400 ml-1">({product.reviews.length})</span>
        </div>

        <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-brass-600 transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-navy-500 mt-1.5 line-clamp-2 flex-1">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-navy-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            disabled={product.outOfStock}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-800 text-cream-100 text-sm font-medium hover:bg-brass-500 hover:text-navy-900 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-navy-800 disabled:hover:text-cream-100"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
