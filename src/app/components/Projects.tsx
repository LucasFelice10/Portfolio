import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLang, type TKey } from "../context/LanguageContext";
import recetasImg from "../../assets/projects/recetas-del-patron.webp";
import dmdImg from "../../assets/projects/dmd-reciclados.webp";
import pesadasImg from "../../assets/projects/pesadas-dmd.webp";
import gymImg from "../../assets/projects/gym-utn.webp";

type Project = {
  id: number;
  num: string;
  titleKey: TKey;
  descKey: TKey;
  altKey: TKey;
  url: string;
  image: string;
  tags: string[];
  year: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    num: "01",
    titleKey: "project1_title",
    descKey: "project1_desc",
    altKey: "project1_alt",
    url: "https://recetasdelpatron.netlify.app/",
    image: recetasImg,
    tags: ["HTML", "CSS", "JavaScript", "Netlify"],
    year: "2025",
  },
  {
    id: 2,
    num: "02",
    titleKey: "project2_title",
    descKey: "project2_desc",
    altKey: "project2_alt",
    url: "https://dmdreciclados.com/",
    image: dmdImg,
    tags: ["WordPress", "HTML", "CSS"],
    year: "2025",
  },
  {
    id: 3,
    num: "03",
    titleKey: "project3_title",
    descKey: "project3_desc",
    altKey: "project3_alt",
    url: "https://lucasfelice10.github.io/AnotadorDMD/",
    image: pesadasImg,
    tags: ["HTML", "CSS", "JavaScript"],
    year: "2025",
  },
  {
    id: 4,
    num: "04",
    titleKey: "project4_title",
    descKey: "project4_desc",
    altKey: "project4_alt",
    url: "https://dev-lfgym.pantheonsite.io/",
    image: gymImg,
    tags: ["WordPress", "PHP", "CSS"],
    year: "2025",
  },
];

const CARD_STYLE = {
  background: "#160e24",
  border: "1px solid rgba(167,139,250,0.12)",
  borderRadius: "6px",
} as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLang();
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden outline-none transition-[border-color,box-shadow] duration-300 hover:border-[rgba(217,70,239,0.4)] hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)] focus-visible:ring-2 focus-visible:ring-[#d946ef] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a16] active:opacity-95"
      style={{ ...CARD_STYLE, cursor: "pointer" }}
      aria-label={`${t(project.titleKey)} — ${t("projects_view_project")}`}
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <img
          src={project.image}
          alt={t(project.altKey)}
          width={640}
          height={400}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover motion-reduce:transition-none"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "rgba(124,58,237,0.12)", mixBlendMode: "multiply" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,10,22,0.85) 0%, rgba(13,10,22,0.15) 45%, transparent 100%)",
          }}
        />
        <span
          className="absolute left-4 top-4 font-['JetBrains_Mono']"
          style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(217,70,239,0.8)" }}
        >
          {project.num} / {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className="font-['Bricolage_Grotesque'] text-[#f0ebff] transition-colors group-hover:text-[#f5d0fe]"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)", fontWeight: 800, lineHeight: 1.15 }}
        >
          {t(project.titleKey)}
        </h3>

        <p
          className="mt-2 flex-1 font-['DM_Sans'] text-[#9b7fc2]"
          style={{ fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)", lineHeight: 1.65 }}
        >
          {t(project.descKey)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-['JetBrains_Mono']"
              style={{
                fontSize: "0.6rem",
                padding: "3px 8px",
                border: "1px solid rgba(167,139,250,0.2)",
                color: "rgba(217,70,239,0.85)",
                borderRadius: "2px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          className="mt-5 inline-flex w-fit items-center gap-2 text-white transition-opacity group-hover:opacity-90"
          style={{
            padding: "10px 18px",
            fontFamily: "'DM Sans'",
            fontSize: "0.85rem",
            fontWeight: 600,
            background: "linear-gradient(135deg,#d946ef,#7c3aed)",
            borderRadius: "3px",
          }}
        >
          {t("projects_view_project")}
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const { t } = useLang();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="border-b"
      style={{ borderColor: "rgba(167,139,250,0.1)" }}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
        <div ref={headerRef} className="mb-10 sm:mb-14">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="mb-4 flex items-center gap-3 font-['JetBrains_Mono']"
            style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#d946ef" }}
          >
            <span
              className="inline-block h-px w-6"
              style={{ background: "linear-gradient(90deg,#d946ef,#7c3aed)" }}
            />
            {t("projects_label")}
          </motion.div>
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1 }}
            className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1 }}
          >
            {t("projects_heading")}
          </motion.h2>
        </div>

        <div
          className="grid gap-6 sm:gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          }}
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
