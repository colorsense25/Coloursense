'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRouteProtect({ children }) {
  const router = useRouter();

  useEffect(() => {
   
    const adminInfo = localStorage.getItem('adminToken');
    if (!adminInfo) {
     
      router.replace('/adminLogin'); 
    }
  }, [router]);

  
  return children;
}