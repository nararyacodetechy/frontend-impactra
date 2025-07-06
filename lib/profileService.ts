import { Post } from "./postService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type Profile = {
  id: number;
  uuid: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  role: 'user' | 'komunitas' | 'admin';
  posts: Post[];
};

export async function fetchPublicProfile(username: string) {
    const res = await fetch(`${API_BASE_URL}/profile/public/${username}`)

    if (!res.ok) throw new Error('Gagal ambil profil publik')
    
        const result = await res.json()
    return result.data
}

export async function fetchPrivateProfile() {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_BASE_URL}/profile/private/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Gagal ambil profil pribadi')
    const result = await res.json()
    return result.data
}

// lib/profileService.ts

export async function updatePrivateProfile(data: Partial<Profile>) {
  const token = localStorage.getItem('token');

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


  