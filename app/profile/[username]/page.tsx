'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProfileByUsername, Profile } from '@/lib/profileService';

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileByUsername(username as string);
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) loadProfile();
  }, [username]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="w-full p-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Header Background */}
      <div className="h-54 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl relative shadow-lg" />

      {/* Avatar & Info */}
      <div className="relative -top-16 flex items-start gap-6 px-4">
        <img
          src={profile?.avatar_url || '/default-avatar.png'}
          alt={profile?.username}
          className="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
          <p className="text-gray-500 text-sm">{profile?.username}</p>
          <p className="text-sm text-blue-600 font-medium capitalize">{profile?.role}</p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Bio pengguna dapat ditambahkan di sini. Tampilkan informasi singkat tentang pengguna seperti minat, pekerjaan, atau apapun.
          </p>

          <div className="flex gap-6 mt-4 text-sm text-gray-600 dark:text-gray-300">
            <span><strong>123</strong> Posts</span>
            <span><strong>456</strong> Followers</span>
            <span><strong>789</strong> Following</span>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-12 border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Postingan</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Ini bisa diganti dengan map post-user di masa depan */}
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
