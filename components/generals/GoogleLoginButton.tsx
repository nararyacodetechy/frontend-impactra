'use client';

import { loginWithGoogle } from '@/lib/authServices';

type GoogleLoginButtonProps = {
  label?: string; // opsional, default: "Login dengan Google"
};

export default function GoogleLoginButton({ label = "Login dengan Google" }: GoogleLoginButtonProps) {
  return (
    <button
      onClick={loginWithGoogle}
      className="w-full flex items-center gap-3 justify-center bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded shadow cursor-pointer"
    >
      <img
        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
        alt="Google"
        className="w-5 h-5"
      />
      <span className='font-bold'>{label}</span>
    </button>
  );
}
