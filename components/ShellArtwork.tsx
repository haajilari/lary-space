"use client";

import Image from "next/image";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const spread = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

// The top and bottom shell pieces move LAST, echoing the original personal metaphor.
const fragments = [
  { d: "M135 245 C151 138 218 73 301 74 C383 75 446 137 464 242 L373 256 L326 216 L253 253 L199 220 Z", dx: -9, dy: -125, rot: -12, start: .7, end: .98, type: "cap" },
  { d: "M135 245 L199 220 L253 253 L239 345 L174 385 L118 355 Z", dx: -133, dy: -53, rot: -22, start: .13, end: .63, type: "side" },
  { d: "M373 256 L464 242 L483 355 L425 395 L345 340 L327 282 Z", dx: 140, dy: -31, rot: 18, start: .22, end: .66, type: "side" },
  { d: "M174 385 L239 345 L287 393 L273 488 L206 523 L141 458 L118 355 Z", dx: -145, dy: 50, rot: -17, start: .28, end: .71, type: "side" },
  { d: "M345 340 L425 395 L461 460 L394 528 L321 487 L287 393 Z", dx: 133, dy: 61, rot: 20, start: .29, end: .75, type: "side" },
  { d: "M206 523 L273 488 L321 487 L394 528 C365 580 329 590 298 591 C253 593 220 575 206 523 Z", dx: 12, dy: 126, rot: 10, start: .76, end: 1, type: "cap" },
  { d: "M253 253 L326 216 L373 256 L327 282 L345 340 L287 393 L239 345 Z", dx: 45, dy: -165, rot: 38, start: .05, end: .43, type: "center" },
] as const;

export default function ShellArtwork({ progress }: { progress: number }) {
  const coreReveal = spread(progress, .1, .57);
  return (
    <div className="shell-stage" role="img" aria-label="A ceramic-like shell gradually opening to reveal the original LarySpace symbol">
      <div className="shell-halo" />
      <div className="shell-orbit shell-orbit-one" />
      <div className="shell-orbit shell-orbit-two" />
      <span className="shell-tiny-star shell-star-one" aria-hidden="true">✳</span>
      <span className="shell-tiny-star shell-star-two" aria-hidden="true">✳</span>
      <div className="shell-svg-wrap">
        <svg className="shell-svg" viewBox="0 0 600 670" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shellFace" x1="130" y1="82" x2="458" y2="590" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f3f6e9" /><stop offset=".38" stopColor="#d4e3d2" /><stop offset=".73" stopColor="#a6c8b2" /><stop offset="1" stopColor="#709883" />
            </linearGradient>
            <radialGradient id="coreGlow" cx="0" cy="0" r="1" gradientTransform="translate(300 335) rotate(90) scale(220 190)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d9edc6" /><stop offset=".56" stopColor="#9acfa5" /><stop offset="1" stopColor="#0b663f" />
            </radialGradient>
            <clipPath id="eggOutline"><ellipse cx="300" cy="333" rx="184" ry="258" /></clipPath>
            <filter id="softShadow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="19" /></filter>
          </defs>
          <ellipse cx="300" cy="590" rx="172" ry="28" fill="#000" opacity=".3" filter="url(#softShadow)" />
          <ellipse cx="300" cy="333" rx="188" ry="262" fill="#77bd87" opacity={.08 + coreReveal * .28} />
          <g opacity={.28 + coreReveal * .72}>
            <ellipse cx="300" cy="333" rx="172" ry="242" fill="url(#coreGlow)" />
            <ellipse cx="300" cy="333" rx="170" ry="242" stroke="#dffbd8" strokeOpacity=".3" />
          </g>
        </svg>
        <div className="core-mark" style={{ opacity: .02 + coreReveal * .98, transform: `translate(-50%, -50%) scale(${.67 + .33 * coreReveal})` }}>
          <Image src="/branding/laryspace-mark.png" alt="" width={410} height={403} priority />
        </div>
        <svg className="shell-shards" viewBox="0 0 600 670" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs><linearGradient id="shardFace" x1="130" y1="65" x2="465" y2="603" gradientUnits="userSpaceOnUse"><stop stopColor="#f5f7ee"/><stop offset=".32" stopColor="#e2ebdc"/><stop offset=".72" stopColor="#b9d2bd"/><stop offset="1" stopColor="#739c81"/></linearGradient></defs>
          {fragments.map((frag, i) => {
            const t = spread(progress, frag.start, frag.end);
            return <g key={frag.type + i} transform={`translate(${(t * frag.dx).toFixed(1)} ${(t * frag.dy).toFixed(1)}) rotate(${(t * frag.rot).toFixed(1)} 300 333)`} opacity={1 - spread(progress, frag.end - .08, 1.05) * .54}>
              <path d={frag.d} fill="url(#shardFace)" stroke="#0a4732" strokeWidth="2.5" strokeLinejoin="round" />
              <path d={frag.d} stroke="#fff" strokeOpacity=".25" strokeWidth="1" strokeLinejoin="round" />
            </g>;
          })}
        </svg>
      </div>
      <div className="shell-progress-indicator"><span>00</span><div className="shell-progress-track"><i style={{ height: `${Math.max(6,progress * 100)}%` }} /></div><span>01</span></div>
    </div>
  );
}
