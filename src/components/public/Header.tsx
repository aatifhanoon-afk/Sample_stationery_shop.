import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useUI } from '@/store/UIContext';
import { useState } from 'react';

export default function Header() {
  const { cart } = useStore();
  const { openCart } = useUI();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center group-hover:bg-navy-700 transition-colors">
              <BookOpen className="w-5 h-5 text-brass-400" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-bold text-navy-900 leading-none">Paper &amp; Parchment</span>
              <span className="block text-[10px] text-brass-600 tracking-widest uppercase">Books &amp; Stationery</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-navy-700 hover:text-brass-600 transition-colors">Home</Link>
            <Link to="/catalog" className="text-sm font-medium text-navy-700 hover:text-brass-600 transition-colors">Catalog</Link>
            <Link to="/catalog?cat=Book" className="text-sm font-medium text-navy-700 hover:text-brass-600 transition-colors">Books</Link>
            <Link to="/catalog?cat=Stationery" className="text-sm font-medium text-navy-700 hover:text-brass-600 transition-colors">Stationery</Link>
            <Link to="/about" className="text-sm font-medium text-navy-700 hover:text-brass-600 transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-navy-700 hover:bg-cream-200 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg text-navy-700 hover:bg-cream-200 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brass-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-navy-700 hover:bg-cream-200 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, pens, journals..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-cream-300 text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brass-400"
              />
            </div>
          </form>
        )}

        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 animate-fade-in">
            <Link to="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-navy-700 hover:bg-cream-200 font-medium">Home</Link>
            <Link to="/catalog" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-navy-700 hover:bg-cream-200 font-medium">Catalog</Link>
            <Link to="/catalog?cat=Book" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-navy-700 hover:bg-cream-200 font-medium">Books</Link>
            <Link to="/catalog?cat=Stationery" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-navy-700 hover:bg-cream-200 font-medium">Stationery</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg text-navy-700 hover:bg-cream-200 font-medium">About</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
