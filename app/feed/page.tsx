'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/components/posts/PostCard';
import { fetchAllPosts } from '@/lib/postService';
import { Post } from '@/types/post-types';
import { OverlayLoadingModal } from '@/components/generals/OverlayLoadingModal';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setFilteredPosts(data); // default to all
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      {/* Overlay Loading */}
      <OverlayLoadingModal show={loading} />

      {/* Main Content */}
      <div className="flex justify-center">
        <div className="w-full">
          {error && <p className="text-center text-red-500">{error}</p>}

          {filteredPosts.length === 0 && !loading && (
            <p className="text-center text-gray-500">No posts found.</p>
          )}

          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
