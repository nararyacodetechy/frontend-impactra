'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostByUUID, Post } from '@/lib/postService';
import PostDetailCard from '@/components/PostDetailCard';

export default function PostDetailPage() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostByUUID(uuid);
        setPost(data);
      } catch (err) {
        setError('Gagal mengambil detail postingan');
      } finally {
        setLoading(false);
      }
    };
    if (uuid) loadPost();
  }, [uuid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="">
      <PostDetailCard post={post} />
    </div>
  );
}
