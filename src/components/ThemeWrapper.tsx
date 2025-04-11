import React, { useEffect } from 'react';
import { useThemeStore, getEffectiveTheme } from '../store/themeStore';

// Define available themes
const themes = {
  'lara-light-indigo': { name: 'light', colorScheme: 'light' },
  'lara-dark-indigo': { name: 'dark', colorScheme: 'dark' },
};

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { theme } = useThemeStore();
  const effectiveTheme = getEffectiveTheme(theme);

  useEffect(() => {
    // Add theme class to body
    document.body.classList.remove('dark', 'light');

    if (effectiveTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }

    // Update data attributes for plugins that might use them
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, [effectiveTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
};
