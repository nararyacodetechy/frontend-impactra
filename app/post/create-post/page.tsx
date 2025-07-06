'use client';

import CreatePostForm from '@/components/CreatePostForm';

export default function CreatePostPage() {
  return (
    <div className="">
      <CreatePostForm redirectTo="/feed" />
    </div>
  );
}
