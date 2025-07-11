// // components/CreateCategoryPostForm.tsx
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { Trash2, ImagePlus, Loader2 } from 'lucide-react';
// import { useUser } from '@/context/UserContext';
// import { OverlayLoadingModal } from './OverlayLoadingModal';
// import { fetchListPostCategories, createPostCategory } from '@/lib/postService';
// import { PostCategory } from '@/types/post-types';
// import { uploadImageToCloud } from '@/lib/cloudService';

// type Props = {
//   redirectTo?: string;
// };

// export default function CreateCategoryPostForm({ redirectTo }: Props) {
//   const { user } = useUser();
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [categories, setCategories] = useState<PostCategory[]>([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [templateId, setTemplateId] = useState<number | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [visibilityMode, setVisibilityMode] = useState<'full_public' | 'partial_public' | 'private'>('full_public');
//   const [ideaDetails, setIdeaDetails] = useState('');
//   const [internalNotes, setInternalNotes] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token') || '';
//     fetchListPostCategories(token).then(setCategories).catch(console.error);
//   }, []);

//   const handleImageChange = (file: File | null) => {
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     handleImageChange(file);
//   };

//   const handleDrop = (e: React.DragEvent<HTMLElement>) => {
//     e.preventDefault();
//     handleImageChange(e.dataTransfer.files?.[0] || null);
//   };

//   const removeImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) return alert('Anda belum login!');
//     if (!name.trim()) return alert('Nama kategori wajib diisi');
//     if (!templateId) return alert('Pilih tipe kategori terlebih dahulu');

//     try {
//       setLoading(true);
//       let image_url: string | undefined;
//       if (imageFile) {
//         image_url = await uploadImageToCloud(imageFile);
//       }

//       await createPostCategory(
//         name,
//         description,
//         templateId,
//         token,
//         image_url,
//         visibilityMode,
//         ideaDetails,
//         internalNotes,
//       );

//       alert('Kategori berhasil dibuat!');
//       router.push(redirectTo || '/profile/me');
//     } catch (err: any) {
//       alert(err.message || 'Gagal membuat kategori');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   return (
//     <>
//       <OverlayLoadingModal show={loading} />

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-gray-900 min-h-screen shadow-md p-4 border border-gray-200 dark:border-gray-700"
//       >
//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
//             <Image src={imagePreview} alt="Preview" fill className="object-cover" />
//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         )}

//         {/* Image Upload */}
//         <div
//           onDrop={handleDrop}
//           onDragOver={(e) => e.preventDefault()}
//           onClick={() => fileInputRef.current?.click()}
//           className="mb-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md h-32 cursor-pointer hover:border-blue-400"
//         >
//           <label className="flex flex-col items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-full h-full">
//             <ImagePlus size={20} />
//             <span>Klik atau tarik gambar ke sini</span>
//             <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} hidden />
//           </label>
//         </div>

//         {/* Nama Kategori */}
//         <div className="mb-3">
//           <label className="block mb-1 text-sm font-medium">Nama Kategori</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Nama kategori (misalnya, Membuat Model AI)"
//             className="w-full p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         {/* Deskripsi Kategori */}
//         <div className="mb-3">
//           <label className="block mb-1 text-sm font-medium">Deskripsi</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             placeholder="Deskripsikan kategori Anda"
//             className="w-full p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         {/* Tipe Kategori */}
//         <div className="mb-3">
//           <label className="block mb-1 text-sm font-medium">Tipe Kategori</label>
//           <select
//             value={templateId ?? ''}
//             onChange={(e) => setTemplateId(Number(e.target.value) || null)}
//             className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//           >
//             <option value="">Pilih tipe kategori</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Visibility */}
//         <div className="mb-3">
//           <label className="block mb-1 text-sm font-medium">Visibilitas</label>
//           <select
//             value={visibilityMode}
//             onChange={(e) => setVisibilityMode(e.target.value as any)}
//             className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//           >
//             <option value="full_public">Publik Penuh</option>
//             <option value="partial_public">Publik Sebagian</option>
//             <option value="private">Privat</option>
//           </select>
//         </div>

//         {/* Idea Details */}
//         <div className="mb-3">
//           <label className="block mb-1 text-sm font-medium">Detail Ide</label>
//           <textarea
//             value={ideaDetails}
//             onChange={(e) => setIdeaDetails(e.target.value)}
//             rows={2}
//             placeholder="Jelaskan ide secara pribadi"
//             className="w-full p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         {/* Internal Notes */}
//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium">Catatan Internal</label>
//           <textarea
//             value={internalNotes}
//             onChange={(e) => setInternalNotes(e.target.value)}
//             rows={2}
//             placeholder="Hanya bisa dibaca oleh kamu"
//             className="w-full p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md flex items-center gap-2 disabled:opacity-60"
//           >
//             {loading && <Loader2 className="animate-spin h-4 w-4" />}
//             Buat Kategori
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }