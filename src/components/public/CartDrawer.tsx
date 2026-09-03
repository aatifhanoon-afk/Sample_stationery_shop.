import { useStore } from '@/store/StoreContext';
import { useUI } from '@/store/UIContext';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface Props {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: Props) {
  const { cart, products, updateCartQuantity, removeFromCart } = useStore();
  const { cartOpen, closeCart } = useUI();

  if (!cartOpen) return null;

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={closeCart} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream-50 shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 border-b border-cream-200 bg-navy-900 text-cream-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brass-400" />
            <h2 className="font-serif text-lg font-bold">Your Cart</h2>
            <span className="text-sm text-cream-400">({cartItems.length})</span>
          </div>
          <button onClick={closeCart} className="p-1.5 rounded-lg hover:bg-navy-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-navy-400" />
            </div>
            <p className="text-navy-500 text-center">Your cart is empty. Start browsing to find your next favorite read or writing tool.</p>
            <button
              onClick={closeCart}
              className="px-5 py-2.5 rounded-lg bg-navy-800 text-cream-100 text-sm font-medium hover:bg-brass-500 hover:text-navy-900 transition-all"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-3 bg-white rounded-xl p-3 border border-cream-200">
                  <img src={item.product.image} alt={item.product.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-navy-900 text-sm line-clamp-1">{item.product.title}</h3>
                    <span className="text-xs text-navy-400">{item.product.category}</span>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-cream-300 rounded-md">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 text-navy-600 hover:text-brass-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 text-navy-600 hover:text-brass-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-navy-900 text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1 text-navy-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-cream-200 p-5 bg-white">
              <div className="flex items-center justify-between mb-1 text-sm text-navy-500">
                <span>Subtotal</span>
                <span className="font-medium text-navy-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-4 text-sm text-navy-500">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-lg font-bold text-navy-900">Total</span>
                <span className="font-serif text-xl font-bold text-navy-900">${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-lg bg-brass-500 text-navy-900 font-semibold hover:bg-brass-400 transition-all shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
