import React from "react";

// ── color helpers ────────────────────────────────────────────
const C = {
  bright:  (s: string) => <span style={{ color: "#ffd700" }}>{s}</span>,
  main:    (s: string) => <span style={{ color: "#ffb800" }}>{s}</span>,
  dim:     (s: string) => <span style={{ color: "#7a5800" }}>{s}</span>,
  muted:   (s: string) => <span style={{ color: "#3d2c00" }}>{s}</span>,
  green:   (s: string) => <span style={{ color: "#44ff88" }}>{s}</span>,
  red:     (s: string) => <span style={{ color: "#ff5555" }}>{s}</span>,
  blue:    (s: string) => <span style={{ color: "#88ccff" }}>{s}</span>,
  white:   (s: string) => <span style={{ color: "#fff8e7" }}>{s}</span>,
  amber:   (s: string) => <span style={{ color: "#ff9500" }}>{s}</span>,
};

function Line({ children }: { children?: React.ReactNode }) {
  return <div style={{ lineHeight: "1.55" }}>{children ?? " "}</div>;
}

function Sep(props: { char?: string; len?: number }) {
  return <Line>{C.dim((props.char ?? "─").repeat(props.len ?? 64))}</Line>;
}

function Box({ title, lines }: { title: string; lines: React.ReactNode[] }) {
  const w = 62;
  const bar = "─".repeat(w - 2);
  return (
    <div>
      <Line>{C.dim("┌" + bar + "┐")}</Line>
      <Line>{C.dim("│")} {C.bright(title.padEnd(w - 3))} {C.dim("│")}</Line>
      <Line>{C.dim("├" + bar + "┤")}</Line>
      {lines.map((l, i) => (
        <Line key={i}>{C.dim("│")} {l}</Line>
      ))}
      <Line>{C.dim("└" + bar + "┘")}</Line>
    </div>
  );
}

function bar(pct: number, len = 38): string {
  const filled = Math.round((pct / 100) * len);
  return "█".repeat(filled) + "░".repeat(len - filled);
}

// ── COMMAND OUTPUTS ──────────────────────────────────────────

export const ASCII_ART = `
 ██╗     ██╗   ██╗ ██████╗ █████╗  ███████╗
 ██║     ██║   ██║██╔════╝██╔══██╗ ██╔════╝
 ██║     ██║   ██║██║     ███████║ ███████╗
 ██║     ██║   ██║██║     ██╔══██║ ╚════██║
 ███████╗╚██████╔╝╚██████╗██║  ██║ ███████║
 ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝ ╚══════╝

 ███████╗███████╗██╗     ██╗ ██████╗███████╗
 ██╔════╝██╔════╝██║     ██║██╔════╝██╔════╝
 █████╗  █████╗  ██║     ██║██║     █████╗
 ██╔══╝  ██╔══╝  ██║     ██║██║     ██╔══╝
 ██║     ███████╗███████╗██║╚██████╗███████╗
 ╚═╝     ╚══════╝╚══════╝╚═╝ ╚═════╝╚══════╝`;

function renderHelp() {
  const w = 62;
  const col1 = 18;
  const inner = w - 2;
  const mkRow = (cmd: string, desc: string) => (
    <Line>
      {C.dim("│")} {C.bright(cmd.padEnd(col1))} {C.dim("│")} {C.main(desc.padEnd(inner - col1 - 3))} {C.dim("│")}
    </Line>
  );
  const divRow = (
    <Line>{C.dim("├" + "─".repeat(col1 + 1) + "┼" + "─".repeat(inner - col1 - 2) + "┤")}</Line>
  );
  return (
    <div>
      <Line />
      <Line>{C.dim("┌" + "─".repeat(col1 + 1) + "┬" + "─".repeat(inner - col1 - 2) + "┐")}</Line>
      <Line>{C.dim("│")} {C.bright("COMMAND".padEnd(col1))} {C.dim("│")} {C.bright("DESCRIPTION".padEnd(inner - col1 - 3))} {C.dim("│")}</Line>
      {divRow}
      {mkRow("whoami", "Who is Lucas Felice")}
      {mkRow("skills", "Tech stack & proficiency")}
      {mkRow("projects", "Featured work")}
      {mkRow("experience", "Work history")}
      {mkRow("education", "Academic background")}
      {mkRow("contact", "Get in touch")}
      {mkRow("social", "Social links")}
      {divRow}
      {mkRow("neofetch", "System information")}
      {mkRow("ascii", "Show ASCII banner")}
      {mkRow("matrix", "???")}
      {divRow}
      {mkRow("clear", "Clear terminal")}
      {mkRow("history", "Command history")}
      {mkRow("help", "Show this message")}
      <Line>{C.dim("└" + "─".repeat(col1 + 1) + "┴" + "─".repeat(inner - col1 - 2) + "┘")}</Line>
      <Line />
      <Line>{C.dim("Tip:")} {C.main("type")} {C.bright("project [1-4]")} {C.main("to see project details.")}</Line>
      <Line />
    </div>
  );
}

