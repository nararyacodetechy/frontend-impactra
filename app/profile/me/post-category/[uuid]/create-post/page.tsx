'use client';

import { useParams } from 'next/navigation';
import FormCreatePost from '@/components/posts/FormCreatePost';

export default function CreatePostPage() {
  const { uuid } = useParams(); // Get category UUID from URL

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <FormCreatePost
        preselectedCategoryUuid={uuid as string}
        redirectTo={`/profile/me/post-category/${uuid}`}
      />
    </div>
  );
}