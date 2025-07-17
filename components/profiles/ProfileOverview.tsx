// components/profile/ProfileHeader.tsx
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Profile } from '@/types/profile-types';
import { Pencil } from 'lucide-react';

export default function ProfileOverview({ profile, token }: { profile: Profile; token: string }) {
  const [imgError, setImgError] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const router = useRouter();

  return (
    <div className="relative flex items-start gap-6 px-4 p-4">
      <img
        src={imgError || !profile.avatar_url ? '/icons/default-profile.png' : profile.avatar_url}
        onError={() => setImgError(true)}
        alt={profile.username}
        className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
      />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{profile.full_name}</h2>
            <p className="text-gray-500 text-sm">{profile.username}</p>
          </div>
          <button
            onClick={() => {
              setLoadingOverlay(true);
              router.push('/profile/me/edit-profile');
            }}
            className="inline-flex items-center justify-center cursor-pointer p-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
            title="Edit Profil"
          >
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {profile.bio || 'Bio not added yet.'}
        </p>
      </div>
    </div>
  );
}
