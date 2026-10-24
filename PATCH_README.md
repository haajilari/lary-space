# LarySpace — SoundCloud playlist + direct branding assets

این ZIP دقیقاً دو فایل در ریشه دارد: `lary-space-soundcloud-logo-20261024.patch` و `PATCH_README.md`.
هر دو را در ریشهٔ `/Users/lary/Desktop/Projects/lary-space`، کنار `package.json` قرار بده.

## نتیجه

- اتصال بخش Soundspace به پلی‌لیست **Keep your anger, For better reason! :)** از **Amirhossein Hajilari**.
- آدرس مستقیم و عمومی: https://soundcloud.com/amir-hossein-hajilari/sets/keep-your-anger-for-better
- لینک کوتاه ارسالی به آدرس بالا تبدیل و هویت پلی‌لیست با oEmbed رسمی تأیید شد: playlist `1907678715`؛ در زمان آزمایش ۳۶ قطعه داشت.
- پلیر شناور با فهرست آهنگ‌ها، کنترل‌های فارسی/انگلیسی و ارتفاع متناسب با موبایل و نمایشگر کوتاه.
- iframe فقط با بازکردن پلی‌لیست ایجاد می‌شود؛ **پخش خودکار ندارد**. بازدیدکننده کنترل Play خود SoundCloud را انتخاب می‌کند.
- دکمهٔ بستن، iframe را حذف می‌کند تا موسیقی پنهانی ادامه پیدا نکند؛ فوکوس به دکمهٔ بازکردن برمی‌گردد. Escape روی کنترل‌های خود صفحه کار می‌کند؛ داخل iframe، مدیریت کلیدها با SoundCloud است.
- لینک مستقیم SoundCloud هم در بخش موسیقی و هم داخل پلیر در دسترس است.
- تصاویر برند، شامل لوگوی سربرگ/پاورقی و نشان داخل پوسته، با `images.unoptimized` مستقیماً از فایل‌های پروژه بارگذاری می‌شوند و به مسیر تبدیل تصویر وابسته نیستند.

## مبنا و محدودیت تغییر

فایل‌های دخیل از `haajilari/lary-space` روی `main` بعد از نصب پچ Cloudflare خوانده و با کپی کاری تطبیق داده شدند. نصب بر اساس SHA-256 دقیق همان پنج فایل کنترل می‌شود؛ نیازی به یکسان‌بودن شناسهٔ commit آزمایشی با مک تو نیست.

نسخه‌های پکیج‌ها و lockfile تغییر نمی‌کنند. کلید API، ورود به حساب SoundCloud یا متغیر محیطی تازه‌ای لازم نیست. تغییر DNS، تنظیمات حساب Cloudflare و انتشار آنلاین داخل بلوک نصب انجام نمی‌شوند.

- Patch SHA-256: `1e3cb40594985dca9aafa0dd816567fc061bd35899b7060a8673906d3c240703`
- Node.js: **22.12+**؛ `.nvmrc` موجود Node 24 را انتخاب می‌کند.
- اگر وضعیت فایل‌ها با مبنا یا خروجی کامل پچ یکسان نباشد، نصب قبل از اعمال متوقف و وضعیت هر فایل چاپ می‌شود؛ پچ را force-apply یا reverse نکن.

## نصب — سه commit و پاک‌سازی خودکار

از ریشهٔ پروژه، تمام بلوک زیر را یک‌جا اجرا کن. مرحلهٔ دریافت، پیاده‌سازی و حذف دو فایل تحویلی سه commit جدا دارند. فایل تولیدشدهٔ `next-env.d.ts` پس از بررسی به محتوای ورودی برمی‌گردد. اگر بررسی شکست بخورد، فایل‌های تحویلی برای بررسی باقی می‌مانند؛ اجرای دوباره، خروجی کاملِ از قبل اعمال‌شده را دوباره apply نمی‌کند.

