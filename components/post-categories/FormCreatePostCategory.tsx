// components/CreateCategorizePostForm.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, ImagePlus, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { OverlayLoadingModal } from '../generals/OverlayLoadingModal';
import { fetchListPostCategories, createPostCategory } from '@/lib/postService';
import { PostCategory } from '@/types/post-types';
import { uploadImageToCloud } from '@/lib/cloudService';

type Props = {
  redirectTo?: string;
};

export default function FormCreatePostCategorize({ redirectTo }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [visibilityMode, setVisibilityMode] = useState<'full_public' | 'partial_public' | 'private'>('full_public');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    fetchListPostCategories(token).then(setCategories).catch(console.error);
  }, []);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleImageChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files?.[0] || null);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Need login First');
    if (!name.trim()) return alert('Add Categorize Name First');
    if (!templateId) return alert('Select Type Categorize First');

    try {
      setLoading(true);
      let image_url: string | undefined;
      if (imageFile) {
        image_url = await uploadImageToCloud(imageFile); // Asumsi uploadImageToCloud mengembalikan URL
      }

      await createPostCategory(
        name,
        description,
        templateId,
        token,
        image_url,
        visibilityMode,
      );

      alert('Categorize Successfully Created!');
      router.push(redirectTo || '/profile/me');
    } catch (err: any) {
      alert(err.message || 'Failed to create new Categorize, Please try again later!');
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
        className="bg-white dark:bg-black min-h-screen shadow-md p-4 flex flex-col gap-5"
      >

        {/* Tipe Kategori */}
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Type Categorize</label>
          <select
            value={templateId ?? ''}
            onChange={(e) => setTemplateId(Number(e.target.value) || null)}
            className="w-full p-2 border rounded-md bg-white dark:bg-black dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Type Categorize</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100 dark:bg-black/50 mb-4">
            <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Image Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="mb-4 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md h-32 cursor-pointer hover:border-blue-400"
        >
          <label className="flex flex-col cursor-pointer items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-full h-full">
            <ImagePlus size={20} />
            <span>Click or Drag Picture here</span>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} hidden />
          </label>
        </div>

        {/* Nama Kategori */}
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Name Categorize</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Categorize Name, Example (Create a new model AI Face Recognition with YOLOv8)"
            className="w-full p-3 rounded-md border dark:border-gray-600 dark:bg-black/50 dark:text-white"
          />
        </div>

        {/* Deskripsi Kategori */}
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Purpose Categorize</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Describe your description Categorize"
            className="w-full p-3 rounded-md border dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Visibility */}
        <div className="mb-3">
          <label className="block mb-1 text-sm font-medium">Visibility</label>
          <select
            value={visibilityMode}
            onChange={(e) => setVisibilityMode(e.target.value as any)}
            className="w-full p-2 border rounded-md bg-white dark:bg-black dark:border-gray-600 dark:text-white"
          >
            <option value="full_public">All Public</option>
            <option value="partial_public">Partial Public</option>
            <option value="private">All Private</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            Create Categorize
          </button>
        </div>
      </form>
    </>
  );
}