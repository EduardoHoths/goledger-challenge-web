import { ModeToggle } from "./mode-toggle";
import LanguageSelector from "./language-selector";

export function Header() {
  return (
    <header className="flex items-center justify-end px-6 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4">
        <LanguageSelector />
        <ModeToggle />
      </div>
    </header>
  );
}
