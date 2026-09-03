import { Package, Clock, CheckCircle, Truck, ShoppingBag } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function OrdersLog() {
  const { orders } = useStore();

  const statusConfig = {
    Pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
    Shipped: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
    Delivered: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream-50">Orders Log</h1>
        <p className="text-cream-400 text-sm mt-1">Track all customer purchases in real-time</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-navy-900 rounded-xl border border-navy-800 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-navy-500" />
          </div>
          <h3 className="font-serif text-lg font-bold text-cream-50 mb-2">No Orders Yet</h3>
          <p className="text-cream-400 text-sm">When customers place orders through the storefront, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;
            return (
              <div key={order.id} className="bg-navy-900 rounded-xl border border-navy-800 overflow-hidden">
                <div className="p-4 md:p-5 border-b border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-brass-400" />
                    </div>
                    <div>
                      <span className="font-mono text-sm font-bold text-cream-50">{order.id}</span>
                      <p className="text-xs text-cream-400">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color} ${status.border} border`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {order.status}
                    </span>
                    <span className="font-serif text-lg font-bold text-brass-400">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-cream-400 mb-2">Items</h4>
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-cream-200">{item.title} × {item.quantity}</span>
                          <span className="text-cream-400">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-cream-400 mb-2">Customer</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-cream-200 font-medium">{order.customerName}</p>
                      <p className="text-cream-400">{order.customerEmail}</p>
                      <p className="text-cream-400">{order.shippingAddress}</p>
                      <p className="text-cream-400">{order.city}, {order.zip} · {order.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
