'use client';

import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl space-y-6 border">
      <h1 className="text-2xl font-bold text-center">Masuk ke Impactra</h1>
      <AuthForm type="login" />
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="text-blue-600 hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}
