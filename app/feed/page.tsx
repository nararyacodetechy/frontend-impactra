'use client';

import { useEffect, useRef, useState } from 'react';
import PostCard from '@/components/PostCard';
import { fetchAllPosts, Post } from '@/lib/postService';

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
      {/* Main Content */}
      <div className="flex justify-center">
        <div className="w-full">
          {loading && <p className="text-center">Loading...</p>}
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
