import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "../context/LanguageContext";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function useScramble(target: string, delay = 0) {
  const [text, setText] = useState(target.replace(/[A-Z]/g, "?"));
  const frameRef = useRef(0);

  useEffect(() => {
    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setText(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration) return target[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        iteration += 0.5;
        if (iteration >= target.length) clearInterval(interval);
      }, 30);
      frameRef.current = interval as unknown as number;
    }, delay);
    return () => { clearTimeout(timeout); clearInterval(frameRef.current); };
  }, [target, delay]);

  return text;
}

export function Hero() {
  const { t } = useLang();
  const [blink, setBlink] = useState(true);
  const line1 = useScramble("LUCAS", 500);
  const line2 = useScramble("FELICE", 900);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(interval);
  }, []);

  const gradientText = {
    background: "linear-gradient(135deg,#f0abfc,#a78bfa)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b"
      style={{ borderColor: "rgba(167,139,250,0.1)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,0.04) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse,rgba(217,70,239,0.12) 0%,transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-['JetBrains_Mono'] mb-6 flex items-center gap-3"
          style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: "#d946ef" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "linear-gradient(90deg,#d946ef,#7c3aed)" }}
          />
          {t("hero_available")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="font-['Bricolage_Grotesque'] text-[#f0ebff] leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(4rem,12vw,11rem)", fontWeight: 800 }}
        >
          {line1}
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="font-['Bricolage_Grotesque'] leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(4rem,12vw,11rem)", fontWeight: 800, ...gradientText }}
        >
          {line2}
          <span
            className="inline-block w-[0.06em] h-[0.82em] ml-3 align-middle transition-opacity duration-100"
            style={{
              background: "linear-gradient(180deg,#e879f9,#a855f7)",
              opacity: blink ? 1 : 0,
            }}
          />
        </motion.h1>

        <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="font-['DM_Sans'] text-[#9b7fc2] max-w-md"
            style={{ fontSize: "1rem", lineHeight: "1.7" }}
          >
            {t("hero_description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex items-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/LucasFelice10", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/lucas-felice-08a998269/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:lfelice56@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noreferrer" : undefined}
                data-magnetic
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                style={{
                  border: "1px solid rgba(167,139,250,0.25)",
                  color: "#9b7fc2",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(217,70,239,0.6)";
                  (e.currentTarget as HTMLElement).style.color = "#e879f9";
                  (e.currentTarget as HTMLElement).style.background = "rgba(217,70,239,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.25)";
                  (e.currentTarget as HTMLElement).style.color = "#9b7fc2";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-14 grid grid-cols-3 w-fit"
          style={{ border: "1px solid rgba(167,139,250,0.15)" }}
        >
          {[
            { val: t("hero_stat_exp_val"), label: t("hero_stat_exp_label") },
            { val: t("hero_stat_proj_val"), label: t("hero_stat_proj_label") },
            { val: t("hero_stat_clients_val"), label: t("hero_stat_clients_label") },
          ].map(({ val, label }, i) => (
            <div
              key={i}
              className="px-6 sm:px-8 py-5"
              style={{
                background: "rgba(22,14,36,0.6)",
                borderRight: i < 2 ? "1px solid rgba(167,139,250,0.15)" : "none",
              }}
            >
              <div
                className="font-['Bricolage_Grotesque']"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  background: "linear-gradient(135deg,#e879f9,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {val}
              </div>
              <div
                className="font-['DM_Sans'] text-[#9b7fc2] mt-1 whitespace-pre-line"
                style={{ fontSize: "0.7rem", lineHeight: 1.4 }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-200 hover:opacity-70"
        style={{ color: "#9b7fc2" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
