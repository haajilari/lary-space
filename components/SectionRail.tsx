"use client";

import type { Copy, SectionId } from "@/content/site";
import { sections } from "@/content/site";

export default function SectionRail({ copy, active }: { copy: Copy; active: SectionId }) {
  return (
    <nav className="section-rail" aria-label="Section roadmap">
      <span className="section-rail-head">LARYSPACE / MAP</span>
      <div className="rail-track">
        {sections.map((id, i) => (
          <a key={id} className={`rail-stop ${active === id ? "rail-stop-active" : ""}`} href={`#${id}`} aria-current={active === id ? "location" : undefined} title={copy.nav[id]}>
            <span className="rail-node"><span /></span>
            <span className="rail-word">{copy.nav[id]}</span>
            <span className="rail-index">0{i + 1}</span>
          </a>
        ))}
      </div>
      <span className="section-rail-foot">SCROLL / EXPLORE</span>
    </nav>
  );
}
