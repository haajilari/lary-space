# LarySpace — a space to become

A design-first, bilingual personal portfolio built with **Next.js 16 (App Router), React 19, TypeScript and custom CSS**. Designed around the user's original green LarySpace logo and the metaphor of a shell opening layer by layer.

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:3000** (redirects to `/en`). The Persian version is **http://localhost:3000/fa**.

Production build:

```bash
npm run typecheck
npm run build
npm start
```

Requires Node.js 20.9+.

## Included

- `/en` and `/fa`: independently rendered English and Persian pages, including per-language SEO metadata and proper RTL layout
- Authentic supplied LarySpace logo; source, trimmed layout-safe copy, and mark all under `public/branding/`
- Scroll-driven, reversible egg-shell emergence; side fragments move first, upper/lower shell last
- Apple-inspired gentle section fade on entrance/exit; reduced-motion preference respected
- Fixed desktop section roadmap, compact mobile navigation, functional anchor navigation
- Three portfolio project cards with accessible case-study dialogs (Escape and focus handling)
- Soundspace. SoundCloud support is ready, but no playlist URL has been supplied yet
- Real `mailto:` and GitHub links, copy-email action
- Per-language metadata, OpenGraph image and icon

## Edit your public profile / connect SoundCloud

Edit `content/site.ts`:

```ts
export const profile = {
  domain: "https://laryspace.tech",
  name: "Amirhossein Hajilari",
  github: "https://github.com/haajilari",
  email: "amirhajilari@gmail.com",
  soundcloudUrl: "https://soundcloud.com/YOUR-ACCOUNT/YOUR-TRACK",
} as const;
```

The SoundCloud track/playlist URL must be public and from soundcloud.com. A dedicated floating player appears only when an acceptable URL is configured. **No autoplay** is triggered. The embedded SoundCloud widget requires network connectivity and may be subject to browser privacy settings.

If you would rather use playlists, paste the direct public playlist URL into the same field.

## Project descriptions

The work examples are intentionally **high-level editorial snapshots**, rather than claims of measured results or production secrets. Confirm names, details, screenshots, and disclosure rights before publishing publicly.

## Next steps before live deployment

1. Review project descriptions, legal/confidentiality considerations, and contact email.
2. Supply actual SoundCloud public track/playlist URL.
3. Add a genuine downloadable CV and LinkedIn URL if desired.
4. Configure the domain `laryspace.tech` after explicitly approving deployment.
5. Audit final mobile screenshots, run `npm run build`, and test link targets.

Nothing in this package performs a deployment or changes DNS.

## Static review file

`preview.html` is an **offline visual review** of the same art direction and shared CSS. Open it in a browser after extracting this archive. It is not the compiled Next.js app; the complete functioning Next.js application lives in `app/` and `components/`.

The `laryspace_brand_concept.png` image is a static design board (not a runtime screenshot). The supplied logo is the source of truth.
