'use client';

import { useEffect, useState } from 'react';
import { fetchPrivateProfile, Profile } from '@/lib/profileService';
import Link from 'next/link';
import Image from 'next/image';
import { OverlayLoadingModal } from '@/components/OverlayLoadingModal';
import HeaderSidebarContent from '@/components/HeaderSidebarContent';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import RightSidebar from '@/components/RIghtSidebar';

export default function MyProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState<'Stats' | 'Impact' | 'Growth' | 'Collaboration' | 'Support' | 'Recognition'>('Impact');

  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User belum login');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPrivateProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil profil pribadi');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const tabs = {
    Stats: [
      { label: "Posts", value: profile?.posts?.length || 0 },
      { label: "Assisted", value: 5775 },
      { label: "Integrity", value: 4853 },
    ],
    Support: [
      { label: "Investment", value: "Rp. 21.482.900,00" },
    ],
    Impact: [
      { label: "Contributions", value: 4565 },
      { label: "Problems Solved", value: 49 },
      { label: "Ideas Created", value: 14 },
      { label: "Projects", value: 8 },
      { label: "Skills Shared", value: 26 },
      { label: "Events Participated", value: 245 },
    ],
    Growth: [
      { label: "Failures Shared", value: 154 },
      { label: "Challenges Overcome", value: 2 },
      { label: "Lessons Documented", value: 53 },
      { label: "Feedbacks Given", value: 542 },
    ],
    Collaboration: [
      { label: "Collaborate", value: 155 },
      { label: "Relations", value: "10.420" },
      { label: "Co-creations", value: 0 },
      { label: "Advices", value: 132 },
    ],
    Recognition: [
      { label: "Positive Reviews", value: 424 },
    ],
  };

  return (
    <>
      <OverlayLoadingModal show={loading || loadingOverlay} />

      {!loading && profile && (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 relative">
          {/* Header + Menu */}
          <div className="flex items-center justify-between px-4 py-4">
            <HeaderSidebarContent username={profile.username} token={token} currentEmail={profile.email} />

            <button
              onClick={() => setShowSidebar(true)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Header Background */}
          <div className="h-54 bg-gradient-to-r from-indigo-500 to-purple-600 relative shadow-lg" />

          {/* Avatar & Info */}
          <div className="relative flex items-start gap-6 px-4 p-4">
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
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                  <p className="text-gray-500 text-sm">{profile.username}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setLoadingOverlay(true);
                      router.push('/profile/me/edit');
                    }}
                    className="inline-block cursor-pointer px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
                  >
                    Edit Profil
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {profile.bio || 'Bio belum ditambahkan.'}
              </p>
            </div>
          </div>

          <div className="w-full">
            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-start gap-2 border-b pt-4 border-gray-300 dark:border-gray-700 px-4">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-5 border-b border-gray-300 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-300">
              {tabs[activeTab]?.map((item, index, array) => (
                <div
                  key={item.label}
                  className={`py-4 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-700 ${
                    array.length === 1 ? 'col-span-4' : ''
                  }`}
                >
                  <div className="font-bold text-lg">{item.value}</div>
                  <div className="text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Posts Section */}
          <div className="p-4 relative">
            <h3 className="font-semibold text-lg mb-4">Postingan Saya</h3>

            {profile.posts.length === 0 ? (
              <p className="text-center text-gray-500">Kamu belum membuat postingan.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {profile.posts.map((post) => (
                  <div key={post.id} className="relative aspect-square overflow-hidden rounded-lg">
                    {post.image_url ? (
                      <Link href={`/post/${post.uuid}`} className="relative block w-full h-80 bg-gray-200 dark:bg-gray-800">
                        <Image
                          src={post.image_url}
                          alt="Post"
                          className="object-cover"
                          fill
                          onError={() => setImgError(true)}
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-500 text-sm">
                        Tanpa Gambar
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Slide Sidebar (inside main) */}
          <div className="absolute inset-0 pointer-events-none">
            <RightSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
          </div>
        </div>
      )}
    </>
  );
}
