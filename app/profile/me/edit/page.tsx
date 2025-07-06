'use client';

import { useEffect, useState } from 'react';
import { fetchPrivateProfile, updatePrivateProfile, Profile } from '@/lib/profileService';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
  });

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPrivateProfile();
        setProfile(data);
        setForm({
          full_name: data.full_name || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
        });
      } catch (err: any) {
        setError(err.message || 'Gagal memuat data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const updated = await updatePrivateProfile(form);
      setSuccess('Profil berhasil diperbarui!');
      // Optionally navigate to profile page
      router.push('/profile/me');
    } catch (err: any) {
      setError(err.message || 'Gagal memperbarui profil');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>User not found.</p>;

  return (
    <form className="space-y-4 max-w-xl mx-auto mt-10" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Edit Profil</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label className="block mb-1">Full Name</label>
        <input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Avatar URL</label>
        <input
          name="avatar_url"
          value={form.avatar_url}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan Perubahan
      </button>
    </form>
  );
}
