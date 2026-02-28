import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

export default function Navbar() {
    const { t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const scrollTo = (id) => {
        setMobileOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const navItems = [
        { label: t.nav.work, id: 'work' },
        { label: t.nav.about, id: 'about' },
        { label: t.nav.showreel, id: 'showreel' },
        { label: t.nav.contact, id: 'contact' },
    ];

    return (
        <>
            <motion.nav
                className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
                <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    IYED
                </div>

                <ul className="nav__links">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <span className="nav__link" onClick={() => scrollTo(item.id)}>
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>

                <button
                    className={`nav__menu-btn ${mobileOpen ? 'nav__menu-btn--open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-nav mobile-nav--open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className="mobile-nav__link"
                                onClick={() => scrollTo(item.id)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {item.label}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
