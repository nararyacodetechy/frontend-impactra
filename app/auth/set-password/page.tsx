'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { setPassword } from "@/lib/authServices";

export default function SetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await setPassword({ token: token!, newPassword });
      setMessage("✅ Password berhasil diatur. Anda bisa login sekarang.");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch {
      setError("❌ Token tidak valid atau sudah kedaluwarsa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl space-y-6 border">
      <h1 className="text-xl font-bold">Atur Password Baru</h1>

      {message && <p className="text-green-600 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Password Baru"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          {loading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </form>

      <a
        href="/"
        className="w-full inline-block text-sm text-white hover:underline mt-4 py-2 px-4 border border-gray-300 rounded"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
