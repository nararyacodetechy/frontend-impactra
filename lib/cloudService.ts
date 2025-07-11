const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = 'impactra_preset';
const CLOUDINARY_UPLOAD_FOLDER = 'impactra/posts'; // Atur sesuai kebutuhan struktur folder kamu

export async function uploadImageToCloud(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', CLOUDINARY_UPLOAD_FOLDER); // optional tapi direkomendasikan

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || 'Gagal upload gambar ke Cloudinary');
  }

  const data = await res.json();
  return data.secure_url;
}
