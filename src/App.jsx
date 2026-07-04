import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Skills", "About", "Contact"];

const PROJECTS = [
  {
    id: "01",
    title: "FlowBoard",
    type: "SaaS · Real-time Collaboration",
    stack: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    desc: "A kanban-style project tool with live cursors, conflict-free syncing, and role-based access for distributed teams.",
    color: "#FF4D00",
  },
  {
    id: "02",
    title: "Marketpulse",
    type: "Data Platform · Analytics",
    stack: ["Next.js", "Python", "Redis", "Kafka"],
    desc: "Ingests millions of market events per second, surfaces anomalies in real time, and renders interactive dashboards for traders.",
    color: "#7C3AFF",
  },
  {
    id: "03",
    title: "Rootsy",
    type: "Consumer App · Mobile-first",
    stack: ["React Native", "GraphQL", "AWS Lambda", "DynamoDB"],
    desc: "A community plant-care app with AI care schedules, trade listings, and an offline-first sync engine for unreliable connections.",
    color: "#00C896",
  },
  {
    id: "04",
    title: "Citadel CMS",
    type: "Enterprise Tool · Headless CMS",
    stack: ["TypeScript", "Express", "MongoDB", "Docker"],
    desc: "Headless content platform powering 14 brand sites from one editor with structured content, webhooks, and a plugin API.",
    color: "#F5B800",
  },
];

