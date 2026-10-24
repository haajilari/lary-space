# LarySpace — Contact, Vazirmatn and English browser title

این ZIP دقیقاً دو فایل دارد: `lary-space-contact-font-20261024.patch` و `PATCH_README.md`. هر دو را مستقیم در ریشهٔ پروژه، کنار `package.json`، استخراج کن.

**نسخهٔ اصلاح‌شدهٔ نصب:** بررسی خروجی پروژهٔ فعلی نشان داد تنها تفاوت با baseline در `.gitignore` است و تمام فایل‌های برنامه مطابقت دارند. این نسخه `.gitignore` را از محدودهٔ پچ و کنترل هش فایل‌های تغییریافته خارج می‌کند؛ محتوا و قواعد فعلی این فایل حفظ می‌شوند. کنترل دقیق تمام ۱۳ فایل برنامه/فونت/مستندات پچ برقرار است. دو فایل این بسته را جایگزین دو فایل تحویلی قبلی کن و بلوک جدید زیر را اجرا کن.

## مبنا و صحت بسته

- Baseline: `lary-space-baseline-20261024-082918.zip`
- Baseline SHA-256: `1a8f0f3f899ccda88f424c12e14ddf6b07bbeefdc446c28272cb11390ad7fbce`
- Patch SHA-256: `4b8d455000d8d7cc62fdf21f2781c4fdcaddbf045219a4b3bf2cd0474a314ed0`
- پیش‌نیاز: Node.js 20.9+، npm، Git با هویت commit تنظیم‌شده، و baseline ثبت‌شده در Git.
- اسکریپت با ریشهٔ مستقل Git و پروژهٔ داخل repository والد سازگار است؛ SHA-256 فایل‌های تغییرکرده را کنترل می‌کند و تغییرات نامرتبط را نگه می‌دارد.
- `.gitignore` و قواعد فعلی آرشیوها حفظ می‌شوند. فقط دو فایل تحویلی در ریشه قرار بگیرند؛ فایل ZIP تحویل می‌تواند در Downloads بماند. فایل‌های untracked نامرتبط پیش از شروع نصب گزارش می‌شوند.

## رفتار نهایی

| مورد | قبل | بعد |
|---|---|---|
| فونت فارسی | فقط نام فونت در CSS، بدون فایل بارگذاری‌شده | Vazirmatn متغیر 100–900 از نسخهٔ upstream v33.003، همراه پروژه و با `next/font/local` |
| واژهٔ «فارسی» در صفحهٔ انگلیسی | فونت لاتین/جایگزین | Vazirmatn |
| ارتباط | پیمایش به بخش ارتباط یا بازکردن مستقیم ایمیل | پنجره با سه گزینهٔ WhatsApp message، Email و LinkedIn message |
| ایمیل و کپی ایمیل | `amirhajilari@gmail.com` | `amirhossein.hajilari@gmail.com` |
| WhatsApp | تعریف نشده | `https://wa.me/haajilari` |
| عنوان تب انگلیسی/فارسی | دو عنوان متفاوت | `LarySpace — Amirhossein Hajilari` در هر دو زبان |

پنجره از دکمهٔ بالای صفحه، منوی دسکتاپ/موبایل، نقشهٔ کناری و دکمهٔ بخش ارتباط باز می‌شود. دکمهٔ بستن، Escape و کلیک بیرون پنجره آن را می‌بندند؛ فوکوس در پنجره نگه داشته می‌شود و بعد به کنترل مناسب بازمی‌گردد. گزینه‌های سرویس‌ها انگلیسی‌اند و عنوان/توضیح پنجره با زبان صفحه هماهنگ است.

### وضعیت LinkedIn و SoundCloud

پروفایل صحیح `https://www.linkedin.com/in/hajilari/` است. لینک دقیق **Message** در baseline ارسال نشده است؛ بنابراین گزینهٔ LinkedIn فعلاً پروفایل را باز می‌کند تا بازدیدکننده روی Message کلیک کند. برای بازشدن مستقیم نوشتن پیام به خودت، لینک واقعی دکمهٔ Message را در `profile.linkedinMessageUrl` در `content/site.ts` قرار می‌دهیم. شناسهٔ عضو یا لینک composer حدس زده نشده است. ارسال پیام تابع ورود و مجوزهای LinkedIn است.

