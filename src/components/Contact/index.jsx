import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import Link from 'next/link';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                            fill={true}
                            alt={"image"}
                            src={`/images/bg.jpg`}
                            />
                        </div>
                        <h2>Contact Me!</h2>
                    </span>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Link href="/contact" passHref>
                            <Rounded  backgroundColor={"#ECEBDE"} className={styles.button}>
                            <p>Get in touch</p>
                            </Rounded>
                        </Link>
                    </motion.div>
                    <motion.svg>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <p>gowthamthibhu@gmail.com</p>
                        </Rounded>
                        <Rounded>
                            <p>Chennai, India</p>
                        </Rounded>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>Version</h3>
                            <p>2025 © Edition</p>
                        </span>
                        <span>
                            <h3>Design</h3>
                            <p>Designed by Gowthamthibhu</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <h3>socials</h3>
                            <Magnetic>
                                <p>Linkedin</p>
                            </Magnetic>
                        </span>
                        <Magnetic>
                            <p>Instagram</p>
                        </Magnetic>
                        <Magnetic>
                            <p>Whatsapp</p>
                        </Magnetic>
                        <Magnetic>
                            <p>Facebook</p>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}