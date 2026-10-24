"use client";

import { useState } from "react";
import type { Copy, Locale, Project } from "@/content/site";
import { ArrowDown, ArrowUpRight } from "./Icons";
import ProjectArtwork from "./ProjectArtwork";

function ProjectCard({ project, copy, total, onSelect }: { project: Project; copy: Copy; total: string; onSelect: (project: Project) => void }) {
  return <button type="button" className={`project-card project-${project.id}`} onClick={() => onSelect(project)} aria-haspopup="dialog" aria-label={`${copy.work.more}: ${project.title}`}>
    <div className={`project-cover project-cover-${project.id}`}>
      <div className="project-cover-grain"/><div className="project-cover-inner">
        <span className="cover-top"><span>LARYSPACE / SELECTED WORK</span><span>{project.index}</span></span>
        <ProjectArtwork id={project.id}/>
        <span className="cover-bottom">THOUGHTFULLY / ENGINEERED <span>↗</span></span>
      </div>
    </div>
    <div className="project-info"><span className="eyebrow dark">{project.kicker}</span><h3 dir="auto">{project.title}</h3><p>{project.summary}</p><div className="project-info-bottom"><span className="project-view">{copy.work.more} <ArrowUpRight/></span><span className="project-number">{project.index} / {total}</span></div></div>
  </button>;
}

export default function ProjectGallery({ copy, locale, onSelect }: { copy: Copy; locale: Locale; onSelect: (project: Project) => void }) {
  const [expanded, setExpanded] = useState(false);
  const projects = copy.work.projects;
  const featured = projects.slice(0, 3);
  const additional = projects.slice(3);
  const number = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });
  const count = new Intl.NumberFormat(locale, { useGrouping: false });
  const visible = expanded ? projects.length : featured.length;
  const countLabel = copy.work.projectCount.replace("{visible}", count.format(visible)).replace("{total}", count.format(projects.length));

  return <div className="layout-container section-pad work-gallery">
    <div className="section-heading-grid"><span className="eyebrow dark">{copy.work.eyebrow}</span><div><h2 id="work-heading" className="display-heading">{copy.work.title}</h2><p className="section-intro">{copy.work.description}</p></div></div>
    <div className="project-grid">{featured.map(project => <ProjectCard key={project.id} project={project} copy={copy} total={number.format(projects.length)} onSelect={onSelect}/>)}</div>
    {additional.length > 0 ? <>
      <div className="project-gallery-controls">
        <p className="project-count" aria-live="polite" aria-atomic="true">{countLabel}</p>
        <button type="button" className="button project-toggle" aria-expanded={expanded} aria-controls="additional-projects" onClick={() => setExpanded(value => !value)}>{expanded ? copy.work.showLess : copy.work.showMore}<span className="project-extra-count" aria-hidden="true">{expanded ? "−" : "+"}{count.format(additional.length)}</span><ArrowDown/></button>
      </div>
      <div id="additional-projects" className="project-grid additional-projects" hidden={!expanded} role="group" aria-label={copy.work.additionalProjects}>{additional.map(project => <ProjectCard key={project.id} project={project} copy={copy} total={number.format(projects.length)} onSelect={onSelect}/>)}</div>
    </> : null}
    <div className="enterprise-experience" aria-labelledby="enterprise-heading">
      <div className="work-subheading"><h3 id="enterprise-heading">{copy.work.enterpriseTitle}</h3><p>{copy.work.enterpriseDescription}</p></div>
      <div className="enterprise-projects">{copy.work.enterpriseProjects.map(project => <button key={project.id} type="button" className="enterprise-project" aria-haspopup="dialog" onClick={() => onSelect(project)}><span className="enterprise-code" dir="ltr">{project.id === "documents" ? "EDMS" : project.index}</span><span><strong>{project.title}</strong><span>{project.summary}</span></span><ArrowUpRight/></button>)}</div>
    </div>
    <div className="in-progress-projects" aria-labelledby="in-progress-heading">
      <div className="work-subheading"><h3 id="in-progress-heading">{copy.work.inProgress}</h3><p>{copy.work.inProgressDescription}</p></div>
      {copy.work.inProgressProjects.map(project => <button key={project.id} type="button" className="in-progress-project" aria-haspopup="dialog" onClick={() => onSelect(project)}><span className="project-stage"><span aria-hidden="true"/>{copy.work.inProgress}</span><strong dir="auto">{project.title}</strong><span>{project.summary}</span><span className="project-view">{copy.work.more}<ArrowUpRight/></span></button>)}
    </div>
  </div>;
}
