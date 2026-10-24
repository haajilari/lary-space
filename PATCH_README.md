# LarySpace — Inline SoundCloud player

این ZIP دقیقاً دو فایل در ریشه دارد:

- `lary-space-inline-soundcloud-20261024.patch`
- `PATCH_README.md`

هر دو را در ریشهٔ `/Users/lary/Desktop/Projects/lary-space` کنار `package.json` قرار بده و بلوک نصب زیر را کامل اجرا کن. مسیر پروژه داخل دستور صریح است؛ حتی اگر ترمینال در پروژهٔ دیگری باشد، بررسی و نصب در LarySpace انجام می‌شود.

## نتیجه

- پلیر و فهرست آهنگ‌ها مستقیماً داخل بخش Soundspace نمایش داده می‌شوند؛ در دسکتاپ کنار متن و در موبایل زیر آن.
- تصویر تزئینی صفحهٔ موسیقی جای خود را به پلیر واقعی می‌دهد. دکمهٔ بازکردن، پنجرهٔ شناور و دکمهٔ بستن حذف می‌شوند.
- انتخاب آهنگ، Play و Pause در همان صفحه و از کنترل‌های خود SoundCloud انجام می‌شوند؛ پخش خودکار خاموش است.
- پلیر ۴۵۰ پیکسل ارتفاع دارد، با عرض صفحه تطبیق می‌یابد و در نمایشگر کوتاه همراه صفحه اسکرول می‌شود.
- اسکرول به بخش‌های دیگر همین صفحه، پلیر را حذف نمی‌کند؛ موسیقی می‌تواند ادامه پیدا کند. برای توقف، Pause خود پلیر را بزن.
- پلیر از lazy loading مرورگر استفاده می‌کند. لینک مستقیم SoundCloud نیز زیر آن باقی می‌ماند.
- متن فارسی و انگلیسی با این رفتار هماهنگ شده است.

پلی‌لیست همان **Keep your anger, For better reason! :)** است:
https://soundcloud.com/amir-hossein-hajilari/sets/keep-your-anger-for-better

## مبنا و کنترل صحت

- Baseline ارسالی: `lary-space-baseline-20261024-111600.zip`
- Baseline SHA-256: `767924ceaf780a5b1db0b796f6090c0ade40661e141aad2d44aab055245207bb`
- Patch SHA-256: `d0bfba712ca4e32137ebbc9ab32f389dc7883d2f1bfb06f21eb85b1430a07b5f`
- Node.js: **22.12+**؛ `.nvmrc` موجود Node 24 را انتخاب می‌کند.
- چهار فایل برنامه/مستندات با SHA-256 دقیق مبنا و خروجی کنترل می‌شوند. پکیج‌ها، lockfile، `.gitignore` و تنظیمات Cloudflare تغییر نمی‌کنند.
- فایل‌های تولیدی `dist`، `.next`، `.vinext`، `.wrangler` و `tsbuildinfo` مبنای پچ نیستند.
- نصب‌کننده قبل از TypeScript، دستور `next typegen` را اجرا می‌کند. پس از بررسی vinext نیز نوع‌های Next را بازتولید و TypeScript را بررسی می‌کند تا ناسازگاری فایل‌های تولیدی قبلی باقی نماند.
- `next-env.d.ts` با trap به محتوای ورودی بازگردانده می‌شود تا تغییر تولیدی وارد commit نشود.
- مبنا باید در Git ثبت شده باشد. تغییرات stageشده یا فایل‌های نامرتبط باعث توقف پیش از نصب می‌شوند. پچ را force-apply یا reverse نکن.

## نصب — سه commit و پاک‌سازی خودکار

بلوک زیر دریافت فایل‌های تحویلی، پیاده‌سازی و حذف فایل‌های تحویلی را در سه commit جدا ثبت می‌کند. در صورت شکست بررسی‌ها، دو فایل تحویلی باقی می‌مانند. اجرای دوباره، پچ کاملِ قبلاً اعمال‌شده را تشخیص می‌دهد و بررسی‌ها را ادامه می‌دهد.

