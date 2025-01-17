'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';

const projects = [
  {
    url: "https://github.com/AravinthSS07/iot_based_dustbins",
    title: "IoT BASED DUSTBIN ",
    src: "7.png",
    color: "#8C8C8C"
  },
  {
    url: "https://github.com/AravinthSS07/bubblebliss",
    title: "Bubble Bliss",
    src: "6.png",
    color: "#000000"
  },
  {
    url: "https://github.com/Anjana-1403/localshopper",
    title: "Nook 'n Corner",
    src: "4.png",
    color: "#EFE8D3"
  },
  {
    url: "https://github.com/Shit-Heads/ImmersiveNurseGame",
    title: "Nurse Simulator",
    src: "1.png",
    color: "#706D63"
  }
]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {
  const [modal, setModal] = useState({active: false, index: 0})
  const [isMobile, setIsMobile] = useState(false);
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!isMobile) {
      //Move Container
      xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
      yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
      //Move cursor
      xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
      yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
      //Move cursor label
      xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
      yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile])

  const moveItems = (x, y) => {
    if (!isMobile && xMoveContainer.current) {
      xMoveContainer.current(x)
      yMoveContainer.current(y)
      xMoveCursor.current(x)
      yMoveCursor.current(y)
      xMoveCursorLabel.current(x)
      yMoveCursorLabel.current(y)
    }
  }

  const manageModal = (active, index, x, y) => {
    if (!isMobile) {
      moveItems(x, y)
      setModal({active, index})
    }
  }

  return (
    <main 
      onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} 
      className={styles.projects}
    >
      {isMobile ? (
        // Mobile view
        <div className={styles.mobileBody}>
          {projects.map((project, index) => (
            <Link href={project.url} key={index} className={styles.mobileProject}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={`./images/${project.src}`}
                  width={300}
                  height={0}
                  alt={project.title}
                  className={styles.projectImage}
                />
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.title}</h3>
                <p>Design & Development</p>
                <span className={styles.year}>2024</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Desktop view
        <div className={styles.body}>
          {projects.map((project, index) => {
            return <Project 
              index={index} 
              title={project.title} 
              manageModal={manageModal} 
              key={index} 
            />
          })}
        </div>
      )}
      
      <div className={styles.moreWork}>
        <Link href="/projects" passHref>
          <Rounded>
            <p>More work</p>
          </Rounded>
        </Link>
      </div>

      {!isMobile && (
        <>
          <motion.div 
            ref={modalContainer} 
            variants={scaleAnimation} 
            initial="initial" 
            animate={active ? "enter" : "closed"} 
            className={styles.modalContainer}
          >
            <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
              {projects.map((project, index) => {
                const { src, color } = project
                return <div 
                  className={styles.modal} 
                  style={{backgroundColor: color}} 
                  key={`modal_${index}`}
                >
                  <Image 
                    src={`./images/${src}`}
                    width={300}
                    height={0}
                    alt="image"
                  />
                </div>
              })}
            </div>
          </motion.div>
          <motion.div 
            ref={cursor} 
            className={styles.cursor} 
            variants={scaleAnimation} 
            initial="initial" 
            animate={active ? "enter" : "closed"}
          />
          <motion.div 
            ref={cursorLabel} 
            className={styles.cursorLabel} 
            variants={scaleAnimation} 
            initial="initial" 
            animate={active ? "enter" : "closed"}
          >
            View
          </motion.div>
        </>
      )}
    </main>
  )
}