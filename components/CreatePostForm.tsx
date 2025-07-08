'use client';

import { useState, useRef } from 'react';
import { createPost } from '@/lib/postService';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { Loader2, ImagePlus, Trash2 } from 'lucide-react';
import { OverlayLoadingModal } from './OverlayLoadingModal';

type Props = {
  redirectTo?: string;
};

export default function CreatePostForm({ redirectTo }: Props) {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = useUser();

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };  

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleImageChange(file);
  };  

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageChange(file);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
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
        formData.append('upload_preset', 'impactra_preset');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        image_url = data.secure_url;
      }

      await createPost(content, image_url, token);

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
    <>
      <OverlayLoadingModal show={loading} />

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 min-h-screen shadow-md p-4 border border-gray-200 dark:border-gray-700"
      >
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

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="mb-4 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md h-32 cursor-pointer hover:border-blue-400"
        >
          <label
            className="flex flex-col items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-full h-full"
            htmlFor="imageUpload"
          >
            <ImagePlus size={20} />
            <span>Klik atau Tarik gambar kesini</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileInputChange}
              id="imageUpload"
              hidden
            />
          </label>
        </div>

        <div className="mb-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Bagikan sesuatu yang berarti..."
            className="w-full resize-none p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            Bagikan
          </button>
        </div>
      </form>
    </>
  );
}
