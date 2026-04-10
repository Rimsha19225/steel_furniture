"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/app/contexts/AdminContext';

export default function AdminPage() {
  const router = useRouter();
  const { isAdminLoggedIn } = useAdmin();

  useEffect(() => {
    if (isAdminLoggedIn) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}
