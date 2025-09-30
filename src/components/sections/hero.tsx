'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Badge } from '../ui/badge';
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Compass,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { H1, P } from '../ui/typography';

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

  return (
    <section className='relative min-h-screen overflow-hidden pt-24'>
      <div className='absolute inset-0 -z-10'>
        <div className='from-primary/10 to-background absolute inset-0 bg-gradient-to-b'></div>
        <motion.div
          className='absolute inset-0 opacity-30'
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y,
          }}
        />
      </div>

      <div className='container mx-auto px-4 py-20'>
        <div className='grid items-center gap-8 md:grid-cols-2 md:gap-12'>
          <motion.div
            variants={slideInLeft}
            initial='hidden'
            animate='visible'
            className='flex flex-col gap-6'
          >
            <Badge className='w-fit' variant='outline'>
              <Sparkles className='mr-1 h-3 w-3' />
              Collaborative Whiteboarding Reimagined
            </Badge>
            <H1 className='dark:text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
              Bring your ideas to life{' '}
              <span className='text-primary'>together</span>
            </H1>
            <P className='text-muted-foreground text-sm lg:text-sm'>
              The collaborative whiteboard platform that brings teams together
              to create, plan, and innovate—all in real-time.
            </P>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button size='lg' className='gap-2'>
                <Link href='/dashboard'>Get started for free</Link>
                <ChevronRight className='h-4 w-4' />
              </Button>
              <Button size='lg' variant='outline' className='gap-2'>
                See it in action
                <Compass className='h-4 w-4' />
              </Button>
            </div>
            <div className='text-muted-foreground flex items-center gap-2 text-sm'>
              <CheckCircle className='text-primary h-4 w-4' />
              <span>No credit card required</span>
              <span className='mx-2'>•</span>
              <CheckCircle className='text-primary h-4 w-4' />
              <span>Free forever plan available</span>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial='hidden'
            animate='visible'
            className='relative'
          >
            <div className='relative aspect-video h-full w-full overflow-hidden rounded-xl border shadow-xl'>
              <Image
                src='/assets/board-thumb.png'
                alt='Whiteboard app interface'
                className='h-full w-full object-contain'
                width={800}
                height={800}
              />
              <div className='from-primary/20 absolute inset-0 bg-gradient-to-tr to-transparent'></div>
            </div>

            <motion.div
              className='bg-background absolute -bottom-6 -left-6 rounded-lg p-3 shadow-lg'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className='flex items-center gap-2'>
                <div className='flex -space-x-2'>
                  {[1, 2, 3].map((i) => (
                    <Avatar
                      key={i}
                      className='border-background h-8 w-8 border-2'
                    >
                      <AvatarFallback>{`U${i}`}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className='text-sm font-medium'>3 people editing</span>
              </div>
            </motion.div>

            <motion.div
              className='bg-background absolute -top-6 -right-6 rounded-lg p-3 shadow-lg'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className='flex items-center gap-2'>
                <MessageSquare className='text-primary h-5 w-5' />
                <span className='text-sm font-medium'>Real-time comments</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className='absolute right-0 bottom-0 left-0 flex justify-center pb-8'>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <ChevronDown className='text-muted-foreground h-6 w-6' />
        </motion.div>
      </div>
    </section>
  );
};
