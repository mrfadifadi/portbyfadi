import { LanguageProvider } from './context/LanguageContext';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import SkillsMarquee from './components/SkillsMarquee';
import About from './components/About';
import Showreel from './components/Showreel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveTimelineGrid from './components/InteractiveTimelineGrid';

function App() {
  return (
    <LanguageProvider>
      <PageLoader />
      <InteractiveTimelineGrid style={{ zIndex: 9999 }} />
      <div className="grain-overlay" aria-hidden="true"></div>
      <Navbar />
      <main>
        <Hero />
        <SkillsMarquee />
        <ProjectGrid />
        <About />
        <Showreel />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
