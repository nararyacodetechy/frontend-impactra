'use client';

import { useEffect, useState } from 'react';
import { fetchPrivateProfile } from '@/lib/profileService';
import { OverlayLoadingModal } from '@/components/generals/OverlayLoadingModal';
import EditProfileForm from '@/components/profiles/EditProfileForm';
import { Profile } from '@/types/profile-types';

export default function EditProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPrivateProfile();
        setProfile(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <OverlayLoadingModal show={loading} />
      {!loading && profile && <EditProfileForm profile={profile} />}
    </>
  );
}
