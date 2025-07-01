'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/feed");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Selamat datang di Impactra</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl">
        Platform sosial untuk individu & komunitas yang ingin berdampak. 🌍
        Bagikan aksi, inspirasi, dan kontribusi positifmu!
      </p>
      <div className="space-x-4">
        <a
          href="/auth/login"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Masuk
        </a>
        <a
          href="/auth/register"
          className="px-4 py-2 border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Daftar
        </a>
      </div>
    </div>
  );
}
