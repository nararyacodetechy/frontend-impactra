'use client';

import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl space-y-6 border">
      <h1 className="text-2xl font-bold text-center">Daftar ke Impactra</h1>
      <AuthForm type="register" />
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
