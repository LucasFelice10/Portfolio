import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useId,
} from "react";
import { ASCII_ART, executeCommand } from "./commands";

// ── types ────────────────────────────────────────────────────
type Line = { id: string; node: React.ReactNode };

// ── boot sequence ────────────────────────────────────────────
type BootEntry =
  | { kind: "text"; text: string; bright?: boolean; green?: boolean; red?: boolean }
  | { kind: "gap" }
  | { kind: "ascii" }
  | { kind: "progress"; label: string };

const BOOT: BootEntry[] = [
  { kind: "gap" },
  { kind: "text", text: "LUCASDEV BIOS v2.6.1                               [2024]", bright: true },
  { kind: "text", text: "Copyright (C) Lucas Felice Systems. All rights reserved." },
  { kind: "gap" },
  { kind: "text", text: "CPU:    Intel Core i7-12700K @ 3.60GHz ............... [OK]" },
  { kind: "text", text: "RAM:    32768 MB DDR5-4800 ............................ [OK]" },
  { kind: "text", text: "GPU:    Creative Power Unlimited ...................... [OK]" },
  { kind: "gap" },
  { kind: "text", text: "Loading kernel modules..." },
  { kind: "progress", label: "kernel" },
  { kind: "gap" },
  { kind: "text", text: "  [  OK  ] Loaded creativity.ko", green: true },
  { kind: "text", text: "  [  OK  ] Loaded typescript.ko", green: true },
  { kind: "text", text: "  [  OK  ] Loaded react.ko", green: true },
  { kind: "text", text: "  [  OK  ] Loaded nodejs.ko", green: true },
  { kind: "text", text: "  [  OK  ] Loaded coffee.ko", green: true },
  { kind: "text", text: "  [ WARN ] sleep.service — unit not found", red: true },
  { kind: "gap" },
  { kind: "text", text: "Mounting filesystem..." },
  { kind: "progress", label: "filesystem" },
  { kind: "gap" },
  { kind: "text", text: "Boot completed in 0.847s.", bright: true },
  { kind: "gap" },
  { kind: "ascii" },
  { kind: "gap" },
  { kind: "text", text: "Welcome to LucasOS 1.0.0 LTS — Full-Stack Developer Edition", bright: true },
  { kind: "text", text: "Type 'help' to see available commands." },
  { kind: "gap" },
];

const BOOT_DELAYS = BOOT.map((e) => {
  if (e.kind === "gap") return 60;
  if (e.kind === "progress") return 520;
  if (e.kind === "ascii") return 120;
  return 90;
});

// ── helpers ──────────────────────────────────────────────────
function bootLineNode(entry: BootEntry): React.ReactNode {
  if (entry.kind === "gap") return <span />;
  if (entry.kind === "ascii") {
    return (
      <pre style={{ color: "#ffd700", fontSize: "0.7rem", lineHeight: 1.3, margin: 0 }}>
        {ASCII_ART}
      </pre>
    );
  }
  if (entry.kind === "progress") {
    const filled = 40;
    return (
      <span style={{ color: "#ff9500" }}>
        {"█".repeat(filled)}
        {"  "}
        <span style={{ color: "#ffd700" }}>100%</span>
      </span>
    );
  }
  const color = entry.bright ? "#ffd700" : entry.green ? "#44ff88" : entry.red ? "#ff9500" : "#ffb800";
  return <span style={{ color }}>{entry.text}</span>;
}

function InputEcho({ input }: { input: string }) {
  return (
    <span>
      <span style={{ color: "#ffd700" }}>lucas</span>
      <span style={{ color: "#7a5800" }}>@portfolio</span>
      <span style={{ color: "#ffb800" }}>:~$ </span>
      <span style={{ color: "#fff8e7" }}>{input}</span>
    </span>
  );
}

