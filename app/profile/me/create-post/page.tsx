'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FormCreatePost from '@/components/posts/FormCreatePost';
import { fetchMyPostCategories } from '@/lib/postService';
import { PostCategory } from '@/types/post-types';
import { OverlayLoadingModal } from '@/components/generals/OverlayLoadingModal';

export default function CreateGeneralPostPage() {
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const token = localStorage.getItem('token') || '';
        if (!token) throw new Error('Anda belum login');
        const userCategories = await fetchMyPostCategories(token);
        setCategories(userCategories);
      } catch (err: any) {
        setError(err.message || 'Gagal memuat kategori');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <OverlayLoadingModal show={loading} />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen flex flex-col items-center justify-center">
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center gap-5">
            <h1 className="text-2xl font-bold">Create Categorize</h1>
            <div className="flex flex-col">
                <p>Create one before you start creating your posts.</p>
                <p>The easier for categorize your posts and help someone find your contributions.</p>
            </div>
            <Link
                href="/profile/me/post-category/create-category"
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-sm transition-colors"
            >
                Create Categorize
            </Link>
        </div>
      ) : (
        <FormCreatePost redirectTo="/profile/me" />
      )}
    </div>
  );
}