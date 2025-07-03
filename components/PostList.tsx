'use client';

import { useEffect, useState } from 'react';
import { Post, fetchAllPosts } from '@/lib/postService';
import PostCard from './PostCard';

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const data = await fetchAllPosts(token);
      console.log("data post list:", data)
      setPosts(data);
    };

    loadPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
