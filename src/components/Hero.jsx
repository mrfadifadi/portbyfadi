import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import HeroScene from './HeroScene';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.8 + i * 0.15,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

const letterAnim = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: 0.6 + i * 0.05,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Hero() {
    const { t } = useLang();
    const nameLetters = t.hero.name.split('');

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="hero">
            <div className="hero__canvas-wrap">
                <Suspense fallback={null}>
                    <HeroScene />
                </Suspense>
            </div>

            <div className="hero__content">
                <motion.p
                    className="hero__greeting"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    {t.hero.greeting}
                </motion.p>

                <h1 className="hero__name">
                    {nameLetters.map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={letterAnim}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                            style={{ display: 'inline-block' }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className="hero__role"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                >
                    <strong>{t.hero.role}</strong> {t.hero.roleAnd} <strong>{t.hero.role2}</strong>
                </motion.p>

                <motion.div
                    className="hero__cta-group"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                >
                    <button className="hero__cta hero__cta--primary" onClick={scrollToWork}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        {t.hero.cta}
                    </button>
                    <button className="hero__cta hero__cta--secondary" onClick={scrollToContact}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        {t.hero.cta2}
                    </button>
                </motion.div>
            </div>

            <motion.div
                className="hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span>{t.hero.scroll}</span>
                <div className="hero__scroll-line"></div>
            </motion.div>
        </section>
    );
}
