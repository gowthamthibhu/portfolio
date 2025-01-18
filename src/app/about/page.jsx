'use client';
import { useRef, useState, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import styles from './style.module.scss';
import {useTransform } from 'framer-motion';
import Rounded from '../../common/RoundedButton';

export default function Index() {
    const services = [
        {
            number: "01",
            title: "Myself",
            description: "Hi, I’m Gowtham!, I am a highly skilled software developer proficient in Python, C, and the MERN stack. With experience in developing scalable applications, debugging complex issues, and implementing machine learning algorithms, I aim to create solutions that drive progress and efficiency. My career focuses on combining technology with innovation to make a positive impact."
        },
        {
            number: "02",
            title: "Education",
            description: "I am currently pursuing a Bachelor of Engineering in Computer Science and Engineering at Rajalakshmi Institute of Technology (2022–2026). Prior to this, I completed my HSC at The Ashram Matriculation Higher Secondary School. My education has provided me with a strong foundation in software development, problem-solving, and technical skills."
        },
        {
            number: "03",
            title: "Interests",
            description: "As a tech enthusiast, I’m passionate about keeping up with the latest technological advancements and participating in coding competitions. I’ve been working on projects like Library Automation and real-time mobile apps, aiming to create solutions that matter and drive meaningful change. Let’s innovate together!"
        }
    ];

    const description = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const { scrollYProgress } = useScroll({
        target: description.current,
        offset: ["start end", "end end"]
    });
    const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Call handler right away so state gets updated with initial window size
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check visibility on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.5 }
        );

        if (description.current) {
            observer.observe(description.current);
        }

        return () => {
            if (description.current) {
                observer.unobserve(description.current);
            }
        };
    }, []);

    return (
        <div className={styles.container}>
            <div ref={description} className={styles.description}>
                <div className={styles.body}>
                    <p>
                        {"Hi there!".split(" ").map((word, index) => (
                            <span key={index} className={styles.mask}>
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: isInView ? 0 : "100%" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isInView ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to my portfolio! Let's build something amazing.
                    </motion.p>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                            <Rounded  backgroundColor={"#ECEBDE"} className={styles.button}>
                            <p>Get in touch</p>
                            </Rounded>
                    </motion.div>
                    <motion.svg>
                    </motion.svg>
                </div>
            </div>
            <div className={styles.parallaxContainer}>
                <div className={styles.parallaxImage}>
                  <Parallax 
                    bgImage="./images/contact1.jpg" 
                    strength={500}
                    className={styles.parallax}
                    bgImageAlt="parallax"
                    bgImageStyle={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      width: isMobile ? '80%' : '50%',
                      height: isMobile ? '80%' : '100%',
                    }}
                  >
                    <div style={{ height: "100vh" }}></div>
                  </Parallax>
                </div>
            </div>
            <div className={styles.aboutContainer}>
                <h1 className={styles.mainTitle}>My Journey & Expertise ...</h1>
                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <motion.div 
                            key={service.number}
                            className={styles.serviceCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <span className={styles.serviceNumber}>{service.number}</span>
                            <h2 className={styles.serviceTitle}>{service.title}</h2>
                            <p className={styles.serviceDescription}>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
