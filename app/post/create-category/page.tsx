'use client';

import CreatePostForm from '@/components/CreateCategoryPostForm';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen">
      <CreatePostForm redirectTo="/feed" />
    </div>
  );
}
