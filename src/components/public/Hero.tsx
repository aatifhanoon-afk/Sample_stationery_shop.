import { Link } from 'react-router-dom';
import { BookOpen, PenTool, ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/10027581/pexels-photo-10027581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Cozy bookstore interior"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-800/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass-500/20 border border-brass-400/30 mb-6 animate-fade-in">
            <Star className="w-3.5 h-3.5 text-brass-400 fill-brass-400" />
            <span className="text-xs font-medium text-brass-300 tracking-wide">Est. 2019 · Portland, OR</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-cream-50 leading-tight animate-slide-up">
            Paper &amp; Parchment
            <span className="block text-brass-400 text-2xl md:text-3xl font-medium mt-2">Your Gateway to Stories &amp; Supplies</span>
          </h1>
          <p className="mt-6 text-lg text-cream-200 leading-relaxed max-w-xl animate-slide-up">
            Discover handpicked books and finely crafted stationery. From fantasy epics to fountain pens, we bring together the tools for reading, writing, and creating.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Link
              to="/catalog?cat=Book"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brass-500 text-navy-900 font-semibold hover:bg-brass-400 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] group"
            >
              <BookOpen className="w-5 h-5" />
              Browse Books
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/catalog?cat=Stationery"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-transparent border-2 border-cream-300 text-cream-100 font-semibold hover:bg-cream-100 hover:text-navy-900 transition-all group"
            >
              <PenTool className="w-5 h-5" />
              Shop Stationery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-cream-300 animate-fade-in">
            <div>
              <div className="text-2xl font-serif font-bold text-brass-400">500+</div>
              <div className="text-xs uppercase tracking-wider">Curated Titles</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-brass-400">12k+</div>
              <div className="text-xs uppercase tracking-wider">Happy Readers</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-brass-400">4.9★</div>
              <div className="text-xs uppercase tracking-wider">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
