'use client';

import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import {
  Heart,
  Coins,
  ImageOff,
  Share2,
  Bookmark,
} from 'lucide-react';
import { Post } from '@/types/post-types';

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSupport = () => {
    setLiked(!liked);
    // TODO: tambahkan fungsi support ke backend
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 overflow-hidden shadow bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
          {!imgError && post.author?.avatar_url ? (
            <img
              src={post.author.avatar_url}
              alt={post.author.username}
              onError={() => setImgError(true)}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-white bg-gray-500">
              {post.author?.username?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">{post.author.full_name}</p>
          <p className="text-sm text-gray-500">{post.author.username} · {formatDistanceToNow(new Date(post.created_at))} ago</p>
        </div>
      </div>

      {/* Image */}
      {post.image_url && !imgError ? (
        <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-800">
          <Image
            src={post.image_url}
            alt="Post"
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="w-full h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500">
          <ImageOff className="w-10 h-10 mb-2" />
          <p className="text-sm">Image not available</p>
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-4">
        <p className="text-gray-800 dark:text-gray-100 text-base whitespace-pre-line">{post.content}</p>

        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            <span>{post.supports.length} Dukungan</span>
          </div>

          <div className="flex gap-4">
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
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Komentar</h3>
          {post.comments.length === 0 ? (
            <p className="text-gray-500 text-sm">Belum ada komentar.</p>
          ) : (
            post.comments.map((comment, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">💬 {comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
