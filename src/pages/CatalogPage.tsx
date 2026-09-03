import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/public/ProductCard';
import { useStore } from '@/store/StoreContext';
import { Category } from '@/types';

type FilterCategory = 'All' | Category;

export default function CatalogPage() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState<FilterCategory>(
    (searchParams.get('cat') as FilterCategory) || 'All'
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [maxPrice, setMaxPrice] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat') as FilterCategory | null;
    const q = searchParams.get('q') || '';
    setCategory(cat || 'All');
    setSearchQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [products, category, maxPrice, searchQuery]);

  const handleCategoryChange = (cat: FilterCategory) => {
    setCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') params.delete('cat');
    else params.set('cat', cat);
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) params.set('q', searchQuery);
    else params.delete('q');
    setSearchParams(params);
  };

  const categories: { label: string; value: FilterCategory }[] = [
    { label: 'All Items', value: 'All' },
    { label: 'Books', value: 'Book' },
    { label: 'Stationery', value: 'Stationery' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-900">Storefront Catalog</h1>
        <p className="text-navy-500 mt-2">Browse our collection of books and stationery</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl border border-cream-200 p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-serif font-bold text-navy-900">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-1 text-navy-500"><X className="w-5 h-5" /></button>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-3">Category</h3>
              <div className="space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => handleCategoryChange(c.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      category === c.value ? 'bg-navy-800 text-cream-100' : 'text-navy-600 hover:bg-cream-100'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-400 mb-3">Price Range</h3>
              <div className="flex items-center justify-between text-sm text-navy-600 mb-2">
                <span>$0</span>
                <span className="font-bold text-navy-900">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brass-500"
              />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-cream-300 text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brass-400"
              />
            </form>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-cream-300 text-sm font-medium text-navy-700"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="mb-4 text-sm text-navy-500">
            Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-cream-200">
              <Search className="w-12 h-12 text-navy-300 mx-auto mb-4" />
              <p className="text-navy-500">No products match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
