'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { loginUser, registerUser } from "@/lib/authServices";
import GoogleLoginButton from "../generals/GoogleLoginButton";

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
          throw new Error("Token not found on response");
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
        setError(err.message || "Something Wrong, please try again later!");
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
            className="w-full p-2 border rounded bg-white dark:bg-black border-gray-300 dark:border-gray-700"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black"
        />

        <button
          type="submit"
          className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded font-semibold cursor-pointer"
          disabled={loading}
        >
          {loading
            ? type === "register"
              ? "Processing Sign Up..."
              : "Processing Sign In..."
            : type === "login"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>

      {/* Pisahkan tombol Google di luar form */}
      <div className="text-center my-4">
        <p className="mb-4">or</p>
        <GoogleLoginButton label={type === 'register' ? "Sign Up with Google" : "Sign In with Google"} />
      </div>

    </div>
  );
}
