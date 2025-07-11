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

export default function SidebarLeft() {
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
        { href: "/post/create-category", label: "Create Post", icon: PlusSquare },
        { href: `/profile/me`, label: "Profile", icon: User },
      ]
    : [];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen overflow-y-auto border-r border-gray-300 z-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 hidden md:block">
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
