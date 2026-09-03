import { useState, useMemo } from 'react';
import { Search, Edit2, Trash2, PackageX, PackageCheck, Plus, X } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Product, Category } from '@/types';

export default function InventoryOverview() {
  const { products, deleteProduct, toggleOutOfStock } = useStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | Category>('All');
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, search, categoryFilter]);

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const outOfStock = products.filter((p) => p.outOfStock).length;
  const inventoryValue = products.reduce((s, p) => s + p.price * p.stock, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream-50">Inventory Overview</h1>
        <p className="text-cream-400 text-sm mt-1">Manage your product catalog and stock levels</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Products', value: products.length, color: 'text-cream-50' },
          { label: 'Total Stock', value: totalStock, color: 'text-cream-50' },
          { label: 'Out of Stock', value: outOfStock, color: outOfStock > 0 ? 'text-red-400' : 'text-cream-50' },
          { label: 'Inventory Value', value: `$${inventoryValue.toFixed(2)}`, color: 'text-brass-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-navy-900 rounded-xl border border-navy-800 p-4">
            <p className="text-xs text-cream-400 uppercase tracking-wider">{stat.label}</p>
            <p className={`font-serif text-xl md:text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-navy-900 rounded-xl border border-navy-800 overflow-hidden">
        <div className="p-4 border-b border-navy-800 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-brass-400"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as 'All' | Category)}
            className="px-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
          >
            <option value="All">All Categories</option>
            <option value="Book">Books</option>
            <option value="Stationery">Stationery</option>
          </select>
          <button
            onClick={() => navigate('/admin/dashboard/add')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brass-500 text-navy-900 text-sm font-semibold hover:bg-brass-400 transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-800 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-cream-400 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-xs font-semibold text-cream-400 uppercase tracking-wider">SKU</th>
                <th className="px-4 py-3 text-xs font-semibold text-cream-400 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-xs font-semibold text-cream-400 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-xs font-semibold text-cream-400 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-xs font-semibold text-cream-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-cream-400">No products found.</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="border-b border-navy-800/50 hover:bg-navy-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <span className="font-medium text-cream-50 line-clamp-1 max-w-[200px]">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-cream-400">{p.sku}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.category === 'Book' ? 'bg-navy-700 text-cream-200' : 'bg-brass-500/20 text-brass-400'
                      }`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-cream-50">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {p.outOfStock ? (
                        <span className="text-red-400 font-medium">Out of Stock</span>
                      ) : (
                        <span className="text-cream-50">{p.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => navigate(`/admin/dashboard/edit/${p.id}`)}
                          className="p-1.5 rounded-lg text-cream-400 hover:text-brass-400 hover:bg-navy-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleOutOfStock(p.id)}
                          className="p-1.5 rounded-lg text-cream-400 hover:text-yellow-400 hover:bg-navy-800 transition-colors"
                          title={p.outOfStock ? 'Mark in stock' : 'Mark out of stock'}
                        >
                          {p.outOfStock ? <PackageCheck className="w-4 h-4" /> : <PackageX className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p)}
                          className="p-1.5 rounded-lg text-cream-400 hover:text-red-400 hover:bg-navy-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
          <div className="relative bg-navy-900 rounded-2xl border border-navy-700 p-6 max-w-sm w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-cream-50">Delete Product</h3>
              <button onClick={() => setDeleteConfirm(null)} className="text-cream-400 hover:text-cream-50"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-cream-400 mb-6">
              Are you sure you want to delete <span className="font-medium text-cream-50">{deleteConfirm.title}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-lg bg-navy-800 text-cream-200 text-sm font-medium hover:bg-navy-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { deleteProduct(deleteConfirm.id); setDeleteConfirm(null); }}
                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
