// components/profile/ProfileTabs.tsx
import { useState } from 'react';

interface TabItem {
  label: string;
  value: string | number;
}
type TabKey = 'Stats' | 'Impact' | 'Growth' | 'Collaboration' | 'Support' | 'Recognition';

export default function ProfileTabs({
  tabs,
}: {
  tabs: Record<TabKey, TabItem[]>;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('Impact');
  const items = tabs[activeTab] || [];
  const columnCount = Math.min(items.length, 4); // Maks 4 Coloum

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-around gap-2 border-b pt-4 border-gray-300 dark:border-gray-700 px-4">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabKey)}
            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
              activeTab === tab
                ? 'bg-gray-700 text-white'
                : 'bg-white dark:bg-black text-gray-700 dark:text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className="grid gap-6 px-4 py-5 text-center text-sm text-gray-600 dark:text-gray-300"
        style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="py-4 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-700"
          >
            <div className="font-bold text-lg">{item.value}</div>
            <div className="text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
