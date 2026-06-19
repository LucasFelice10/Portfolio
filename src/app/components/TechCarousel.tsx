import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "../context/LanguageContext";

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

const TECHS = [
  { name: "HTML5",      src: BASE + "html5/html5-original.svg",             filter: "" },
  { name: "CSS3",       src: BASE + "css3/css3-original.svg",               filter: "" },
  { name: "JavaScript", src: BASE + "javascript/javascript-original.svg",   filter: "" },
  { name: "React",      src: BASE + "react/react-original.svg",             filter: "" },
  { name: "TypeScript", src: BASE + "typescript/typescript-original.svg",   filter: "" },
  { name: "Python",     src: BASE + "python/python-original.svg",           filter: "" },
  {
    name: "SQL",
    src: BASE + "postgresql/postgresql-original.svg",
    filter: "",
  },
  { name: "MongoDB",    src: BASE + "mongodb/mongodb-original.svg",         filter: "" },
  { name: "Git",        src: BASE + "git/git-original.svg",                 filter: "" },
  {
    name: "GitHub",
    src: BASE + "github/github-original.svg",
    filter: "brightness(0) invert(1)",
  },
  {
    name: "Vercel",
    src: "", // inline SVG
    filter: "",
    isVercel: true,
  },
];

const DOUBLED = [...TECHS, ...TECHS];

function VercelLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#f0ebff"
      style={{ width: "40px", height: "40px" }}
      aria-label="Vercel"
    >
      <path d="M12 2L24 22H0L12 2Z" />
    </svg>
  );
}

export function TechCarousel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  return (
    <section
      id="skills"
      ref={ref}
      className="py-28 border-b overflow-hidden"
      style={{ borderColor: "rgba(167,139,250,0.1)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-['JetBrains_Mono'] mb-4 flex items-center gap-3"
          style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#d946ef" }}
        >
          <span
            className="inline-block w-6 h-px"
            style={{ background: "linear-gradient(90deg,#d946ef,#7c3aed)" }}
          />
          {t("skills_label")}
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1 }}
          >
            {t("skills_heading")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-['JetBrains_Mono'] text-[#4a3560]"
            style={{ fontSize: "0.65rem", letterSpacing: "0.1em" }}
          >
            {t("skills_pause")}
          </motion.p>
        </div>
      </div>

      {/* Top fade edge */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: "120px",
            background: "linear-gradient(90deg,#0d0a16,transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: "120px",
            background: "linear-gradient(-90deg,#0d0a16,transparent)",
          }}
        />

        {/* Carousel track */}
        <div
          className="flex overflow-hidden"
          style={{ paddingBlock: "12px" }}
        >
          <div
            className="flex gap-6 carousel-track"
            style={{
              animation: "carousel-scroll 28s linear infinite",
              width: "max-content",
            }}
          >
            {DOUBLED.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex flex-col items-center justify-center gap-3 flex-shrink-0 group"
                style={{
                  width: "100px",
                  height: "90px",
                  border: "1px solid rgba(167,139,250,0.14)",
                  background: "rgba(22,14,36,0.6)",
                  borderRadius: "6px",
                  transition: "border-color 0.3s, background 0.3s, transform 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(217,70,239,0.5)";
                  el.style.background = "rgba(217,70,239,0.08)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(167,139,250,0.14)";
                  el.style.background = "rgba(22,14,36,0.6)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {tech.isVercel ? (
                  <VercelLogo />
                ) : (
                  <img
                    src={tech.src}
                    alt={tech.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "contain",
                      filter: tech.filter || undefined,
                    }}
                  />
                )}
                <span
                  className="font-['JetBrains_Mono']"
                  style={{ fontSize: "0.6rem", color: "#9b7fc2", letterSpacing: "0.06em" }}
                >
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