```bash
/bin/bash <<'LARY_PATCH'
set -euo pipefail

PatchFile='lary-space-soundcloud-logo-20261024.patch'
PatchDigest='1e3cb40594985dca9aafa0dd816567fc061bd35899b7060a8673906d3c240703'
ImplementationMessage='feat(laryspace): connect SoundCloud playlist and serve branding directly 20261024'
ProjectRoot="$(pwd -P)"
fail() { printf '%s\n' "$*" >&2; exit 1; }

for Program in git node npm shasum; do
  command -v "$Program" >/dev/null || fail "Missing command: $Program"
done
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major<22 || (major===22 && minor<12)) { console.error("Node.js 22.12+ is required; .nvmrc selects Node 24."); process.exit(1); }'
for Marker in package.json package-lock.json content/site.ts 'app/[lang]/layout.tsx' 'app/(root)/layout.tsx' next-env.d.ts; do
  [ -f "$Marker" ] || fail "Run from the LarySpace project root. Missing: $Marker"
done
[ -f "$PatchFile" ] && [ -f PATCH_README.md ] || fail 'Extract the two delivery files into the project root first.'
ActualDigest="$(shasum -a 256 "$PatchFile")"
[ "${ActualDigest%% *}" = "$PatchDigest" ] || fail 'Patch checksum mismatch. Stop and use the original delivery.'

RepositoryRoot="$(git rev-parse --show-toplevel)"
ProjectPrefix="$(git rev-parse --show-prefix)"
[ ! -f cloudflare.config.ts ] || fail 'An existing native cf configuration needs review before this Wrangler patch.'
git rev-parse --verify HEAD >/dev/null
git var GIT_AUTHOR_IDENT >/dev/null
git var GIT_COMMITTER_IDENT >/dev/null
git diff --cached --quiet || fail 'There are already staged changes. Keep them separate before installing.'

# Check exact before/after hashes and preserve unrelated work, including parent repos.
PatchState="$(node <<'LARY_BASELINE'
const fs = require('node:fs');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const manifest = [
  [
    "README.md",
    "6f3e6af3fa1f0a0b394304e1e71b86d61b2d05f278a1a894fca98ceb4f220420",
    "08a3afffaf9a86fd3525c0921ca230d64237ffa4e8a4103d7c32ff528e51f94e"
  ],
  [
    "app/globals.css",
    "bbb899228258a8a843f0ae6c0cd38a3ed1cd74986e08d4619b5ccfee12ecb1a6",
    "5a2e55918d1e131d4d363d1350a433c85b39de686411bc3aacbabfb2f2a8813c"
  ],
  [
    "components/Soundspace.tsx",
    "64a485569770ded4f7662cd3d1c41f0f87ebf6283b322d9f27577dc1dce261b9",
    "0656ba9712a61d6df8d44ba67aa487db86a2e6ebeb26605820a6169236fd6aa0"
  ],
  [
    "content/site.ts",
    "42d2e9211ad6a1f7c0288d235168afbed4e0e1ac6aa416a6832fd398f14e12c5",
    "3650e5d015b64295a150b64c3070e0b7a3e11f5aa11626a7af9da8d26c7bd5dc"
  ],
  [
    "next.config.ts",
    "c5efcdb15ee66db5a3a749082d8a2d68abdd0555ce251baee0e3fd920b4c55b5",
    "49eac55c00e247317ed3da6291d75a469083fcfb87cef4a478a0bb8ab4c07ded"
  ]
];
const patchFile = 'lary-space-soundcloud-logo-20261024.patch';
const git = args => execFileSync('git', args, { encoding: 'utf8' });
const prefix = git(['rev-parse', '--show-prefix']).trim();
const repo = git(['rev-parse', '--show-toplevel']).trim();
const fail = message => { console.error(message); process.exit(1); };
if (JSON.parse(fs.readFileSync('package.json', 'utf8')).name !== 'laryspace') fail('This is not the expected LarySpace project.');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const currentHash = path => fs.existsSync(path) ? hash(fs.readFileSync(path)) : null;
const before = manifest.every(([path, expected]) => currentHash(path) === expected);
const after = manifest.every(([path, , expected]) => currentHash(path) === expected);
if (!before && !after) {
  for (const [path, oldHash, newHash] of manifest) {
    const actual = currentHash(path);
    const label = actual === oldHash ? 'BASELINE' : actual === newHash ? 'APPLIED' : 'DIFFERENT';
    console.error(`${label}: ${path}`);
  }
  fail('Source baseline mismatch or partially modified patch files. The file states are listed above; stop and send this output.');
}
const state = before ? 'baseline' : 'applied';
const allowed = new Set(manifest.map(([path]) => prefix + path));
const delivery = new Set([prefix + patchFile, prefix + 'PATCH_README.md']);
const status = execFileSync('git', ['-C', repo, 'status', '--porcelain=v1', '-z', '--untracked-files=all'], { encoding: 'utf8' }).split('\0').filter(Boolean);
for (const entry of status) {
  const code = entry.slice(0, 2);
  const path = entry.slice(3);
  if (code === '??' && delivery.has(path)) continue;
  if (state === 'applied' && allowed.has(path) && (code === ' M' || code === '??')) continue;
  fail(`Unrelated or uncommitted work must be kept separate before installation: ${entry}`);
}
for (const [path, oldHash, newHash] of manifest) {
  if (oldHash === null) continue;
  let committed;
  try { committed = execFileSync('git', ['-C', repo, 'show', `HEAD:${prefix}${path}`], { stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch { fail(`The supplied source baseline must already be committed: ${path}`); }
  const expected = state === 'baseline' ? [oldHash] : [oldHash, newHash];
  if (!expected.includes(hash(committed))) fail(`Committed baseline does not match: ${path}`);
}
process.stdout.write(state);
LARY_BASELINE
)"

SourcePaths=(
  README.md
  app/globals.css
  components/Soundspace.tsx
  content/site.ts
  next.config.ts
)
GitApply=(git -C "$RepositoryRoot" apply)
if [ -n "$ProjectPrefix" ]; then
  GitApply+=(--directory="${ProjectPrefix%/}")
fi

printf '\n%s\n' 'Stage 1/3: record delivery files'
git status --short
git add -- "$PatchFile" PATCH_README.md
if ! git diff --cached --quiet; then
  git commit -m 'chore(laryspace): receive SoundCloud playlist patch 20261024'
fi

printf '\n%s\n' 'Stage 2/3: apply, validate and commit implementation'
if [ "$PatchState" = baseline ]; then
  "${GitApply[@]}" --check --whitespace=error-all "$ProjectRoot/$PatchFile"
  "${GitApply[@]}" --whitespace=error-all "$ProjectRoot/$PatchFile"
else
  printf '%s\n' 'The full patch is already present; skipping apply and repeating verification only.'
fi
"${GitApply[@]}" --reverse --check "$ProjectRoot/$PatchFile"
git diff --check

# Next.js regenerates this tracked declaration during a build; preserve its input.
DeclarationBackup="$(mktemp "${TMPDIR:-/tmp}/laryspace-next-env.XXXXXX")"
cp next-env.d.ts "$DeclarationBackup"
restore_declaration() {
  if [ -f "$DeclarationBackup" ]; then
    cp "$DeclarationBackup" "$ProjectRoot/next-env.d.ts"
    rm -f -- "$DeclarationBackup"
  fi
}
trap restore_declaration EXIT

npm ci --no-audit --no-fund
npm run typecheck
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run check:vinext
npm run build:vinext
CI=1 WRANGLER_SEND_METRICS=false npm run check:worker
CI=1 WRANGLER_SEND_METRICS=false npm run check:deploy
restore_declaration
trap - EXIT

shasum -a 256 -c <<'LARY_POST_HASHES'
08a3afffaf9a86fd3525c0921ca230d64237ffa4e8a4103d7c32ff528e51f94e  README.md
5a2e55918d1e131d4d363d1350a433c85b39de686411bc3aacbabfb2f2a8813c  app/globals.css
0656ba9712a61d6df8d44ba67aa487db86a2e6ebeb26605820a6169236fd6aa0  components/Soundspace.tsx
3650e5d015b64295a150b64c3070e0b7a3e11f5aa11626a7af9da8d26c7bd5dc  content/site.ts
49eac55c00e247317ed3da6291d75a469083fcfb87cef4a478a0bb8ab4c07ded  next.config.ts
LARY_POST_HASHES
"${GitApply[@]}" --reverse --check "$ProjectRoot/$PatchFile"
git diff --check
git add -- "${SourcePaths[@]}"
git diff --cached --check
git diff --cached --stat
if ! git diff --cached --quiet; then
  git commit -m "$ImplementationMessage"
fi
git diff --quiet || fail 'Unstaged changes remain after the implementation commit; delivery files have been retained.'
git diff --cached --quiet || fail 'Staged changes remain; delivery files have been retained.'

printf '\n%s\n' 'Stage 3/3: remove delivery files and commit cleanup'
git rm -- "$PatchFile" PATCH_README.md
git commit -m 'chore(laryspace): remove SoundCloud playlist delivery files 20261024'
git status --short
[ -z "$(git status --porcelain=v1 --untracked-files=all)" ] || fail 'Remaining Git changes need review.'
printf '\n%s\n' 'PASS: patch installed, verified and self-cleaned. Git is clean.'
git log -3 --oneline
LARY_PATCH
```

