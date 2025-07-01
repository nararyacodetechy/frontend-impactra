'use client';

import Link from 'next/link';

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border rounded p-6 shadow-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Registrasi Berhasil 🎉</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Silakan periksa email kamu dan klik tautan verifikasi untuk mengaktifkan akun.
        </p>

        <a
          href="https://mail.google.com/mail/?tab=rm&ogbl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        >
          Buka Gmail
        </a>

        <div className="text-sm text-gray-500">
          Setelah verifikasi, kamu bisa langsung <Link href="/auth/login" className="text-blue-600 hover:underline">masuk</Link>.
        </div>
      </div>
    </div>
  );
}
