import { useRef } from "react";
import { motion, useInView } from "motion/react";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 72 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 76 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git / GitHub", level: 93 },
      { name: "Docker", level: 74 },
      { name: "Vercel / Netlify", level: 88 },
      { name: "Figma", level: 82 },
      { name: "AWS (basics)", level: 60 },
    ],
  },
];

const techTags = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL",
  "MongoDB", "GraphQL", "Tailwind", "Docker", "Git", "Figma", "Vue.js",
  "REST APIs", "Prisma", "Redux", "Jest", "Vitest", "CI/CD", "AWS",
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="py-3 border-b border-white/5 last:border-0">
      <div className="flex justify-between items-center mb-2">
        <span
          className="font-['DM_Sans'] text-[#c0bdb8]"
          style={{ fontSize: "0.875rem" }}
        >
          {name}
        </span>
        <span
          className="font-['JetBrains_Mono'] text-[#c8f135]"
          style={{ fontSize: "0.7rem" }}
        >
          {level}%
        </span>
      </div>
      <div className="h-px bg-white/8 relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 bg-[#c8f135] origin-left"
          style={{ width: `${level}%`, height: "2px" }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-28 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-['JetBrains_Mono'] text-[#c8f135] mb-4 flex items-center gap-3"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
            >
              <span className="inline-block w-6 h-px bg-[#c8f135]" />
              HABILIDADES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Bricolage_Grotesque'] text-[#f0ede8]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1 }}
            >
              Stack técnico
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/8">
          {skillGroups.map(({ category, skills }, gi) => (
            <div
              key={category}
              className="p-8 border-b md:border-b-0 md:border-r border-white/8 last:border-0"
            >
              <div
                className="font-['JetBrains_Mono'] text-[#c8f135] mb-6 pb-3 border-b border-[#c8f135]/20"
                style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}
              >
                {`0${gi + 1} / ${category.toUpperCase()}`}
              </div>
              {skills.map(({ name, level }, i) => (
                <SkillBar key={name} name={name} level={level} delay={0.1 * i + gi * 0.1} />
              ))}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14"
        >
          <div
            className="font-['JetBrains_Mono'] text-[#888880] mb-5"
            style={{ fontSize: "0.65rem", letterSpacing: "0.12em" }}
          >
            TECNOLOGÍAS ADICIONALES
          </div>
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.025 }}
                className="font-['JetBrains_Mono'] text-[#888880] border border-white/10 px-3 py-1.5 hover:border-[#c8f135]/50 hover:text-[#c8f135] transition-all duration-200 cursor-default"
                style={{ fontSize: "0.7rem" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
