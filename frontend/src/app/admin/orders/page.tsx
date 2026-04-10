"use client";
import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/app/contexts/AdminContext';
import { Eye, Search, ArrowLeft} from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  product_image: string;
}

interface OrderDetails {
  order: Order;
  items: OrderItem[];
}

export default function AdminOrders() {
  const { token } = useAdmin();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedOrder(data);
        setShowOrderDetails(true);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load order details',
      });
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchOrders();
        if (selectedOrder) {
          fetchOrderDetails(orderId);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update status',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status',
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = orders.filter(order =>
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[85%] w-[100%] m-auto space-y-6 mt-[3rem]">
      {/* Back to Dashboard */}
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[#ea580c] hover:underline">
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by order number, customer name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order #</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      #{order.order_number}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.first_name} {order.last_name}
                      </div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => fetchOrderDetails(order.id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <Eye size={18} />
                        <span className="text-sm">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Order Details - #{selectedOrder.order.order_number}
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Customer Information</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Name:</strong> {selectedOrder.order.first_name} {selectedOrder.order.last_name}</p>
                    <p><strong>Email:</strong> {selectedOrder.order.email}</p>
                    {selectedOrder.order.shipping_address && (
                      <>
                        <p><strong>Address:</strong> {selectedOrder.order.shipping_address}</p>
                        <p>
                          <strong>City:</strong> {selectedOrder.order.shipping_city}, {selectedOrder.order.shipping_state} {selectedOrder.order.shipping_zip}
                        </p>
                        <p><strong>Country:</strong> {selectedOrder.order.shipping_country}</p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Order Information</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Order Date:</strong> {new Date(selectedOrder.order.created_at).toLocaleString()}</p>
                    <p><strong>Total Amount:</strong> ${Number(selectedOrder.order.total_amount).toFixed(2)}</p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.order.status)}`}>
                        {selectedOrder.order.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Update Order Status</h3>
                <select
                  value={selectedOrder.order.status}
                  onChange={(e) => handleUpdateStatus(selectedOrder.order.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.product_image || '/placeholder.png'}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
