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

const showreels = [
    { id: 1, src: '/videos/lol.mp4', title: 'Interview Post' },
    { id: 2, src: '/videos/lool.mp4', title: 'Creative Edit' },
    { id: 3, src: '/videos/interview.mp4', title: 'Motion Graphic' }
];

export default function Showreel() {
    const { t } = useLang();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef);

    // Track playing state for each video individually
    const [playingState, setPlayingState] = useState({});
    const videoRefs = useRef({});

    const handlePlay = (id, e) => {
        e.stopPropagation();
        const video = videoRefs.current[id];
        if (video) {
            if (playingState[id]) {
                video.pause();
                setPlayingState(prev => ({ ...prev, [id]: false }));
            } else {
                // Pause all other videos
                Object.keys(videoRefs.current).forEach(vidId => {
                    if (vidId != id && videoRefs.current[vidId]) {
                        videoRefs.current[vidId].pause();
                        setPlayingState(prev => ({ ...prev, [vidId]: false }));
                    }
                });

                video.play();
                setPlayingState(prev => ({ ...prev, [id]: true }));
            }
        }
    };

    return (
        <section className="showreel" id="showreel" ref={sectionRef}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="section-header__label">{t.showreel.label}</p>
                <h2 className="section-header__title">{t.showreel.title}</h2>
            </motion.div>

            <div className="showreel__grid">
                {showreels.map((reel, i) => (
                    <motion.div
                        key={reel.id}
                        className="showreel__wrapper"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => handlePlay(reel.id, e)}
                    >
                        <video
                            ref={el => videoRefs.current[reel.id] = el}
                            className="showreel__video"
                            src={reel.src}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            style={{ opacity: playingState[reel.id] ? 1 : 0.6 }}
                        />
                        {!playingState[reel.id] && (
                            <div className="showreel__overlay">
                                <button className="showreel__play" aria-label="Play showreel">
                                    <svg viewBox="0 0 24 24">
                                        <polygon points="5,3 19,12 5,21" />
                                    </svg>
                                </button>
                                <span className="showreel__label">{t.showreel.play}</span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
