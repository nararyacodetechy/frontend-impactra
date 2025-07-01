'use client';

import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  ThumbsUp,
  Coins,
  ImageOff,
  Share2,
  Bookmark,
} from "lucide-react";

type Post = {
  id: string;
  author: string;
  caption: string;
  image: string;
  avatar_url: string;
  category: string;
  createdAt: string;
};

function formatDate(dateString: string) {
  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(new Date(dateString));
}

export default function PostCard({ post }: { post: Post }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      
      {/* Header: Author & Date */}
      <div className="px-4 py-2 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
            {post.avatar_url ? (
              <Image
                src={post.avatar_url}
                alt={post.author}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-white bg-gray-500">
                {post.author.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="font-medium text-gray-800 dark:text-gray-200">{post.author}</span>
        </div>
        <span className="text-xs">{formatDate(post.createdAt)}</span>
      </div>


      {/* Image */}
      <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        {!imgError ? (
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <ImageOff className="w-10 h-10 mb-2" />
            <p className="text-sm">Gambar tidak tersedia</p>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="p-4 space-y-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          #{post.category}
        </div>
        <p className="text-gray-700 dark:text-gray-100 text-sm">{post.caption}</p>
      </div>

      {/* Interactions */}
      <div className="px-4 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
        {/* Stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            <span>120 kontribusi</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400">
              <Heart className="w-4 h-4" />
              Dukung
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400">
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400">
              <Bookmark className="w-4 h-4" />
              Simpan
            </button>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>Respect</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>12</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
