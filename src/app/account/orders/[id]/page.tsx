"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";

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
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/user/orders/${id}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data.order);
        } else {
          setError("Order not found");
        }
      } catch {
        setError("Failed to load order");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Order not found"}</h1>
          <Link href="/account/orders" className="text-olive-600 hover:text-olive-700">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account/orders" className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
            <p className="text-sm text-gray-500">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                statusColors[order.status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          {order.status !== "cancelled" && (
            <div className="relative">
              <div className="flex justify-between mb-2">
                {statusSteps.map((step, index) => (
                  <div
                    key={step}
                    className={`flex-1 text-center text-xs capitalize ${
                      index <= currentStepIndex ? "text-olive-600 font-medium" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-olive-600 rounded-full transition-all"
                  style={{ width: `${((currentStepIndex + 1) / statusSteps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-medium text-gray-900 hover:text-olive-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <address className="not-italic text-gray-600">
              <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
            </address>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>₹{order.shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Payment Status:</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
                    order.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
