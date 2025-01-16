'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';

const projects = [
  {
    url: "https://github.com/AravinthSS07/bubblebliss",
    client: "Bubble Bliss",
    location: "Chennai",
    services: "Design & Development",
    year: "2023",
    category: "Development",
    src: "6.png",
    color: "#EFE8D3"
  },
  {
    url: "https://github.com/AravinthSS07/navify-unity",
    client: "3D Indoor Navigation ",
    location: "Chennai",
    services: "Interaction & Development",
    year: "2024",
    category: "Backend",
    src: "3.png",
    color: "#000000"
  },
  {
    url: "https://github.com/AravinthSS07/iot_based_dustbins",
    client: "IoT Based Dustbin",
    location: "Chennai",
    services: "Design & Development",
    year: "2022",
    category: "Development",
    src: "7.png",
    color: "#8C8C8C"
  },
  {
    url: "https://github.com/Anjana-1403/localshopper",
    client: "Nook ‘n Corner",
    location: "Chennai",
    services: "Design & Development",
    year: "2024",
    category: "Development",
    src: "4.png",
    color: "#EFE8D3"
  },
  {
    url: "https://github.com/Shit-Heads/ImmersiveNurseGame",
    client: "Nurse Simulator",
    location: "Chennai",
    services: "Design & Development",
    year: "2025",
    category: "Backend",
    src: "1.png",
    color: "#706D63"
  },
  {
    url: "https://github.com/Shit-Heads/kynhackathon",
    client: "News Aggregator",
    location: "Chennai",
    services: "Design & Development",
    year: "2025",
    category: "Development",
    src: "2.png",
    color: "#000000"
  },
  {
    url: "https://github.com/AravinthSS07/EmotionBasedMusicPlayer",
    client: "Music Recommendation Using ML",
    location: "Chennai",
    services: "Design & Development",
    year: "2023",
    category: "Backend",
    src: "5.png",
    color: "#8C8C8C"
  },
];

const scaleAnimation = {
  initial: {scale: 0, x:"-50%", y:"-50%"},
  enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeView, setActiveView] = useState('list');
  const [modal, setModal] = useState({active: false, index: 0});
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
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"});
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"});
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"});
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"});
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"});
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"});
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  }

  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({active, index});
  }

  const navigateToUrl = (url) => {
    window.open(url, '_blank');
  };

  const filterCounts = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});


  // Filter projects based on the selected filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
      <h1>
        Working on<br />innovative projects
      </h1>

      <div className={styles.filters}>
        <div className={styles.filterButtons}>
          <button onClick={() => setActiveFilter('All')} className={activeFilter === 'All' ? styles.active : ''}>
            All <span>{projects.length}</span>
          </button>
          <button onClick={() => setActiveFilter('Backend')} className={activeFilter === 'Backend' ? styles.active : ''}>
            Backend <span>{filterCounts['Backend'] || 0}</span>
          </button>
          <button onClick={() => setActiveFilter('Development')} className={activeFilter === 'Development' ? styles.active : ''}>
            Development <span>{filterCounts['Development'] || 0}</span>
          </button>
        </div>

        <div className={styles.viewButtons}>
          <button onClick={() => setActiveView('list')} className={activeView === 'list' ? styles.active : ''}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
          
          <button onClick={() => setActiveView('grid')} className={activeView === 'grid' ? styles.active : ''}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.projectsList}>
        <div className={styles.tableHeader}>
          <div>PROJECT</div>
          <div>LOCATION</div>
          <div>SERVICES</div>
          <div>YEAR</div>
        </div>

        {filteredProjects.map((project, index) => (
          <div 
            key={index} 
            className={styles.projectItem}
            onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}}
            onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}}
            onClick={() => {navigateToUrl(project.url)}}
          >
            <div>{project.client}</div>
            <div>{project.location}</div>
            <div>{project.services}</div>
            <div>{project.year}</div>
          </div>
        ))}
      </div>

      <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={styles.modalContainer}>
        <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div className={styles.modal} style={{backgroundColor: color}} key={`modal_${index}`}>
                <Image 
                  src={`./images/${src}`}
                  width={300}
                  height={0}
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}></motion.div>
      <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"}>View</motion.div>
    </main>
  );
}
