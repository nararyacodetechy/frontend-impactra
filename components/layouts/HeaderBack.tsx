'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function HeaderBack() {
  const router = useRouter();

  return (
    <div className="z-10 bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700 px-4 py-3 flex items-center gap-2">
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
    </div>
  );
}
