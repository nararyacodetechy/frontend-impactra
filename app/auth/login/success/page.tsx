// app/auth/login/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function LoginSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useUser();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      router.push('/feed'); // arahkan ke home atau dashboard
    } else {
      router.push('/auth/login'); // fallback jika gagal
    }
  }, [params, login, router]);

  return <p className="text-center">Login dengan Google berhasil. Mengarahkan...</p>;
}
