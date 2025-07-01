'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/lib/authServices';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        if (!token) {
          throw new Error('Token tidak ditemukan');
        }
        const res = await verifyEmail(token);
        setStatus('success');
        setMessage(res.message || 'Email berhasil diverifikasi');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message || 'Verifikasi gagal');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border rounded p-6 shadow-md bg-white dark:bg-gray-900">
        {status === 'loading' && <p className="text-gray-500">Memverifikasi email...</p>}

        {status === 'success' && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-green-600">Verifikasi Berhasil</h1>
            <h1 className="text-md font-bold mb-4 text-white">Anda dapat login sekarang!</h1>
            <Link
              href="/auth/login"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Masuk
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">❌ Verifikasi Gagal</h1>
            <p className="mb-6">{message}</p>
            <Link
              href="/auth/register"
              className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Kembali ke Daftar
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
