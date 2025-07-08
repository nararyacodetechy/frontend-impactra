'use client';

import CreatePostForm from '@/components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen">
      <CreatePostForm redirectTo="/feed" />
    </div>
  );
}
