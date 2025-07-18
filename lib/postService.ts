// lib/postService.ts
import { Post, PostCategory } from '@/types/post-types';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPostCategories(): Promise<PostCategory[]> {
  const res = await axios.get(`${API_BASE_URL}/post-categories`);
  if (res.data.status !== 'success') throw new Error('Gagal mengambil data kategori');
  return res.data.data;
}

export async function fetchMyPostCategories(token: string): Promise<PostCategory[]> {
  const res = await axios.get(`${API_BASE_URL}/profile/private/me/post-categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.data.status !== 'success') throw new Error('Gagal mengambil data kategori pengguna');
  return res.data.data;
}

export async function fetchPostCategoryById(uuid: string, token: string): Promise<PostCategory> {
  const res = await axios.get(`${API_BASE_URL}/profile/private/me/post-categories/${uuid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.data.status !== 'success') throw new Error('Gagal mengambil data kategori');
  return res.data.data;
}

export async function fetchListPostCategories(token: string): Promise<PostCategory[]> {
  const res = await axios.get(`${API_BASE_URL}/type-post-categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.data.status !== 'success') throw new Error('Gagal memuat tipe kategori');
  return res.data.data;
}

export async function createPostCategory(
  name: string,
  description: string,
  templateId: number | null,
  token: string,
  image_url?: string,
  visibility_mode?: 'full_public' | 'partial_public' | 'private',
): Promise<PostCategory> {
  const res = await fetch(`${API_BASE_URL}/post-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
      template_id: templateId,
      image_url,
      visibility_mode,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Gagal membuat kategori');
  }

  const data = await res.json();
  return data.data;
}

export async function createPost(
  content: string,
  token: string,
  images: { url: string }[],
  is_public: boolean = true,
  category_id?: number
) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content,
      images, // <--- benar! ini yang dikirim
      is_public,
      category_id,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Gagal membuat post');
  }

  const data = await res.json();
  return data.data;
}


export async function fetchAllPosts(): Promise<Post[]> {
  const res = await axios.get(`${API_BASE_URL}/posts`);
  if (res.data.status !== 'success') throw new Error('Gagal mengambil data post');
  return res.data.data;
}

export async function fetchPostByUUID(uuid: string): Promise<Post> {
  const res = await axios.get(`${API_BASE_URL}/posts/uuid/${uuid}`);
  if (res.data.status !== 'success') throw new Error('Post tidak ditemukan');
  return res.data.data;
}