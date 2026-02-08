'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';

interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: string;
  paymentStatus: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  updatedAt: string;
}

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
        setStatus(data.status);
        setPaymentStatus(data.paymentStatus);
      } catch (error) {
        console.error('Error fetching order:', error);
        router.push('/admin/orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, paymentStatus }),
      });

      if (!res.ok) throw new Error('Failed to update order');

      const updatedOrder = await res.json();
      setOrder(updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[s] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <AdminLayout title="Order Details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-olive-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout title="Order Details">
        <p className="text-olive-500">Order not found</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Order ${order.orderNumber}`}>
      <Link href="/admin/orders" className="inline-flex items-center text-olive-600 hover:text-olive-800 mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
            <h2 className="text-lg font-semibold text-olive-800 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border border-olive-100 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-olive-800">{item.name}</h3>
                    <p className="text-sm text-olive-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-olive-800">{formatCurrency(item.price * item.quantity)}</p>
                    <p className="text-sm text-olive-500">{formatCurrency(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 pt-6 border-t border-olive-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-olive-600">Subtotal</span>
                <span className="text-olive-800">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-olive-600">Shipping</span>
                <span className="text-olive-800">{formatCurrency(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-olive-600">Tax (GST 18%)</span>
                <span className="text-olive-800">{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-olive-100">
                <span className="text-olive-800">Total</span>
                <span className="text-olive-800">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
            <h2 className="text-lg font-semibold text-olive-800 mb-4">Shipping Address</h2>
            <div className="text-olive-700">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Update */}
          <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
            <h2 className="text-lg font-semibold text-olive-800 mb-4">Update Status</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-olive-700 mb-2">Order Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-olive-700 mb-2">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-olive-200 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500 outline-none"
                >
                  {PAYMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={saving || (status === order.status && paymentStatus === order.paymentStatus)}
                className="w-full bg-olive-600 text-white py-2 rounded-lg font-medium hover:bg-olive-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
            <h2 className="text-lg font-semibold text-olive-800 mb-4">Customer</h2>
            <div className="space-y-2">
              <p className="text-olive-800 font-medium">{order.customerName}</p>
              <p className="text-olive-600 text-sm">{order.customerEmail}</p>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-xl shadow-sm border border-olive-100 p-6">
            <h2 className="text-lg font-semibold text-olive-800 mb-4">Order Info</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-olive-600">Order Number</span>
                <span className="text-olive-800 font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-olive-600">Status</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-olive-600">Payment</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-olive-600">Created</span>
                <span className="text-olive-800">{formatDate(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-olive-600">Updated</span>
                <span className="text-olive-800">{formatDate(order.updatedAt)}</span>
              </div>
              {order.razorpayPaymentId && (
                <div className="flex justify-between">
                  <span className="text-olive-600">Payment ID</span>
                  <span className="text-olive-800 text-xs">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
