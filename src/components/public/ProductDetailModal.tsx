import { useStore } from '@/store/StoreContext';
import { useUI } from '@/store/UIContext';
import { X, Star, ShoppingBag, PackageX, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/types';

export default function ProductDetailModal() {
  const { products, addToCart } = useStore();
  const { detailProductId, closeDetail, openCart } = useUI();
  const [qty, setQty] = useState(1);

  const product: Product | undefined = products.find((p) => p.id === detailProductId);
  if (!product) return null;

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0;

  const handleAdd = () => {
    addToCart(product.id, qty);
    closeDetail();
    openCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={closeDetail}>
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" />
      <div
        className="relative bg-cream-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeDetail}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/80 hover:bg-white text-navy-700 shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto bg-cream-100 overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            {product.outOfStock && (
              <div className="absolute inset-0 bg-navy-900/50 flex items-center justify-center">
                <div className="flex items-center gap-2 text-cream-100 font-semibold bg-navy-900/80 px-4 py-2 rounded-lg">
                  <PackageX className="w-5 h-5" />
                  Out of Stock
                </div>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                product.category === 'Book' ? 'bg-navy-800 text-cream-100' : 'bg-brass-500 text-navy-900'
              }`}>
                {product.category}
              </span>
              <span className="text-xs text-navy-400 font-mono">{product.sku}</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">{product.title}</h2>

            <div className="flex items-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`w-4 h-4 ${n <= Math.round(avgRating) ? 'text-brass-400 fill-brass-400' : 'text-cream-300'}`}
                />
              ))}
              <span className="text-sm text-navy-500 ml-2">
                {avgRating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>

            <p className="mt-4 text-navy-600 leading-relaxed text-sm">{product.description}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-navy-900">${product.price.toFixed(2)}</span>
              <span className={`text-sm font-medium ${product.outOfStock ? 'text-red-500' : 'text-green-600'}`}>
                {product.outOfStock ? 'Out of Stock' : `${product.stock} in stock`}
              </span>
            </div>

            {!product.outOfStock && (
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center border border-cream-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-2.5 text-navy-600 hover:text-brass-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-medium text-navy-900">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="p-2.5 text-navy-600 hover:text-brass-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-navy-800 text-cream-100 font-semibold hover:bg-brass-500 hover:text-navy-900 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            )}

            <div className="mt-8 border-t border-cream-200 pt-6">
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-4">Customer Reviews</h3>
              <div className="space-y-4 max-h-48 overflow-y-auto scrollbar-hide">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg p-4 border border-cream-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-navy-900 text-sm">{review.author}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3 h-3 ${n <= review.rating ? 'text-brass-400 fill-brass-400' : 'text-cream-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-navy-600">{review.comment}</p>
                    <span className="text-xs text-navy-400 mt-1 block">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