// ── main component ────────────────────────────────────────────
export function Terminal() {
  const uid = useRef(0);
  const nextId = () => String(uid.current++);

  const [phase, setPhase] = useState<"booting" | "ready">("booting");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [blinkOn, setBlinkOn] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── cursor blink ──
  useEffect(() => {
    const t = setInterval(() => setBlinkOn((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  // ── auto-scroll ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, phase]);

  // ── boot sequence ──
  useEffect(() => {
    let cancelled = false;
    let acc = 0;

    BOOT.forEach((entry, i) => {
      acc += BOOT_DELAYS[i];
      setTimeout(() => {
        if (cancelled) return;
        setLines((prev) => [
          ...prev,
          { id: nextId(), node: bootLineNode(entry) },
        ]);
        if (i === BOOT.length - 1) {
          setTimeout(() => {
            if (!cancelled) setPhase("ready");
          }, 300);
        }
      }, acc);
    });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── focus on click anywhere ──
  const focusInput = useCallback(() => {
    if (phase === "ready") inputRef.current?.focus();
  }, [phase]);

  // ── submit ──
  const handleSubmit = useCallback(() => {
    const cmd = input.trim();
    setLines((prev) => [
      ...prev,
      { id: nextId(), node: <InputEcho input={cmd} /> },
    ]);

    if (cmd) {
      const result = executeCommand(cmd, cmdHistory);
      if (result.type === "clear") {
        setLines([]);
      } else if (result.type === "not_found") {
        setLines((prev) => [
          ...prev,
          {
            id: nextId(),
            node: (
              <span>
                <span style={{ color: "#ff5555" }}>bash: {result.cmd}: command not found.</span>
                {"  "}
                <span style={{ color: "#7a5800" }}>Type </span>
                <span style={{ color: "#ffd700" }}>help</span>
                <span style={{ color: "#7a5800" }}> for available commands.</span>
              </span>
            ),
          },
        ]);
      } else if (result.node) {
        setLines((prev) => [
          ...prev,
          { id: nextId(), node: result.node },
        ]);
      }

      setCmdHistory((prev) => [cmd, ...prev]);
    }

    setInput("");
    setHistIdx(-1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, cmdHistory]);

  // ── keyboard handler ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
        setHistIdx(nextIdx);
        setInput(cmdHistory[nextIdx] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = Math.max(histIdx - 1, -1);
        setHistIdx(nextIdx);
        setInput(nextIdx === -1 ? "" : cmdHistory[nextIdx]);
      } else if (e.key === "Tab") {
        e.preventDefault();
        const cmds = [
          "help", "whoami", "skills", "projects", "experience",
          "education", "contact", "social", "neofetch", "ascii",
          "matrix", "clear", "history", "ls", "sudo hire lucas",
        ];
        const match = cmds.find((c) => c.startsWith(input) && c !== input);
        if (match) setInput(match);
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [handleSubmit, histIdx, cmdHistory, input]
  );

  return (
    <div
      ref={containerRef}
      onClick={focusInput}
      className="flex flex-col h-screen bg-[#0a0800] overflow-hidden select-none"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.88rem" }}
    >
      {/* ── window chrome ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 border-b"
        style={{
          height: "38px",
          background: "#0f0c00",
          borderColor: "rgba(255,184,0,0.12)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span style={{ color: "#7a5800", fontSize: "0.75rem", letterSpacing: "0.08em" }}>
          lucas@portfolio — bash — 80×24
        </span>
        <span style={{ color: "#3d2c00", fontSize: "0.7rem" }}>LucasOS 1.0.0 LTS</span>
      </div>

      {/* ── output area ── */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ scrollbarWidth: "none" }}
      >
        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              color: "#ffb800",
              lineHeight: "1.55",
              minHeight: "1.55em",
              wordBreak: "break-word",
            }}
          >
            {line.node ?? <span />}
          </div>
        ))}

        {/* ── input line ── */}
        {phase === "ready" && (
          <div className="flex items-center mt-1" style={{ minHeight: "1.55em" }}>
            <span style={{ color: "#ffd700", flexShrink: 0 }}>lucas</span>
            <span style={{ color: "#7a5800", flexShrink: 0 }}>@portfolio</span>
            <span style={{ color: "#ffb800", flexShrink: 0 }}>:~$ </span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute inset-0 w-full opacity-0"
                style={{ background: "transparent", border: "none", outline: "none", caretColor: "transparent" }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              <span style={{ color: "#fff8e7", whiteSpace: "pre" }}>{input}</span>
              <span
                style={{
                  display: "inline-block",
                  width: "0.55em",
                  height: "1.1em",
                  background: "#ffd700",
                  marginLeft: "1px",
                  opacity: blinkOn ? 1 : 0,
                  transition: "opacity 0.1s",
                  verticalAlign: "text-bottom",
                }}
              />
            </div>
          </div>
        )}

        {phase === "booting" && (
          <div className="flex items-center mt-1" style={{ minHeight: "1.55em" }}>
            <span
              style={{
                display: "inline-block",
                width: "0.55em",
                height: "1.1em",
                background: "#ffd700",
                opacity: blinkOn ? 1 : 0,
                transition: "opacity 0.1s",
                verticalAlign: "text-bottom",
              }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── status bar ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5"
        style={{
          height: "26px",
          background: "#ffd700",
          color: "#0a0800",
          fontSize: "0.7rem",
          letterSpacing: "0.06em",
          fontWeight: 600,
        }}
      >
        <span>
          {phase === "booting" ? "● BOOTING" : "● READY"}
        </span>
        <span>
          {phase === "ready" && (
            <>
              <span style={{ opacity: 0.5, marginRight: "1rem" }}>TAB: autocomplete</span>
              <span style={{ opacity: 0.5, marginRight: "1rem" }}>↑↓: history</span>
              <span style={{ opacity: 0.5 }}>^L: clear</span>
            </>
          )}
        </span>
        <span style={{ opacity: 0.6 }}>
          {new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
