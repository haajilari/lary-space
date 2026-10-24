# LarySpace — Projects, enterprise experience and IMS

این ZIP دقیقاً دو فایل در ریشه دارد: `lary-space-projects-ims-20261024.patch` و `PATCH_README.md`.
هر دو را در ریشهٔ `/Users/lary/Desktop/Projects/lary-space` کنار `package.json` قرار بده.

## نتیجه

- ردیف اول: Finance Automation Engine، PTB Rail و NewsLetter.
- Show more / Show less پنج پروژهٔ دیگر را باز و بسته می‌کند: AirCargo، Zixo Bot، Crypto-Walliro، Chapar Operational Portal — V2 و EDMS / Document Management.
- شمارندهٔ فارسی/انگلیسی از تعداد واقعی پروژه‌های منتخب محاسبه می‌شود؛ در حالت اولیه ۳ از ۸ و در حالت باز ۸ از ۸ است.
- هر کارت، پنجرهٔ جزئیات خودش را با همان رفتار Escape، کنترل فوکوس و بازگشت فوکوس باز می‌کند.
- بخش همیشه‌نمایان Enterprise experience شامل PMS = Project Management System، TMS = Tracking Management System و EDMS است؛ هر ورودی جزئیات قابل بازکردن دارد.
- IMS = Integrated Management System فقط در بخش In progress قرار دارد و در پنجرهٔ جزئیات هم وضعیت در حال توسعه را نشان می‌دهد. درصد پیشرفت یا ادعای تکمیل اضافه نشده است.
- طرح سادهٔ سبز، نسخهٔ فارسی با Vazirmatn، نسخهٔ انگلیسی و چیدمان موبایل حفظ شده‌اند. گالری از منوی کناری دسکتاپ فاصله دارد تا کنترل‌ها پوشانده نشوند.
- پلیر داخل صفحهٔ SoundCloud، ارتباط و تنظیمات Cloudflare دست‌نخورده‌اند.

توضیحات NewsLetter و PTB Rail از اطلاعات پروژه‌های موجود نوشته شده‌اند. برای AirCargo، Zixo و Crypto-Walliro توضیحات در محدودهٔ اطلاعات گفته‌شدهٔ مالک هستند؛ فناوری، شبکهٔ رمزارز، صرافی، بازده مالی یا ممیزی امنیتی تأییدنشده‌ای اضافه نشده است. مدارک و گواهی‌ها در این پچ اضافه نمی‌شوند.

## مبنا

- منبع: `haajilari/lary-space`، شاخهٔ `main`، commit `491edddebf065048221d321a72c091cc98e618d0` بعد از پچ پلیر داخل صفحه.
- بررسی نصب با SHA-256 دقیق هفت فایل برنامه و مستندات انجام می‌شود؛ دو فایل تازه باید در مبنا وجود نداشته باشند.
- Patch SHA-256: `07c290c91855247d9fc402d470946d89674da3c9400617fd2387a73df57ba1e3`
- پیش‌نیاز Node.js 22.12+؛ `.nvmrc` فعلی Node 24 را انتخاب می‌کند.
- پکیج‌ها، lockfile، `.gitignore`، فونت‌ها و تنظیمات استقرار تغییر نمی‌کنند.
- نصب‌کننده مسیر LarySpace را صریح انتخاب می‌کند. فایل‌های تولیدی مبنای پچ نیستند؛ قبل از TypeScript و پس از بررسی vinext، نوع‌های Next بازتولید می‌شوند و `next-env.d.ts` به محتوای ورودی برمی‌گردد.
- وضعیت مبنا یا خروجی کاملِ از قبل اعمال‌شده پذیرفته می‌شود. تفاوت مبنا، تغییرات stageشده یا فایل‌های نامرتبط باعث توقف می‌شوند؛ force-apply یا reverse نکن.

## نصب — سه commit و پاک‌سازی خودکار

بلوک زیر را کامل و یک‌جا اجرا کن. دریافت فایل‌های تحویلی، پیاده‌سازی و حذف دو فایل تحویلی سه commit جدا دارند. در صورت شکست، فایل‌های تحویلی باقی می‌مانند؛ اجرای دوباره خروجی کاملِ قبلاً اعمال‌شده را دوباره apply نمی‌کند.

