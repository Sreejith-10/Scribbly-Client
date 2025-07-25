'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

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

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      quote:
        'This whiteboard tool has transformed how our design team collaborates. We can iterate faster and communicate ideas more clearly.',
      author: 'Sarah Johnson',
      role: 'Design Director',
      company: 'Creative Co.',
      avatar: '/placeholder.svg?height=100&width=100',
    },
    {
      quote:
        'The infinite canvas and real-time collaboration features have made remote work so much easier for our distributed team.',
      author: 'Michael Chen',
      role: 'Product Manager',
      company: 'Tech Innovations',
      avatar: '/placeholder.svg?height=100&width=100',
    },
    {
      quote:
        "We use this for everything from sprint planning to retrospectives. It's become an essential part of our workflow.",
      author: 'Alex Rodriguez',
      role: 'Engineering Lead',
      company: 'DevOps Inc.',
      avatar: '/placeholder.svg?height=100&width=100',
    },
  ];

  return (
    <section className='bg-muted/30 py-20' id='testimonials' ref={ref}>
      <div className='container mx-auto px-4'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            Loved by teams worldwide
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-3xl text-xl'>
            See what our customers have to say about their experience
          </p>
        </motion.div>

        <motion.div
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className='h-full'>
                <CardContent className='p-6'>
                  <div className='mb-4 text-4xl'>&quot;</div>
                  <p className='mb-6 text-lg italic'>{testimonial.quote}</p>
                  <div className='flex items-center gap-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage
                        src={testimonial.avatar || '/placeholder.svg'}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>
                        {testimonial.author
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{testimonial.author}</p>
                      <p className='text-muted-foreground text-sm'>
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
