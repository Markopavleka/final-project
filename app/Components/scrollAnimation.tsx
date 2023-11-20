'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
}

export default function ScrollAnimation({ children }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.7 1'],
  });

  // Adjust the range for fade-in and fade-out
  const opacityProgress = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9, 1],
    [0.1, 1, 1, 0.1],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: opacityProgress,
        transition: 'opacity 1s ease',
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollAnimationFirstElement({
  children,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });

  // Only fade out without a fade-in effect
  const opacityProgress = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [1, 1, 1, 0.2, 0],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: opacityProgress,
        transition: 'opacity 0.3s ease', // Adjust the duration and easing as needed
      }}
    >
      {children}
    </motion.div>
  );
}
