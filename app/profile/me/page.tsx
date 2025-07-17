'use client';

import { useEffect, useState } from 'react';
import { fetchPrivateProfile } from '@/lib/profileService';
import { useRouter } from 'next/navigation';
import { OverlayLoadingModal } from '@/components/generals/OverlayLoadingModal';
import HeaderSwitchAccount from '@/components/layouts/HeaderSwitchAccount';
import MenuSidebarRight from '@/components/layouts/MenuSidebarRight';
import { Profile } from '@/types/profile-types';
import { Menu } from 'lucide-react';
import ProfileOverview from '@/components/profiles/ProfileOverview';
import ProfileTabs from '@/components/profiles/ProfileTabs';
import ProfileCategorize from '@/components/profiles/ProfileCategorize';

export default function MyProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setError('User not login');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPrivateProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [token]);

  const tabs = {
    Stats: [{ label: 'Posts', value: profile?.posts?.length || 0 }, { label: 'Assisted', value: 5775 }, { label: 'Integrity', value: 4853 }],
    Support: [{ label: 'Investment', value: 'Rp. 21.482.900,00' }],
    Impact: [{ label: 'Contributions', value: 4565 }, { label: 'Problems Solved', value: 49 }, { label: 'Ideas Created', value: 14 }, { label: 'Projects', value: 8 }, { label: 'Skills Shared', value: 26 }, { label: 'Events Participated', value: 245 }],
    Growth: [{ label: 'Failures Shared', value: 154 }, { label: 'Challenges Overcome', value: 2 }, { label: 'Lessons Documented', value: 53 }, { label: 'Feedbacks Given', value: 542 }],
    Collaboration: [{ label: 'Collaborate', value: 155 }, { label: 'Relations', value: '10.420' }, { label: 'Co-creations', value: 0 }, { label: 'Advices', value: 132 }],
    Recognition: [{ label: 'Positive Reviews', value: 424 }, { label: 'Customer Reviews', value: 4359 }],
  };

  return (
    <>
      <OverlayLoadingModal show={loading || loadingOverlay} />
      {!loading && profile && (
        <div className="w-full min-h-screen bg-white dark:bg-black border-gray-300 dark:border-gray-700 relative">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <HeaderSwitchAccount username={profile.username} token={token} currentEmail={profile.email} />
            <button onClick={() => setShowSidebar(true)} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer">
              <Menu size={24} />
            </button>
          </div>

          {/* Banner */}
          <div className="h-54 bg-gradient-to-r from-indigo-500 to-purple-600 relative shadow-lg" />

          {/* Avatar + Info */}
          <ProfileOverview profile={profile} token={token} />

          {/* Tabs */}
          <ProfileTabs tabs={tabs} />

          {/* Categories */}
          <ProfileCategorize profile={profile} />

          {/* Sidebar */}
          <div className="absolute inset-0 pointer-events-none">
            <MenuSidebarRight isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
          </div>
        </div>
      )}
    </>
  );
}
