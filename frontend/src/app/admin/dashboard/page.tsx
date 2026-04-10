"use client";
import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/app/contexts/AdminContext';
import { useRouter } from 'next/navigation';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, LogOut, ArrowRight, UserPlus, PackagePlus } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { token, adminLogout } = useAdmin();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.statistics);
        setRecentOrders(data.recentOrders);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/users',
    },
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'bg-green-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
      link: '/admin/orders',
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      link: '/admin/orders',
    },
  ];

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[85%] w-[100%] m-auto space-y-6 mt-[3rem]">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="text-[1rem] text-[#ea580c]">Back to home</Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
      
      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/users" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white ">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
              <p className="text-blue-100 text-sm mb-4">View all registered users and their details</p>
              <div className="flex items-center gap-2 text-blue-100">
                <UserPlus size={16} />
                <span className="text-sm">Sign-ups, Login tracking, Active status</span>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-full">
              <Users className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
            <span className="text-sm font-medium">View all users</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        <Link href="/admin/products" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
              <p className="text-green-100 text-sm mb-4">View and add product items to your inventory</p>
              <div className="flex items-center gap-2 text-green-100">
                <PackagePlus size={16} />
                <span className="text-sm">Add, Edit, Delete products</span>
              </div>
            </div>
            <div className="bg-white/20 p-4 rounded-full">
              <Package className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-green-100 hover:text-white transition-colors">
            <span className="text-sm font-medium">View all products</span>
            <ArrowRight size={16} />
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[2rem]">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.link} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Order #</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      #{order.order_number}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div>{order.first_name} {order.last_name}</div>
                      <div className="text-xs text-gray-400">{order.email}</div>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
