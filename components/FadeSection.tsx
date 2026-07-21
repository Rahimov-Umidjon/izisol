'use client';
import { motion } from 'framer-motion';

interface FadeSectionProps {
  title: string;
  text: string;
}

export default function FadeSection({ title, text }: FadeSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-24 px-8"
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-lg text-gray-500">{text}</p>
    </motion.section>
  );
}