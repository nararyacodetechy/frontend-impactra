// // app/profile/post-categories/page.tsx
// import { fetchPostCategories } from '@/lib/postService';
// import Link from 'next/link';
// import Image from 'next/image';

// export default async function MyDetailCategoriesPage() {
//   const categories = await fetchPostCategories();

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Daftar Kategori</h2>
//       {categories.length === 0 ? (
//         <div className="flex flex-col items-center justify-center text-gray-500">
//           <p>Belum ada kategori</p>
//           <p>
//             <Link href="/profile/create-category" className="text-blue-500 hover:underline">
//               Buat kategori pertama Anda
//             </Link>
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories.map((category) => {
//             const firstImage = category.category.image_url || category.category.posts?.[0]?.image_url;
//             return (
//               <Link
//                 href={`/profile/post-category/${category.category.uuid}`}
//                 key={category.category.uuid}
//                 className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-800"
//               >
//                 <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
//                   {firstImage ? (
//                     <Image
//                       src={firstImage}
//                       alt={category.category.name}
//                       fill
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full text-gray-500">
//                       Tanpa Gambar
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-3">
//                   <h2 className="font-semibold text-lg">{category.category.name}</h2>
//                   <p className="text-sm text-gray-500">
//                     Tipe: {category.name} ({category.description || 'Tanpa deskripsi tipe'})
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {category.category.description || 'Tanpa deskripsi proyek'}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-2">
//                     Dibuat: {new Date(category.category.created_at).toLocaleDateString('id-ID')}
//                   </p>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }