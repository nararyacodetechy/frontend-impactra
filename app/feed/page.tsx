'use client';

import PostCard from "@/components/PostCard";
import { dummyPosts } from "@/lib/dummyPosts";

export default function FeedPage() {
  return (
    <>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md px-4 lg:px-8 py-6">
        <div className="max-w-2xl mx-auto">
          
        </div>
      </div>

      {/* Main Content with padding top */}
      <div className="flex justify-center pt-12">
        <div className="w-full">
          {dummyPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
