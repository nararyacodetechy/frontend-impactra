'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import RightSidebar from './RIghtSidebar';
import { getLoginSessions, loginUser } from '@/lib/authServices';
import SwitchAccountModal from './SwitchAccountModal';
import { maskEmail } from '@/utils/maskEmail';

type Session = {
  id: number;
  user: {
    email: string;
    username: string;
    full_name?: string;
    avatar_url?: string;
  };
  loggedInAt: string;
};

type Props = {
    username: string;
    token: string;
    currentEmail: string;
};  

export default function HeaderSidebarContent({ username, token, currentEmail }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountListOpen, setAccountListOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (accountListOpen && token) {
      getLoginSessions(token).then(setSessions).catch(console.error);
    }
  }, [accountListOpen, token]);

  const uniqueSessions = sessions.reduce((acc: Session[], session) => {
    const isCurrentUser = session.user.email === currentEmail;
    const exists = acc.find(s => s.user.email === session.user.email);
    if (!exists && !isCurrentUser) acc.push(session);
    return acc;
  }, []);   

  const handleSwitch = async (email: string, password: string) => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.access_token);
      window.location.reload();
    } catch (err: any) {
      alert(err.message || 'Gagal login ke akun tersebut');
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-between dark:border-gray-700">
        <button
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          onClick={() => setAccountListOpen(!accountListOpen)}
        >
          <Image
            src="/icons/default-profile.png"
            alt="Ganti Akun"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="flex items-center gap-1">
            {username}
            <ChevronDown size={16} />
          </span>
        </button>

        {accountListOpen && (
        <div className="absolute left-0 top-10 z-50 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md p-2 w-auto min-w-[20rem] max-w-[90vw]">
            <div className="p-2">
              <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-white">Recently Logged In</h3>
              {uniqueSessions.map((session) => (
                session.user && (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setSelectedEmail(session.user.email)}
                  >
                    <Image
                      src={session.user.avatar_url || "/icons/default-profile.png"}
                      alt={session.user.username}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium text-sm text-gray-800 dark:text-white truncate">
                            {session.user.full_name || session.user.username}
                        </span>
                        <span className="text-xs text-gray-500 break-all">
                            <strong>{maskEmail(session.user.email)}</strong>
                        </span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedEmail && (
        <SwitchAccountModal
          email={selectedEmail}
          onCancel={() => setSelectedEmail(null)}
          onConfirm={async (email, password) => {
            await handleSwitch(email, password);
            setSelectedEmail(null);
          }}
        />
      )}

      <RightSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