function renderWhoami() {
  return (
    <div>
      <Line />
      <Line>{C.bright("Lucas Felice")}</Line>
      <Line>{C.main("Full-Stack Developer  ·  Buenos Aires, Argentina")}</Line>
      <Line />
      <Sep />
      <Line />
      <Line>{C.white("Construyo productos digitales de alta performance que combinan")}</Line>
      <Line>{C.white("código sólido con interfaces cuidadosamente diseñadas.")}</Line>
      <Line />
      <Line>{C.white("Me especializo en el ecosistema React + Node.js, pero disfruto")}</Line>
      <Line>{C.white("explorar nuevas tecnologías para resolver problemas complejos.")}</Line>
      <Line />
      <Sep />
      <Line />
      <Line>{C.dim("Available for:")}  {C.green("Freelance")}  {C.dim("·")}  {C.green("Full-time")}  {C.dim("·")}  {C.green("Remote")}</Line>
      <Line>{C.dim("Languages:")}      {C.main("Spanish (native)  ·  English (proficient)")}</Line>
      <Line>{C.dim("Timezone:")}       {C.main("UTC-3  (Buenos Aires)")}</Line>
      <Line />
    </div>
  );
}

function renderSkills() {
  const skills: [string, number][] = [
    ["React / Next.js  ", 95],
    ["TypeScript       ", 90],
    ["Node.js / Express", 88],
    ["Tailwind CSS     ", 92],
    ["PostgreSQL       ", 80],
    ["MongoDB          ", 76],
    ["GraphQL          ", 70],
    ["Docker           ", 74],
    ["Figma            ", 82],
    ["AWS (basics)     ", 60],
  ];
  return (
    <div>
      <Line />
      <Line>{C.bright("TECHNICAL STACK")}</Line>
      <Sep />
      <Line />
      {skills.map(([name, pct]) => (
        <Line key={name}>
          {C.main(name)}  {C.amber(bar(pct, 32))}  {C.bright(`${pct}%`)}
        </Line>
      ))}
      <Line />
      <Line>{C.dim("Additional:")}</Line>
      <Line>
        {C.dim("Redux  Prisma  Jest  Vitest  REST  WebSockets  Redis")}
      </Line>
      <Line>
        {C.dim("CI/CD  Git  GitHub Actions  Vercel  Netlify  Linux")}
      </Line>
      <Line />
    </div>
  );
}

const PROJECTS = [
  {
    id: 1,
    name: "Recetas del Patrón",
    tagline: "Sitio web gastronómico responsive",
    year: "2025",
    stack: "HTML · CSS · JavaScript · Netlify",
    desc: "Sitio web gastronómico para presentar recetas,\nproductos y contenido visual con interfaz moderna.",
    live: "recetasdelpatron.netlify.app",
    github: "—",
  },
  {
    id: 2,
    name: "DMD Reciclados",
    tagline: "Sitio web institucional",
    year: "2025",
    stack: "WordPress · HTML · CSS",
    desc: "Sitio institucional para compra, venta y reciclaje\nde metales no ferrosos.",
    live: "dmdreciclados.com",
    github: "—",
  },
  {
    id: 3,
    name: "Pesadas DMD",
    tagline: "Web app de pesadas",
    year: "2025",
    stack: "HTML · CSS · JavaScript",
    desc: "App web para registrar pesadas, calcular tara y peso neto,\norganizar operaciones y generar comprobantes.",
    live: "lucasfelice10.github.io/AnotadorDMD",
    github: "github.com/lucasfelice10/AnotadorDMD",
  },
  {
    id: 4,
    name: "Gym UTN",
    tagline: "Sitio web para gimnasio",
    year: "2025",
    stack: "WordPress · PHP · CSS",
    desc: "Sitio WordPress con servicios, actividades,\nplanes e información de contacto.",
    live: "dev-lfgym.pantheonsite.io",
    github: "—",
  },
];

