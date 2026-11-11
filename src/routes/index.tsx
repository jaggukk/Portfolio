import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import pagodaOutline from "@/assets/pagoda-ink-outline.png";

const chapters = ["top", "work", "practice", "contact"] as const;

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Jagan K K — Software Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Jagan K K, a software developer from Kannur, Kerala, building backend systems, AI/ML pipelines and full-stack tools.",
      },
      { property: "og:title", content: "Jagan K K — Software Engineer" },
      {
        property: "og:description",
        content:
          "Software developer from Kannur, Kerala. Projects across backend systems, AI/ML and full-stack development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap",
      },
    ],
  }),
});

function Portfolio() {
  const [activeChapter, setActiveChapter] = useState<(typeof chapters)[number]>("top");

  useEffect(() => {
    const sections = chapters
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;
    const updateActiveChapter = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        const nearest = sections.reduce(
          (best, section) => {
            const rect = section.getBoundingClientRect();
            const middle = rect.top + window.scrollY + rect.height / 2;
            return Math.abs(middle - viewportMiddle) < Math.abs(best.middle - viewportMiddle)
              ? { section, middle }
              : best;
          },
          { section: sections[0], middle: Number.POSITIVE_INFINITY },
        );
        if (nearest.section && chapters.includes(nearest.section.id as (typeof chapters)[number])) {
          setActiveChapter(nearest.section.id as (typeof chapters)[number]);
        }
      });
    };
    updateActiveChapter();
    window.addEventListener("scroll", updateActiveChapter, { passive: true });
    window.addEventListener("resize", updateActiveChapter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveChapter);
      window.removeEventListener("resize", updateActiveChapter);
    };
  }, []);

  return (
    <main className="portfolio-shell">
      <div className="portfolio-scene" aria-hidden="true" data-active-chapter={activeChapter}>
        <img src={pagodaOutline} alt="" fetchPriority="high" />
      </div>

      <header className="portfolio-header">
        <a className="wordmark" href="#top" aria-label="Jagan K K, back to introduction">
          <span className="wordmark-seal">J</span>
          <span>Jagan K K</span>
        </a>
        <nav aria-label="Portfolio chapters" className="chapter-nav">
          <a href="#work" aria-current={activeChapter === "work" ? "location" : undefined}>
            Work
          </a>
          <a href="#practice" aria-current={activeChapter === "practice" ? "location" : undefined}>
            Experience
          </a>
          <a href="#contact" aria-current={activeChapter === "contact" ? "location" : undefined}>
            Contact <ArrowUpRight aria-hidden="true" size={13} />
          </a>
        </nav>
      </header>

      <div className="chapter-progress" aria-label="Portfolio progress">
        {chapters.map((chapter, index) => (
          <a
            className={activeChapter === chapter ? "progress-mark is-active" : "progress-mark"}
            href={`#${chapter}`}
            key={chapter}
            aria-label={`Go to chapter ${index + 1}`}
            aria-current={activeChapter === chapter ? "location" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </div>

      <section className="portfolio-chapter intro-chapter" id="top" aria-labelledby="intro-title">
        <div className="chapter-copy intro-copy">
          <p className="eyebrow">
            <span>01</span> — An introduction
          </p>
          <h1 id="intro-title">
            Motivated.
            <br />
            <em>Curious.</em>
            <br />
            Software developer.
          </h1>
          <p className="intro-description">
            I’m Jagan K K, a software developer from Kannur, Kerala, with a strong interest
            in programming, game development and emerging technologies like Artificial Intelligence
            and Machine Learning.
          </p>
          <p className="intro-skills">
            Python · JavaScript · SQL · C · HTML · CSS · FastAPI · Flask · React · PostgreSQL ·
            MongoDB · Supabase · Git · Docker · LangGraph · LLMs
          </p>
          <a className="text-link" href="#work">
            View my projects <ArrowDown aria-hidden="true" size={15} />
          </a>
        </div>
        <div className="intro-caption" aria-hidden="true">
          <span>SCROLL TO TRAVEL</span>
          <span className="caption-rule" />
          <span>INK &amp; FORM · VOL 01</span>
        </div>
        <span className="chapter-stamp intro-stamp" aria-hidden="true">
          建
        </span>
      </section>

      <section className="portfolio-chapter work-chapter" id="work" aria-labelledby="work-title">
        <div className="chapter-copy work-copy">
          <p className="eyebrow">
            <span>02</span> — The work
          </p>
          <h2 id="work-title">
            Selected work.
            <br />
            <em>Real projects.</em>
          </h2>
          <p className="chapter-lede">
            Projects across Gmail automation, music streaming and retrieval-augmented generation.
          </p>
          <div className="work-list" aria-label="Selected projects">
            <div className="work-row">
              <span className="work-index">I.</span>
              <div>
                <h3>Ricky</h3>
                <p>
                  Gmail monitoring with phone-call alerts · Node.js, Express, Gmail API, Docker.
                  Watches Gmail via OAuth and rings your phone with a real incoming-call screen and
                  spoken note; installable PWA with ElevenLabs voice and Web Push.
                </p>
              </div>
              <MoveUpRight aria-hidden="true" size={17} />
            </div>
            <div className="work-row">
              <span className="work-index">II.</span>
              <div>
                <h3>Zithr</h3>
                <p>
                  Live streamer and browser caching · Python, FastAPI, MongoDB, React, Docker.
                  Imports Spotify playlists via CSV, resolves tracks to free streams, caches audio
                  in IndexedDB and exposes a key-protected REST API.
                </p>
              </div>
              <MoveUpRight aria-hidden="true" size={17} />
            </div>
            <div className="work-row">
              <span className="work-index">III.</span>
              <div>
                <h3>RAG Studio</h3>
                <p>
                  RAG pipeline with evaluation suite · Python, FastAPI, Qdrant. PDF ingestion,
                  MD5-based vector deduplication, cross-encoder reranking and LLM-as-judge scoring
                  for retrieval and answer quality.
                </p>
              </div>
              <MoveUpRight aria-hidden="true" size={17} />
            </div>
          </div>
        </div>
        <span className="chapter-stamp work-stamp" aria-hidden="true">
          技
        </span>
      </section>

      <section
        className="portfolio-chapter practice-chapter"
        id="practice"
        aria-labelledby="practice-title"
      >
        <div className="chapter-copy practice-copy">
          <p className="eyebrow">
            <span>03</span> — Experience
          </p>
          <h2 id="practice-title">
            Experience &amp;
            <br />
            <em>education.</em>
          </h2>
          <p className="chapter-lede">
            A DevOps internship and a Computer Science degree from Kannur, Kerala.
          </p>
          <ol className="practice-list">
            <li>
              <span>01</span>
              <div>
                <h3>DevOps Intern</h3>
                <p>
                  Kerala Vision Broadband Ltd. — network-device configuration backup system with
                  role-based access control, scheduled backups, a configuration comparator and
                  WhatsApp notifications.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>B.Tech in Computer Science</h3>
                <p>
                  St. Thomas College of Engineering and Technology, Kannur · Sep 2022 – May 2026 ·
                  CGPA 8.38/10
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Higher Secondary</h3>
                <p>Indira Gandhi Public School, Kannur · 2019 – 2021 · Plus Two 79%, SSLC 78%</p>
              </div>
            </li>
          </ol>
        </div>
        <div className="practice-aside">
          <div className="brush-circle" aria-hidden="true">
            <span>余白</span>
          </div>
          <p>BASED IN KANNUR, KERALA</p>
          <span className="aside-rule" />
          <p className="aside-note">English · Hindi · Malayalam</p>
        </div>
      </section>

      <section
        className="portfolio-chapter contact-chapter"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="chapter-copy contact-copy">
          <p className="eyebrow">
            <span>04</span> — Contact
          </p>
          <h2 id="contact-title">
            Get in
            <br />
            <em>touch.</em>
          </h2>
          <p className="chapter-lede">
            Based in Kannur, Kerala. Reach me at jagsonjob@gmail.com or +91 96059 37764.
          </p>
          <div className="contact-links">
            <a className="text-link" href="mailto:jagsonjob@gmail.com">
              jagsonjob@gmail.com <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a
              className="text-link"
              href="https://github.com/jagan-kk"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a className="text-link" href="tel:+919605937764">
              +91 96059 37764
            </a>
            <a className="text-link" href="#top">
              Back to top <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
        <div className="contact-mark" aria-hidden="true">
          <span>J</span>
          <small>
            JAGAN K K<br />
            SOFTWARE DEVELOPER
          </small>
        </div>
        <footer className="portfolio-footer">
          <span>JAGAN K K · SOFTWARE DEVELOPER</span>
          <span>
            KANNUR, KERALA · <span className="footer-year">2026</span>
          </span>
        </footer>
      </section>
    </main>
  );
}
