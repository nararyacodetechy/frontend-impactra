'use client';

import Link from "next/link";
import {
  Home,
  Compass,
  Video,
  MessageCircle,
  Bell,
  PlusSquare,
  User,
  LogIn,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function MainSidebarLeft() {
  const [hasToken, setHasToken] = useState(false);
  const { user, isInitialized } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setHasToken(!!token);
    }
  }, []);

  if (!isInitialized) return null;

  const menuItems = [
    { href: "/feed", label: "Feed", icon: Home },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/reels", label: "Reels", icon: Video },
    { href: "/messages", label: "Messages", icon: MessageCircle },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ];

  const getUserItems = user
    ? [
        { href: "/profile/me/create-post", label: "Create Post", icon: PlusSquare },
        { href: "/profile/me/post-category/create-category", label: "Create Categorize", icon: PlusSquare },
        { href: `/profile/me`, label: "Profile", icon: User },
      ]
    : [];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen overflow-y-auto z-50 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white p-6 hidden md:block">
      <h2 className="font-semibold text-lg mb-4">Impactra</h2>
      <ul className="space-y-2">
        {menuItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          </li>
        ))}

        {hasToken && user ? (
          <>
            {getUserItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </>
        ) : (
          <li>
            <Link
              href="/auth/login"
              className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <LogIn className="w-5 h-5" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
