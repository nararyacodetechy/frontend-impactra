'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { requestSetPassword } from '@/lib/authServices';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default function GoogleAccountDetected() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRequestSetPassword = async () => {
    setLoading(true);
    try {
      await requestSetPassword(email);
      setMessage('Link untuk atur password telah dikirim ke email Anda.');
    } catch (err: any) {
      setMessage(err.message || 'Terjadi kesalahan saat mengirim email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl space-y-6 border">
      <h1 className="text-xl font-bold">Akun Terdaftar via Google</h1>

      <p>
        Anda telah memiliki akun dengan email <strong>{email}</strong> yang terdaftar
        menggunakan Google.
      </p>

      <p>
        Silakan pilih salah satu opsi di bawah untuk melanjutkan:
      </p>

      <div className="flex flex-col items-center gap-4 mt-6">
        <GoogleLoginButton />

        <button
          onClick={handleRequestSetPassword}
          disabled={loading}
          className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          {loading ? 'Mengirim email...' : 'Atur Password Khusus'}
        </button>

        {message && (
          <div className="text-sm text-green-600">{message}</div>
        )}

        {message && (
          <a
            href="https://mail.google.com/mail/u/0/#inbox"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Buka Gmail
          </a>
        )}
      </div>
    </div>
  );
}
