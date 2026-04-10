"use client";
import React, { useEffect, useState } from 'react';
import { useAdmin } from '@/app/contexts/AdminContext';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAdminLoggedIn, adminLogout, token, isLoading: contextIsLoading } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Wait for context to finish loading, then check auth
    if (!contextIsLoading && (!isAdminLoggedIn || !token)) {
      router.push('/admin/login');
    }
  }, [contextIsLoading, isAdminLoggedIn, token, router]);

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  // Show loading spinner while context is initializing
  if (contextIsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAdminLoggedIn || !token) {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:inset-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 md:ml-0 ml-8">
              {navItems.find(item => pathname === item.href)?.name || 'Admin'}
            </h2>
            <div className="w-8 md:hidden"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
