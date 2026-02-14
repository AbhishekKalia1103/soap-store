'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [shippingCost, setShippingCost] = useState(0);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(699);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setShippingCost(data.shippingCost);
        setFreeShippingThreshold(data.freeShippingThreshold);
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load settings' }))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingCost, freeShippingThreshold }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      const data = await res.json();
      setShippingCost(data.shippingCost);
      setFreeShippingThreshold(data.freeShippingThreshold);
      setMessage({ type: 'success', text: 'Settings saved successfully' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save settings' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSave} className="max-w-lg">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold border-b pb-3">Shipping Configuration</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Cost (₹)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={shippingCost}
              onChange={(e) => setShippingCost(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-olive-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Flat shipping fee charged on orders below the free shipping threshold.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Free Shipping Threshold (₹)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-olive-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Orders at or above this amount get free shipping. Set to 0 to disable free shipping.
            </p>
          </div>

          {/* Preview */}
          <div className="bg-olive-50 border border-olive-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-olive-800 mb-2">Preview</h3>
            <ul className="text-sm text-olive-700 space-y-1">
              <li>
                Order below ₹{freeShippingThreshold}
                {' → '}
                {shippingCost > 0 ? `₹${shippingCost} shipping` : 'Free shipping'}
              </li>
              {freeShippingThreshold > 0 && (
                <li>
                  Order ₹{freeShippingThreshold}+
                  {' → '}
                  Free shipping
                </li>
              )}
            </ul>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="bg-olive-600 text-white px-6 py-2 rounded-lg hover:bg-olive-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
