"use client";

import { useEffect, useRef } from "react";
import { profile, type Copy } from "@/content/site";
import { ArrowUpRight, CloseIcon, LinkedinIcon, MailIcon, WhatsappIcon } from "./Icons";

export default function ContactModal({ copy, onClose }: { copy: Copy; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const prior = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      if (prior?.isConnected && prior !== document.body) prior.focus({ preventScroll: true });
      else document.querySelector<HTMLButtonElement>(".mobile-toggle")?.focus({ preventScroll: true });
    };
  }, []);

  const options = [
    { label: "WhatsApp message", detail: `@${profile.whatsappUsername}`, href: `https://wa.me/${profile.whatsappUsername}`, Icon: WhatsappIcon },
    { label: "Email", detail: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "LinkedIn message", detail: profile.name, href: profile.linkedinMessageUrl || profile.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <dialog
      ref={dialogRef}
      id="contact-dialog"
      className="contact-modal"
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
    >
      <div className="modal-header">
        <span className="eyebrow dark" lang="en" dir="ltr">LARYSPACE / CONNECT</span>
        <button type="button" className="icon-circle dark" onClick={onClose} aria-label={copy.close}><CloseIcon /></button>
      </div>
      <h2 id="contact-dialog-title">{copy.contact.dialogTitle}</h2>
      <p id="contact-dialog-description">{copy.contact.dialogDescription}</p>
      <div className="contact-options">
        {options.map(({ label, detail, href, Icon }) => (
          <a key={label} className="contact-option" href={href} target={href.startsWith("https:") ? "_blank" : undefined} rel={href.startsWith("https:") ? "noopener noreferrer" : undefined} lang="en" dir="ltr">
            <span className="contact-option-icon"><Icon /></span>
            <span className="contact-option-text"><strong>{label}</strong><span>{detail}</span></span>
            <ArrowUpRight />
          </a>
        ))}
      </div>
    </dialog>
  );
}
