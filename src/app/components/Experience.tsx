import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLang, type TKey } from "../context/LanguageContext";

const EDUCATION_KEYS = [
  { id: 2, period: "edu2_period", degree: "edu2_degree", inst: "edu2_inst" },
  { id: 3, period: "edu3_period", degree: "edu3_degree", inst: "edu3_inst" },
  { id: 1, period: "edu1_period", degree: "edu1_degree", inst: "edu1_inst" },
  { id: 4, period: "edu4_period", degree: "edu4_degree", inst: "edu4_inst" },
] as const;

const EXPERIENCE_KEYS = [
  {
    id: 1,
    period: "exp1_period",
    role: "exp1_role",
    company: "exp1_company",
    desc: "exp1_desc",
    tags: ["exp1_tag1", "exp1_tag2", "exp1_tag3", "exp1_tag4", "exp1_tag5"] as TKey[],
  },
  {
    id: 2,
    period: "exp2_period",
    role: "exp2_role",
    company: "exp2_company",
    desc: "exp2_desc",
    tags: ["exp2_tag1", "exp2_tag2", "exp2_tag3", "exp2_tag4", "exp2_tag5"] as TKey[],
  },
  {
    id: 3,
    period: "exp3_period",
    role: "exp3_role",
    company: "exp3_company",
    desc: "exp3_desc",
    tags: ["exp3_tag1", "exp3_tag2", "exp3_tag3", "exp3_tag4", "exp3_tag5"] as TKey[],
  },
  {
    id: 4,
    period: "exp4_period",
    role: "exp4_role",
    company: "exp4_company",
    desc: "exp4_desc",
    tags: ["exp4_tag1", "exp4_tag2", "exp4_tag3", "exp4_tag4", "exp4_tag5"] as TKey[],
  },
] as const;

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  return (
    <section
      id="experience"
      ref={ref}
      className="overflow-x-hidden py-20 sm:py-28 border-b"
      style={{ borderColor: "rgba(167,139,250,0.1)" }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left */}
          <div>
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
              {t("exp_label")}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, lineHeight: 1.1 }}
            >
              {t("exp_heading")}
            </motion.h2>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <div
                className="font-['JetBrains_Mono'] text-[#9b7fc2] mb-5"
                style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}
              >
                {t("edu_label")}
              </div>
              {EDUCATION_KEYS.map(({ id, period, degree, inst }) => (
                <div
                  key={id}
                  className="mb-5 pb-5"
                  style={{ borderBottom: "1px solid rgba(167,139,250,0.08)" }}
                >
                  <div
                    className="font-['JetBrains_Mono']"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(217,70,239,0.7)" }}
                  >
                    {t(period)}
                  </div>
                  <div
                    className="font-['DM_Sans'] text-[#f0ebff] mt-1"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    {t(degree)}
                  </div>
                  <div className="font-['DM_Sans'] text-[#9b7fc2]" style={{ fontSize: "0.8rem" }}>
                    {t(inst)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative min-w-0">
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg,rgba(217,70,239,0.3),rgba(124,58,237,0.1))" }}
            />

            {EXPERIENCE_KEYS.map(({ id, period, role, company, desc, tags }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative pb-12 pl-8 sm:pl-10 last:pb-0"
              >
                {/* Dot */}
                <div
                  className="absolute left-[-5px] top-0 h-2.5 w-2.5"
                  style={{
                    background: "linear-gradient(135deg,#d946ef,#7c3aed)",
                    borderRadius: "2px",
                    boxShadow: "0 0 10px rgba(217,70,239,0.4)",
                  }}
                />

                <div
                  className="font-['JetBrains_Mono'] mb-2"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.1em", color: "rgba(217,70,239,0.7)" }}
                >
                  {t(period)}
                </div>
                <h3
                  className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", fontWeight: 700, lineHeight: 1.15 }}
                >
                  {t(role)}
                </h3>
                <div className="font-['DM_Sans'] text-[#9b7fc2] mt-0.5 mb-3" style={{ fontSize: "0.85rem" }}>
                  {t(company)}
                </div>
                <p
                  className="font-['DM_Sans'] text-[#9b7fc2]"
                  style={{ fontSize: "clamp(0.8rem, 2vw, 0.875rem)", lineHeight: "1.75" }}
                >
                  {t(desc)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="font-['JetBrains_Mono']"
                      style={{
                        fontSize: "0.6rem",
                        padding: "3px 8px",
                        border: "1px solid rgba(167,139,250,0.2)",
                        color: "rgba(217,70,239,0.7)",
                        borderRadius: "2px",
                      }}
                    >
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