```bash
/bin/bash <<'LARY_PATCH'
set -euo pipefail
cd /Users/lary/Desktop/Projects/lary-space

PatchFile='lary-space-inline-soundcloud-20261024.patch'
PatchDigest='d0bfba712ca4e32137ebbc9ab32f389dc7883d2f1bfb06f21eb85b1430a07b5f'
ImplementationMessage='fix(laryspace): embed SoundCloud player in the page 20261024'
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
    "08a3afffaf9a86fd3525c0921ca230d64237ffa4e8a4103d7c32ff528e51f94e",
    "57fe1e501efb6bf5fb7454f5dd40ba4d1bfa610205cc5999163de380c7d28b71"
  ],
  [
    "app/globals.css",
    "5a2e55918d1e131d4d363d1350a433c85b39de686411bc3aacbabfb2f2a8813c",
    "1eb3ce731573d2cfd58562e43aff5454c75d518f62326241234d70c5ef0cfaa1"
  ],
  [
    "components/Soundspace.tsx",
    "0656ba9712a61d6df8d44ba67aa487db86a2e6ebeb26605820a6169236fd6aa0",
    "a8f5aff36a54dc19914eca3415e6073359a75e7120168584f09139515155ec42"
  ],
  [
    "content/site.ts",
    "3650e5d015b64295a150b64c3070e0b7a3e11f5aa11626a7af9da8d26c7bd5dc",
    "72835ebcc8881e61603e0be3f5138665b7a04eda29c4243fb8d6137d116324a0"
  ]
];
const patchFile = 'lary-space-inline-soundcloud-20261024.patch';
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
)
GitApply=(git -C "$RepositoryRoot" apply)
if [ -n "$ProjectPrefix" ]; then
  GitApply+=(--directory="${ProjectPrefix%/}")
fi

printf '\n%s\n' 'Stage 1/3: record delivery files'
git status --short
git add -- "$PatchFile" PATCH_README.md
if ! git diff --cached --quiet; then
  git commit -m 'chore(laryspace): receive inline SoundCloud patch 20261024'
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
NEXT_TELEMETRY_DISABLED=1 node node_modules/next/dist/bin/next typegen
npm run typecheck
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run check:vinext
npm run build:vinext
CI=1 WRANGLER_SEND_METRICS=false npm run check:worker
CI=1 WRANGLER_SEND_METRICS=false npm run check:deploy
NEXT_TELEMETRY_DISABLED=1 node node_modules/next/dist/bin/next typegen
npm run typecheck
restore_declaration
trap - EXIT

shasum -a 256 -c <<'LARY_POST_HASHES'
57fe1e501efb6bf5fb7454f5dd40ba4d1bfa610205cc5999163de380c7d28b71  README.md
1eb3ce731573d2cfd58562e43aff5454c75d518f62326241234d70c5ef0cfaa1  app/globals.css
a8f5aff36a54dc19914eca3415e6073359a75e7120168584f09139515155ec42  components/Soundspace.tsx
72835ebcc8881e61603e0be3f5138665b7a04eda29c4243fb8d6137d116324a0  content/site.ts
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
git commit -m 'chore(laryspace): remove inline SoundCloud delivery files 20261024'
git status --short
[ -z "$(git status --porcelain=v1 --untracked-files=all)" ] || fail 'Remaining Git changes need review.'
printf '\n%s\n' 'PASS: patch installed, verified and self-cleaned. Git is clean.'
git log -3 --oneline
LARY_PATCH
```

## انتشار

فقط پس از پیام `PASS: patch installed, verified and self-cleaned. Git is clean.`:

```bash
git -C /Users/lary/Desktop/Projects/lary-space push origin main
```

پس از Build و Deploy موفق Cloudflare، https://laryspace.tech/en#sound و https://laryspace.tech/fa#sound را باز کن. خود پلیر باید در بخش موسیقی دیده شود؛ یک آهنگ پخش و سپس Pause کن. در موبایل نیز کنترل‌ها و فهرست آهنگ‌ها باید داخل صفحه باشند.

نصب‌کننده push یا انتشار آنلاین انجام نمی‌دهد؛ دو دستور مربوط به Cloudflare فقط `--dry-run` هستند. ورود به SoundCloud، کلید API یا متغیر محیطی جدیدی لازم نیست. بارگذاری و دسترسی به قطعات همچنان تابع SoundCloud و شبکهٔ بازدیدکننده است.

## بررسی‌های انجام‌شده

- نصب dependencyها از lockfile؛ تولید نوع‌های Next؛ TypeScript؛ ساخت Next؛ scanner و ساخت vinext؛ dry-run Worker و deploy helper: موفق.
- اجرای محلی Worker و بررسی واقعی پلیر در هر دو زبان با عرض‌های ۱۴۴۰ و ۳۹۰ پیکسل؛ عرض ۳۲۰ و نمایشگر کوتاه ۶۶۷×۳۲۰ نیز بررسی شدند.
- دریافت واقعی فهرست آهنگ‌ها، حالت اولیهٔ paused، پخش با کلیک، رفتن به آهنگ بعدی، ادامهٔ پخش هنگام اسکرول و Pause: موفق.
- نبود پنجرهٔ شناور، قرارگیری iframe داخل Soundspace، لینک مستقیم، تصاویر برند و پنجرهٔ ارتباط بررسی شدند.

## فایل‌های تغییرکرده

- `README.md`
- `app/globals.css`
- `components/Soundspace.tsx`
- `content/site.ts`

## بازگشت اختیاری

فقط برای برگرداندن commit پیاده‌سازی همین پچ:

```bash
/bin/bash <<'LARY_ROLLBACK'
set -euo pipefail
cd /Users/lary/Desktop/Projects/lary-space
[ -f package.json ] && [ -f content/site.ts ]
git diff --quiet
git diff --cached --quiet
ImplementationCommit="$(git log -1 --format=%H --fixed-strings --grep='fix(laryspace): embed SoundCloud player in the page 20261024')"
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
NEXT_TELEMETRY_DISABLED=1 node node_modules/next/dist/bin/next typegen
npm run typecheck
NEXT_TELEMETRY_DISABLED=1 npm run build
npm run check:vinext
npm run build:vinext
CI=1 WRANGLER_SEND_METRICS=false npm run check:worker
CI=1 WRANGLER_SEND_METRICS=false npm run check:deploy
NEXT_TELEMETRY_DISABLED=1 node node_modules/next/dist/bin/next typegen
npm run typecheck
restore_declaration
trap - EXIT
git status --short
LARY_ROLLBACK
```

## مستندات رسمی

- https://developers.soundcloud.com/docs/api/html5-widget
- https://developers.soundcloud.com/docs/oembed
