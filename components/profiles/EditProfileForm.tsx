// components/profile/EditProfileForm.tsx
import { useState } from 'react';
import { Profile } from '@/types/profile-types';
import { updatePrivateProfile } from '@/lib/profileService';
import { uploadImageToCloud } from '@/lib/cloudService';
import AvatarUploader from './AvatarUploader';
import { useRouter } from 'next/navigation';

export default function EditProfileForm({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({
    full_name: profile.full_name || '',
    bio: profile.bio || '',
    avatar_url: profile.avatar_url || '',
  });
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (file: File) => {
    try {
      setLoadingOverlay(true);
      const url = await uploadImageToCloud(file);
      setForm((prev) => ({ ...prev, avatar_url: url }));
    } catch {
      alert('Failed to upload image, try again');
    } finally {
      setLoadingOverlay(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoadingOverlay(true);
      await updatePrivateProfile(form);
      router.push('/profile/me');
    } catch {
      alert('Failed to Update Profile');
    } finally {
      setLoadingOverlay(false);
    }
  };

  return (
    <form className="space-y-4 p-4 bg-white dark:bg-black min-h-screen" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Profile Picture</label>
        <AvatarUploader avatarUrl={form.avatar_url} onImageUpload={handleImageUpload} />
      </div>

      <div>
        <label className="block mb-1">Full Name</label>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded border-gray-300 dark:border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}
