import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type Post = {
    id: number;
    uuid: string;
    content: string;
    image_url: string | null;
    created_at: string;
    author: {
      id: number;
      username: string;
      full_name: string;
      avatar_url?: string;
    };
    supports: any[];  // bisa disesuaikan jika kamu punya tipe Support
    comments: any[];  // bisa disesuaikan jika kamu punya tipe Comment
};
  

export type CommentPayload = {
  content: string;
};

export async function createPost(
  content: string,
  image_url: string | null,
  token: string
) {
  return axios.post(
    `${API_BASE_URL}/posts`,
    { content, image_url },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function fetchAllPosts(): Promise<Post[]> {
  const url = `${API_BASE_URL}/posts`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchPostByUUID(uuid: string) {
  const res = await axios.get(`${API_BASE_URL}/posts/uuid/${uuid}`);
  return res.data;
}

export async function commentOnPost(postId: number, payload: CommentPayload, token: string) {
  return axios.post(
    `${API_BASE_URL}/posts/${postId}/comment`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function supportPost(postId: number, token: string) {
  return axios.post(
    `${API_BASE_URL}/posts/${postId}/support`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function unsupportPost(postId: number, token: string) {
  return axios.delete(`${API_BASE_URL}/posts/${postId}/support`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}