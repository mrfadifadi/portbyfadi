import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

const projectData = [
    {
        id: 1,
        title: 'Abstract Geometry',
        category: '3d',
        categoryLabel: '3D Design',
        color: '#18181B'
    },
    {
        id: 2,
        title: 'Interview Production',
        category: 'video',
        categoryLabel: 'Video Editing',
        color: '#2563EB'
    },
    {
        id: 3,
        title: 'Interior Visualization',
        category: '3d',
        categoryLabel: '3D Design',
        color: '#3F3F46'
    },
    {
        id: 4,
        title: 'Kinetic Typography',
        category: 'motion',
        categoryLabel: 'Motion Graphics',
        color: '#18181B'
    },
    {
        id: 5,
        title: 'Product Render',
        category: '3d',
        categoryLabel: '3D Design',
        color: '#27272A'
    },
    {
        id: 6,
        title: 'Cinematic Edit',
        category: 'video',
        categoryLabel: 'Video Editing',
        color: '#2563EB'
    },
];

function useInView(ref, options = {}) {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1, ...options });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return isInView;
}

export default function ProjectGrid() {
    const { t } = useLang();
    const [activeFilter, setActiveFilter] = useState('all');
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef);

    const filters = [
        { key: 'all', label: t.projects.filterAll },
        { key: 'video', label: t.projects.filterVideo },
        { key: '3d', label: t.projects.filter3d },
        { key: 'motion', label: t.projects.filterMotion },
    ];

    const filtered = activeFilter === 'all'
        ? projectData
        : projectData.filter(p => p.category === activeFilter);

    return (
        <section className="projects" id="work" ref={sectionRef}>
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="section-header__label">{t.projects.label}</p>
                <h2 className="section-header__title">{t.projects.title}</h2>
            </motion.div>

            <motion.div
                className="projects__filters"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                {filters.map(f => (
                    <button
                        key={f.key}
                        className={`projects__filter-btn ${activeFilter === f.key ? 'projects__filter-btn--active' : ''}`}
                        onClick={() => setActiveFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </motion.div>

            <motion.div className="projects__list" layout>
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            className="project-list-row"
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h3 className="project-list-row__title">{project.title}</h3>
                            <span className="project-list-row__category">{project.categoryLabel}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
