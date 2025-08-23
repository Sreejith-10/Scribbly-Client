'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { ReactNode } from 'react';

const themeIcons: Record<string, ReactNode> = {
  'system': <Monitor />,
  'light': <Sun />,
  'dark': <Moon />
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='cursor-pointer'
        >
          {themeIcons[theme ?? 'system']}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {
          Object.keys(themeIcons).map((key) => (
            <DropdownMenuItem onClick={() => setTheme(key)} key={key}>
              {themeIcons[key]}
              {key}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