function renderProjects() {
  return (
    <div>
      <Line />
      <Line>{C.bright("FEATURED PROJECTS")}</Line>
      <Sep />
      <Line />
      {PROJECTS.map((p) => (
        <Line key={p.id}>
          {C.amber(`[${p.id}]`)}  {C.bright(p.name.padEnd(14))}  {C.dim("—")}  {C.main(p.tagline)}  {C.dim(p.year)}
        </Line>
      ))}
      <Line />
      <Line>{C.dim("Type")} {C.bright("project [1-4]")} {C.dim("to see full details.")}</Line>
      <Line />
    </div>
  );
}

function renderProject(idx: number) {
  const p = PROJECTS[idx - 1];
  if (!p) {
    return (
      <div>
        <Line>{C.red(`Project ${idx} not found.`)} {C.dim("Try")} {C.bright("projects")} {C.dim("to list them.")}</Line>
      </div>
    );
  }
  const w = 62;
  const bar2 = "─".repeat(w - 2);
  const descLines = p.desc.split("\n");
  return (
    <div>
      <Line />
      <Line>{C.dim("┌" + bar2 + "┐")}</Line>
      <Line>{C.dim("│")}  {C.bright(p.name.padEnd(44))}  {C.amber(p.year)}  {C.dim("│")}</Line>
      <Line>{C.dim("│")}  {C.main(p.tagline.padEnd(w - 4))} {C.dim("│")}</Line>
      <Line>{C.dim("├" + bar2 + "┤")}</Line>
      <Line>{C.dim("│")}  {C.dim("Stack:")}  {C.white(p.stack.padEnd(w - 11))} {C.dim("│")}</Line>
      <Line>{C.dim("│")}  {"".padEnd(w - 3)} {C.dim("│")}</Line>
      {descLines.map((l, i) => (
        <Line key={i}>{C.dim("│")}  {C.main(l.padEnd(w - 4))} {C.dim("│")}</Line>
      ))}
      <Line>{C.dim("│")}  {"".padEnd(w - 3)} {C.dim("│")}</Line>
      <Line>{C.dim("│")}  {C.dim("→ Live:")}    {C.blue(p.live.padEnd(w - 12))} {C.dim("│")}</Line>
      <Line>{C.dim("│")}  {C.dim("→ GitHub:")}  {C.blue(p.github.padEnd(w - 12))} {C.dim("│")}</Line>
      <Line>{C.dim("└" + bar2 + "┘")}</Line>
      <Line />
    </div>
  );
}

function renderExperience() {
  return (
    <div>
      <Line />
      <Line>{C.bright("WORK HISTORY")}</Line>
      <Sep />
      <Line />

      <Line>{C.amber("2023 — Presente")}</Line>
      <Line>{C.bright("Full-Stack Developer Senior")}  {C.dim("·")}  {C.main("Freelance / Remote")}</Line>
      <Line>{C.main("Proyectos para clientes de Argentina, España y EEUU.")}</Line>
      <Line>{C.dim("React · Next.js · Node.js · API REST · AWS")}</Line>
      <Line />

      <Line>{C.amber("2022 — 2023")}</Line>
      <Line>{C.bright("Frontend Developer")}  {C.dim("·")}  {C.main("Agencia Digital XYZ · Buenos Aires")}</Line>
      <Line>{C.main("Desarrollo frontend de 8+ proyectos para retail y fintech.")}</Line>
      <Line>{C.dim("React · TypeScript · Design Systems · Scrum")}</Line>
      <Line />

      <Line>{C.amber("2021 — 2022")}</Line>
      <Line>{C.bright("Junior Web Developer")}  {C.dim("·")}  {C.main("StartupAR · Buenos Aires")}</Line>
      <Line>{C.main("SaaS de RRHH con más de 5.000 usuarios activos.")}</Line>
      <Line>{C.dim("Vue.js · Node.js · MySQL · Git · CI/CD")}</Line>
      <Line />
    </div>
  );
}

