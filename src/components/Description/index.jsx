import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Link from 'next/link';
import Rounded from '../../common/RoundedButton';

export default function Description() {
    const phrase = "Proficient in developing efficient code and debugging complex issues across languages like Python, and C.";
    const description = useRef(null);
    const isInView = useInView(description);

    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map((word, index) => {
                        return (
                            <span key={index} className={styles.mask}>
                                <motion.span 
                                    variants={slideUp} 
                                    custom={index} 
                                    animate={isInView ? "open" : "closed"} 
                                    key={index}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        );
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
                    Experienced with algorithms, machine learning, and embedded systems through projects in AI, web development, and IoT.
                </motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Link href="/about" passHref>
                        <Rounded className={styles.button}>
                            <p>About me</p>
                        </Rounded>
                    </Link>
                </div>
            </div>
        </div>
    );
}