'use client';   
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import styles1 from './style1.module.scss';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { slideUp, opacity } from '../../components/Description/animation';
import { Parallax } from 'react-parallax';

const slider1 = [
    {
        color: "#e3e5e7",
        src: "skills/s11.jpg"
    },
    {
        color: "#d6d7dc",
        src: "skills/s1.jpg"
    },
    {
        color: "#e3e3e3",
        src: "skills/s2.jpg"
    },
    {
        color: "#21242b",
        src: "skills/s3.png"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        src: "skills/s4.jpg"
    },
    {
        color: "#e5e0e1",
        src: "skills/s5.png"
    },
    {
        color: "#d7d4cf",
        src: "skills/s6.jpg"
    },
    {
        color: "#e1dad6",
        src: "skills/s7.jpg"
    }
]

const slider3 = [
    {
        color: "#e3e5e7",
        src: "skills/s8.jpg"
    },
    {
        color: "#d6d7dc",
        src: "skills/s9.jpg"
    },
    {
        color: "#e3e3e3",
        src: "skills/s10.jpg"
    },
    {
        color: "#21242b",
        src: "skills/s11.jpg"
    }
]

export default function Index() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    {/*Description*/}
    const phrase = "Proficient in developing efficient code and debugging complex issues across languages like Python, and C.";
    const phrase1 = "Hi there! I'm a software engineer based in Chennai, India. I'm passionate about creating software that is both efficient and user-friendly. I have experience in developing web applications, machine learning models, and embedded systems. I'm always looking for new opportunities to learn and grow as a developer.";
    const description = useRef(null);
    const isInView = useInView(description)
    

    return (
        <div>
            <div ref={description} className={styles1.description}>
                <div className={styles1.body}>
                    <p>
                    {
                        phrase.split(" ").map( (word, index) => {
                            return <span key={index} className={styles1.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                        })
                    }
                    </p>
                    <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>Experienced with algorithms, machine learning, and embedded systems through projects in AI, web development, and IoT.</motion.p>

                </div>
            </div>
            {/*Parallax*/}
            <div className={styles.parallaxText}>
                <div ref={description} className={styles.description}>
                    <div className={styles.body}>
                        <p>
                        {
                            phrase1.split(" ").map( (word, index) => {
                                return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                            })
                        }
                        </p>
                    </div>
                </div> 
            </div>
            <div className={styles.parallaxContainer}>
                <div className={styles.parallaxImage}>            
                    <Parallax 
                        bgImage="./images/contact1.jpg" 
                        strength={500}
                        className={styles.parallax}
                        bgImageAlt="parallax"
                        bgImageStyle={{ objectFit: 'cover', objectPosition: 'center', width: '70%' }}>
                        <div style={{height: "100vh"}}></div>
                    </Parallax>
                </div>
            </div>


            {/*Slider*/}
            <div ref={container} className={styles.slidingImages}>
                <div className={styles.Textparallax}>
                <Parallax 
                    strength={500}
                    className={styles.parallax}
                    >       
                    <div style={{height: "70vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <p style={{ fontSize: "6rem", fontWeight: "200px", color: "black", textAlign: "center", marginBottom: "250px"}}>
                            Let My Skills Speak <br /> for Themselves
                        </p>
                    </div>
                </Parallax>
                </div>
            <motion.div style={{x: x1}} className={styles.slider}>
                    {
                        slider1.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div className={styles.imageContainer}>
                                    <Image 
                                    fill={true}
                                    alt={"image"}
                                    src={`./images/${project.src}`}/>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div style={{x: x2}} className={styles.slider}>
                    {
                        slider2.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div key={index} className={styles.imageContainer}>
                                    <Image 
                                    fill={true}
                                    alt={"image"}
                                    src={`./images/${project.src}`}/>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div style={{x: x1}} className={styles.slider}>
                    {
                        slider3.map( (project, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                <div className={styles.imageContainer}>
                                    <Image 
                                    fill={true}
                                    alt={"image"}
                                    src={`./images/${project.src}`}/>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                
            </div>
        </div>
        
    )
}
