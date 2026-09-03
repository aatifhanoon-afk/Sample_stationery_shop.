import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Link as LinkIcon, Save, ArrowLeft, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { Product, Category } from '@/types';

export default function ProductForm() {
  const { products, addProduct, updateProduct } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<Category>('Book');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');

  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === id);
      if (product) {
        setTitle(product.title);
        setSku(product.sku);
        setCategory(product.category);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
        setDescription(product.description);
        setImage(product.image);
        if (product.image.startsWith('http')) {
          setImageUrl(product.image);
          setImageMode('url');
        } else {
          setImageMode('upload');
        }
      }
    }
  }, [id, products]);

  const generateSku = () => {
    const prefix = category === 'Book' ? 'BK' : 'ST';
    const slug = title
      .split(' ')
      .map((w) => w.slice(0, 3).toUpperCase())
      .join('-')
      .slice(0, 12) || 'NEW';
    const num = Math.floor(Math.random() * 900 + 100);
    setSku(`${prefix}-${slug}-${num}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrl = (url: string) => {
    setImageUrl(url);
    setImage(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: id || `p${Date.now()}`,
      sku: sku || `SKU-${Date.now().toString(36).toUpperCase()}`,
      title,
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock) || 0,
      description,
      image: image || 'https://images.pexels.com/photos/10027581/pexels-photo-10027581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      reviews: isEdit ? products.find((p) => p.id === id)?.reviews || [] : [],
      outOfStock: (parseInt(stock) || 0) === 0,
    };
    if (isEdit) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="inline-flex items-center gap-1.5 text-sm text-cream-400 hover:text-cream-50 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </button>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream-50">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-navy-900 rounded-xl border border-navy-800 p-6">
          <h2 className="font-serif text-lg font-bold text-cream-50 mb-4">Product Details</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-cream-400 block mb-1.5">Product Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-cream-400 block mb-1.5">SKU</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Auto-generated or manual"
                  className="flex-1 px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brass-400"
                />
                <button
                  type="button"
                  onClick={generateSku}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-navy-700 text-cream-200 text-sm font-medium hover:bg-navy-600 transition-colors whitespace-nowrap"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-cream-400 block mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                >
                  <option value="Book">Book</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-cream-400 block mb-1.5">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-cream-400 block mb-1.5">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-cream-400 block mb-1.5">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-navy-900 rounded-xl border border-navy-800 p-6">
          <h2 className="font-serif text-lg font-bold text-cream-50 mb-4">Product Image</h2>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setImageMode('upload')}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                imageMode === 'upload' ? 'bg-brass-500 text-navy-900' : 'bg-navy-800 text-cream-400 hover:text-cream-50'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setImageMode('url')}
              className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                imageMode === 'url' ? 'bg-brass-500 text-navy-900' : 'bg-navy-800 text-cream-400 hover:text-cream-50'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              Image URL
            </button>
          </div>

          {imageMode === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-navy-700 rounded-xl p-8 text-center cursor-pointer hover:border-brass-400 transition-colors"
            >
              {image ? (
                <div className="relative inline-block">
                  <img src={image} alt="Preview" className="max-h-48 rounded-lg mx-auto" />
                </div>
              ) : (
                <>
                  <ImageIcon className="w-10 h-10 text-navy-500 mx-auto mb-3" />
                  <p className="text-sm text-cream-400">Click to upload an image</p>
                  <p className="text-xs text-navy-500 mt-1">PNG, JPG up to 2MB</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => handleImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-brass-400 mb-3"
              />
              {image && (
                <img src={image} alt="Preview" className="max-h-48 rounded-lg mx-auto" />
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-5 py-3 rounded-lg bg-navy-800 text-cream-200 font-medium hover:bg-navy-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-brass-500 text-navy-900 font-semibold hover:bg-brass-400 transition-all shadow-lg"
          >
            <Save className="w-5 h-5" />
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
