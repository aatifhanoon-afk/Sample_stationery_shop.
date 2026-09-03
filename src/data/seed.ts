import { Product, StoreInfo } from '../types';

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sku: 'BK-ELD-001',
    title: 'The Shadow of Eldoria',
    category: 'Book',
    price: 18.99,
    stock: 24,
    description:
      'In the ancient kingdom of Eldoria, a young scribe discovers a forbidden tome that awakens a power long sealed beneath the royal library. As shadows creep across the land, she must unravel the mystery before darkness consumes the realm. A sweeping epic of magic, loyalty, and the cost of knowledge.',
    image: 'https://images.pexels.com/photos/14167190/pexels-photo-14167190.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    outOfStock: false,
    reviews: [
      { id: 'r1', author: 'Margaret L.', rating: 5, comment: 'Absolutely spellbinding. Could not put it down!', date: '2025-08-12' },
      { id: 'r2', author: 'James P.', rating: 4, comment: 'Rich worldbuilding and a gripping plot. The ending left me wanting more.', date: '2025-07-30' },
      { id: 'r3', author: 'Sofia R.', rating: 5, comment: 'One of the best fantasy debuts I have read in years.', date: '2025-06-18' },
    ],
  },
  {
    id: 'p2',
    sku: 'ST-FP-002',
    title: 'Refillable Brass Fountain Pen',
    category: 'Stationery',
    price: 24.5,
    stock: 18,
    description:
      'A meticulously crafted fountain pen with a solid brass barrel and medium nib. Refillable with standard international ink cartridges or a converter. The weight and balance make every stroke a pleasure, whether signing documents or writing letters by candlelight.',
    image: 'https://images.pexels.com/photos/13583358/pexels-photo-13583358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    outOfStock: false,
    reviews: [
      { id: 'r4', author: 'Daniel K.', rating: 5, comment: 'Writes like a dream. The brass develops a gorgeous patina.', date: '2025-08-01' },
      { id: 'r5', author: 'Aisha M.', rating: 4, comment: 'Beautiful pen, slightly heavy for long sessions but worth it.', date: '2025-07-15' },
    ],
  },
  {
    id: 'p3',
    sku: 'ST-JR-003',
    title: 'Dot Grid Leather Journal',
    category: 'Stationery',
    price: 14.99,
    stock: 32,
    description:
      'A 192-page heavyweight dot grid journal bound in genuine full-grain leather. The 120gsm paper handles fountain pen ink, markers, and watercolor with minimal ghosting. Lay-flat binding and an elastic closure make it the perfect everyday companion.',
    image: 'https://images.pexels.com/photos/5321357/pexels-photo-5321357.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    outOfStock: false,
    reviews: [
      { id: 'r6', author: 'Emily T.', rating: 5, comment: 'The paper quality is outstanding. No bleed-through at all.', date: '2025-08-20' },
      { id: 'r7', author: 'Carlos V.', rating: 4, comment: 'Lovely leather cover. Wish it came in more colors.', date: '2025-07-05' },
    ],
  },
  {
    id: 'p4',
    sku: 'BK-CMP-004',
    title: 'Principles of Modern Computing',
    category: 'Book',
    price: 45.0,
    stock: 12,
    description:
      'A comprehensive guide to the foundations of computer science, from binary logic to distributed systems. Covers algorithms, data structures, networking, and the ethical implications of AI. Written for students and professionals who want to understand not just how computers work, but why.',
    image: 'https://images.pexels.com/photos/12899140/pexels-photo-12899140.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    outOfStock: false,
    reviews: [
      { id: 'r8', author: 'Prof. Nguyen', rating: 5, comment: 'An exceptional textbook. My students finally understand recursion.', date: '2025-08-08' },
      { id: 'r9', author: 'Lisa H.', rating: 4, comment: 'Dense but rewarding. Great reference for the shelf.', date: '2025-06-22' },
    ],
  },
  {
    id: 'p5',
    sku: 'ST-HL-005',
    title: 'Pastel Highlighters (Set of 6)',
    category: 'Stationery',
    price: 8.99,
    stock: 50,
    description:
      'A set of six soft pastel highlighters with chisel tips for broad and fine highlighting. Quick-drying, smudge-resistant ink that will not bleed through thin pages. Colors include lavender, mint, peach, sky blue, rose, and buttercream. Perfect for bullet journals and textbooks.',
    image: 'https://images.pexels.com/photos/29765803/pexels-photo-29765803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    outOfStock: false,
    reviews: [
      { id: 'r10', author: 'Jenna W.', rating: 5, comment: 'The pastel colors are so soothing. Great for color-coding notes.', date: '2025-08-25' },
      { id: 'r11', author: 'Tom B.', rating: 4, comment: 'Good value. The mint one is my favorite.', date: '2025-07-19' },
    ],
  },
  {
    id: 'p6',
    sku: 'BK-SEA-006',
    title: 'Chronicles of the Silent Sea',
    category: 'Book',
    price: 16.5,
    stock: 0,
    description:
      'When the last starship returns to Earth after a thousand-year silence, the crew finds a planet transformed. A lone communications officer must piece together the fragments of humanitys forgotten legacy from the depths of a drowned world. A haunting tale of memory, identity, and the silence between stars.',
    image: 'https://images.pexels.com/photos/33567178/pexels-photo-33567178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    outOfStock: true,
    reviews: [
      { id: 'r12', author: 'Riley S.', rating: 5, comment: 'Atmospheric and heartbreaking. The prose is pure poetry.', date: '2025-08-15' },
      { id: 'r13', author: 'Nora F.', rating: 4, comment: 'A slow burn but the payoff is incredible. Highly recommend.', date: '2025-07-02' },
    ],
  },
];

export const SEED_STORE_INFO: StoreInfo = {
  email: 'hello@paperparchment.com',
  phone: '+1 (555) 019-2834',
  address: '42 Inkwell Lane, Old Quarter, Portland, OR 97201',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 8:00 PM' },
    { day: 'Sunday', time: '11:00 AM – 5:00 PM' },
  ],
  social: [
    { platform: 'Twitter / X', handle: '@paperparchment', url: 'https://twitter.com/paperparchment' },
    { platform: 'Instagram', handle: '@paperparchment_books', url: 'https://instagram.com/paperparchment_books' },
    { platform: 'Facebook', handle: '@PaperAndParchment', url: 'https://facebook.com/PaperAndParchment' },
  ],
};