function renderEducation() {
  return (
    <div>
      <Line />
      <Line>{C.bright("EDUCATION")}</Line>
      <Sep />
      <Line />
      <Line>{C.amber("2019 — 2022")}</Line>
      <Line>{C.bright("Tecnicatura en Desarrollo de Software")}</Line>
      <Line>{C.main("Universidad Tecnológica Nacional (UTN)  ·  Buenos Aires")}</Line>
      <Line />
      <Line>{C.amber("2023")}</Line>
      <Line>{C.bright("Full-Stack JavaScript Bootcamp")}</Line>
      <Line>{C.main("Coderhouse  ·  Online")}</Line>
      <Line />
      <Line>{C.amber("2024")}</Line>
      <Line>{C.bright("AWS Cloud Practitioner  (en progreso)")}</Line>
      <Line>{C.main("Amazon Web Services")}</Line>
      <Line />
    </div>
  );
}

function renderContact() {
  return (
    <div>
      <Line />
      <Line>{C.bright("CONTACT")}</Line>
      <Sep />
      <Line />
      <Line>{C.dim("Email       ")}  {C.blue("lucas@felice.dev")}</Line>
      <Line>{C.dim("LinkedIn    ")}  {C.blue("linkedin.com/in/lucasfelice")}</Line>
      <Line>{C.dim("GitHub      ")}  {C.blue("github.com/lucasfelice")}</Line>
      <Line>{C.dim("Twitter     ")}  {C.blue("twitter.com/lucasfelice")}</Line>
      <Line />
      <Sep />
      <Line />
      <Line>{C.dim("Location:")}  {C.main("Buenos Aires, Argentina (UTC-3)")}</Line>
      <Line>{C.dim("Status:")}    {C.green("● Available")}  {C.dim("— Freelance · Full-time · Remote")}</Line>
      <Line />
      <Line>{C.dim("Response time: usually within 24 hours.")}</Line>
      <Line />
    </div>
  );
}

function renderSocial() {
  return (
    <div>
      <Line />
      <Line>{C.bright("SOCIAL LINKS")}</Line>
      <Sep />
      <Line />
      <Line>{C.amber("GitHub")}    {C.dim("→")}  {C.blue("github.com/lucasfelice")}</Line>
      <Line>{C.amber("LinkedIn")}  {C.dim("→")}  {C.blue("linkedin.com/in/lucasfelice")}</Line>
      <Line>{C.amber("Twitter")}   {C.dim("→")}  {C.blue("twitter.com/lucasfelice")}</Line>
      <Line>{C.amber("Dribbble")}  {C.dim("→")}  {C.blue("dribbble.com/lucasfelice")}</Line>
      <Line />
    </div>
  );
}

function renderNeofetch() {
  const logo = [
    "    .,:,,.        ",
    "  .,,,,,,,,,.     ",
    " .,,,,,,,,,,,,.   ",
    " ,,,,,,,,,,,,,,   ",
    ".,,,,,,,,,,,,,,   ",
    " ,,,,,,,,,,,,,,   ",
    " .,,,,,,,,,,,,.   ",
    "  .,,,,,,,,,,.    ",
    "    .,,,,,,.      ",
  ];
  const info = [
    [C.bright("lucas"), C.dim("@"), C.bright("portfolio")],
    [C.dim("─".repeat(28))],
    [C.amber("OS:        "), C.main("LucasOS 1.0.0 LTS")],
    [C.amber("Kernel:    "), C.main("6.1.0-creativity")],
    [C.amber("Uptime:    "), C.main("3 years, 4 months")],
    [C.amber("Shell:     "), C.main("bash / zsh")],
    [C.amber("Editor:    "), C.main("VS Code  (+ Vim keybindings)")],
    [C.amber("CPU:       "), C.main("Cerebro™ Pro Max")],
    [C.amber("RAM:       "), C.main("32GB DDR5  (coffee-powered)")],
    [C.amber("Languages: "), C.main("ES (native)  ·  EN (proficient)")],
    [C.amber("Music:     "), C.main("Lo-fi beats 24/7")],
  ];

  const rows = Math.max(logo.length, info.length);
  const result: React.ReactNode[] = [];
  for (let i = 0; i < rows; i++) {
    const l = logo[i] ? C.amber(logo[i]) : <span style={{ display: "inline-block", width: "18ch" }} />;
    const r = info[i] ? <>{...info[i].map((x, j) => <React.Fragment key={j}>{x}</React.Fragment>)}</> : null;
    result.push(<Line key={i}>{l}  {r}</Line>);
  }
  return <div><Line />{result}<Line /></div>;
}

