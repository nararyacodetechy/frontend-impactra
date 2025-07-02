const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type Profile = {
    id: number;
    uuid: string;
    email: string;
    full_name: string;
    username: string;
    avatar_url?: string;
    role: 'user' | 'komunitas' | 'admin';
  };
  
export async function fetchProfileByUsername(username: string): Promise<Profile> {
const formattedUsername = username.startsWith('@') ? username : `@${username}`;

const res = await fetch(`${API_BASE_URL}/profile/${formattedUsername}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    },
    cache: 'no-store',
});

const result = await res.json();

if (!res.ok) {
    throw new Error(result.message || 'Gagal mengambil profil');
}

return result.data;
}
  