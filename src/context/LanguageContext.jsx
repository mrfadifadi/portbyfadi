import { createContext, useContext, useEffect } from 'react';

const translations = {
    dir: 'ltr',
    lang: 'en',
    nav: {
        work: 'Skills',
        about: 'About',
        showreel: 'Showreel',
        contact: 'Contact',
    },
    hero: {
        greeting: 'Hello, I\'m',
        name: 'IYED',
        role: 'Video Editor',
        roleAnd: '&',
        role2: '3D Designer',
        cta: 'View My Work',
        cta2: 'Get In Touch',
        scroll: 'Scroll',
    },
    projects: {
        label: 'Selected Projects',
        title: 'My Skills',
        filterAll: 'All',
        filterVideo: 'Video Editing',
        filter3d: '3D Design',
        filterMotion: 'Motion Graphics',
    },
    about: {
        label: 'About Me',
        title: 'Who I Am',
        intro: 'Creative professional turning ideas into visual experiences.',
        description: 'I\'m Iyed, a passionate video editor and 3D designer with years of experience crafting compelling visual narratives. From corporate videos to stunning 3D visualizations, I bring creativity and technical precision to every project. My work is focused on telling stories that resonate and creating visuals that leave a lasting impression.',
        stat1Value: '50+',
        stat1Label: 'Projects Completed',
        stat2Value: '3+',
        stat2Label: 'Years Experience',
        stat3Value: '30+',
        stat3Label: 'Happy Clients',
    },
    showreel: {
        label: 'Showreel',
        title: 'Featured Reel',
        play: 'Play Showreel',
    },
    contact: {
        title: 'Let\'s Create\nSomething Great',
        subtitle: 'Ready to bring your vision to life? Let\'s collaborate on your next project.',
        email: 'Email Me',
        social: 'Social Media',
    },
    footer: {
        text: '© 2026 Fadi Zidani. All rights reserved.',
    },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    useEffect(() => {
        document.documentElement.dir = translations.dir;
        document.documentElement.lang = translations.lang;
    }, []);

    return (
        <LanguageContext.Provider value={{ lang: 'en', t: translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
