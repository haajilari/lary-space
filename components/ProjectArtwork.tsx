import type { ProjectId } from "@/content/site";
import { MailIcon } from "./Icons";

export default function ProjectArtwork({ id }: { id: ProjectId }) {
  if (id === "finance") return <div className="project-cover-art art-finance" aria-hidden="true"><i className="finance-node n1"/><i className="finance-node n2"/><i className="finance-node n3"/><i className="finance-link l1"/><i className="finance-link l2"/><span className="art-big-symbol">⟡</span></div>;
  if (id === "logistics") return <div className="project-cover-art art-logistics" aria-hidden="true"><span className="art-route r1"/><span className="art-route r2"/><span className="art-route r3"/><span className="art-route-dot d1"/><span className="art-route-dot d2"/><span className="art-route-dot d3"/></div>;
  if (id === "documents") return <div className="project-cover-art art-documents" aria-hidden="true"><span className="art-document doc-1"/><span className="art-document doc-2"/><span className="art-document doc-3"/></div>;
  return <div className={`project-cover-art art-${id} project-line-art`} aria-hidden="true">
    {id === "newsletter" ? <MailIcon /> : <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {id === "rail" ? <><rect x="18" y="9" width="28" height="36" rx="7"/><path d="M18 29h28M25 17h14M23 45l-7 10m25-10 7 10M20 51h24"/><circle cx="25" cy="37" r="2"/><circle cx="39" cy="37" r="2"/></> :
      id === "aircargo" ? <><path d="m8 31 19 5 2 16 6-1 3-15 15-9c5-3 3-9-2-8l-17 5-13-10-5 3 9 13-13-3Z"/><path d="M9 49h10m-6 6h22"/></> :
      id === "zixo" ? <><path d="M10 12v40h44M17 40l10-12 10 7 15-20M43 15h9v9"/><path d="M21 42v5m12-5v5m12-15v15"/></> :
      id === "walliro" ? <><rect x="11" y="16" width="42" height="33" rx="6"/><path d="M42 27h13v13H42a6.5 6.5 0 0 1 0-13ZM17 16v-5h29v5"/><circle cx="45" cy="33.5" r="1.5"/><path d="m19 34 4 4 8-9"/></> :
      id === "pms" ? <><rect x="13" y="12" width="38" height="42" rx="5"/><path d="M24 12V8h16v8H24M21 27l3 3 5-6m5 3h10M21 40l3 3 5-6m5 3h10"/></> :
      id === "tms" ? <><path d="M18 46h10c18 0 1-27 20-27" strokeDasharray="3 4"/><circle cx="17" cy="46" r="6"/><path d="M55 19c0 7-7 13-7 13s-7-6-7-13a7 7 0 1 1 14 0Z"/><circle cx="48" cy="19" r="2"/></> :
      <><rect x="24" y="24" width="16" height="16" rx="4"/><path d="M32 24V12m0 28v12M24 32H12m28 0h12"/><circle cx="32" cy="9" r="3"/><circle cx="32" cy="55" r="3"/><circle cx="9" cy="32" r="3"/><circle cx="55" cy="32" r="3"/></>}
    </svg>}
  </div>;
}
