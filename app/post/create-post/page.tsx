'use client';

import CreatePostForm from '@/components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
      <CreatePostForm redirectTo="/feed" />
    </div>
  );
}