```bash
/bin/bash <<'LARY_PATCH'
set -euo pipefail
cd /Users/lary/Desktop/Projects/lary-space

PatchFile='lary-space-projects-ims-20261024.patch'
PatchDigest='07c290c91855247d9fc402d470946d89674da3c9400617fd2387a73df57ba1e3'
ImplementationMessage='feat(laryspace): expand projects and add IMS in progress 20261024'
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
    "57fe1e501efb6bf5fb7454f5dd40ba4d1bfa610205cc5999163de380c7d28b71",
    "6234ed3942b527c7931786e8967f5e11821f0f8b794c1eb07e704cabd22f2f7b"
  ],
  [
    "app/globals.css",
    "1eb3ce731573d2cfd58562e43aff5454c75d518f62326241234d70c5ef0cfaa1",
    "ff7e7c6b207b4881500d7d6b81097b1eea6edbc3c8abc7c7b49d02ba4fb66c39"
  ],
  [
    "components/Portfolio.tsx",
    "9dc208405e39e1a408685326c9d691cebc44c934c97c53fc8c2d6ade126040c9",
    "b36f18b5c98b7456f8c45d6c82517444eb3a579b01b924af58f40256a88ef5bf"
  ],
  [
    "components/ProjectArtwork.tsx",
    null,
    "3057bcd22d41f3c0c2a6ef1d6c6849bf3a25744b7ce542545f6c4b2add3d763f"
  ],
  [
    "components/ProjectGallery.tsx",
    null,
    "701127d8dc73ee1076e1f3ae5582c11009f79e1312abc6c98bdc0b738179a399"
  ],
  [
    "components/ProjectModal.tsx",
    "2dcdfc6dae667d42be879f31ac394aa134f384dbae63ecf66a7325111e3f5d76",
    "557c2d94691d6adcb807a9d8c33f3c7862e86a44eea440e777539b062fde24e6"
  ],
  [
    "content/site.ts",
    "72835ebcc8881e61603e0be3f5138665b7a04eda29c4243fb8d6137d116324a0",
    "ec8331e5806f8ef3dc08913b15a240c01ada5765c109489fe896644f2fc6a35e"
  ]
];
const patchFile = 'lary-space-projects-ims-20261024.patch';
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
  components/Portfolio.tsx
  components/ProjectArtwork.tsx
  components/ProjectGallery.tsx
  components/ProjectModal.tsx
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
  git commit -m 'chore(laryspace): receive project gallery and IMS patch 20261024'
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
6234ed3942b527c7931786e8967f5e11821f0f8b794c1eb07e704cabd22f2f7b  README.md
ff7e7c6b207b4881500d7d6b81097b1eea6edbc3c8abc7c7b49d02ba4fb66c39  app/globals.css
b36f18b5c98b7456f8c45d6c82517444eb3a579b01b924af58f40256a88ef5bf  components/Portfolio.tsx
3057bcd22d41f3c0c2a6ef1d6c6849bf3a25744b7ce542545f6c4b2add3d763f  components/ProjectArtwork.tsx
701127d8dc73ee1076e1f3ae5582c11009f79e1312abc6c98bdc0b738179a399  components/ProjectGallery.tsx
557c2d94691d6adcb807a9d8c33f3c7862e86a44eea440e777539b062fde24e6  components/ProjectModal.tsx
ec8331e5806f8ef3dc08913b15a240c01ada5765c109489fe896644f2fc6a35e  content/site.ts
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
git commit -m 'chore(laryspace): remove project gallery and IMS delivery files 20261024'
git status --short
[ -z "$(git status --porcelain=v1 --untracked-files=all)" ] || fail 'Remaining Git changes need review.'
printf '\n%s\n' 'PASS: patch installed, verified and self-cleaned. Git is clean.'
git log -3 --oneline
LARY_PATCH
```

## انتشار

پس از پیام `PASS: patch installed, verified and self-cleaned. Git is clean.`:

```bash
git -C /Users/lary/Desktop/Projects/lary-space push origin main
```

پس از Build و Deploy موفق Cloudflare، نسخه‌های `/en#work` و `/fa#work` را روی https://laryspace.tech بررسی کن. سه کارت اول، Show more، جزئیات پروژه‌ها، ورودی‌های سازمانی و IMS در In progress باید دیده شوند.

## بررسی‌ها

- TypeScript، ساخت Next.js، scanner و ساخت vinext، dry-run Worker و deploy helper: موفق.
- اجرای واقعی Worker در هر دو زبان، عرض‌های ۱۴۴۰ و ۳۹۰؛ کنترل اندازهٔ ۱۰۲۴، عرض ۳۲۰ و حالت کوتاه ۶۶۷×۳۲۰: موفق.
- نمایش اولیهٔ سه کارت، گسترش به هشت کارت، نمایش کمتر، باز و بسته‌شدن ۱۲ ورودی جزئیات، Escape، Tab و بازگشت فوکوس: موفق.
- IMS فقط در لیست در حال توسعه؛ شمارنده‌ها و نام کامل PMS/TMS/IMS؛ تصاویر برند، ارتباط و وجود پلیر داخل صفحه: بررسی شدند.
- نصب بسته، ادامهٔ نصب پس از شکست، پاک‌سازی خودکار و حفاظت از پروژهٔ دیگری که ترمینال در آن باز است: موفق.

## نگهداری محتوا

فایل `content/site.ts` هر دو زبان را نگه می‌دارد. سه ورودی اول `work.projects` در ابتدا نمایش داده می‌شوند؛ بقیه با Show more. تجربه‌های سازمانی در `work.enterpriseProjects` و موارد در حال توسعه در `work.inProgressProjects` هستند. IMS دارای `stage: "in-progress"` است. برای اضافه‌کردن جزئیات فنی، فیلدهای اختیاری `challenge`، `approach` و `stack` را با اطلاعات واقعی تکمیل کن.

## فایل‌های تغییرکرده

- `README.md`
- `app/globals.css`
- `components/Portfolio.tsx`
- `components/ProjectArtwork.tsx`
- `components/ProjectGallery.tsx`
- `components/ProjectModal.tsx`
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
ImplementationCommit="$(git log -1 --format=%H --fixed-strings --grep='feat(laryspace): expand projects and add IMS in progress 20261024')"
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
