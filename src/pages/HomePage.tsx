import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PenTool, Truck, ShieldCheck, Heart } from 'lucide-react';
import Hero from '@/components/public/Hero';
import ProductCard from '@/components/public/ProductCard';
import { useStore } from '@/store/StoreContext';

export default function HomePage() {
  const { products } = useStore();
  const featured = products.slice(0, 3);
  const books = products.filter((p) => p.category === 'Book').slice(0, 2);
  const stationery = products.filter((p) => p.category === 'Stationery').slice(0, 2);

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On all orders within the US' },
            { icon: ShieldCheck, title: 'Secure Checkout', desc: 'Your data is always protected' },
            { icon: Heart, title: 'Curated with Care', desc: 'Every item handpicked by our team' },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-cream-200 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-lg bg-navy-800 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-brass-400" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-navy-900">{f.title}</h3>
                <p className="text-sm text-navy-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-navy-900">Featured Picks</h2>
            <p className="text-navy-500 mt-1">Our most loved items this season</p>
          </div>
          <Link to="/catalog" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brass-600 hover:text-brass-700 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="bg-navy-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass-500/20 border border-brass-400/30 mb-4">
                <BookOpen className="w-3.5 h-3.5 text-brass-400" />
                <span className="text-xs font-medium text-brass-300 tracking-wide">For Readers</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-cream-50">Find Your Next Adventure</h2>
              <p className="text-cream-300 mt-4 leading-relaxed">
                From fantasy epics to technical references, our shelves are stocked with stories and knowledge waiting to be discovered. Every book is selected with care.
              </p>
              <Link to="/catalog?cat=Book" className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg bg-brass-500 text-navy-900 font-semibold hover:bg-brass-400 transition-all group">
                Browse Books <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {books.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4 order-2 md:order-1">
            {stationery.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass-500/20 border border-brass-400/30 mb-4">
              <PenTool className="w-3.5 h-3.5 text-brass-400" />
              <span className="text-xs font-medium text-brass-300 tracking-wide">For Writers</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-navy-900">Tools for the Craft</h2>
            <p className="text-navy-500 mt-4 leading-relaxed">
              Premium pens, journals, and supplies for those who put thought to paper. Whether you are journaling, sketching, or drafting your first novel, we have the right tools.
            </p>
            <Link to="/catalog?cat=Stationery" className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg bg-navy-800 text-cream-100 font-semibold hover:bg-brass-500 hover:text-navy-900 transition-all group">
              Shop Stationery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
