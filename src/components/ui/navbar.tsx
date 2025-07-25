'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Lock, Menu, Share2, Sparkles } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';
import { Button } from './button';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { MobileMenu } from './mobile-menu';

const navItems = [
  {
    icon: Sparkles,
    title: 'Real-time Collaboration',
    description: 'Work together in real-time with your team',
  },
  {
    icon: Compass,
    title: 'Infinite Canvas',
    description: 'Unlimited space for your ideas and projects',
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your boards with anyone, anywhere',
  },
  {
    icon: Lock,
    title: 'Secure',
    description: 'Enterprise-grade security for your content',
  },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <motion.div
          className='flex items-center gap-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='flex h-9 w-9 items-center justify-center'>
            <Image src='/icons/icon.png' alt='logo' width={100} height={100} />
          </div>
          <span className='text-xl font-bold'>Scribbly</span>
        </motion.div>

        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className='cursor-pointer bg-transparent hover:bg-transparent'>
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {navItems.map((item, i) => (
                    <li key={i}>
                      <NavigationMenuLink asChild>
                        <a className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-3 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'>
                          <item.icon className='h-5 w-5' />
                          <div>
                            <div className='text-sm leading-none font-medium'>
                              {item.title}
                            </div>
                            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                              {item.description}
                            </p>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={(navigationMenuTriggerStyle(), 'bg-transparent')}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={(navigationMenuTriggerStyle(), 'bg-transparent')}
              >
                Resources
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className='hidden items-center gap-2 md:flex'>
          <ThemeToggle />
          <Button variant='ghost' className='hidden md:inline-flex'>
            <Link href='/login'>Log in</Link>
          </Button>
          <Button>
            <Link href='/signup'>Sign up free</Link>
          </Button>
        </div>

        <Menu onClick={() => setMobileNavOpen(true)} className='md:hidden' />

        <MobileMenu
          isOpen={mobileNavOpen}
          navItems={navItems.map((item) => ({
            name: item.title,
            description: item.description,
            href: item.title,
          }))}
          onClose={() => setMobileNavOpen(false)}
        />
      </div>
    </motion.header>
  );
};
