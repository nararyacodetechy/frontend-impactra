'use client';

import FormCreatePostCategory from '@/components/post-categories/FormCreatePostCategory';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen">
      <FormCreatePostCategory redirectTo="/feed" />
    </div>
  );
}
