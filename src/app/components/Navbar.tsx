import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang, type TKey } from "../context/LanguageContext";

const NAV_LINKS: { key: TKey; id: string }[] = [
  { key: "nav_about", id: "about" },
  { key: "nav_skills", id: "skills" },
  { key: "nav_projects", id: "projects" },
  { key: "nav_experience", id: "experience" },
  { key: "nav_contact", id: "contact" },
];

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0d0a16]/90 backdrop-blur-md border-b border-white/5" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-['Bricolage_Grotesque'] tracking-tight hover:opacity-80 transition-opacity duration-200"
            style={{ fontSize: "1.15rem", fontWeight: 800 }}
          >
            LF
            <span
              style={{
                background: "linear-gradient(135deg,#e879f9,#a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              .
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ key, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-['DM_Sans'] text-[#9b7fc2] hover:text-[#f0ebff] transition-colors duration-200 tracking-wide"
                style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}
              >
                {t(key)}
              </button>
            ))}

            {/* Language toggle */}
            <div
              className="flex items-center border overflow-hidden"
              style={{ borderColor: "rgba(167,139,250,0.3)", borderRadius: "2px" }}
            >
              {(["es", "en"] as const).map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1.5 transition-all duration-200"
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "'JetBrains Mono'",
                    letterSpacing: "0.06em",
                    background: lang === l ? "linear-gradient(135deg,#d946ef,#7c3aed)" : "transparent",
                    color: lang === l ? "#fff" : "#9b7fc2",
                    borderRight: i === 0 ? "1px solid rgba(167,139,250,0.3)" : "none",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="font-['DM_Sans'] text-sm text-white px-5 py-2 transition-all duration-200 hover:opacity-90"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "linear-gradient(135deg,#d946ef,#7c3aed)",
                borderRadius: "2px",
              }}
            >
              {t("nav_hire")}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "linear-gradient(90deg,#e879f9,#a855f7)",
                transform: menuOpen ? "rotate(45deg) translate(0,7px)" : "",
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "linear-gradient(90deg,#e879f9,#a855f7)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: "linear-gradient(90deg,#e879f9,#a855f7)",
                transform: menuOpen ? "rotate(-45deg) translate(0,-7px)" : "",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background: "#0d0a16" }}
          >
            {/* Language toggle mobile */}
            <div className="flex items-center gap-3 mb-4">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    fontFamily: "'JetBrains Mono'",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    background: lang === l ? "linear-gradient(135deg,#d946ef,#7c3aed)" : "transparent",
                    color: lang === l ? "#fff" : "#9b7fc2",
                    border: "1px solid rgba(167,139,250,0.3)",
                    borderRadius: "2px",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {NAV_LINKS.map(({ key, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(id)}
                className="font-['Bricolage_Grotesque'] hover:opacity-70 transition-opacity duration-200"
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg,#f0abfc,#a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t(key)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