**گام بعد از این پچ:** اتصال SoundCloud خودت یا پلی‌لیست عمومی انتخابی‌ات. این درخواست در README پروژه نیز ثبت شده؛ `profile.soundcloudUrl` هنوز خالی است و برای گام بعد به URL واقعی نیاز داریم.

## نصب — یک بلوک، سه commit

از ریشهٔ پروژه در ترمینال macOS، پس از استخراج دو فایل، **تمام بلوک زیر را یک‌جا اجرا کن**. دریافت فایل‌ها، پیاده‌سازی و پاک‌سازی، سه commit جدا دارند. پاک‌سازی پس از موفقیت همهٔ بررسی‌ها انجام می‌شود. اگر نسخهٔ کامل پچ قبلاً اعمال شده ولی نصب تمام نشده باشد، دوباره اعمال نمی‌شود؛ فقط بررسی و ادامهٔ مراحل انجام می‌گیرد. در وضعیت ناسازگار یا نیمه‌اعمال‌شده، اسکریپت با پیام روشن متوقف می‌شود.

```bash
/bin/bash <<'LARY_PATCH'
set -euo pipefail

PatchFile='lary-space-contact-font-20261024.patch'
PatchDigest='4b8d455000d8d7cc62fdf21f2781c4fdcaddbf045219a4b3bf2cd0474a314ed0'
ImplementationMessage='fix(laryspace): add contact choices and Persian font 20261024'
ProjectRoot="$(pwd -P)"
fail() { printf '%s\n' "$*" >&2; exit 1; }

for Program in git node npm shasum; do
  command -v "$Program" >/dev/null || fail "Missing command: $Program"
done
node -e 'const [major,minor]=process.versions.node.split(".").map(Number); if(major<20 || (major===20 && minor<9)) { console.error("Node.js 20.9+ is required."); process.exit(1); }'
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
    "DESIGN_GUIDE.md",
    "5c775c7e23be73fba7a577e2e6ba33ed60fb29880cba2150dccf046ae536d139",
    "00837b7ee6367a1853ea13daec28714910256e77cc1a55aa90d6a23cf3fa5463"
  ],
  [
    "README.md",
    "36abf96d377f9fe5b1fbf62d012edcf61fc0d135aa1b5e50879c5f911fb01af3",
    "3726bb87fe051de0a6e03bdcf4dfb3a2312f118bede18673cb6992ea204e7c41"
  ],
  [
    "app/(root)/layout.tsx",
    "c4d03fb113e2dda101af1c2abe2d08f9302c8f0656ea5133b1cf9531fd12462d",
    "11da4ac820f7c9671f8da84711f4e1b733499b1b33a879c05e939a859271008c"
  ],
  [
    "app/[lang]/layout.tsx",
    "cdedeb292f869cbe25d6b478ea57de24539b001f8a7245eae9355527b5b695e1",
    "8961cbf1ff8164d2b12c09c5ac45f51bff4e66548a2ef2b5aa94ca8345661f76"
  ],
  [
    "app/fonts.ts",
    null,
    "503d7a36599b64f43461fdb3182ff087fde87077cf62eef71534d40d046e9a5c"
  ],
  [
    "app/fonts/OFL.txt",
    null,
    "e6f4ce7b6c830d5a25a4f8ac777c267cd7d3c180bc2a7150ca57cbb9b280c4b7"
  ],
  [
    "app/fonts/vazirmatn-variable.woff2",
    null,
    "4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92"
  ],
  [
    "app/globals.css",
    "b6adc3899025ea9e6aa213d06869f0dda81ab95eb412cf0b1c0aaedc308d142c",
    "bbb899228258a8a843f0ae6c0cd38a3ed1cd74986e08d4619b5ccfee12ecb1a6"
  ],
  [
    "components/ContactModal.tsx",
    null,
    "96390df710fb6c0d6cc37a1598dc4ea8effaa03eaa47587fcbf5b6b5a217a104"
  ],
  [
    "components/Icons.tsx",
    "63c668ae9b7e4bf626c0b31e77f0ab72f9861ab0d43b7806503db943383001d9",
    "0baed31df1c9bb1c56379437d3ea8f68db5b9ad2300776ced8b65cc2aaf823f7"
  ],
  [
    "components/Portfolio.tsx",
    "115e1d93308c96d481d183f5bbefed750689f97020162ddfeac9c30d497744de",
    "9dc208405e39e1a408685326c9d691cebc44c934c97c53fc8c2d6ade126040c9"
  ],
  [
    "components/SectionRail.tsx",
    "41f0f41e4c47090801756925f008c6c061ce928fd9da328a3646f42be2499872",
    "eb591d5bed871d5eed252a5c6ef87af5bee6a7984b5a7d8d4e45ab0e0dcffe24"
  ],
  [
    "content/site.ts",
    "67307d45341e7860a81625205f0355e63ab44df217ebaff6b42c1479a8937038",
    "42d2e9211ad6a1f7c0288d235168afbed4e0e1ac6aa416a6832fd398f14e12c5"
  ]
];
const patchFile = 'lary-space-contact-font-20261024.patch';
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
  DESIGN_GUIDE.md
  README.md
  'app/(root)/layout.tsx'
  'app/[lang]/layout.tsx'
  app/fonts.ts
  app/fonts/OFL.txt
  app/fonts/vazirmatn-variable.woff2
  app/globals.css
  components/ContactModal.tsx
  components/Icons.tsx
  components/Portfolio.tsx
  components/SectionRail.tsx
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
  git commit -m 'chore(laryspace): receive contact and font patch 20261024'
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
restore_declaration
trap - EXIT

shasum -a 256 -c <<'LARY_POST_HASHES'
00837b7ee6367a1853ea13daec28714910256e77cc1a55aa90d6a23cf3fa5463  DESIGN_GUIDE.md
3726bb87fe051de0a6e03bdcf4dfb3a2312f118bede18673cb6992ea204e7c41  README.md
11da4ac820f7c9671f8da84711f4e1b733499b1b33a879c05e939a859271008c  app/(root)/layout.tsx
8961cbf1ff8164d2b12c09c5ac45f51bff4e66548a2ef2b5aa94ca8345661f76  app/[lang]/layout.tsx
503d7a36599b64f43461fdb3182ff087fde87077cf62eef71534d40d046e9a5c  app/fonts.ts
e6f4ce7b6c830d5a25a4f8ac777c267cd7d3c180bc2a7150ca57cbb9b280c4b7  app/fonts/OFL.txt
4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92  app/fonts/vazirmatn-variable.woff2
bbb899228258a8a843f0ae6c0cd38a3ed1cd74986e08d4619b5ccfee12ecb1a6  app/globals.css
96390df710fb6c0d6cc37a1598dc4ea8effaa03eaa47587fcbf5b6b5a217a104  components/ContactModal.tsx
0baed31df1c9bb1c56379437d3ea8f68db5b9ad2300776ced8b65cc2aaf823f7  components/Icons.tsx
9dc208405e39e1a408685326c9d691cebc44c934c97c53fc8c2d6ade126040c9  components/Portfolio.tsx
eb591d5bed871d5eed252a5c6ef87af5bee6a7984b5a7d8d4e45ab0e0dcffe24  components/SectionRail.tsx
42d2e9211ad6a1f7c0288d235168afbed4e0e1ac6aa416a6832fd398f14e12c5  content/site.ts
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
git commit -m 'chore(laryspace): remove contact and font delivery files 20261024'
git status --short
[ -z "$(git status --porcelain=v1 --untracked-files=all)" ] || fail 'Remaining Git changes need review.'
printf '\n%s\n' 'PASS: patch installed, verified and self-cleaned. Git is clean.'
git log -3 --oneline
LARY_PATCH
```