function renderAscii() {
  return (
    <div>
      <Line />
      {ASCII_ART.split("\n").map((l, i) => (
        <Line key={i}><span style={{ color: "#ffd700" }}>{l}</span></Line>
      ))}
      <Line />
    </div>
  );
}

function renderSudoHire() {
  return (
    <div>
      <Line />
      <Line>{C.dim("[sudo] password for recruiter:")} {C.main("••••••••")}</Line>
      <Line>{C.green("Authentication successful.")}</Line>
      <Line />
      <Line>{C.main("Hiring lucas...")}  {C.amber("████████████████████████████████████████")}  {C.bright("100%")}</Line>
      <Line />
      <Line>{C.green("✔")}  {C.white("lucas@portfolio")}  {C.main("has been successfully hired!")}</Line>
      <Line>{C.dim("A confirmation email has been sent to")}{C.blue(" lucas@felice.dev")}</Line>
      <Line />
    </div>
  );
}

function renderMatrix() {
  const COLS = 64;
  const rows: string[] = [];
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01";
  for (let r = 0; r < 8; r++) {
    let row = "";
    for (let c = 0; c < COLS; c++) {
      row += Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : " ";
    }
    rows.push(row);
  }
  return (
    <div>
      <Line />
      {rows.map((r, i) => (
        <Line key={i}>
          <span style={{ color: i < 2 ? "#44ff88" : i < 5 ? "#00aa33" : "#005510", fontFamily: "monospace" }}>
            {r}
          </span>
        </Line>
      ))}
      <Line />
      <Line>{C.green("Wake up, Lucas...")}</Line>
      <Line>{C.dim("The Matrix has you.")}</Line>
      <Line />
    </div>
  );
}

// ── DISPATCHER ───────────────────────────────────────────────

export type CommandResult =
  | { type: "output"; node: React.ReactNode }
  | { type: "clear" }
  | { type: "not_found"; cmd: string };

export function executeCommand(
  raw: string,
  cmdHistory: string[]
): CommandResult {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return { type: "output", node: renderHelp() };
    case "whoami":
      return { type: "output", node: renderWhoami() };
    case "skills":
      return { type: "output", node: renderSkills() };
    case "projects":
      return { type: "output", node: renderProjects() };
    case "project":
      return { type: "output", node: renderProject(parseInt(args[0]) || 0) };
    case "experience":
      return { type: "output", node: renderExperience() };
    case "education":
      return { type: "output", node: renderEducation() };
    case "contact":
      return { type: "output", node: renderContact() };
    case "social":
      return { type: "output", node: renderSocial() };
    case "neofetch":
      return { type: "output", node: renderNeofetch() };
    case "ascii":
      return { type: "output", node: renderAscii() };
    case "matrix":
      return { type: "output", node: renderMatrix() };
    case "clear":
      return { type: "clear" };
    case "history":
      return {
        type: "output",
        node: (
          <div>
            <Line />
            {cmdHistory.length === 0
              ? <Line>{C.dim("No commands in history yet.")}</Line>
              : cmdHistory.map((c, i) => (
                  <Line key={i}>{C.dim(`  ${String(cmdHistory.length - i).padStart(3)}  `)} {C.main(c)}</Line>
                ))}
            <Line />
          </div>
        ),
      };
    case "sudo":
      if (args[0] === "hire" && args[1] === "lucas") {
        return { type: "output", node: renderSudoHire() };
      }
      return {
        type: "output",
        node: (
          <div>
            <Line>{C.red("sudo: permission denied.")}</Line>
            <Line>{C.dim("Hint: try")} {C.bright("sudo hire lucas")}</Line>
          </div>
        ),
      };
    case "ls":
    case "dir":
      return {
        type: "output",
        node: (
          <div>
            <Line />
            <Line>
              {["whoami/", "skills/", "projects/", "experience/", "education/", "contact/"].map((f, i) => (
                <React.Fragment key={i}>
                  <span style={{ color: "#ffd700", marginRight: "2ch" }}>{f}</span>
                </React.Fragment>
              ))}
            </Line>
            <Line />
          </div>
        ),
      };
    case "":
      return { type: "output", node: null };
    default:
      return { type: "not_found", cmd };
  }
}
