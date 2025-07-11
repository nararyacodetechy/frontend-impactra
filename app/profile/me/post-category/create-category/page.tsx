'use client';

import CreatePostForm from '@/components/post-categories/CreateCategoryPostForm';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen">
      <CreatePostForm redirectTo="/feed" />
    </div>
  );
}
