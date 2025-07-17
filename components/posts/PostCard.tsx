'use client';

import Image from 'next/image';
import {
  Heart,
  MessageCircle,
  ThumbsUp,
  Coins,
  ImageOff,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Post } from '@/types/post-types';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSupport = () => {
    setLiked(!liked);
    // TODO: panggil supportPost / unsupportPost di sini
  };

  const goToPrev = () => {
    if (!post.image_urls || post.image_urls.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? post.image_urls!.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    if (!post.image_urls || post.image_urls.length === 0) return;
    setCurrentIndex((prev) => (prev === post.image_urls!.length - 1 ? 0 : prev + 1));
  };  

  return (
    <div className="border w-full border-gray-300 dark:border-gray-900 shadow-sm overflow-hidden text-black dark:text-white">
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <Link href={`/profile/${post.author.username}`} className="flex items-center gap-3 hover:underline">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
            {!imgError && post.author?.avatar_url ? (
              <img
                src={post.author.avatar_url}
                onError={() => setImgError(true)}
                alt={post.author?.username}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-white bg-gray-500">
                {post.author?.username.charAt(0).toUpperCase() || '?'}
              </div>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">{post.author.full_name}</p>
            <p className="text-xs text-gray-500">
              {post.author.username} · {formatDistanceToNow(new Date(post.created_at))} ago
            </p>
          </div>
        </Link>
      </div>

      {/* Image Carousel */}
      {post.image_urls && post.image_urls.length > 0 && !imgError ? (
        <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-800">
          <Image
            src={post.image_urls[currentIndex]}
            alt="Post"
            className="object-cover"
            fill
            onError={() => setImgError(true)}
          />
          {post.image_urls.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {post.image_urls.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : post.image_urls && imgError ? (
        <div className="flex flex-col items-center justify-center w-full h-80 bg-gray-100 dark:bg-gray-800 text-gray-500">
          <ImageOff className="w-10 h-10 mb-2" />
          <p className="text-sm">Image not available</p>
        </div>
      ) : null}

      {/* Caption / Content */}
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-100 text-sm">{post.content}</p>
      </div>

      {/* Interactions */}
      <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleSupport}
              className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
