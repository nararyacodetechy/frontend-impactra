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
} from 'lucide-react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/lib/postService';

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  console.log({post})

  const supportCount = post.supports.length;
  const commentCount = post.comments.length;

  const handleSupport = () => {
    setLiked(!liked);
    // TODO: panggil supportPost / unsupportPost di sini
  };

  return (
    <div className="border w-full border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
            {post.author?.avatar_url ? (
              <Image
                src={post.author.avatar_url}
                alt={post.author.username}
                width={36}
                height={36}
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
        </div>
      </div>

      {/* Image */}
      {post.image_url && !imgError ? (
        <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-800">
          <Image
            src={post.image_url}
            alt="Post"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
        </div>
      ) : post.image_url && imgError ? (
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
            <span>{supportCount} dukungan</span>
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
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
