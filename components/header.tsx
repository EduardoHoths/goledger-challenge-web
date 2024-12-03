import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";
import LanguageSelector from "./language-selector";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <Input type="search" placeholder="Search..." className="ml-2 w-64" />
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        <ModeToggle />
      </div>
    </header>
  );
}
