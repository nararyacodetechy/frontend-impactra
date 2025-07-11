'use client';

import {
  X, User, Bookmark, Archive, Activity, Bell,
  ShieldOff, Ban, Settings, Accessibility, Languages,
  Download, Sliders, HelpCircle, Info, Lock,
  UserPlus, LogOut
} from 'lucide-react';
import { useEffect } from 'react';
import LogoutButton from '../generals/LogoutButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const sidebarSections = [
  {
    title: null,
    items: [
      { href: "/account-center", label: "Account Center", icon: User },
    ],
  },
  {
    title: "Activity",
    items: [
      { href: "/relation", label: "Relations", icon: Bookmark },
      { href: "/saved", label: "Saved", icon: Bookmark },
      { href: "/archive", label: "Archive", icon: Archive },
      { href: "/activity", label: "Your Activity", icon: Activity },
      { href: "/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Privacy",
    items: [
      { href: "/blocked", label: "Blocked", icon: ShieldOff },
      { href: "/restricted", label: "Restricted", icon: Ban },
    ],
  },
  {
    title: "Preferences",
    items: [
      { href: "/device-permissions", label: "Device Permissions", icon: Settings },
      { href: "/accessibility", label: "Accessibility", icon: Accessibility },
      { href: "/language", label: "Language & Translation", icon: Languages },
      { href: "/downloads", label: "Downloads", icon: Download },
      { href: "/content-preferences", label: "Content Preferences", icon: Sliders },
    ],
  },
  {
    title: "Help",
    items: [
      { href: "/help", label: "Help", icon: HelpCircle },
      { href: "/account-status", label: "Account Status", icon: Lock },
      { href: "/privacy-center", label: "Privacy Center", icon: ShieldOff },
      { href: "/about", label: "About", icon: Info },
    ],
  },
];

export default function RightSidebar({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className={`absolute top-0 right-0 z-50 h-full w-72 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } pointer-events-auto`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
        <button
          onClick={onClose}
          className="text-gray-600 cursor-pointer dark:text-gray-300 hover:text-red-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6 max-h-[calc(100vh-60px)] overflow-y-auto scrollbar-hide">
        {sidebarSections.map((section, index) => (
          <div key={index} className="space-y-4">
            {section.title && (
              <h4 className="text-sm font-semibold text-gray-500 uppercase">
                {section.title}
              </h4>
            )}
            {section.items.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                <Icon size={18} /> {label}
              </a>
            ))}
          </div>
        ))}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <a
            href="/auth/login"
            className="flex items-center gap-3 text-blue-500 dark:text-blue-500 hover:text-blue-600"
          >
            <UserPlus size={18} /> Add Account
          </a>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
