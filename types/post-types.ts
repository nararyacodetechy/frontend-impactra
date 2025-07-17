// types/post-types.ts
export type Post = {
  id: number;
  uuid: string;
  title?: string;
  content: string | null; 
  image_urls?: string[];
  created_at: string;
  author: {
    id: number;
    username: string;
    full_name: string;
    avatar_url?: string;
  };
  category?: {
    id: number;
    name: string;
    description?: string;
  };
  supports: Support[];
  comments: Comment[];
};

export type PostCategory = {
  id: number; // ID dari list_post_category
  name: string; // Nama dari list_post_category (misalnya, new-idea)
  description?: string; // Deskripsi dari list_post_category
  category: {
    id: number; // from post_category
    uuid: string; // UUID dari post_category
    name: string; // Nama proyek dari post_category
    description?: string; // Deskripsi proyek dari post_category
    created_at: string; // Tanggal pembuatan dari post_category
    image_url?: string | null; // URL gambar kategori
    visibility_mode?: 'full_public' | 'partial_public' | 'private';
    idea_details?: string | null;
    internal_notes?: string | null;
    total_posts?: number; // Jumlah post
    posts?: Post[]; // Daftar post terkait
  };
};

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    avatar_url?: string;
  };
}

export interface Support {
  id: number;
  type: string;
  user: {
    id: number;
    username: string;
  };
}