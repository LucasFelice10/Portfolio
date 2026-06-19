import { useLang } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer
      className="border-t py-8"
      style={{ borderColor: "rgba(167,139,250,0.1)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div
          className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
          style={{ fontSize: "1.1rem", fontWeight: 800 }}
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
        </div>
        <p
          className="font-['JetBrains_Mono'] text-[#4a3560]"
          style={{ fontSize: "0.62rem", letterSpacing: "0.08em" }}
        >
          {t("footer_copy")}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-['JetBrains_Mono'] text-[#9b7fc2] hover:text-[#d946ef] transition-colors duration-200"
          style={{ fontSize: "0.62rem", letterSpacing: "0.1em" }}
        >
          {t("footer_back")}
        </button>
      </div>
    </footer>
  );
}
