'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Post, fetchPostById } from '@/lib/postService';
import PostCard from '@/components/PostCard';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPostById(token, id as string);
        setPost(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!post) return <p className="text-center text-gray-500 mt-10">Post not found</p>;

  return (
    <div className="max-w-2xl mx-auto px-4">
      <PostCard post={post} />
    </div>
  );
}