## انتشار روی سایت موجود

فقط بعد از پیام `PASS: patch installed, verified and self-cleaned. Git is clean.`:

```bash
cd /Users/lary/Desktop/Projects/lary-space
git push origin main
```

در Workers Builds نتیجهٔ ساخت شاخهٔ `main` را بررسی کن. دستورها همان `npm run build:vinext` و `npm run deploy:vinext` هستند. پس از Deploy موفق:

1. https://laryspace.tech/en#sound و https://laryspace.tech/fa#sound را باز کن.
2. عنوان پلی‌لیست و دکمهٔ بازکردن باید دیده شوند و پیام «پلی‌لیست در حال شکل‌گیری است» نمایش داده نشود.
3. پلیر را باز کن؛ فهرست آهنگ‌ها باید در دسترس باشد. Play را خودت بزن و یک آهنگ دیگر را انتخاب کن.
4. پلیر را ببند؛ پخش باید متوقف شود. لوگوی سربرگ و پاورقی را هم بررسی کن.

SoundCloud دسترسی به آهنگ‌ها و محدودیت‌های مرورگر/شبکه/منطقه را مدیریت می‌کند. لینک مستقیم همیشه در دسترس است. افزودن یا حذف آهنگ در همین پلی‌لیست از SoundCloud خوانده می‌شود و به پچ تازه برای سایت نیاز ندارد؛ برای تغییر خود پلی‌لیست، `soundcloudUrl` و `soundcloudTitle` در `content/site.ts` را با هم تغییر بده.

