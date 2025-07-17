'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Trash2, ImagePlus, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { OverlayLoadingModal } from '../generals/OverlayLoadingModal';
import { fetchMyPostCategories, createPost } from '@/lib/postService';
import { PostCategory } from '@/types/post-types';
import { uploadImageToCloud } from '@/lib/cloudService';

type Props = {
  redirectTo?: string;
  preselectedCategoryUuid?: string;
};

export default function FormCreatePost({ redirectTo, preselectedCategoryUuid }: Props) {
  const { user } = useUser();
  const router = useRouter();
  const { uuid } = useParams();
  
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      setError('You have to login first');
      setCategoriesLoading(false);
      return;
    }

    const loadCategories = async () => {
      try {
        const userCategories = await fetchMyPostCategories(token);
        console.log('Categories:', JSON.stringify(userCategories, null, 2));
        // Filter valid categories and remove duplicates
        const validCategories = Array.from(
          new Map(userCategories.map((cat) => [cat.category.uuid, cat])).values()
        ).filter((cat) => cat.category.id && cat.category.uuid);
        setCategories(validCategories);

        // Set pre-selected category
        const effectiveUuid = preselectedCategoryUuid || (uuid as string);
        if (effectiveUuid) {
          const selectedCategory = validCategories.find(
            (cat) => cat.category.uuid === effectiveUuid
          );
          if (selectedCategory && selectedCategory.category.id) {
            console.log('Selected Category ID:', selectedCategory.category.id);
            setCategoryId(selectedCategory.category.id);
          } else {
            setError('Categorize not found or id is invalid');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to show Categorize');
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, [preselectedCategoryUuid, uuid]);

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
  
    const newFiles = Array.from(files).slice(0, 8 - imageFiles.length); // Maks 8 total
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
  
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e.target.files);
    e.target.value = ''; // important!
  };
  
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleImageChange(e.dataTransfer.files);
  };  

  const removeImage = (indexToRemove: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Need Login First');
    if (!content.trim()) return alert('Content still empty');
    if (!categoryId) return alert('Select type category first');

    try {
      setLoading(true);
      let images: { url: string }[] = [];

      if (imageFiles.length > 0) {
        const image_urls = await Promise.all(imageFiles.map((file) => uploadImageToCloud(file)));
        images = image_urls.map((url) => ({ url }));
      }

      console.log('Image URLs:', images);
      await createPost(content, token, images, isPublic, categoryId);

      alert('Post berhasil dibuat!');
      router.push(redirectTo || `/profile/me/post-category/${preselectedCategoryUuid || uuid || ''}`);
    } catch (err: any) {
      alert(err.message || 'Failed to create new post, please try again!');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
      <OverlayLoadingModal show={loading} />

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white dark:bg-black min-h-screen shadow-md flex flex-col gap-5"
      >
        {/* Category */}
        <div className="mb-3">
          {/* <label className="block mb-1 text-sm font-medium">Select Your Categorize</label> */}
          {categoriesLoading ? (
            <p className="text-gray-500">Loading categories...</p>
          ) : categories.length === 0 ? (
            <p className="text-red-500">No categorize available, please create categorize first!</p>
          ) : (
            <select
              value={categoryId ?? ''}
              onChange={(e) => setCategoryId(Number(e.target.value) || null)}
              disabled={!!preselectedCategoryUuid || !!uuid}
              className="w-full p-2 border rounded-md bg-white dark:bg-black dark:border-gray-600 text-black dark:text-white"
            >
              <option value="">Select Categorize</option>
              {categories.map((cat) => (
                <option
                  key={cat.category.uuid}
                  value={cat.category.id}
                >
                  {cat.category.name} (Tipe: {cat.name})
                </option>
              ))}
            </select>
          )}
        </div>
        
        {/* Image Preview Scrollable */}
        {imagePreviews.length > 0 && (
          <div className="flex overflow-x-auto gap-3 mb-4">
            {imagePreviews.map((src, idx) => (
              <div key={idx} className="relative flex-shrink-0 w-64 h-40 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Image Upload */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="mb-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md h-32 cursor-pointer hover:border-blue-400"
        >
          <label className="flex flex-col items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-full h-full">
            <ImagePlus size={20} />
            <span>Click or Drag picture here</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
              hidden
            />
          </label>
        </div>

        {/* Content */}
        <div className="mb-3">
          {/* <label className="block mb-1 text-sm font-medium">Content Description</label> */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="Describe your content"
            className="w-full p-3 rounded-md border dark:border-gray-600 bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        {/* Visibility */}
        <div className="mb-3">
          {/* <label className="block mb-1 text-sm font-medium">Visibility</label> */}
          <select
            value={isPublic ? 'true' : 'false'}
            onChange={(e) => setIsPublic(e.target.value === 'true')}
            className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-black text-black dark:text-white"
          >
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || categoriesLoading || !categoryId}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            Create Post
          </button>
        </div>
      </form>
    </>
  );
}