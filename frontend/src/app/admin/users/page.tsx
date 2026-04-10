"use client";
import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/app/contexts/AdminContext';
import { Search, UserCheck, UserX, Trash2, Activity, Clock, Calendar, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  is_admin: boolean;
  last_login_at: string | null;
  is_online: boolean;
  created_at: string;
}

export default function AdminUsers() {
  const { token } = useAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async (userId: string, currentName: string) => {
    const user = users.find(u => u.id === userId);
    const action = user?.is_admin ? 'remove' : 'grant';

    const result = await Swal.fire({
      title: `${action === 'grant' ? 'Grant' : 'Remove'} Admin Access?`,
      text: `Are you sure you want to ${action} admin access for ${currentName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'grant' ? '#16a34a' : '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action} admin access`,
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${userId}/toggle-admin`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: `${action === 'grant' ? 'Granted' : 'Removed'}!`,
            text: `Admin access has been ${action === 'grant' ? 'granted' : 'removed'}.`,
            timer: 1500,
            showConfirmButton: false,
          });
          fetchUsers();
        } else {
          const data = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message || `Failed to ${action} admin access`,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to ${action} admin access`,
        });
      }
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${userName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete user',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User has been deleted.',
            timer: 1500,
            showConfirmButton: false,
          });
          fetchUsers();
        } else {
          const data = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message || 'Failed to delete user',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete user',
        });
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate user statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.is_online).length;
  const usersWithLogin = users.filter(u => u.last_login_at).length;
  const neverLoggedIn = users.filter(u => !u.last_login_at).length;

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
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Now</p>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Signed In</p>
              <p className="text-2xl font-bold text-gray-900">{usersWithLogin}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Never Logged In</p>
              <p className="text-2xl font-bold text-gray-900">{neverLoggedIn}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <UserX className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Last Login</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.phone || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {user.is_online ? (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Offline
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {user.last_login_at ? (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock size={14} />
                          <span>{new Date(user.last_login_at).toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">Never</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.is_admin
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.is_admin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleAdmin(user.id, `${user.first_name} ${user.last_name}`)}
                          className={`p-1 rounded transition ${
                            user.is_admin
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={user.is_admin ? 'Remove admin access' : 'Grant admin access'}
                        >
                          {user.is_admin ? <UserX size={18} /> : <UserCheck size={18} />}
                        </button>
                        {!user.is_admin && (
                          <button
                            onClick={() => handleDeleteUser(user.id, `${user.first_name} ${user.last_name}`)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete user"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
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
