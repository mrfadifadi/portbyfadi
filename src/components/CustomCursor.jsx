import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const onMouseMove = useCallback((e) => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
    }, [isVisible]);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        const interactiveElements = document.querySelectorAll(
            'a, button, .project-card, .nav__link, .hero__cta, .contact__link, .nav__logo, .showreel__wrapper'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [onMouseMove]);

    // Don't show on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            <motion.div
                className="custom-cursor"
                animate={{
                    x: pos.x - 6,
                    y: pos.y - 6,
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
            />
            <motion.div
                className="custom-cursor-ring"
                animate={{
                    x: pos.x - 24,
                    y: pos.y - 24,
                    scale: isHovering ? 2 : 1,
                    opacity: isVisible ? (isHovering ? 0.4 : 0.15) : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
            />
        </>
    );
}
