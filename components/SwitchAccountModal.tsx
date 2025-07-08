'use client';

import { maskEmail } from '@/utils/maskEmail';
import { useState } from 'react';

type Props = {
  email: string;
  onConfirm: (email: string, password: string) => void;
  onCancel: () => void;
};

export default function SwitchAccountModal({ email, onConfirm, onCancel }: Props) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }
    setLoading(true);
    try {
      await onConfirm(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-[90%] max-w-md p-6 rounded-xl shadow-xl border dark:border-gray-700 relative">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
          Switch Account
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 py-4 text-center">
            Enter password for <strong>{maskEmail(email)}</strong>
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="Your password"
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={onCancel}
            className="w-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md disabled:opacity-60"
          >
            {loading ? 'Switching...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
