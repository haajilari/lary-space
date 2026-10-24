# LarySpace — Cloudflare Workers setup

این ZIP دقیقاً `lary-space-cloudflare-workers-20261024.patch` و `PATCH_README.md` را در ریشه دارد. هر دو را در `/Users/lary/Desktop/Projects/lary-space`، کنار `package.json` قرار بده.

## مبنا و نتیجه

این پچ برای وضعیت پس از نصب موفق پچ ارتباط/فونت ساخته شده است: commit پیاده‌سازی `c41798a` و پاک‌سازی `1be122d` که خروجی آن را فرستادی. کنترل نصب بر اساس محتوای فایل‌های دخیل است و به همان شناسهٔ commit در یک checkout آزمایشی نیاز ندارد.

`.gitignore` فعلی از GitHub خوانده شد و SHA-256 آن با گزارش مک تو یکسان است: `c2d9b0a8bbab7bbbdbf8d78a540cc7793d731becf663080c76e4e5dabbdaae89`. قواعد موجود از جمله `/*.zip` حفظ و فقط مسیرهای خروجی Cloudflare/Vite اضافه می‌شوند.

- Patch SHA-256: `a15ba577eb08de1873edf8ad2f509e25b7c7578e2c769d15bf4a99583002fbc0`
- Node.js: **22.12+**؛ Node 24 در `.nvmrc` انتخاب شده است. اگر Node قدیمی باشد، نصب پیش از تغییر متوقف می‌شود. برای NVM، پیش از نصب می‌توانی `nvm install 24` و `nvm use 24` را اجرا کنی.
- vinext 1.3.0، Vite 8.3.5، Cloudflare Vite plugin 1.65.0، Wrangler 4.152.0 و deploy helper 1.2.0 قفل شده‌اند.
- نسخه‌های Next.js 16.4.2، React/React DOM 19.3.1 و TypeScript 5.9.3 حفظ شده‌اند.
- مسیر پیکربندی، حالت رسمیِ پشتیبانی‌شدهٔ Wrangler در vinext است؛ فایل‌های `vite.config.ts` و `wrangler.jsonc` اضافه می‌شوند. `cloudflare.config.ts` مربوط به مسیر دیگر cf است و برای این بسته لازم نیست.
- فقط binding مربوط به `ASSETS` تعریف شده؛ KV، R2، AI، Browser Rendering، پایگاه داده و Cloudflare Images ایجاد یا متصل نمی‌شوند. تصاویر بدون edge resizing سرو می‌شوند.

## نصب محلی — سه commit

از ریشهٔ پروژه، تمام بلوک زیر را اجرا کن. دریافت بسته، اعمال/بررسی و حذف فایل‌های تحویلی، سه commit جدا دارند. اعتبارسنجی و dry-run انتشار داخل بلوک است. این بلوک `git push` یا انتشار آنلاین انجام نمی‌دهد. فایل تولیدشدهٔ `next-env.d.ts` پس از ساخت به محتوای ورودی برمی‌گردد تا در commit کد وارد نشود.

