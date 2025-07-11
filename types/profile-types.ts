import { Post, PostCategory } from "./post-types";

export type Profile = {
  id: number;
  uuid: string;
  full_name: string;
  username: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  role: string;
  post_categories: PostCategory[]; // Gunakan tipe PostCategory yang baru
  posts: Post[];
};
  