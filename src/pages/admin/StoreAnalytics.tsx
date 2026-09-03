import { useStore } from '@/store/StoreContext';
import { TrendingUp, Package, DollarSign, ShoppingCart, BookOpen, PenTool } from 'lucide-react';
import { useMemo } from 'react';

export default function StoreAnalytics() {
  const { products, orders } = useStore();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    const totalUnitsSold = orders.reduce((s, o) => s + o.items.reduce((qs, i) => qs + i.quantity, 0), 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const booksCount = products.filter((p) => p.category === 'Book').length;
    const stationeryCount = products.filter((p) => p.category === 'Stationery').length;
    const inventoryValue = products.reduce((s, p) => s + p.price * p.stock, 0);

    const productSales: Record<string, { title: string; qty: number; revenue: number }> = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = { title: item.title, qty: 0, revenue: 0 };
        }
        productSales[item.productId].qty += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    return { totalRevenue, totalUnitsSold, avgOrderValue, booksCount, stationeryCount, inventoryValue, topProducts };
  }, [products, orders]);

  const cards = [
    { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-400' },
    { label: 'Orders Placed', value: orders.length, icon: ShoppingCart, color: 'text-blue-400' },
    { label: 'Units Sold', value: stats.totalUnitsSold, icon: TrendingUp, color: 'text-brass-400' },
    { label: 'Avg Order Value', value: `$${stats.avgOrderValue.toFixed(2)}`, icon: Package, color: 'text-purple-400' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream-50">Store Analytics</h1>
        <p className="text-cream-400 text-sm mt-1">Business performance at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-navy-900 rounded-xl border border-navy-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <p className="text-xs text-cream-400 uppercase tracking-wider">{card.label}</p>
            <p className="font-serif text-2xl font-bold text-cream-50 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-navy-900 rounded-xl border border-navy-800 p-6">
          <h2 className="font-serif text-lg font-bold text-cream-50 mb-4">Catalog Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cream-300" />
                  <span className="text-sm text-cream-200">Books</span>
                </div>
                <span className="text-sm font-bold text-cream-50">{stats.booksCount}</span>
              </div>
              <div className="h-2 rounded-full bg-navy-800 overflow-hidden">
                <div
                  className="h-full bg-navy-400 rounded-full transition-all"
                  style={{ width: `${(stats.booksCount / (stats.booksCount + stats.stationeryCount || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-brass-400" />
                  <span className="text-sm text-cream-200">Stationery</span>
                </div>
                <span className="text-sm font-bold text-cream-50">{stats.stationeryCount}</span>
              </div>
              <div className="h-2 rounded-full bg-navy-800 overflow-hidden">
                <div
                  className="h-full bg-brass-400 rounded-full transition-all"
                  style={{ width: `${(stats.stationeryCount / (stats.booksCount + stats.stationeryCount || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-navy-800">
            <div className="flex justify-between items-center">
              <span className="text-sm text-cream-400">Inventory Value</span>
              <span className="font-serif text-xl font-bold text-brass-400">${stats.inventoryValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-navy-900 rounded-xl border border-navy-800 p-6">
          <h2 className="font-serif text-lg font-bold text-cream-50 mb-4">Top Selling Products</h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-cream-400 py-8 text-center">No sales data yet. Place orders through the storefront to see analytics.</p>
          ) : (
            <div className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-800 flex items-center justify-center text-xs font-bold text-brass-400 flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-cream-200 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-cream-400">{p.qty} sold</p>
                  </div>
                  <span className="text-sm font-bold text-cream-50">${p.revenue.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-navy-900 rounded-xl border border-navy-800 p-6">
        <h2 className="font-serif text-lg font-bold text-cream-50 mb-4">Stock Health</h2>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3">
              <img src={p.image} alt={p.title} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
              <span className="text-sm text-cream-200 flex-1 line-clamp-1">{p.title}</span>
              <div className="w-24 h-2 rounded-full bg-navy-800 overflow-hidden flex-shrink-0">
                <div
                  className={`h-full rounded-full transition-all ${
                    p.outOfStock ? 'bg-red-500' : p.stock < 10 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${Math.min((p.stock / 50) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm text-cream-400 w-16 text-right flex-shrink-0">
                {p.outOfStock ? 'Out' : `${p.stock} units`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
