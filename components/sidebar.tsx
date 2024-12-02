import Link from "next/link";
import { Home, Mic2, Disc3, Music2, ListMusic } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-semibold text-gray-800 dark:text-white">
          BlockStream
        </span>
      </div>

      <nav className="overflow-y-auto">
        <ul className="p-4 space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/artists"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
            >
              <Mic2 className="w-5 h-5" />
              <span>Artists</span>
            </Link>
          </li>
          <li>
            <Link
              href="/albums"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
            >
              <Disc3 className="w-5 h-5" />
              <span>Albums</span>
            </Link>
          </li>
          <li>
            <Link
              href="/songs"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
            >
              <Music2 className="w-5 h-5" />
              <span>Songs</span>
            </Link>
          </li>
          <li>
            <Link
              href="/playlists"
              className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
            >
              <ListMusic className="w-5 h-5" />
              <span>Playlists</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
