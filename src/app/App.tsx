import { LanguageProvider } from "./context/LanguageContext";
import { CustomCursor } from "./components/CustomCursor";
import { FilmGrain } from "./components/FilmGrain";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechCarousel } from "./components/TechCarousel";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0d0a16]">
        <CustomCursor />
        <FilmGrain />
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechCarousel />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
