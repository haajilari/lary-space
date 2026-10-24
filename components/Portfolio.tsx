"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { copy, profile, sections, type Locale, type Project, type SectionId } from "@/content/site";
import { ArrowDown, ArrowUpRight, ChevronRight, CloseIcon, CopyIcon, GithubIcon, MenuIcon } from "./Icons";
import ShellArtwork from "./ShellArtwork";
import SectionRail from "./SectionRail";
import ProjectModal from "./ProjectModal";
import ContactModal from "./ContactModal";
import Soundspace from "./Soundspace";

const clamp = (v: number) => Math.max(0, Math.min(1, v));

export default function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [currentSection, setCurrentSection] = useState<SectionId>("home");
  const [shellProgress, setShellProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const isFa = locale === "fa";

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      const height = window.innerHeight;
      const hero = document.getElementById("home");
      if (hero) {
        const b = hero.getBoundingClientRect();
        const extent = Math.max(1, b.height - height);
        setShellProgress(clamp(-b.top / extent));
      }
      let active: SectionId = "home";
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= height * .42) active = id;
      }
      setCurrentSection(active);
      document.querySelectorAll<HTMLElement>(".story-section").forEach(element => {
        if (reduceMotion) { element.style.setProperty("--section-opacity", "1"); return; }
        const b = element.getBoundingClientRect();
        const entering = clamp((height - b.top) / Math.max(1, height * .45));
        const leaving = clamp((b.bottom - height * .08) / Math.max(1, height * .42));
        element.style.setProperty("--section-opacity", String(Math.max(0, Math.min(entering, leaving))));
      });
      rafRef.current = undefined;
    };
    const onScroll = () => { if (rafRef.current === undefined) rafRef.current = window.requestAnimationFrame(measure); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== undefined) window.cancelAnimationFrame(rafRef.current);
      document.querySelectorAll<HTMLElement>(".story-section").forEach(element => element.style.removeProperty("--section-opacity"));
    };
  }, []);

  useEffect(() => { setMobileOpen(false); setContactOpen(false); }, [locale]);
  useEffect(() => {
    if (!mobileOpen) return;
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [mobileOpen]);

  const dismissModal = useCallback(() => setSelectedProject(null), []);
  const openContact = useCallback(() => { setMobileOpen(false); setContactOpen(true); }, []);
  const dismissContact = useCallback(() => setContactOpen(false), []);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setEmailCopied(true); window.setTimeout(() => setEmailCopied(false), 2300); }
    catch { window.location.href = `mailto:${profile.email}`; }
  };
  const changeLanguage = `/${isFa ? "en" : "fa"}#${currentSection}`;

  return (
    <div className={`site locale-${locale}`}>
      <a className="skip-link" href="#work">{t.nav.work}</a>
      <header className="site-header">
        <div className="header-inner layout-container">
          <Link href={`/${locale}#home`} className="logo-holder" aria-label="LarySpace, back to home">
            <Image className="header-logo" src="/branding/laryspace-logo.png" alt="LarySpace" width={1674} height={393} priority />
          </Link>
          <div className="header-tag">{isFa ? "یک فضای شخصی برای ساختن" : "A PERSONAL SPACE FOR MAKING"}</div>
          <nav className="desktop-header-nav" aria-label="Main navigation"><a href="#work">{t.nav.work}</a><a href="#about">{t.nav.about}</a><button type="button" onClick={openContact} aria-haspopup="dialog">{t.nav.contact}</button></nav>
          <div className="header-actions"><Link className="language-switch" lang={isFa ? "en" : "fa"} aria-label={isFa ? "Switch to English" : "تغییر زبان به فارسی"} href={changeLanguage}>{t.switchLanguage}</Link><button type="button" className="header-cta" onClick={openContact} aria-haspopup="dialog"><span>{t.contact.email}</span><ArrowUpRight /></button><button className="mobile-toggle" aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={mobileOpen ? t.close : t.menu} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <CloseIcon /> : <MenuIcon />}</button></div>
        </div>
      </header>
      {mobileOpen ? <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">{sections.map((id, i) => id === "contact" ? <button key={id} type="button" onClick={openContact} aria-haspopup="dialog"><span>0{i + 1}</span>{t.nav[id]}<ChevronRight /></button> : <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}><span>0{i + 1}</span>{t.nav[id]}<ChevronRight /></a>)}</nav> : null}
      <SectionRail copy={t} active={currentSection} onContact={openContact} />
      <main>
        <section className="hero-section story-section" id="home" data-section="home" aria-labelledby="hero-heading">
          <div className="hero-sticky">
            <div className="hero-noise" aria-hidden="true" /><div className="hero-aura" aria-hidden="true" />
            <div className="hero-layout layout-container">
              <div className="hero-copy">
                <span className="eyebrow hero-eyebrow"><span className="status-dot" />{t.hero.kicker}</span>
                <h1 id="hero-heading"><span>{t.hero.title1}</span><em>{t.hero.title2}</em></h1>
                <p className="hero-description">{t.hero.description}</p>
                <div className="hero-buttons"><a className="button button-primary" href="#work">{t.hero.button}<ArrowUpRight /></a><a className="button button-ghost" href="#about">{t.hero.secondary}<span aria-hidden>↗</span></a></div>
                <div className="hero-side-motto"><span className="little-rule" /><span>{t.hero.flourish}</span></div>
              </div>
              <div className="hero-visual"><ShellArtwork progress={shellProgress} /><div className="shell-meta"><span>THE EMERGENCE / 001</span><span>{t.hero.layered}</span></div></div>
            </div>
            <div className="hero-scroll-label"><span>{t.hero.scroll}</span><ArrowDown /></div>
            <div className="hero-scroll-line" style={{ transform: `scaleX(${Math.max(.03,shellProgress)})` }} />
          </div>
        </section>
        <section className="work-section story-section" id="work" data-section="work" aria-labelledby="work-heading">
          <div className="layout-container section-pad">
            <div className="section-heading-grid"><span className="eyebrow dark">{t.work.eyebrow}</span><div><h2 id="work-heading" className="display-heading">{t.work.title}</h2><p className="section-intro">{t.work.description}</p></div></div>
            <div className="project-grid">{t.work.projects.map((project, index) => <button key={project.id} type="button" className={`project-card project-${project.id}`} onClick={() => setSelectedProject(project)} aria-label={`${t.work.more}: ${project.title}`}>
              <div className={`project-cover project-cover-${project.id}`}>
                <div className="project-cover-grain" /><div className="project-cover-inner">
                  <span className="cover-top"><span>LARYSPACE / SELECTED WORK</span><span>{project.index}</span></span>
                  <div className={`project-cover-art art-${project.id}`} aria-hidden="true">
                    {project.id === "finance" ? <><i className="finance-node n1"/><i className="finance-node n2"/><i className="finance-node n3"/><i className="finance-link l1"/><i className="finance-link l2"/><span className="art-big-symbol">⟡</span></> : project.id === "logistics" ? <><span className="art-route r1"/><span className="art-route r2"/><span className="art-route r3"/><span className="art-route-dot d1"/><span className="art-route-dot d2"/><span className="art-route-dot d3"/></> : <><span className="art-document doc-1"/><span className="art-document doc-2"/><span className="art-document doc-3"/></>}
                  </div>
                  <span className="cover-bottom">THOUGHTFULLY / ENGINEERED <span>↗</span></span>
                </div>
              </div>
              <div className="project-info"><span className="eyebrow dark">{project.kicker}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="project-info-bottom"><span className="project-view">{t.work.more} <ArrowUpRight /></span><span className="project-number">0{index+1} / 03</span></div></div>
            </button>)}</div>
          </div>
        </section>
        <section className="about-section story-section" id="about" data-section="about" aria-labelledby="about-heading">
          <div className="about-background-curve" aria-hidden="true" />
          <div className="layout-container section-pad about-layout"><div className="about-lead"><span className="eyebrow pale">{t.about.eyebrow}</span><h2 id="about-heading" className="display-heading"><span>{t.about.title1}</span><em>{t.about.title2}</em></h2><p className="about-prose">{t.about.lead}</p><div className="shell-outline-art" aria-hidden="true"><span className="shell-arc arc-one"/><span className="shell-arc arc-two"/><span className="shell-arc arc-three"/></div></div>
            <div className="about-manifesto"><div className="quote-mark" aria-hidden="true">“</div><blockquote>{t.about.quote}</blockquote><span className="eyebrow pale">{t.about.quoteBy}</span><div className="principles">{t.about.values.map(v => <div key={v.index} className="principle"><span>{v.index}</span><div><h3>{v.title}</h3><p>{v.body}</p></div></div>)}</div></div>
          </div>
        </section>
        <section className="stack-section story-section" id="stack" data-section="stack" aria-labelledby="stack-heading"><div className="layout-container section-pad"><div className="section-heading-grid"><span className="eyebrow dark">{t.stack.eyebrow}</span><div><h2 id="stack-heading" className="display-heading">{t.stack.title}</h2><p className="section-intro">{t.stack.description}</p></div></div><div className="stack-board"><div className="stack-main"><span className="eyebrow dark">{t.stack.main}</span>{t.stack.mainSkills.map((skill, i) => <div className="stack-big" key={skill}><span className="stack-index">0{i+1}</span><strong>{skill}</strong><span className="stack-chevron" aria-hidden>↗</span></div>)}</div><div className="stack-side"><span className="eyebrow dark">{t.stack.toolbox}</span><div className="stack-tags">{t.stack.extras.map(s => <span key={s}>{s}</span>)}</div><div className="stack-side-note"><span className="brand-asterisk">✳</span><p>{t.stack.build}</p></div></div></div></div></section>
        <Soundspace copy={t} />
        <section className="contact-section story-section" id="contact" data-section="contact" aria-labelledby="contact-heading"><div className="contact-graphic" aria-hidden="true">✳</div><div className="layout-container contact-inner"><span className="eyebrow contact-eyebrow">{t.contact.eyebrow}</span><h2 id="contact-heading" className="display-heading"><span>{t.contact.title1}</span><em>{t.contact.title2}</em></h2><p>{t.contact.description}</p><div className="contact-actions"><button type="button" className="contact-mail" onClick={openContact} aria-haspopup="dialog">{t.contact.email}<ArrowUpRight /></button><button type="button" className="copy-mail" onClick={copyEmail}><CopyIcon />{emailCopied ? t.contact.copied : t.contact.copy}</button></div><div className="contact-bottom"><a href={profile.github} target="_blank" rel="noreferrer noopener"><GithubIcon /> {t.contact.github} <ArrowUpRight /></a><span>{profile.email}</span></div></div></section>
      </main>
      <footer className="site-footer"><div className="layout-container footer-inner"><div className="footer-main"><Image src="/branding/laryspace-logo.png" width={1674} height={393} alt="LarySpace"/><p>{t.contact.made}</p></div><div className="footer-other"><span>© {new Date().getFullYear()} LARYSPACE</span><span>{t.contact.rights}</span><a href="#home">↑ {t.nav.home}</a></div></div></footer>
      {selectedProject ? <ProjectModal project={selectedProject} copy={t} onClose={dismissModal} /> : null}
      {contactOpen ? <ContactModal copy={t} onClose={dismissContact} /> : null}
    </div>
  );
}
