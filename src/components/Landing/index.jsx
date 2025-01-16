'use client';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import styles from './style.module.scss';
import { slideUp } from './animation';

export default function Home() {
  const [showSpline, setShowSpline] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    // Detect if it's mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
  
      if (scrollY < viewportHeight * 0.5) {
        setShowSpline(true);
      } else {
        setShowSpline(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: '-500px',
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(slider.current, { xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      className={styles.landing}
    >
      {showSpline && (
        <Suspense fallback={<div>Loading...</div>}>
          <iframe 
            src='https://my.spline.design/kidsplaygroundphysicscopy-396d687935cc61149a842c2985f4cf6e/' 
            className={styles.iframe}
            width='100%' 
            height='100%'>
          </iframe>
        </Suspense>
      )}
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p>Gowtham thibhu -</p>
          <p>Gowtham thibhu -</p>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed={0.1}
        className={styles.description}
      >
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
            fill="white"
          />
        </svg>
        <p>Software Engineer</p>
      </div>
    </motion.main>
  );
}