```bash
/bin/bash <<'LARY_PATCH'
set -euo pipefail

PatchFile='lary-space-cloudflare-workers-20261024.patch'
PatchDigest='a15ba577eb08de1873edf8ad2f509e25b7c7578e2c769d15bf4a99583002fbc0'
ImplementationMessage='feat(laryspace): configure validated Cloudflare Workers deployment 20261024'
ProjectRoot="$(pwd -P)"
fail() { printf '%s\n' "$*" >&2; exit 1; }

for Program in git node npm shasum; do
  command -v "$Program" >/dev/null || fail "Missing command: $Program"
done
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major<22 || (major===22 && minor<12)) { console.error("Node.js 22.12+ is required; use Node 24 as specified by .nvmrc."); process.exit(1); }'
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
    ".gitignore",
    "c2d9b0a8bbab7bbbdbf8d78a540cc7793d731becf663080c76e4e5dabbdaae89",
    "3e6acc3edb8fa0cd0d89472e448d3afff14e6a05b3222b4d6f9181a80fe2001c"
  ],
  [
    ".nvmrc",
    null,
    "68ca3fba3b7e864770cb61aeb306d4bd4354b68ab4dd38450860c5d823e42a53"
  ],
  [
    "README.md",
    "3726bb87fe051de0a6e03bdcf4dfb3a2312f118bede18673cb6992ea204e7c41",
    "6f3e6af3fa1f0a0b394304e1e71b86d61b2d05f278a1a894fca98ceb4f220420"
  ],
  [
    "package-lock.json",
    "c699a35916bb191a43321d7d0c9a4ba14e2279d97a0eead4a9e353e94e6dca22",
    "fcd9d6eba5ab4085cf89926b1fa119bdf8167c64fc30498f05af2e6a9cff3f6c"
  ],
  [
    "package.json",
    "bb857b1198c80ca5959607a7913c6c6fe87f57b716161db6871e2fe733124870",
    "b6265b9a2ce9b6d1a882c062f3a0b52c066a683fbc7564b1b5efc2f31d67c214"
  ],
  [
    "vite.config.ts",
    null,
    "25ce19077b63e8b6db21e19f6c50cd11c746b6d564d3c03cc716d941a87aa3b6"
  ],
  [
    "wrangler.jsonc",
    null,
    "26512c9a5f95470687439b11805b1674b837c3f0956ed104dc6ad846c4fcea98"
  ]
];
const patchFile = 'lary-space-cloudflare-workers-20261024.patch';
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
  .gitignore
  .nvmrc
  README.md
  package-lock.json
  package.json
  vite.config.ts
  wrangler.jsonc
)
GitApply=(git -C "$RepositoryRoot" apply)
if [ -n "$ProjectPrefix" ]; then
  GitApply+=(--directory="${ProjectPrefix%/}")
fi

printf '\n%s\n' 'Stage 1/3: record delivery files'
git status --short
git add -- "$PatchFile" PATCH_README.md
if ! git diff --cached --quiet; then
  git commit -m 'chore(laryspace): receive Cloudflare deployment patch 20261024'
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
3e6acc3edb8fa0cd0d89472e448d3afff14e6a05b3222b4d6f9181a80fe2001c  .gitignore
68ca3fba3b7e864770cb61aeb306d4bd4354b68ab4dd38450860c5d823e42a53  .nvmrc
6f3e6af3fa1f0a0b394304e1e71b86d61b2d05f278a1a894fca98ceb4f220420  README.md
fcd9d6eba5ab4085cf89926b1fa119bdf8167c64fc30498f05af2e6a9cff3f6c  package-lock.json
b6265b9a2ce9b6d1a882c062f3a0b52c066a683fbc7564b1b5efc2f31d67c214  package.json
25ce19077b63e8b6db21e19f6c50cd11c746b6d564d3c03cc716d941a87aa3b6  vite.config.ts
26512c9a5f95470687439b11805b1674b837c3f0956ed104dc6ad846c4fcea98  wrangler.jsonc
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
git commit -m 'chore(laryspace): remove Cloudflare deployment delivery files 20261024'
git status --short
[ -z "$(git status --porcelain=v1 --untracked-files=all)" ] || fail 'Remaining Git changes need review.'
printf '\n%s\n' 'PASS: patch installed, verified and self-cleaned. Git is clean.'
git log -3 --oneline
LARY_PATCH
```

## ارسال به GitHub

پس از پیام PASS نصب، در همان پروژه:

```bash
cd /Users/lary/Desktop/Projects/lary-space
git push origin main
```

Cloudflare کد GitHub را می‌خواند؛ موفقیت push پیش‌نیاز مرحلهٔ Deploy داشبورد است.

## تنظیمات دقیق همان چهار تصویر Cloudflare

| کادر/گزینه | مقدار |
|---|---|
| Repository | `haajilari/lary-space` |
| Production branch | `main` |
| Worker name | `lary-space` |
| Build command | `npm run build:vinext` |
| Deploy command | `npm run deploy:vinext` |
| Preview command | `npx wrangler preview --config dist/server/wrangler.json` |
| Enable Preview builds | Off برای انتشار اول |
| Protect with Cloudflare Access | Off؛ سایت عمومی است |
| Advanced → Path | `/` |
| API token | در همان منو `Create new token` برای Workers Builds |
| Variable name | `CLOUDFLARE_ACCOUNT_ID` |
| Variable value | Account ID حساب مقصد |
| Encrypt برای Account ID | Off؛ این مقدار شناسهٔ حساب است |

