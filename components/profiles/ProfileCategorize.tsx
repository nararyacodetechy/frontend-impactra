// components/profile/ProfileCategories.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Profile } from '@/types/profile-types';

export default function ProfileCategorize({ profile }: { profile: Profile }) {
  return (
    <div className="p-4">
      {profile.post_categories && profile.post_categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.post_categories.map((category) => {
            const firstImage = category.category.image_url || category.category.posts?.[0]?.image_url;
            return (
              <Link
                href={`/profile/me/post-category/${category.category.uuid}`}
                key={category.category.uuid}
                className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-800"
              >
                <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
                  {firstImage ? (
                    <Image
                      src={firstImage}
                      alt={category.category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                      No Picture
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h2 className="font-semibold text-lg">{category.category.name}</h2>
                  <p className="text-sm text-gray-500">
                    Tipe: {category.name} ({category.description || 'No name category'})
                  </p>
                  <p className="text-sm text-gray-500">
                    {category.category.description || 'No description category'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Dibuat: {new Date(category.category.created_at).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No category. Create one to be part of society</p>
      )}
    </div>
  );
}
