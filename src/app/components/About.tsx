import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useLang } from "../context/LanguageContext";
import profilePhoto from "../../assets/about/lucas-felice.webp";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();

  const gradientText = {
    background: "linear-gradient(135deg,#f0abfc,#a78bfa)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 border-b"
      style={{ borderColor: "rgba(167,139,250,0.1)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-['JetBrains_Mono'] mb-4 flex items-center gap-3"
              style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#d946ef" }}
            >
              <span
                className="inline-block w-6 h-px"
                style={{ background: "linear-gradient(90deg,#d946ef,#7c3aed)" }}
              />
              {t("about_label")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-['Bricolage_Grotesque'] text-[#f0ebff] leading-tight"
              style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 800 }}
            >
              {t("about_heading_1")}
              <span style={gradientText}>{t("about_heading_accent")}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 h-px origin-left"
              style={{ background: "linear-gradient(90deg,rgba(217,70,239,0.4),transparent)" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8"
            >
              <div
                className="relative max-w-sm overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  background: "#160e24",
                  border: "1px solid rgba(167,139,250,0.12)",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Lucas Felice"
                  width={500}
                  height={625}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-70"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top,rgba(13,10,22,0.7),transparent)" }}
                />
                {/* Color tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(124,58,237,0.08)", mixBlendMode: "multiply" }}
                />
                <div
                  className="absolute bottom-4 left-4 font-['JetBrains_Mono']"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.12em", color: "#d946ef" }}
                >
                  {t("about_badge")}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:pt-16"
          >
            <p
              className="font-['DM_Sans'] text-[#c5b8e8]"
              style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
            >
              {t("about_p1")}
            </p>
            <p
              className="font-['DM_Sans'] text-[#9b7fc2] mt-5"
              style={{ fontSize: "1rem", lineHeight: "1.8" }}
            >
              {t("about_p2")}
            </p>
            <p
              className="font-['DM_Sans'] text-[#9b7fc2] mt-5"
              style={{ fontSize: "1rem", lineHeight: "1.8" }}
            >
              {t("about_p3")}
            </p>

            {/* Personal data grid */}
            <div className="mt-10 grid grid-cols-2 gap-x-6">
              {(
                [
                  ["about_field_name", "about_val_name"],
                  ["about_field_location", "about_val_location"],
                  ["about_field_availability", "about_val_availability"],
                  ["about_field_languages", "about_val_languages"],
                ] as const
              ).map(([labelKey, valKey]) => (
                <div
                  key={labelKey}
                  className="py-3"
                  style={{ borderBottom: "1px solid rgba(167,139,250,0.1)" }}
                >
                  <div
                    className="font-['JetBrains_Mono'] text-[#9b7fc2]"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.1em" }}
                  >
                    {t(labelKey).toUpperCase()}
                  </div>
                  <div
                    className="font-['DM_Sans'] text-[#f0ebff] mt-0.5"
                    style={{ fontSize: "0.9rem", fontWeight: 500 }}
                  >
                    {t(valKey)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
