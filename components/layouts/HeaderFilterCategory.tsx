'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const categories = [
  'Semua',
  'Lingkungan',
  'Edukasi',
  'Teknologi',
  'Kesehatan',
  'Sosial',
  'Budaya',
  'Olahraga',
  'Seni',
  'Keamanan',
];

export default function HeaderFilterCategory() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 150;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="z-10 text-black dark:text-white bg-white dark:bg-black shadow-md px-2 lg:px-2 py-2">
      <div className="flex items-center gap-2 overflow-hidden">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="p-1 rounded-full bg-gray-400 dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-800 shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Category Buttons Scroll Area */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="whitespace-nowrap px-4 py-1 rounded-sm text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="p-1 rounded-full bg-gray-400 dark:bg-gray-900 hover:bg-gray-500 dark:hover:bg-gray-800 shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
