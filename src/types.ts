export type Category = 'Book' | 'Stationery';

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: Category;
  price: number;
  stock: number;
  description: string;
  image: string;
  reviews: Review[];
  outOfStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: { productId: string; title: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
}

export interface StoreInfo {
  email: string;
  phone: string;
  address: string;
  hours: { day: string; time: string }[];
  social: { platform: string; handle: string; url: string }[];
}
