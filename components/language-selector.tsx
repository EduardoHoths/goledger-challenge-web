"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState("en-us");

  useEffect(() => {
    const currentLocale = pathname.split("/")[1];
    setSelectedLanguage(currentLocale || "en-us");
  }, [pathname]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value;
    const newPath = `/${newLocale}${pathname.replace(/^\/(en-us|pt-br)/, "")}`;
    setSelectedLanguage(newLocale);
    router.push(newPath);
  };

  return (
    <select
      value={selectedLanguage}
      onChange={handleLanguageChange}
      className="border rounded-md p-2 bg-background dark:text-white dark:border-gray-700 text-sm"
    >
      <option value="en-us">&#127482;&#127480; English</option>
      <option value="pt-br">&#127463;&#127479; Português</option>
    </select>
  );
};

export default LanguageSelector;