## بررسی‌های انجام‌شده

- نصب تازهٔ dependencyها با lockfile موجود؛ TypeScript؛ ساخت معمول Next.js؛ scanner و ساخت vinext؛ دو dry-run مربوط به Worker و deploy helper: موفق.
- اجرای محلی خود Worker؛ هر دو زبان در عرض‌های ۱۴۴۰ و ۳۹۰ پیکسل؛ حالت کوتاه ۶۶۷×۳۲۰ نیز بررسی شد.
- پلیر واقعی SoundCloud: فهرست ۳۶ قطعه، حالت اولیهٔ paused، شروع پخش با کلیک Play و رفتن به آهنگ دوم: موفق.
- باز/بسته‌شدن، Escape روی کنترل صفحه، بازگشت فوکوس، نبودن iframe قبل از بازکردن و بعد از بستن، و لینک مستقیم: موفق.
- بارگذاری واقعی هر سه تصویر برند با ابعاد طبیعی صحیح و بدون درخواست به `/_next/image`: موفق.
- پنجرهٔ ارتباط همچنان سه گزینه دارد و با Escape بسته می‌شود.

بستهٔ نصب هم در Git مستقل و در پروژهٔ زیرمجموعهٔ یک Git والد بررسی شده است. هیچ انتشار آنلاین یا push در این بررسی‌ها انجام نشد.

## فایل‌های تغییرکرده

- `README.md`
- `app/globals.css`
- `components/Soundspace.tsx`
- `content/site.ts`
- `next.config.ts`

## بازگشت اختیاری

فقط برای بازگرداندن commit پیاده‌سازی همین پچ:

```bash
/bin/bash <<'LARY_ROLLBACK'
set -euo pipefail
[ -f package.json ] && [ -f content/site.ts ]
git diff --quiet
git diff --cached --quiet
ImplementationCommit="$(git log -1 --format=%H --fixed-strings --grep='feat(laryspace): connect SoundCloud playlist and serve branding directly 20261024')"
if [ -z "$ImplementationCommit" ]; then
  printf '%s\n' 'Implementation commit not found; no rollback performed.' >&2
  exit 1
fi
git revert --no-edit "$ImplementationCommit"
DeclarationBackup="$(mktemp "${TMPDIR:-/tmp}/laryspace-next-env.XXXXXX")"
cp next-env.d.ts "$DeclarationBackup"
restore_declaration() { cp "$DeclarationBackup" next-env.d.ts; rm -f -- "$DeclarationBackup"; }
trap restore_declaration EXIT
npm ci --no-audit --no-fund
npm run typecheck
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run build:vinext
CI=1 WRANGLER_SEND_METRICS=false npm run check:worker
restore_declaration
trap - EXIT
git status --short
LARY_ROLLBACK
```

## مستندات رسمی

- https://developers.soundcloud.com/docs/oembed
- https://developers.soundcloud.com/docs/api/html5-widget
