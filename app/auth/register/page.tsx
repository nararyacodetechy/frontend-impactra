'use client';

import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-xl space-y-6">
      <h1 className="text-4xl font-bold text-center">Sign Up</h1>
      <AuthForm type="register" />
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Have any account?{" "}
        <Link href="/auth/login" className="text-white hover:underline">
          Sign In Here
        </Link>
      </p>
    </div>
  );
}
