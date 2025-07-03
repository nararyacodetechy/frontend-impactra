'use client';

import { useState } from 'react';
import { createPost } from '@/lib/postService';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { Loader2, ImagePlus, Trash2 } from 'lucide-react';

type Props = {
    redirectTo?: string;
};
  
export default function CreatePostForm({ redirectTo }: Props) {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return alert('Deskripsi tidak boleh kosong!');
    const token = localStorage.getItem('token');
    if (!token) return alert('Anda belum login!');

    setLoading(true);

    try {
      let image_url = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'impactra_preset'); // ✅ pindahkan ke sini
      
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
      
        const data = await res.json();
        console.log("Cloudinary upload response:", data); // untuk debugging
        console.log("URL yang akan dikirim ke backend:", image_url);
        
        image_url = data.secure_url;
      }      

      await createPost(content, image_url, token);

      // Reset form
      setContent('');
      setImageFile(null);
      setImagePreview(null);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Gagal memposting');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Bagikan sesuatu yang berarti..."
          className="w-full resize-none p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {imagePreview && (
        <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white p-1 rounded-full"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          <ImagePlus size={18} />
          <span>Tambah Gambar</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 className="animate-spin h-4 w-4" />}
          Posting
        </button>
      </div>
    </form>
  );
}
