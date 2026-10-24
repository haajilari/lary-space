"use client";

import { useEffect, useRef } from "react";
import type { Copy, Project } from "@/content/site";
import { CloseIcon } from "./Icons";
import ProjectArtwork from "./ProjectArtwork";

export default function ProjectModal({ project, copy, onClose }: { project: Project; copy: Copy; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const prior = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", onKeyDown); prior?.focus(); };
  }, []);
  return (
    <div className="modal-backdrop" onMouseDown={e => { if (e.currentTarget === e.target) onClose(); }}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-summary" ref={modalRef}>
        <div className="modal-header"><span className="eyebrow">{project.index} / {project.kicker}</span><button type="button" className="icon-circle dark" onClick={onClose} ref={buttonRef} aria-label={copy.modal.close}><CloseIcon /></button></div>
        <div className={`project-visual project-visual-${project.id}`} aria-hidden="true"><span className="visual-grid"/><ProjectArtwork id={project.id}/></div>
        {project.stage === "in-progress" ? <span className="project-stage modal-stage"><span aria-hidden="true"/>{copy.work.inProgress}</span> : null}
        <h2 id="modal-title" dir="auto">{project.title}</h2>
        <p id="modal-summary" className="modal-summary">{project.detail}</p>
        {project.challenge || project.approach ? <div className="modal-feature-grid">{project.challenge ? <div><h3>{copy.work.challenge}</h3><p>{project.challenge}</p></div> : null}{project.approach ? <div><h3>{copy.work.approach}</h3><p>{project.approach}</p></div> : null}</div> : null}
        <div className="modal-detail-bottom"><div><span className="eyebrow">{copy.work.features}</span><div className="feature-lines">{project.features.map(f => <span key={f}>{f}</span>)}</div></div>{project.stack.length ? <div className="modal-tags">{project.stack.map(s => <span key={s}>{s}</span>)}</div> : null}</div>
      </div>
    </div>
  );
}
