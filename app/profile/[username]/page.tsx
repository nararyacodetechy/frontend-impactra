'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPublicProfile, Profile } from '@/lib/profileService';
import Link from 'next/link';
import { OverlayLoadingModal } from '@/components/OverlayLoadingModal';

export default function PublicProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchPublicProfile(username as string);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil profil publik');
      } finally {
        setLoading(false);
      }
    };

    if (username) loadProfile();
  }, [username]);

  return (
    <>
      <OverlayLoadingModal show={loading} />

      {error && !loading && (
        <p className="text-red-500 text-center mt-10">{error}</p>
      )}

      {!loading && !profile && (
        <p className="text-center mt-10">Profil tidak ditemukan.</p>
      )}

      {!loading && profile && (
        <div className="w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          {/* Header Background */}
          <div className="h-54 bg-gradient-to-r from-indigo-500 to-purple-600 relative shadow-lg" />

          {/* Avatar & Info */}
          <div className="relative flex items-start gap-6 px-4 p-4 border-b border-gray-300 dark:border-gray-700">
            <img
              src={
                !imgError && profile.avatar_url
                  ? profile.avatar_url
                  : '/icons/default-profile.png'
              }
              onError={() => setImgError(true)}
              alt={profile.username}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />

            <div className="w-full">
              <h2 className="text-2xl font-bold">{profile.full_name}</h2>
              <p className="text-gray-500 text-sm">@{profile.username}</p>
              <p className="text-sm text-blue-600 font-medium capitalize">{profile.role}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {profile.bio || 'Pengguna ini belum menambahkan bio.'}
              </p>

              <div className="flex gap-6 mt-4 text-sm text-gray-600 dark:text-gray-300">
                <span><strong>{profile.posts?.length || 0}</strong> Postingan</span>
                <span><strong>456</strong> Followers</span>
                <span><strong>789</strong> Following</span>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-4">Postingan</h3>

            {profile.posts.length === 0 ? (
              <p className="text-center text-gray-500">Pengguna ini belum membuat postingan.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {profile.posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.uuid}`}
                    className="relative aspect-square overflow-hidden rounded-lg group"
                  >
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt="Post"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm">
                        Tanpa Gambar
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
