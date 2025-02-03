'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = localeActive === 'en' ? 'th' : 'en';
    const newPathname = pathname.replace(`/${localeActive}`, `/${nextLocale}`);

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <div className="flex w-full justify-between items-center space-x-2">
      <div className="flex space-x-2">
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          {localeActive === 'en' ? 'English' : 'ไทย'}
        </p>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={toggleLanguage}
          checked={localeActive === 'th'}
          disabled={isPending}
        />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500 dark:peer-focus:ring-amber-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-amber-500 transition-all duration-300"></div>
        <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-full peer-checked:bg-gray-800"></span>
      </label>
    </div>
  );
}
