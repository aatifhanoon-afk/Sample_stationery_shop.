import { BookOpen, Mail, Phone, MapPin, Clock, Twitter, Instagram, Facebook } from 'lucide-react';
import { useStore } from '@/store/StoreContext';

export default function AboutPage() {
  const { storeInfo } = useStore();

  const socialIcons: Record<string, typeof Twitter> = {
    'Twitter / X': Twitter,
    Instagram,
    Facebook,
  };

  return (
    <div>
      <section className="bg-navy-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass-500/20 border border-brass-400/30 mb-6">
            <BookOpen className="w-3.5 h-3.5 text-brass-400" />
            <span className="text-xs font-medium text-brass-300 tracking-wide">Our Story</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream-50">About Paper &amp; Parchment</h1>
          <p className="text-cream-300 mt-6 text-lg leading-relaxed">
            Born from a love of well-crafted words and the tools that bring them to life, Paper &amp; Parchment has been Portland's haven for readers and writers since 2019.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-4">How It Began</h2>
            <div className="space-y-4 text-navy-600 leading-relaxed">
              <p>
                It started with a simple idea: a shop where the smell of old books meets the gleam of a new fountain pen. Our founder, Eleanor Whitfield, opened the first Paper &amp; Parchment on a rainy Tuesday in October 2019, with nothing but a shelf of handpicked novels and a box of brass pens.
              </p>
              <p>
                Word spread quickly through the Old Quarter. Writers came for the journals, readers came for the stories, and everyone stayed for the conversation. Six years later, we are still that place — a corner of the city where stories begin and ideas take shape.
              </p>
              <p>
                Every book on our shelf and every pen in our case is chosen by someone who uses it, loves it, and believes you will too. That is our promise, and it has not changed since day one.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-cream-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-brass-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-navy-900">Visit Us</h3>
                  <p className="text-sm text-navy-600 mt-1">{storeInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Mail className="w-5 h-5 text-brass-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-navy-900">Email</h3>
                  <p className="text-sm text-navy-600 mt-1">{storeInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brass-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-navy-900">Phone</h3>
                  <p className="text-sm text-navy-600 mt-1">{storeInfo.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-cream-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-brass-600 mt-0.5 flex-shrink-0" />
                <h3 className="font-serif font-bold text-navy-900">Opening Hours</h3>
              </div>
              <div className="space-y-2">
                {storeInfo.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-navy-600">{h.day}</span>
                    <span className="font-medium text-navy-900">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-800 rounded-xl p-6">
              <h3 className="font-serif font-bold text-cream-50 mb-4">Follow Us</h3>
              <div className="space-y-2">
                {storeInfo.social.map((s) => {
                  const Icon = socialIcons[s.platform] ?? BookOpen;
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-cream-300 hover:text-brass-400 transition-colors group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{s.platform}</span>
                      <span className="text-sm font-medium ml-auto">{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
