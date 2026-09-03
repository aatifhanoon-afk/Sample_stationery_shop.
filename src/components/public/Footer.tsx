import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useState } from 'react';

export default function Footer() {
  const { storeInfo } = useStore();
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all unused items in their original packaging. Refunds are processed within 5-7 business days.' },
    { q: 'Do you ship internationally?', a: 'Yes! We ship to over 40 countries worldwide. Shipping rates are calculated at checkout based on destination and weight.' },
    { q: 'How long does delivery take?', a: 'Standard delivery within the US takes 3-5 business days. Express options are available at checkout for 1-2 day delivery.' },
    { q: 'Are your books new or used?', a: 'All books sold on our site are brand new unless explicitly marked as used in the product description.' },
  ];

  const socialIcons: Record<string, typeof Twitter> = {
    'Twitter / X': Twitter,
    Instagram,
    Facebook,
  };

  return (
    <footer className="bg-navy-900 text-cream-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brass-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-navy-900" />
              </div>
              <span className="font-serif text-lg font-bold">Paper &amp; Parchment</span>
            </div>
            <p className="text-sm text-cream-300 leading-relaxed">
              Your gateway to stories and supplies. We curate fine books and quality stationery for readers, writers, and dreamers.
            </p>
            <div className="flex gap-3 mt-6">
              {storeInfo.social.map((s) => {
                const Icon = socialIcons[s.platform] ?? BookOpen;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-brass-500 transition-colors flex items-center justify-center"
                    aria-label={s.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brass-400 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-cream-300 hover:text-brass-400 transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="text-cream-300 hover:text-brass-400 transition-colors">Full Catalog</Link></li>
              <li><Link to="/catalog?cat=Book" className="text-cream-300 hover:text-brass-400 transition-colors">Books</Link></li>
              <li><Link to="/catalog?cat=Stationery" className="text-cream-300 hover:text-brass-400 transition-colors">Stationery</Link></li>
              <li><Link to="/about" className="text-cream-300 hover:text-brass-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brass-400 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-brass-400 mt-0.5 flex-shrink-0" />
                <span className="text-cream-300">{storeInfo.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brass-400 mt-0.5 flex-shrink-0" />
                <span className="text-cream-300">{storeInfo.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brass-400 mt-0.5 flex-shrink-0" />
                <span className="text-cream-300">{storeInfo.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brass-400 mb-4">FAQ</h3>
            <ul className="space-y-2 text-sm">
              {faqs.map((faq, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full text-left text-cream-300 hover:text-brass-400 transition-colors flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    <span className="text-brass-400 flex-shrink-0">{faqOpen === idx ? '−' : '+'}</span>
                  </button>
                  {faqOpen === idx && (
                    <p className="text-xs text-cream-400 mt-2 leading-relaxed animate-fade-in">{faq.a}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream-400">
            © {new Date().getFullYear()} Paper &amp; Parchment Books. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-cream-400">
            <span className="hover:text-brass-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-brass-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
