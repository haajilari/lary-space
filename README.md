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

Requires Node.js 22.12+; `.nvmrc` selects Node 24.

## Cloudflare Workers

Use Node.js 22.12+; `.nvmrc` selects Node 24 for Cloudflare Builds and local version managers.

```bash
npm ci
npm run typecheck
npm run build:vinext
npm run check:worker
npm run check:deploy
```

`check:worker` validates the built Worker with Wrangler's dry run. `check:deploy` validates the vinext deployment command without uploading or publishing.

The project uses vinext 1.3.0 with its supported Wrangler integration, the Cloudflare Vite plugin and `wrangler.jsonc`. The Worker is named `lary-space`; its generated deploy configuration is `dist/server/wrangler.json`. The original Next.js development/build scripts remain available alongside `dev:vinext`, `build:vinext` and `start:vinext`.

After committing and pushing to `haajilari/lary-space` on `main`, configure Workers Builds:

| Dashboard field | Value |
|---|---|
| Worker name | `lary-space` |
| Build command | `npm run build:vinext` |
| Deploy command | `npm run deploy:vinext` |
| Preview command | `npx wrangler preview --config dist/server/wrangler.json` |
| Enable Preview builds | Off for the first deployment |
| Protect with Cloudflare Access | Off for the public site |
| Advanced / Path | `/` |
| API token | Create a new Workers Builds token in the selector |
| Build variable name | `CLOUDFLARE_ACCOUNT_ID` |
| Build variable value | The destination account's Account ID |

Copy Account ID in the Cloudflare dashboard via `Cmd+K` → `Copy account ID`, then paste it into the build variable. It is an account identifier; encryption is optional. Workers Builds supplies deployment authentication through the selected API token. The build uses only the static `ASSETS` binding; no AI, Browser Rendering, database or Cloudflare Images binding is configured. Images are served without edge resizing.

The deployment script consumes the already built output using `--skip-build`. The production Custom Domain `laryspace.tech` is configured on the `lary-space` Worker in the Cloudflare dashboard. The Preview command is unused while Preview builds are off.

`images.unoptimized` serves the bundled branding files directly from `public/branding/` in both Next.js and vinext. The header/footer logo and shell mark do not depend on an image transformation service or a Cloudflare Images binding.

Local Worker preview after building:

```bash
npm run start:vinext
```

The compatibility scanner reports support for all Next.js imports used by this project. It reports partial App Router handling of `reactStrictMode`; the Next.js toolchain retains its original behavior. Build tools can emit sourcemap/chunk warnings; inspect failures by their exit status and runtime checks rather than assuming that a warning means deployment failed.

## Included

- `/en` and `/fa`: independently rendered English and Persian pages, including per-language SEO metadata and proper RTL layout
- Authentic supplied LarySpace logo; source, trimmed layout-safe copy, and mark all under `public/branding/`
- Scroll-driven, reversible egg-shell emergence; side fragments move first, upper/lower shell last
- Apple-inspired gentle section fade on entrance/exit; reduced-motion preference respected
- Fixed desktop section roadmap, compact mobile navigation, functional anchor navigation
- Three portfolio project cards with accessible case-study dialogs (Escape and focus handling)
- Soundspace connected to Lary's public SoundCloud playlist, with a playlist-sized floating widget, localized controls, keyboard open/close behavior and a direct SoundCloud link
- Contact dialog from the desktop/mobile navigation, section roadmap and contact buttons, with WhatsApp, email and LinkedIn choices; Escape, backdrop dismissal, keyboard focus containment and focus restoration
- Real `mailto:` and GitHub links, copy-email action using `amirhossein.hajilari@gmail.com`
- Self-hosted Vazirmatn variable font, including the Persian language-switch label on the English page
- English browser title in both languages; localized descriptions, OpenGraph locale and icon

## Edit your public profile / connect SoundCloud

Edit `content/site.ts`:

```ts
export const profile = {
  domain: "https://laryspace.tech",
  name: "Amirhossein Hajilari",
  github: "https://github.com/haajilari",
  email: "amirhossein.hajilari@gmail.com",
  whatsappUsername: "haajilari",
  linkedin: "https://www.linkedin.com/in/hajilari/",
  linkedinMessageUrl: "",
  soundcloudUrl: "https://soundcloud.com/amir-hossein-hajilari/sets/keep-your-anger-for-better",
  soundcloudTitle: "Keep your anger, For better reason! :)",
} as const;
```

The supplied share link resolves to the direct public playlist above. SoundCloud's oEmbed endpoint verifies playlist `1907678715`, titled **Keep your anger, For better reason! :)**, by **Amirhossein Hajilari**. The application uses the direct URL without share/tracking parameters, so the player does not depend on a mobile short-link redirect.

The SoundCloud iframe is created only after the visitor opens the playlist. **No autoplay** is triggered; playback starts with the widget's play control. The 450px playlist widget adapts to shorter viewports, keeps the close control accessible, and provides a direct SoundCloud link if embedding is unavailable. Closing the dock removes the iframe and stops its playback. Focus returns to the open button; Escape closes the dock when keyboard focus is in its page controls. SoundCloud owns keyboard handling while focus is inside its cross-origin iframe.

To change playlists later, update `soundcloudUrl` and `soundcloudTitle` together. The URL must be public. Changes to tracks within this same playlist are supplied by SoundCloud and do not require changing the website. The widget requires SoundCloud network access and may be affected by browser privacy settings or track availability. No SoundCloud API key, login or new environment variable is required.

WhatsApp uses `https://wa.me/haajilari`, the username-link format documented by WhatsApp. The username must be active on the owner's account.

For LinkedIn, paste the exact URL obtained from the owner's **Message** button into `linkedinMessageUrl` to open the addressed composer. It is deliberately empty until that URL is supplied; the contact choice currently opens the verified `/in/hajilari/` profile, where visitors can choose **Message**. LinkedIn controls sign-in and who can message the owner. Do not substitute the vanity slug for a LinkedIn member URN.

## Project descriptions

The work examples are intentionally **high-level editorial snapshots**, rather than claims of measured results or production secrets. Confirm names, details, screenshots, and disclosure rights before publishing publicly.

## Remaining review items

1. Review project descriptions, legal/confidentiality considerations, and contact email.
2. Supply the exact LinkedIn Message URL and add a genuine downloadable CV if desired.
3. After each source update, run the local checks, push to `main`, and inspect the Cloudflare build and both language routes.

Nothing in this package performs a deployment or changes DNS.

## Static review file

`preview.html` is an **offline visual review** of the same art direction and shared CSS. Open it in a browser after extracting this archive. It is not the compiled Next.js app; the complete functioning Next.js application lives in `app/` and `components/`.

The `laryspace_brand_concept.png` image is a static design board (not a runtime screenshot). The supplied logo is the source of truth.
