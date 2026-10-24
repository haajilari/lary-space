"use client";

import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/content/site";
import { profile } from "@/content/site";
import { SoundIcon, CloseIcon } from "./Icons";

function soundcloudEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !["soundcloud.com", "www.soundcloud.com", "on.soundcloud.com", "m.soundcloud.com"].includes(parsed.hostname)) return null;
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23049a60&auto_play=false&visual=false&show_artwork=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false`;
  } catch { return null; }
}

export default function Soundspace({ copy }: { copy: Copy }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const embed = soundcloudEmbedUrl(profile.soundcloudUrl);
  useEffect(() => {
    if (playerOpen) closeButtonRef.current?.focus({ preventScroll: true });
  }, [playerOpen]);
  const closePlayer = () => {
    setPlayerOpen(false);
    openButtonRef.current?.focus({ preventScroll: true });
  };
  return (
    <>
      <section className="sound-section story-section" id="sound" data-section="sound" aria-labelledby="sound-heading">
        <div className="layout-container sound-layout">
          <div className="sound-copy"><span className="eyebrow pale">{copy.sound.eyebrow}</span><h2 id="sound-heading" className="display-heading"><span>{copy.sound.title1}</span><em>{copy.sound.title2}</em></h2><p className="section-intro muted-light">{copy.sound.description}</p>
            <div className="sound-separator" />
            <span className="eyebrow pale">{copy.sound.genre}</span>
            <h3 dir="auto">{embed ? profile.soundcloudTitle : copy.sound.awaiting}</h3>
            <p className="sound-footnote">{embed ? copy.sound.playlistNote : copy.sound.comingSoon}</p>
            {embed ? <div className="sound-actions"><button ref={openButtonRef} type="button" className="button button-lime" aria-expanded={playerOpen} aria-controls="soundcloud-player" onClick={() => setPlayerOpen(true)}><SoundIcon /> {copy.sound.play}</button><a className="soundcloud-link" href={profile.soundcloudUrl} target="_blank" rel="noreferrer noopener">{copy.sound.openOnSoundCloud}<span aria-hidden="true">↗</span></a></div> : <span className="sound-unavailable"><span className="pulse-dot" /> {copy.sound.placeholder}</span>}
          </div>
          <div className="vinyl-scene" aria-label="Decorative vinyl record illustration"><div className="vinyl-orbit"><span className="vinyl-line" /></div><div className={`vinyl-disc ${playerOpen ? "vinyl-spinning" : ""}`}><div className="vinyl-label"><span>LARY</span><strong>SPACE</strong><small>ANOTHER FREQUENCY</small></div></div><span className="vinyl-bottom-caption">SOUND / 004 — LARYSPACE</span></div>
        </div>
      </section>
      {embed && playerOpen ? (
        <aside id="soundcloud-player" className="audio-dock" aria-label={copy.sound.playerTitle} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); closePlayer(); } }}>
          <div className="audio-dock-head"><span><SoundIcon /> SOUNDSPACE</span><button ref={closeButtonRef} type="button" className="icon-circle dark" aria-label={copy.sound.closePlayer} onClick={closePlayer}><CloseIcon /></button></div>
          <iframe title={copy.sound.playerTitle} src={embed} width="100%" height="450" frameBorder="0" allow="autoplay; encrypted-media" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
          <a className="soundcloud-link" href={profile.soundcloudUrl} target="_blank" rel="noreferrer noopener">{copy.sound.openOnSoundCloud}<span aria-hidden="true">↗</span></a>
        </aside>
      ) : null}
    </>
  );
}