پس از موفقیت برای اجرای محلی، در همان ریشهٔ پروژه:

```bash
npm run dev
```

آدرس‌ها: `http://localhost:3000/en` و `http://localhost:3000/fa`.

## بررسی‌های انجام‌شده روی این تحویل

| بررسی | نتیجه |
|---|---|
| نصب قفل‌شدهٔ وابستگی‌ها (`npm ci`) | PASS |
| TypeScript (`npm run typecheck`) | PASS |
| ساخت production (`npm run build`)، مسیرهای `/en` و `/fa` | PASS |
| اجرای واقعی مرورگر، ۲ زبان × عرض‌های 1440، 390 و 320 | PASS — ۶ پیکربندی |
| سه مقصد ارتباط، باز/بسته‌شدن، Escape، کلیک بیرون/داخل، فوکوس و منوی موبایل | PASS |
| دریافت فایل WOFF2 از خود برنامه و اعمال Vazirmatn | PASS |
| کپی آدرس ایمیل جدید، پنجرهٔ پروژه‌ها، تغییر زبان و ثابت‌ماندن title | PASS |
| خطاهای JavaScript و درخواست محلی ناموفق در smoke مرورگر | صفر |
| تطبیق پچ روی baseline تمیز، reverse-check و whitespace | PASS |
| نصب کامل راهنما و سه commit در Git مستقل و Git والد | PASS |
| حفظ بایت‌به‌بایت `.gitignore` سفارشی ثبت‌شده در Git | PASS |
| ادامه پس از شکست نصب وابستگی‌ها، بدون اعمال دوبارهٔ پچ | PASS |
| توقف پیش از تغییر برای baseline ناسازگار، staging نامرتبط و checksum نادرست | PASS |