برای Account ID داخل داشبورد Cloudflare، `Cmd+K` را بزن، `Copy account ID` را جست‌وجو و انتخاب کن؛ مقدار کپی‌شده را در Variable value بگذار. راه دیگر Workers & Pages → Account Details → Account ID است.

توکن انتخاب‌شده در داشبورد احراز هویت انتشار را تأمین می‌کند؛ مقدار توکن را در Variable value نگذار. نام متغیر بالا برای Account ID است. ساخت توکن جدید Workers Builds راه مشخصی برای استفاده از مجوزهای لازم انتشار است؛ فهرست نارنجی شامل سرویس‌های دیگری هم هست که این پروژه به آن‌ها binding ندارد.

Node از `.nvmrc` خوانده می‌شود و متغیر جداگانهٔ `NODE_VERSION` برای این بسته لازم نیست. Preview command تا وقتی Preview builds خاموش است اجرا نمی‌شود. Deploy script از خروجی Build استفاده می‌کند و آن را دوباره نمی‌سازد.

بعد از اعمال پچ، PASS محلی و push موفق، **Deploy** را بزن. ابتدا آدرس `workers.dev` حاصل را برای `/en`، `/fa` و پنجرهٔ ارتباط بررسی کن؛ سپس اتصال دامنهٔ `laryspace.tech` را در تنظیمات Domains & Routes انجام بده.

## اعتبارسنجی

| بررسی | نتیجه |
|---|---|
| نصب تازه با lockfile (`npm ci`) | PASS |
| TypeScript | PASS |
| ساخت معمول Next.js | PASS |
| vinext compatibility check | ۴ import از ۴ پشتیبانی می‌شوند؛ reactStrictMode در App Router پشتیبانی جزئی دارد؛ scanner برابر 94% و بدون issue است |
| ساخت Worker با `npm run build:vinext` | PASS |
| Wrangler payload dry-run | PASS؛ 103 ماژول، حدود 380.80 KiB gzip؛ فقط ASSETS |
| بررسی فرمان vinext deploy با `--dry-run` | PASS |
| اجرای محلی Worker؛ `/`، `/en`، `/fa`، robots، sitemap و icon | PASS |
| مرورگر روی Worker؛ دو زبان × دسکتاپ/موبایل، فونت واقعی، popup، کپی ایمیل، تغییر زبان | PASS — چهار پیکربندی |
| نصب کامل راهنما، سه commit، Git مستقل و Git والد | PASS |

بررسی Worker در محیط محلی workerd انجام شده؛ احراز هویت حساب Cloudflare و انتشار آنلاین در این بسته اجرا نشده‌اند. هشدارهای sourcemap/chunk از ابزارهای build ممکن است دیده شوند؛ build و تست‌های runtime با کد خروج صفر موفق شدند. تفاوت گزارش‌شدهٔ Strict Mode در ابزار vinext در راهنمای پروژه نیز ثبت شده است.

## فایل‌های تغییرکرده

- `.gitignore`
- `.nvmrc`
- `README.md`
- `package-lock.json`
- `package.json`
- `vite.config.ts`
- `wrangler.jsonc`

فایل‌های تولیدشدهٔ `dist/`، `.vinext/` و `.wrangler/` وارد پچ نمی‌شوند. کد قابلیت‌های ارتباط، فونت و محتوا حفظ شده است. اتصال SoundCloud یا پلی‌لیست، گام بعدی ثبت‌شده در README باقی است.

## بازگشت اختیاری

این بلوک برای بازگرداندن commit همین پیکربندی است؛ نصب هیچ بازگشت خودکاری انجام نمی‌دهد.

```bash
/bin/bash <<'LARY_ROLLBACK'
set -euo pipefail
[ -f package.json ] && [ -f content/site.ts ]
git diff --quiet
git diff --cached --quiet
ImplementationCommit="$(git log -1 --format=%H --fixed-strings --grep='feat(laryspace): configure validated Cloudflare Workers deployment 20261024')"
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
restore_declaration
trap - EXIT
git status --short
LARY_ROLLBACK
```

## مستندات رسمی

- https://github.com/cloudflare/vinext#cli-reference — پشتیبانی از حالت Wrangler و `--legacy-wrangler-cloudflare-init`
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-image/
- https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/
