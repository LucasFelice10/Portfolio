import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useLang } from "../context/LanguageContext";

type FormState = { name: string; email: string; subject: string; message: string };
type Errors = Partial<FormState>;

function validate(form: FormState, t: (k: string) => string): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = t("contact_validation_name");
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = t("contact_validation_email");
  if (!form.subject.trim()) errors.subject = t("contact_validation_subject");
  if (!form.message.trim()) errors.message = t("contact_validation_message");
  return errors;
}

const INPUT_BASE = {
  background: "transparent",
  border: "none",
  outline: "none",
  width: "100%",
  color: "#f0ebff",
  fontFamily: "'DM Sans'",
  fontSize: "1rem",
} as const;

const FIELD_WRAP = {
  padding: "20px 24px",
  borderBottom: "1px solid rgba(167,139,250,0.1)",
} as const;

const CONTACT_EMAIL = "lfelice56@gmail.com";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form, t);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          _subject: `[Portfolio] ${form.subject}`,
          _replyto: form.email,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = (await response.json()) as { success?: string };
      if (!response.ok || !data.success) throw new Error("send failed");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const gradLabel = {
    fontFamily: "'JetBrains Mono'",
    fontSize: "0.62rem",
    letterSpacing: "0.1em",
    color: "#9b7fc2",
    display: "block",
    marginBottom: "6px",
  } as const;

  return (
    <section
      id="contact"
      ref={ref}
      className="py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
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
              {t("contact_label")}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 800, lineHeight: 1 }}
            >
              {t("contact_heading")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-['DM_Sans'] text-[#9b7fc2] mt-6 max-w-sm"
              style={{ fontSize: "1rem", lineHeight: "1.8" }}
            >
              {t("contact_desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 space-y-5"
            >
              <a href={`mailto:${CONTACT_EMAIL}`} className="block group">
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.62rem", letterSpacing: "0.1em", color: "#9b7fc2" }}>
                  {t("contact_email_label")}
                </div>
                <div
                  className="font-['DM_Sans'] text-[#f0ebff] flex items-center gap-2 mt-0.5 group-hover:opacity-70 transition-opacity"
                  style={{ fontSize: "1rem" }}
                >
                  {CONTACT_EMAIL}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.62rem", letterSpacing: "0.1em", color: "#9b7fc2" }}>
                  {t("contact_location_label")}
                </div>
                <div className="font-['DM_Sans'] text-[#f0ebff] mt-0.5" style={{ fontSize: "1rem" }}>
                  {t("contact_location_val")}
                </div>
              </div>
            </motion.div>

            {/* Social icons — GitHub and LinkedIn only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-3"
            >
              {[
                { icon: Github, href: "https://github.com/LucasFelice10", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/lucas-felice-08a998269/", label: "LinkedIn" },
                { icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: "Email" },
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
                    border: "1px solid rgba(167,139,250,0.2)",
                    color: "#9b7fc2",
                    borderRadius: "4px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(217,70,239,0.5)";
                    el.style.color = "#e879f9";
                    el.style.background = "rgba(217,70,239,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(167,139,250,0.2)";
                    el.style.color = "#9b7fc2";
                    el.style.background = "transparent";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[460px] flex flex-col items-center justify-center text-center p-10"
                style={{
                  border: "1px solid rgba(217,70,239,0.35)",
                  background: "rgba(22,14,36,0.5)",
                  borderRadius: "6px",
                }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg,#d946ef,#7c3aed)",
                    borderRadius: "50%",
                    fontSize: "1.5rem",
                  }}
                >
                  ✓
                </div>
                <div
                  className="font-['Bricolage_Grotesque'] text-[#f0ebff]"
                  style={{ fontSize: "1.5rem", fontWeight: 700 }}
                >
                  {t("contact_label")}!
                </div>
                <p
                  className="font-['DM_Sans'] text-[#9b7fc2] mt-3 max-w-xs"
                  style={{ fontSize: "0.9rem", lineHeight: "1.7" }}
                >
                  {t("contact_success")}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-['DM_Sans'] text-white transition-opacity hover:opacity-80"
                  style={{
                    padding: "10px 24px",
                    background: "linear-gradient(135deg,#d946ef,#7c3aed)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderRadius: "3px",
                  }}
                >
                  OK
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{
                  border: "1px solid rgba(167,139,250,0.14)",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {/* Name */}
                <div style={FIELD_WRAP}>
                  <label style={gradLabel}>{t("contact_field_name")}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder={t("contact_field_name_ph")}
                    style={{ ...INPUT_BASE, caretColor: "#d946ef" }}
                  />
                  {errors.name && (
                    <p style={{ color: "#ff5555", fontSize: "0.72rem", marginTop: "4px", fontFamily: "'JetBrains Mono'" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={FIELD_WRAP}>
                  <label style={gradLabel}>{t("contact_field_email")}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder={t("contact_field_email_ph")}
                    style={{ ...INPUT_BASE, caretColor: "#d946ef" }}
                  />
                  {errors.email && (
                    <p style={{ color: "#ff5555", fontSize: "0.72rem", marginTop: "4px", fontFamily: "'JetBrains Mono'" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div style={FIELD_WRAP}>
                  <label style={gradLabel}>{t("contact_field_subject")}</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={set("subject")}
                    placeholder={t("contact_field_subject_ph")}
                    style={{ ...INPUT_BASE, caretColor: "#d946ef" }}
                  />
                  {errors.subject && (
                    <p style={{ color: "#ff5555", fontSize: "0.72rem", marginTop: "4px", fontFamily: "'JetBrains Mono'" }}>
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div style={{ ...FIELD_WRAP, borderBottom: "none" }}>
                  <label style={gradLabel}>{t("contact_field_message")}</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder={t("contact_field_message_ph")}
                    style={{ ...INPUT_BASE, resize: "none", caretColor: "#d946ef" }}
                  />
                  {errors.message && (
                    <p style={{ color: "#ff5555", fontSize: "0.72rem", marginTop: "4px", fontFamily: "'JetBrains Mono'" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    className="px-6 py-3 font-['JetBrains_Mono']"
                    style={{ color: "#ff5555", fontSize: "0.75rem", background: "rgba(255,85,85,0.08)" }}
                    role="alert"
                  >
                    {t("contact_error")}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  data-magnetic
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-3 font-['Bricolage_Grotesque'] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    padding: "18px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    background: "linear-gradient(135deg,#d946ef,#7c3aed)",
                  }}
                >
                  {submitting ? t("contact_sending") : t("contact_submit")}
                  {!submitting && <ArrowUpRight size={18} />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
