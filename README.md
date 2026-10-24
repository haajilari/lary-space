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
node node_modules/next/dist/bin/next typegen
npm run typecheck
npm run build
npm start
```

Requires Node.js 22.12+; `.nvmrc` selects Node 24.

## Cloudflare Workers

Use Node.js 22.12+; `.nvmrc` selects Node 24 for Cloudflare Builds and local version managers.

```bash
npm ci
node node_modules/next/dist/bin/next typegen
npm run typecheck
npm run build:vinext
npm run check:worker
npm run check:deploy
```

`check:worker` validates the built Worker with Wrangler's dry run. `check:deploy` validates the vinext deployment command without uploading or publishing.

Next.js and vinext both generate `.next/types/routes.d.ts` with different shapes. Before a standalone `typecheck`, run `node node_modules/next/dist/bin/next typegen` to regenerate matching Next.js route and validator types, especially after a vinext build. The patch installer does this before validation and once more after the Worker checks.

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
- Eight selected project cards: Finance Automation Engine, PTB Rail, NewsLetter, AirCargo, Zixo Bot, Crypto-Walliro, Chapar Operational Portal — V2 and EDMS / Document Management
- Three featured cards, an accessible Show more / Show less control for five additional projects, and localized counts
- Always-visible enterprise entries for PMS (Project Management System), TMS (Tracking Management System) and EDMS, plus a separate In progress list containing IMS (Integrated Management System)
- Project and enterprise entries open accessible detail dialogs with Escape, keyboard focus containment and focus restoration
- Soundspace connected to Lary's public SoundCloud playlist, with an inline player and track list inside the page, localized labels and a direct SoundCloud link
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

The SoundCloud player is embedded directly in the Soundspace section, beside the introduction on desktop and below it on smaller screens. Its 450px widget includes the track list and playback controls. It uses native lazy loading and **does not autoplay**; visitors choose a track and press the widget's play control in the page. There is no floating dock or open/close action. Scrolling to another section keeps the same iframe mounted, so playback can continue while browsing this page; pause it with the widget's control. The direct SoundCloud link remains available if embedding is unavailable. SoundCloud owns keyboard handling inside its cross-origin iframe.

To change playlists later, update `soundcloudUrl` and `soundcloudTitle` together. The URL must be public. Changes to tracks within this same playlist are supplied by SoundCloud and do not require changing the website. The widget requires SoundCloud network access and may be affected by browser privacy settings or track availability. No SoundCloud API key, login or new environment variable is required.

WhatsApp uses `https://wa.me/haajilari`, the username-link format documented by WhatsApp. The username must be active on the owner's account.

For LinkedIn, paste the exact URL obtained from the owner's **Message** button into `linkedinMessageUrl` to open the addressed composer. It is deliberately empty until that URL is supplied; the contact choice currently opens the verified `/in/hajilari/` profile, where visitors can choose **Message**. LinkedIn controls sign-in and who can message the owner. Do not substitute the vanity slug for a LinkedIn member URN.

## Project descriptions

The gallery content is maintained in `content/site.ts` for both languages. `work.projects` controls the ordered selected-project list; the first three are featured and the rest appear through Show more. Enterprise entries are in `work.enterpriseProjects`; in-progress entries are in `work.inProgressProjects` and carry `stage: "in-progress"`. IMS is listed only in progress, never among the eight selected project cards.

PMS means **Project Management System**, TMS means **Tracking Management System**, and IMS means **Integrated Management System**, as specified by the owner. Enterprise entries describe project experience without claiming sole ownership. Newsletter and rail summaries use the supplied project history. AirCargo, Zixo Bot and Crypto-Walliro use concise descriptions of the owner-supplied project domains; no unverified frameworks, chains, exchanges, performance metrics or security audits are added. Their optional challenge, approach and technology tags can be filled in once those details are supplied.

Each selected project has a unique stable ID and matching content in both languages. The project count comes from the actual arrays. Additional cards are hidden from keyboard and accessibility navigation until expanded. The enterprise and in-progress lists remain visible in either state.

## Remaining review items

1. Review project descriptions, legal/confidentiality considerations, and contact email.
2. Supply the exact LinkedIn Message URL and add a genuine downloadable CV if desired.
3. After each source update, run the local checks, push to `main`, and inspect the Cloudflare build and both language routes.

Nothing in this package performs a deployment or changes DNS.

## Static review file

`preview.html` is an **offline visual review** of the same art direction and shared CSS. Open it in a browser after extracting this archive. It is not the compiled Next.js app; the complete functioning Next.js application lives in `app/` and `components/`.

The `laryspace_brand_concept.png` image is a static design board (not a runtime screenshot). The supplied logo is the source of truth.
