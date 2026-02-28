import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

function useInView(ref) {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isInView;
}

export default function About() {
    const { t } = useLang();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef);

    return (
        <section className="about" id="about" ref={sectionRef}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="section-header__label">{t.about.label}</p>
                <h2 className="section-header__title">{t.about.title}</h2>
            </motion.div>

            <div className="about__grid">
                <motion.div
                    className="about__image-wrap"
                    initial={{ opacity: 0, x: -60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        className="about__image"
                        src="/ana.webp"
                        alt="IYED - Video Editor & 3D Designer"
                    />
                    <div className="about__image-accent"></div>
                </motion.div>

                <motion.div
                    className="about__text"
                    initial={{ opacity: 0, x: 60 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h3 className="about__intro">{t.about.intro}</h3>
                    <p className="about__description">{t.about.description}</p>

                    <div className="about__stats">
                        <div className="about__stat">
                            <div className="about__stat-value">{t.about.stat1Value}</div>
                            <div className="about__stat-label">{t.about.stat1Label}</div>
                        </div>
                        <div className="about__stat">
                            <div className="about__stat-value">{t.about.stat2Value}</div>
                            <div className="about__stat-label">{t.about.stat2Label}</div>
                        </div>
                        <div className="about__stat">
                            <div className="about__stat-value">{t.about.stat3Value}</div>
                            <div className="about__stat-label">{t.about.stat3Label}</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
