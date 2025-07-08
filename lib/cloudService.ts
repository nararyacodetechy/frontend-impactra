import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function uploadImageToCloud(file: File): Promise<string> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User belum login');

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(`${API_BASE_URL}/cloud/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.url;
}