پروژه اسکریپت lint یا مجموعهٔ unit/regression جداگانه ندارد؛ موردی با این نام PASS گزارش نشده است. smoke مرورگر روی Chromium انجام شده؛ اجرای حساب‌های واقعی WhatsApp/LinkedIn، ورود و تحویل پیام بررسی نشده است.

### بازبینی کوتاه پس از اجرا

1. `/en` و `/fa` را باز کن؛ عنوان تب در هر دو باید انگلیسی و یکسان باشد.
2. «ارتباط»/Contact یا «شروع گفت‌وگو»/Say hello را بزن؛ سه گزینه باید دیده شوند.
3. متن فارسی و واژهٔ «فارسی» روی صفحهٔ انگلیسی را بررسی کن؛ فونت باید Vazirmatn باشد.
4. Email باید ایمیل درست را در برنامهٔ ایمیل باز کند؛ Copy email باید همان آدرس را کپی کند. WhatsApp به نام کاربری اعلام‌شده و LinkedIn فعلاً به پروفایل واقعی وصل است.
5. موبایل، Escape، دکمهٔ بستن و کلیک بیرون پنجره را بررسی کن.

## فایل‌های تغییرکرده

- `DESIGN_GUIDE.md`
- `README.md`
- `app/(root)/layout.tsx`
- `app/[lang]/layout.tsx`
- `app/fonts.ts`
- `app/fonts/OFL.txt`
- `app/fonts/vazirmatn-variable.woff2`
- `app/globals.css`
- `components/ContactModal.tsx`
- `components/Icons.tsx`
- `components/Portfolio.tsx`
- `components/SectionRail.tsx`
- `content/site.ts`

فایل‌های تولیدشدهٔ Next.js و پوشه‌های وابستگی/ساخت وارد پچ نشده‌اند. فایل اصلی فونت و مجوز SIL Open Font License در `app/fonts/` قرار دارند و فونت با `next/font/local` توسط خود سایت سرو می‌شود. فایل باینری فونت به‌صورت Git binary patch داخل همان `.patch` است و `git apply` آن را بازسازی می‌کند. وابستگی‌ها و نسخه‌های Next.js و React تغییر نکرده‌اند.

## بازگشت اختیاری پس از نصب موفق

این بلوک فقط برای زمانی است که خودت بخواهی تغییرات این پچ را برگردانی. commit پیاده‌سازی را با `git revert` برمی‌گرداند؛ تاریخچه و commitهای قبلی حفظ می‌شوند. نصب هیچ بازگشت خودکاری انجام نمی‌دهد.

```bash
/bin/bash <<'LARY_ROLLBACK'
set -euo pipefail
[ -f package.json ] && [ -f content/site.ts ]
git diff --quiet
git diff --cached --quiet
ImplementationCommit="$(git log -1 --format=%H --fixed-strings --grep='fix(laryspace): add contact choices and Persian font 20261024')"
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

## منابع رفتار سرویس‌ها و فونت

- WhatsApp username links: https://faq.whatsapp.com/1561101675623754/
- LinkedIn messaging: https://www.linkedin.com/help/linkedin/answer/a541865/
- Vazirmatn upstream and OFL: https://github.com/rastikerdar/vazirmatn/tree/v33.003