const SKILLS = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "React Native", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Python", "GraphQL", "REST APIs", "WebSockets", "Express"] },
  { label: "Data & Infra", items: ["PostgreSQL", "MongoDB", "Redis", "Kafka", "Docker", "AWS"] },
  { label: "Craft", items: ["System Design", "CI/CD", "Testing", "Accessibility", "Performance", "Code Review"] },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setBig(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999,
      transform: `translate(${pos.x - (big ? 20 : 6)}px, ${pos.y - (big ? 20 : 6)}px)`,
      width: big ? 40 : 12, height: big ? 40 : 12,
      borderRadius: "50%",
      background: big ? "transparent" : "#FF4D00",
      border: big ? "2px solid #FF4D00" : "none",
      transition: "width 0.2s, height 0.2s, transform 0.08s, background 0.2s",
    }} />
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.25rem 3rem",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "background 0.4s, border 0.4s",
    }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#fff" }}>
        AT<span style={{ color: "#FF4D00" }}>.</span>
      </span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} data-hover style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", fontWeight: 500,
            color: active === l.toLowerCase() ? "#FF4D00" : "rgba(255,255,255,0.6)",
            textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase",
            transition: "color 0.2s",
          }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [tick, setTick] = useState(0);
  const roles = ["Full Stack Engineer", "Systems Thinker", "API Designer", "Product Builder"];
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 3rem", position: "relative", overflow: "hidden",
    }}>
      {/* grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      {/* orange glow */}
      <div style={{
        position: "absolute", top: "20%", right: "-5%", width: 600, height: 600,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,0,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 900 }}>
        <p style={{
          fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#FF4D00",
          letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem",
        }}>Available for freelance · 2026</p>

        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
          fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: 0.95,
          letterSpacing: "-0.04em", color: "#fff", margin: 0,
        }}>
          Anurag<br />
          <span style={{ color: "#FF4D00" }}>Trivedi</span>
        </h1>

        <div style={{
          marginTop: "2rem", height: "3.5rem", overflow: "hidden",
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "rgba(255,255,255,0.5)",
          letterSpacing: "-0.02em",
        }}>
          <div style={{ transform: `translateY(-${(tick % roles.length) * 3.5}rem)`, transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)" }}>
            {roles.concat(roles[0]).map((r, i) => <div key={i} style={{ height: "3.5rem", display: "flex", alignItems: "center" }}>{r}</div>)}
          </div>
        </div>

        <p style={{
          marginTop: "2rem", maxWidth: 520,
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", lineHeight: 1.7,
          color: "rgba(255,255,255,0.45)", fontWeight: 400,
        }}>
          I build fast, scalable products end-to-end — from pixel-perfect interfaces to distributed backend systems that don't flinch under load.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "3rem" }}>
          <a href="#work" data-hover style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem",
            padding: "1rem 2rem", background: "#FF4D00", color: "#fff",
            borderRadius: 4, textDecoration: "none", letterSpacing: "0.02em",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,77,0,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            See My Work ↓
          </a>
          <a href="#contact" data-hover style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem",
            padding: "1rem 2rem", background: "transparent", color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)", borderRadius: 4, textDecoration: "none",
            letterSpacing: "0.02em", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#FF4D00"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}>
            Get In Touch
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "3rem",
        display: "flex", alignItems: "center", gap: "0.75rem",
      }}>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)" }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>SCROLL</span>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2.5rem", border: "1px solid",
        borderColor: hovered ? project.color : "rgba(255,255,255,0.08)",
        borderRadius: 8, cursor: "default", position: "relative", overflow: "hidden",
        background: hovered ? `rgba(${project.color === "#FF4D00" ? "255,77,0" : project.color === "#7C3AFF" ? "124,58,255" : project.color === "#00C896" ? "0,200,150" : "245,184,0"},0.04)` : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s, background 0.3s, transform 0.3s",
        transform: inView ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: project.color, letterSpacing: "0.1em" }}>{project.id}</span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)",
          padding: "0.3rem 0.75rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
        }}>{project.type}</span>
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "2rem",
        color: "#fff", margin: "0 0 1rem", letterSpacing: "-0.03em",
      }}>{project.title}</h3>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 1.5rem" }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {project.stack.map(t => (
          <span key={t} style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: project.color,
            padding: "0.25rem 0.6rem", background: `${project.color}18`, borderRadius: 3,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const [ref, inView] = useInView();
  return (
    <section id="work" style={{ padding: "8rem 3rem" }}>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#FF4D00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>Selected Work</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", margin: "0 0 4rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
          Things I've<br /><span style={{ color: "rgba(255,255,255,0.2)" }}>built.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{ padding: "8rem 3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#FF4D00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>Toolkit</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", margin: "0 0 4rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
          How I<br /><span style={{ color: "rgba(255,255,255,0.2)" }}>work.</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem" }}>
        {SKILLS.map((group, gi) => {
          const [gref, ginView] = useInView();
          return (
            <div key={group.label} ref={gref} style={{ opacity: ginView ? 1 : 0, transform: ginView ? "none" : "translateY(20px)", transition: `all 0.5s ${gi * 0.1}s` }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#FF4D00", letterSpacing: "0.12em", marginBottom: "1.25rem" }}>{group.label.toUpperCase()}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {group.items.map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF4D00", flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={{ padding: "8rem 3rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-20px)", transition: "all 0.7s" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#FF4D00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>About</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff", margin: "0 0 2rem", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            I obsess over the<br /><span style={{ color: "#FF4D00" }}>full picture.</span>
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            Most engineers live on one side of the stack. I'm happiest when I own the whole thing — designing the schema, wiring up the API, and shipping the UI that makes it all feel effortless.
          </p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              The best code is the code that ships — tested, readable, and ready for the next engineer to build on.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {[["5+", "Years shipping product"], ["40+", "Projects delivered"], ["14", "Brands on one CMS"], ["99%", "Uptime maintained"]].map(([num, label], i) => {
            const [cr, cinView] = useInView();
            return (
              <div key={num} ref={cr} style={{
                padding: "2rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8,
                opacity: cinView ? 1 : 0, transform: cinView ? "none" : "translateY(20px)",
                transition: `all 0.5s ${i * 0.1}s`,
              }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: "#FF4D00", letterSpacing: "-0.04em" }}>{num}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem", lineHeight: 1.4 }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("anuragtrivedi559@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" style={{ padding: "8rem 3rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)", transition: "all 0.7s" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#FF4D00", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Let's talk</p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff", margin: "0 0 2rem", letterSpacing: "-0.05em", lineHeight: 0.95 }}>
          Got a project?<br /><span style={{ color: "#FF4D00" }}>Let's build it.</span>
        </h2>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.4)", marginBottom: "3rem" }}>
          Open to full-time roles and select freelance contracts.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={copy} data-hover style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem",
            padding: "1.1rem 2.5rem", background: "#FF4D00", color: "#fff",
            border: "none", borderRadius: 4, cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,77,0,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            {copied ? "✓ Copied!" : "Copy Email"}
          </button>
          {[["GitHub", "github.com/anuragtrivedi-cloud"], ["LinkedIn", "www.linkedin.com/in/anurag-trivedi-b8957128a/"]].map(([label, href]) => (
            <a key={label} href={`https://${href}`} data-hover target="_blank" rel="noreferrer" style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem",
              padding: "1.1rem 2.5rem", background: "transparent", color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080808; color: #fff; cursor: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #FF4D00; border-radius: 2px; }
        @media (max-width: 768px) {
          body { cursor: auto; }
          nav { padding: 1rem 1.5rem !important; }
          nav div { gap: 1.25rem !important; }
          section { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
      <Cursor />
      <Nav active={activeSection} />
      <main>
        <Hero />
        <Work />
        <Skills />
        <div className="about-grid"><About /></div>
        <Contact />
      </main>
      <footer style={{
        padding: "2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>© 2026 Anurag</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>Built with ME</span>
      </footer>
    </>
  );
}


