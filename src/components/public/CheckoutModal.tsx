import { useState } from 'react';
import { useStore } from '@/store/StoreContext';
import { useUI } from '@/store/UIContext';
import { X, CheckCircle, CreditCard, Loader } from 'lucide-react';
import { Order } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: Props) {
  const { cart, products, clearCart, addOrder } = useStore();
  const { closeCart } = useUI();
  const [step, setStep] = useState<'form' | 'processing' | 'confirmation'>('form');
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
  });

  if (!open) return null;

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      const id = 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
      const order: Order = {
        id,
        items: cartItems.map((i) => ({
          productId: i.productId,
          title: i.product.title,
          quantity: i.quantity,
          price: i.product.price,
        })),
        subtotal,
        shipping,
        total,
        customerName: form.name,
        customerEmail: form.email,
        shippingAddress: form.address,
        city: form.city,
        zip: form.zip,
        country: form.country,
        status: 'Pending',
        date: new Date().toISOString(),
      };
      addOrder(order);
      setOrderId(id);
      clearCart();
      setStep('confirmation');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    closeCart();
    setTimeout(() => {
      setStep('form');
      setForm({ name: '', email: '', address: '', city: '', zip: '', country: 'United States' });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-cream-50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        {step !== 'processing' && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/80 hover:bg-white text-navy-700 shadow-sm transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {step === 'form' && (
          <div className="p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-1">Checkout</h2>
            <p className="text-sm text-navy-500 mb-6">Complete your order with free shipping.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-cream-200 space-y-4">
                <h3 className="font-semibold text-navy-900 text-sm uppercase tracking-wider">Shipping Details</h3>
                <div>
                  <label className="text-xs font-medium text-navy-600 block mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-600 block mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-navy-600 block mb-1">Street Address</label>
                  <input
                    required
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-navy-600 block mb-1">City</label>
                    <input
                      required
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-navy-600 block mb-1">ZIP Code</label>
                    <input
                      required
                      type="text"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-cream-200">
                <h3 className="font-semibold text-navy-900 text-sm uppercase tracking-wider mb-3">Order Summary</h3>
                <div className="space-y-2 mb-3">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-navy-600">{item.product.title} × {item.quantity}</span>
                      <span className="font-medium text-navy-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-cream-200 pt-3 space-y-1.5">
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Shipping</span><span className="font-medium text-green-600">Free</span></div>
                  <div className="flex justify-between pt-1"><span className="font-serif font-bold text-navy-900">Total</span><span className="font-serif font-bold text-navy-900 text-lg">${total.toFixed(2)}</span></div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-brass-500 text-navy-900 font-semibold hover:bg-brass-400 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay ${total.toFixed(2)}
              </button>
              <p className="text-xs text-center text-navy-400">This is a simulated payment. No real charges will be made.</p>
            </form>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center">
            <Loader className="w-12 h-12 text-brass-500 animate-spin mb-4" />
            <h2 className="font-serif text-xl font-bold text-navy-900">Processing Payment...</h2>
            <p className="text-sm text-navy-500 mt-2">Please wait while we confirm your order.</p>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-900">Order Confirmed!</h2>
            <p className="text-sm text-navy-500 mt-2">Thank you for your purchase. A confirmation has been sent to your email.</p>
            <div className="mt-6 bg-white rounded-xl p-4 border border-cream-200 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-navy-500">Order ID</span>
                <span className="font-mono font-bold text-navy-900">{orderId}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-navy-500">Total Paid</span>
                <span className="font-bold text-navy-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Estimated Delivery</span>
                <span className="font-medium text-navy-900">3-5 business days</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-full mt-6 py-3.5 rounded-lg bg-navy-800 text-cream-100 font-semibold hover:bg-brass-500 hover:text-navy-900 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
