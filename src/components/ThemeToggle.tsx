// components/ThemeToggle.tsx
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  // ตรวจสอบธีมปัจจุบันจาก localStorage
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      setTheme('light'); // ธีมเริ่มต้นเป็น light
    }
  }, []);

  // ฟังก์ชันสลับธีม
  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-pink-500 dark:bg-gray-700 text-white rounded mt-4 hover:bg-pink-600 dark:hover:bg-gray-600 transition flex items-center justify-center"
    >
      {theme === 'dark' ? <FaMoon className="text-yellow-400" /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
