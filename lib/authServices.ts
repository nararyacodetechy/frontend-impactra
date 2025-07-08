const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type Role = "individu" | "komunitas" | "admin";

export async function registerUser(data: {
  email: string;
  password: string;
  username: string;
  full_name?: string;
  role: "user" | "admin" | "individu" | "komunitas";
}) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Gagal mendaftar");
  return result;
}

export async function verifyEmail(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Gagal verifikasi email");
  return result;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Gagal login");
  return result;
}

export function loginWithGoogle() {
  window.location.href = `${API_BASE_URL}/auth/google`;
}

export async function requestSetPassword(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/request-set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Gagal mengirim email");
  return result;
}

export async function setPassword(data: {
  token: string;
  newPassword: string;
}) {
  const res = await fetch(`${API_BASE_URL}/auth/set-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Gagal mengatur password");
  return result;
}

// api/auth.ts
export async function getLoginSessions(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/sessions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Gagal mengambil sesi login');
  return result.data;
}

