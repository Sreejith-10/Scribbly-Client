'use client';

import { Compass, Globe, Lock, Share2, Sparkles, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description:
        'Work together with your team in real-time. See changes as they happen and never miss an update.',
    },
    {
      icon: Compass,
      title: 'Infinite Canvas',
      description:
        'Unlimited space for your ideas. Zoom in for details or out for the big picture.',
    },
    {
      icon: Sparkles,
      title: 'Smart Templates',
      description:
        'Start quickly with pre-built templates for any use case, from brainstorming to project planning.',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description:
        'Share your boards with anyone, anywhere. Control permissions and access levels.',
    },
    {
      icon: Globe,
      title: 'Cross-platform',
      description:
        'Access your boards from any device. Our apps work seamlessly across desktop, web, and mobile.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description:
        'Keep your data safe with enterprise-grade security and compliance features.',
    },
  ];

  return (
    <section className='bg-muted/50 py-20' id='features'>
      <div className='container mx-auto px-4'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            Everything you need to collaborate
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-3xl text-xl'>
            Powerful features designed to make teamwork seamless and ideas flow
            freely
          </p>
        </motion.div>

        <motion.div
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className='group hover:scale-3d'
            >
              <Card className='h-full overflow-hidden transition-all hover:shadow-lg'>
                <CardContent className='p-6'>
                  <motion.div
                    className='bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg'
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <feature.icon className='h-6 w-6' />
                  </motion.div>
                  <h3 className='text-xl font-bold'>{feature.title}</h3>
                  <p className='text-muted-foreground mt-2'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
