import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

const slider1 = [
    {
        color: "#e3e5e7",
        src: "skills/s1.jpg"
    },
    {
        color: "#d6d7dc",
        src: "skills/s4.jpg"
    },
    {
        color: "#e3e3e3",
        src: "skills/s5.png"
    },
    {
        color: "#21242b",
        src: "skills/s6.jpg"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        src: "skills/s7.jpg"
    },
    {
        color: "#e5e0e1",
        src: "skills/s9.jpg"
    },
    {
        color: "#d7d4cf",
        src: "skills/s8.jpg"
    },
    {
        color: "#e1dad6",
        src: "skills/s10.jpg"
    }
]

export default function Index() {
    const [isMobile, setIsMobile] = useState(false);
    const container = useRef(null);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    return (
        <div ref={container} className={styles.slidingImages}>
            {isMobile ? (
                // Mobile view - simple grid layout
                <div className={styles.mobileGrid}>
                    {[...slider1, ...slider2].map((project, index) => (
                        <div key={index} className={styles.mobileProject}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`./images/${project.src}`}
                                    alt="project image"
                                    fill={true}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Desktop view - original sliding animation
                <>
                    <motion.div style={{x: x1}} className={styles.slider}>
                        {slider1.map((project, index) => (
                            <div key={index} className={styles.project} style={{backgroundColor: project.color}}>
                                <div className={styles.imageContainer}>
                                    <Image 
                                        fill={true}
                                        alt={"image"}
                                        src={`./images/${project.src}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div style={{x: x2}} className={styles.slider}>
                        {slider2.map((project, index) => (
                            <div key={index} className={styles.project} style={{backgroundColor: project.color}}>
                                <div className={styles.imageContainer}>
                                    <Image 
                                        fill={true}
                                        alt={"image"}
                                        src={`./images/${project.src}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                    <motion.div style={{height}} className={styles.circleContainer}>
                        <div className={styles.circle}></div>
                    </motion.div>
                </>
            )}
        </div>
    )
}