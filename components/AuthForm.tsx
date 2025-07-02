'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { loginUser, registerUser } from "@/lib/authServices";
import GoogleLoginButton from "./GoogleLoginButton";

type AuthFormProps = {
  type: "login" | "register";
};

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { login } = useUser();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (type === "register") {
        const res = await registerUser({
          email,
          full_name: fullName,
          password,
          username: email.split("@")[0],
          role: "user",
        });
      
        const token = res.access_token || res.data?.access_token;
      
        login(token); // ✅ Gunakan token
        localStorage.setItem("token", token);
        router.push("/auth/register/success");
      } else {
        const res = await loginUser({ email, password });
      
        const token = res.access_token || res.data?.access_token;
      
        if (!token) {
          throw new Error("Token tidak ditemukan dalam response");
        }
      
        login(token); // ✅ ini benar
        localStorage.setItem("token", token);
        router.push("/feed");
      }      
    } catch (err: any) {
      if (
        err.message ===
        "This account was registered using Google. Please set a password first to use email login."
      ) {
        router.push(`/auth/request-set-password?email=${encodeURIComponent(email)}`);
      } else {
        setError(err.message || "Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {type === "register" && (
          <input
            type="text"
            placeholder="Your Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded bg-white dark:bg-gray-800"
        />

        <button
          type="submit"
          className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded font-semibold cursor-pointer"
          disabled={loading}
        >
          {loading
            ? type === "register"
              ? "Mendaftar..."
              : "Masuk..."
            : type === "login"
            ? "Masuk"
            : "Daftar"}
        </button>
      </form>

      {/* Pisahkan tombol Google di luar form */}
      <div className="text-center my-4">
        <p className="mb-4">atau</p>
        <GoogleLoginButton label={type === 'register' ? "Daftar dengan Google" : "Login dengan Google"} />
      </div>

    </div>
  );
}
