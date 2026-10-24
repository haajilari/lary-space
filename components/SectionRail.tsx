"use client";

import type { Copy, SectionId } from "@/content/site";
import { sections } from "@/content/site";

export default function SectionRail({ copy, active, onContact }: { copy: Copy; active: SectionId; onContact: () => void }) {
  return (
    <nav className="section-rail" aria-label="Section roadmap">
      <span className="section-rail-head">LARYSPACE / MAP</span>
      <div className="rail-track">
        {sections.map((id, i) => {
          const content = <>
            <span className="rail-node"><span /></span>
            <span className="rail-word">{copy.nav[id]}</span>
            <span className="rail-index">0{i + 1}</span>
          </>;
          const className = `rail-stop ${active === id ? "rail-stop-active" : ""}`;
          return id === "contact" ? (
            <button key={id} type="button" className={className} onClick={onContact} aria-haspopup="dialog" title={copy.nav[id]}>{content}</button>
          ) : (
            <a key={id} className={className} href={`#${id}`} aria-current={active === id ? "location" : undefined} title={copy.nav[id]}>{content}</a>
          );
        })}
      </div>
      <span className="section-rail-foot">SCROLL / EXPLORE</span>
    </nav>
  );
}
