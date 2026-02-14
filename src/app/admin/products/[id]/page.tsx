'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

const CATEGORIES = ['Floral', 'Detox', 'Ayurvedic', 'Exfoliating', 'Moisturizing', 'Herbal', 'Specialty'];

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  images: string;
  category: string;
  ingredients: string;
  weight: string;
  tags: string;
  inStock: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<ProductForm>({
    name: '',
    slug: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    images: '',
    category: CATEGORIES[0],
    ingredients: '',
    weight: '',
    tags: '',
    inStock: true,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const product = await res.json();

        setForm({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() || '',
          image: product.image,
          images: product.images?.join(', ') || '',
          category: product.category,
          ingredients: product.ingredients?.join(', ') || '',
          weight: product.weight,
          tags: product.tags?.join(', ') || '',
          inStock: product.inStock,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/admin/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const productData = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
        image: form.image,
        images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
        category: form.category,
        ingredients: form.ingredients ? form.ingredients.split(',').map(s => s.trim()).filter(Boolean) : [],
        weight: form.weight,
        tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        inStock: form.inStock,
      };

      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to update product');
        return;
      }

      router.push('/admin/products');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Product">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Product">
      <Link href="/admin/products" className="inline-flex items-center text-olive-600 hover:text-olive-800 mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Products
      </Link>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-olive-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-olive-700 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-olive-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none resize-none"
              required
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-olive-700 mb-2">
                Price (INR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-olive-700 mb-2">
                Original Price (INR)
              </label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => setForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                placeholder="Leave empty if no discount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-olive-700 mb-2">
                Weight <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.weight}
                onChange={(e) => setForm(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                placeholder="e.g., 100g"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-olive-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="w-5 h-5 rounded border-olive-300 text-olive-600 focus:ring-olive-500"
                />
                <span className="text-sm font-medium text-olive-700">In Stock</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-olive-700 mb-2">
              Main Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
              placeholder="https://..."
              required
            />
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-olive-700 mb-2">
              Additional Image URLs
            </label>
            <input
              type="text"
              value={form.images}
              onChange={(e) => setForm(prev => ({ ...prev, images: e.target.value }))}
              className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
              placeholder="Comma-separated URLs"
            />
          </div>

          {/* Ingredients & Tags */}
          <div>
            <label className="block text-sm font-medium text-olive-700 mb-2">
              Ingredients
            </label>
            <input
              type="text"
              value={form.ingredients}
              onChange={(e) => setForm(prev => ({ ...prev, ingredients: e.target.value }))}
              className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
              placeholder="Comma-separated ingredients"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-olive-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
              placeholder="Comma-separated tags"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-olive-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-olive-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-olive-200 rounded-lg text-olive-700 hover:bg-olive-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
