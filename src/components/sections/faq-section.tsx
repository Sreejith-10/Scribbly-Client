'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

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

export const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const faqs = [
    {
      question: 'How does the collaboration feature work?',
      answer:
        "Our real-time collaboration allows multiple users to work on the same board simultaneously. Changes are synced instantly, and you can see who's working where with cursors and avatars. You can also use comments and mentions to communicate directly within the board.",
    },
    {
      question: 'Can I use the whiteboard offline?',
      answer:
        "Yes, our desktop apps support offline mode. You can create and edit boards without an internet connection, and they'll automatically sync when you're back online.",
    },
    {
      question: 'Is there a limit to how many people can collaborate?',
      answer:
        'The Free plan allows up to 5 collaborators per board. The Pro plan has unlimited collaborators, and the Enterprise plan adds advanced user management features.',
    },
    {
      question: 'Can I export my whiteboards?',
      answer:
        'Yes, you can export your boards in multiple formats including PDF, PNG, and SVG. Pro and Enterprise plans also support additional export options and integrations with other tools.',
    },
    {
      question: 'How secure is my data?',
      answer:
        'We take security seriously. All data is encrypted in transit and at rest. Enterprise plans include additional security features like SSO, audit logs, and custom data retention policies.',
    },
    {
      question: 'Do you offer educational or nonprofit discounts?',
      answer:
        'Yes, we offer special pricing for educational institutions and nonprofit organizations. Please contact our sales team for more information.',
    },
  ];

  return (
    <section className='bg-muted/30 py-20' id='faq' ref={ref}>
      <div className='container mx-auto px-4'>
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            Frequently asked questions
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-3xl text-xl'>
            Everything you need to know about our whiteboard platform
          </p>
        </motion.div>

        <motion.div
          className='mx-auto max-w-3xl'
          variants={staggerContainer}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Accordion type='single' collapsible className='w-full'>
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={staggerItem}>
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className='text-left'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className='text-muted-foreground'>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className='mt-16 text-center'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className='text-lg'>
            Still have questions?{' '}
            <a href='#' className='text-primary font-medium'>
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
