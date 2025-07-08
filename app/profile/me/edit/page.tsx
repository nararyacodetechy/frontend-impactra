'use client';

import { useEffect, useState } from 'react';
import { fetchPrivateProfile, updatePrivateProfile, Profile } from '@/lib/profileService';
import { OverlayLoadingModal } from '@/components/OverlayLoadingModal';
import { useRouter } from 'next/navigation';
import { uploadImageToCloud } from '@/lib/cloudService';

export default function EditProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true); 
  const [loadingOverlay, setLoadingOverlay] = useState(false); 
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
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoadingOverlay(true);
      const imageUrl = await uploadImageToCloud(file);
      setForm((prev) => ({ ...prev, avatar_url: imageUrl }));
    } catch {
      alert('Gagal upload gambar');
    } finally {
      setLoadingOverlay(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    try {
      setLoadingOverlay(true);
      const imageUrl = await uploadImageToCloud(file);
      setForm((prev) => ({ ...prev, avatar_url: imageUrl }));
    } catch {
      alert('Gagal upload gambar');
    } finally {
      setLoadingOverlay(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingOverlay(true);
    try {
      await updatePrivateProfile(form);
      router.push('/profile/me');
    } catch {
      alert('Gagal memperbarui profil');
    } finally {
      setLoadingOverlay(false);
    }
  };

  return (
    <>
      <OverlayLoadingModal show={loading || loadingOverlay} />

      {!loading && profile && (
        <form className="space-y-4 p-4 bg-white dark:bg-gray-900 min-h-screen" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold">Edit Profil</h1>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Foto Profil</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-between gap-4"
            >
              {form.avatar_url ? (
                <img
                  src={form.avatar_url}
                  alt="Avatar"
                  className="w-24 h-24 object-cover rounded-full border shadow-sm"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 border">
                  No Image
                </div>
              )}

              <p className="text-sm text-gray-500 dark:text-gray-300">
                Seret dan lepas gambar ke sini atau pilih dari perangkat
              </p>

              <label className="absolute top-2 right-2 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded shadow-sm transition">
                Pilih dari Perangkat
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1">Nama Lengkap</label>
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
            Simpan Perubahan
          </button>
        </form>
      )}
    </>
  );
}
