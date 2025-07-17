// components/profile/AvatarUploader.tsx
import React from 'react';

interface Props {
  avatarUrl: string;
  onImageUpload: (file: File) => Promise<void>;
}

export default function AvatarUploader({ avatarUrl, onImageUpload }: Props) {
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await onImageUpload(file);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await onImageUpload(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative border-2 border-dashed border-gray-400 rounded-lg p-4 flex items-center justify-between gap-4"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-24 h-24 object-cover rounded-full border shadow-sm"
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 border">
          No Image
        </div>
      )}

      <p className="text-sm text-gray-500 dark:text-gray-300">
        Seret dan lepas gambar ke sini atau pilih dari perangkat
      </p>

      <label className="absolute top-2 right-2 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded shadow-sm transition">
        Pilih dari Perangkat
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
}
