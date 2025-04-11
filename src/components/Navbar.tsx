import { Button } from '@/components/ui/button';
import { BookOpen, Monitor, Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { getEffectiveTheme, useThemeStore } from '../store/themeStore';

export const Navbar: React.FC = () => {
    const { theme, setTheme } = useThemeStore();
    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(getEffectiveTheme(theme));

    useEffect(() => {
        const updateEffectiveTheme = () => {
            setEffectiveTheme(getEffectiveTheme(theme));
        };

        updateEffectiveTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateEffectiveTheme);

        return () => mediaQuery.removeEventListener('change', updateEffectiveTheme);
    }, [theme]);

    return (
        <header className="w-full bg-wise-forest-green border-b border-white/10 flex py-2 px-4">
            <div className="flex items-center gap-2 flex-1">
                <BookOpen className="text-wise-bright-green" size={20} />
                <h1 className="text-white font-medium text-lg">CBT Journal</h1>
            </div>

            <div className="flex items-center rounded-xl overflow-hidden ">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme('light')}
                    title="Light theme"
                    className={cn(
                        "h-8 rounded-none px-2",
                        theme === 'light'
                            ? "bg-wise-bright-green text-wise-forest-green"
                            : "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                    )}
                >
                    <Sun size={15} />
                    <span className="sr-only">Light theme</span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme('system')}
                    title="System theme"
                    className={cn(
                        "h-8 rounded-none px-2",
                        theme === 'system'
                            ? "bg-wise-bright-green text-wise-forest-green"
                            : "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                    )}
                >
                    <Monitor size={15} />
                    <span className="sr-only">System theme</span>
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme('dark')}
                    title="Dark theme"
                    className={cn(
                        "h-8 rounded-none px-2",
                        theme === 'dark'
                            ? "bg-wise-bright-green text-wise-forest-green"
                            : "bg-transparent text-white/80 hover:text-white hover:bg-white/10"
                    )}
                >
                    <Moon size={15} />
                    <span className="sr-only">Dark theme</span>
                </Button>
            </div>
        </header>
    );
};
