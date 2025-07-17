'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchPostCategoryById } from '@/lib/postService';
import type { PostCategory } from '@/types/post-types';
import { OverlayLoadingModal } from '@/components/generals/OverlayLoadingModal';

export default function PostCategoryDetailPage() {
  const { uuid } = useParams();
  const [category, setCategory] = useState<PostCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Anda belum login');
        const data = await fetchPostCategoryById(uuid as string, token);
        console.log('Categorize Detail:', data);
        setCategory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load Categories');
      } finally {
        setLoading(false);
      }
    };

    if (uuid) loadCategory();
  }, [uuid]);

  if (loading) return <OverlayLoadingModal show={loading} />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!category) return <p className="text-gray-500 text-center mt-10">Category not found</p>;

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-2">{category.category.name || 'No Name'}</h1>
      <p className="text-sm text-gray-500 mb-2">
        Tipe: {category.name} ({category.description || 'No Description Category'})
      </p>
      <p className="text-sm text-gray-500 mb-4">
        {category.category.description || 'No description idea'}
      </p>
      {category.category.image_url && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={category.category.image_url}
            alt={category.category.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <p className="text-xs text-gray-400 mb-4">
        Dibuat: {new Date(category.category.created_at).toLocaleDateString('id-ID')}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Total Post: {category.category.total_posts || 0}
      </p>

      {/* Create Post Button */}
      <div className="mb-4">
        <Link
          href={`/profile/me/post-category/${uuid}/create-post`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post for this Category
        </Link>
      </div>

      <h3 className="text-xl font-semibold mb-2">Daftar Post</h3>
      {category.category.posts && category.category.posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {category.category.posts.map((post) => (
            <div key={post.uuid} className="p-4 rounded shadow bg-white dark:bg-gray-800">
              <h2 className="font-semibold">{post.title || 'Tanpa Judul'}</h2>
              <p className="text-sm text-gray-500">
                {post.content ? post.content.slice(0, 50) + '...' : 'Tidak ada konten'}
              </p>
              {post.image_urls && post.image_urls.length > 0 && (
                <div className="relative w-full h-48 mt-2">
                  <Image
                    src={post.image_urls[0]}
                    alt={post.title || 'Gambar post'}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Dibuat: {new Date(post.created_at).toLocaleDateString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Belum ada post di kategori ini.</p>
      )}
    </div>
  );
}