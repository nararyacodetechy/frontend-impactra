// lib/profileService.ts
import { Profile } from '@/types/profile-types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchPublicProfile(username: string): Promise<Profile> {
  const res = await fetch(`${API_BASE_URL}/profile/public/${username}`);
  if (!res.ok) throw new Error('Gagal ambil profil publik');
  const result = await res.json();
  return result.data;
}

export async function fetchPrivateProfile(): Promise<Profile> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User belum login');
  const res = await fetch(`${API_BASE_URL}/profile/private/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal ambil profil pribadi');
  }
  const result = await res.json();
  return result.data; // Asumsi data mengembalikan { id, username, full_name, email, avatar_url, bio, role, post_categories, posts }
}

export async function updatePrivateProfile(data: Partial<Profile>): Promise<Profile> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User belum login');
  const res = await fetch(`${API_BASE_URL}/profile/private/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Gagal update profil');
  }
  const result = await res.json();
  return result.data;
}