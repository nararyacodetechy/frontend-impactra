'use client';

import { LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };  

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600"
    >
      <LogOut className="w-5 h-5 text-red-500" />
      <span className="text-md font-medium text-red-500">Logout</span>
    </button>
  );
}
