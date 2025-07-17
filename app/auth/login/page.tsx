'use client';

import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-xl space-y-6">
      <h1 className="text-4xl font-bold text-center">Sign In</h1>
      <AuthForm type="login" />
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        Don't have any account?{" "}
        <Link href="/auth/register" className="hover:underline text-white">
          Sign Up Here
        </Link>
      </p>
    </div>
  );
}
