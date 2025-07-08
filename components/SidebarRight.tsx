export default function SidebarRight() {
  return (
    <aside className="fixed top-0 right-0 w-72 z-100 h-screen overflow-y-auto border-l border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 hidden lg:block">
      <h2 className="font-semibold text-lg mb-4">Trending Komunitas</h2>
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li>#Lingkungan</li>
        <li>#Pendidikan</li>
        <li>#Kesehatan</li>
        <li>#AksiNyata</li>
      </ul>
    </aside>
  );
}
