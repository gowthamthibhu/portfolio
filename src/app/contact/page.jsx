'use client';
import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import { useState } from 'react';

export default function ContactForm() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });
    
    const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            email: '',
            message: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Please fill in all required fields');
            return;
        }

        const response = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Email sent successfully');
        } else {
            alert('Error sending email');
        }
    };

    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                                fill={true}
                                alt={"image"}
                                src={`./images/bg.jpg`}
                            />
                        </div>
                        <h2>Where Creativity <br /> Meets Technology</h2>
                    </span>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Rounded backgroundColor={"#A59D84"} className={styles.button} onClick={handleSubmit}>
                            <p>Submit</p>
                        </Rounded>
                    </motion.div>
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.formSection}>
                    <div className={styles.formField}>
                        <span>01</span>
                        <div>
                            <label>Whats your name?</label>
                            <input type="text" name="name" placeholder="Your name*" value={formData.name} onChange={handleChange} />
                            {errors.name && <div className={styles.error}>{errors.name}</div>}
                        </div>
                    </div>
                    <div className={styles.formField}>
                        <span>02</span>
                        <div>
                            <label>Whats your email?</label>
                            <input type="email" name="email" placeholder="yourname@gmail.com *" value={formData.email} onChange={handleChange} />
                            {errors.email && <div className={styles.error}>{errors.email}</div>}
                        </div>
                    </div>
                    <div className={styles.formField}>
                        <span>03</span>
                        <div>
                            <label>What do you want to talk about?</label>
                            <input type="text" name="message" placeholder="Type here... *" value={formData.message} onChange={handleChange} />
                            {errors.message && <div className={styles.error}>{errors.message}</div>}
                        </div>
                    </div>
                </form>

                <div className={styles.nav}>
                    <Rounded>
                        <p>gowthamthibhu@gmail.com</p>
                    </Rounded>
                    <Rounded>
                        <p>India, Tamil Nadu</p>
                    </Rounded>
                </div>

                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>MY DETAILS</h3>
                            <p>Gowthamthibhu T</p>
                            <p>Location: Chennai</p>
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
    );
}