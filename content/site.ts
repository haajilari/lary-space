export type Locale = "en" | "fa";
export type SectionId = "home" | "work" | "about" | "stack" | "sound" | "contact";
export type ProjectId = "finance" | "logistics" | "documents";
export type Project = {
  id: ProjectId;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  stack: readonly string[];
  challenge: string;
  approach: string;
  detail: string;
  features: readonly string[];
};
export type Copy = {
  nav: Record<SectionId, string>;
  menu: string;
  close: string;
  switchLanguage: string;
  hero: { kicker: string; title1: string; title2: string; description: string; button: string; secondary: string; flourish: string; scroll: string; layered: string };
  work: { eyebrow: string; title: string; description: string; more: string; challenge: string; approach: string; details: string; features: string; projects: readonly Project[] };
  about: { eyebrow: string; title1: string; title2: string; lead: string; quote: string; quoteBy: string; values: readonly { index: string; title: string; body: string }[] };
  stack: { eyebrow: string; title: string; description: string; main: string; toolbox: string; build: string; mainSkills: readonly string[]; extras: readonly string[] };
  sound: { eyebrow: string; title1: string; title2: string; description: string; genre: string; awaiting: string; comingSoon: string; placeholder: string; playlistNote: string; openOnSoundCloud: string; playerTitle: string };
  contact: { eyebrow: string; title1: string; title2: string; description: string; email: string; copy: string; copied: string; github: string; made: string; rights: string; dialogTitle: string; dialogDescription: string };
  modal: { close: string };
};

export function isLocale(value: string): value is Locale { return value === "en" || value === "fa"; }
export const sections: readonly SectionId[] = ["home", "work", "about", "stack", "sound", "contact"];

// EDIT THESE PUBLIC DETAILS BEFORE DEPLOYMENT.
export const profile = {
  domain: "https://laryspace.tech",
  name: "Amirhossein Hajilari",
  github: "https://github.com/haajilari",
  email: "amirhossein.hajilari@gmail.com",
  whatsappUsername: "haajilari",
  linkedin: "https://www.linkedin.com/in/hajilari/",
  // Paste the exact link from LinkedIn's Message button when available.
  // The verified profile is the fallback; do not invent a member URN.
  linkedinMessageUrl: "",
  // Direct public playlist URL resolved from the owner's SoundCloud share link.
  soundcloudUrl: "https://soundcloud.com/amir-hossein-hajilari/sets/keep-your-anger-for-better",
  soundcloudTitle: "Keep your anger, For better reason! :)",
} as const;

const projectsEn: readonly Project[] = [
  {
    id: "finance", index: "01", title: "Finance Automation Engine", kicker: "SYSTEMS / AUTOMATION",
    summary: "Bridging operational data and financial workflows — with guardrails that make every step traceable.",
    stack: ["Python", "PostgreSQL", "REST APIs", "Integration"],
    challenge: "Complex handoffs between source operations and financial registration can introduce uncertainty and manual work.",
    approach: "Separate ingestion, mapping policies, validation, registrations, and reconciliation into clear, testable stages.",
    detail: "A policy-aware integration concept connecting operational records to financial registration with explicit state, retries, and review paths.",
    features: ["Policy-driven mapping", "Safe registration flow", "Retries & reconciliation", "Traceable outcomes"],
  },
  {
    id: "logistics", index: "02", title: "Chapar Operational Portal", kicker: "PRODUCT / OPERATIONS",
    summary: "Making complex logistics operations feel clear, fast, and manageable.",
    stack: ["React", "TypeScript", "MUI", "TanStack Query"],
    challenge: "Operations teams need to navigate orders, vehicles, customers, and workflows without losing context.",
    approach: "Design modular screens, reusable form controls, predictable data handling, and thoughtful right-to-left interfaces.",
    detail: "An operational interface spanning logistics workflows, rich forms, server-driven tables, and consistent navigation patterns.",
    features: ["Reusable design patterns", "Server-driven data grids", "Complex validation", "RTL-first interactions"],
  },
  {
    id: "documents", index: "03", title: "Document Management", kicker: "PLATFORM / ARCHITECTURE",
    summary: "A structured home for documents, access rules, and the information people depend on.",
    stack: ["React", "TypeScript", "Permissions", "UX Systems"],
    challenge: "Information becomes hard to trust when ownership, access, and document state are unclear.",
    approach: "Organize the interface around roles, organizational structures, classification, and transparent document states.",
    detail: "A document-centric workspace concept built around structured discovery, permission-aware views, and traceable activity.",
    features: ["Role-aware access", "Organizational hierarchy", "Document classification", "Clear information architecture"],
  },
];

const projectsFa: readonly Project[] = [
  {
    id: "finance", index: "۰۱", title: "موتور اتوماسیون مالی", kicker: "سیستم‌ها / اتوماسیون",
    summary: "اتصال داده‌های عملیاتی به فرایندهای مالی، با کنترل‌هایی که هر مرحله را قابل پیگیری نگه می‌دارند.",
    stack: ["Python", "PostgreSQL", "REST APIs", "Integration"],
    challenge: "انتقال اطلاعات بین عملیات و ثبت مالی، بدون کنترل مناسب، می‌تواند ابهام و کار دستی زیادی ایجاد کند.",
    approach: "تفکیک دریافت داده، سیاست‌های نگاشت، اعتبارسنجی، ثبت و مغایرت‌گیری به مراحل روشن و قابل آزمون.",
    detail: "یک مسیر یکپارچه‌سازی مبتنی بر سیاست برای اتصال رکوردهای عملیاتی به ثبت مالی، همراه با وضعیت‌های مشخص و فرایند رسیدگی.",
    features: ["نگاشت مبتنی بر سیاست", "مسیر ثبت ایمن", "تلاش مجدد و مغایرت‌گیری", "نتایج قابل ردیابی"],
  },
  {
    id: "logistics", index: "۰۲", title: "پرتال عملیاتی چاپار", kicker: "محصول / عملیات",
    summary: "تبدیل عملیات پیچیدهٔ لجستیک به تجربه‌ای روشن، سریع و قابل مدیریت.",
    stack: ["React", "TypeScript", "MUI", "TanStack Query"],
    challenge: "تیم عملیات باید سفارش‌ها، وسایل نقلیه، مشتریان و فرایندها را بدون گم‌کردن زمینه مدیریت کند.",
    approach: "طراحی صفحات ماژولار، کنترل‌های فرم قابل استفادهٔ مجدد و رفتارهای داده‌ای پیش‌بینی‌پذیر با پشتیبانی از RTL.",
    detail: "رابطی برای گردش‌کارهای لجستیک با فرم‌های پیشرفته، جدول‌های مبتنی بر سرور و الگوهای ناوبری یکپارچه.",
    features: ["الگوهای طراحی قابل‌استفادهٔ مجدد", "جدول‌های دادهٔ سمت سرور", "اعتبارسنجی پیچیده", "تعاملات راست‌به‌چپ"],
  },
  {
    id: "documents", index: "۰۳", title: "سامانهٔ مدیریت مستندات", kicker: "پلتفرم / معماری",
    summary: "خانه‌ای ساختارمند برای اسناد، مجوزهای دسترسی و اطلاعات مهم سازمان.",
    stack: ["React", "TypeScript", "Permissions", "UX Systems"],
    challenge: "وقتی مالکیت، دسترسی و وضعیت مدارک روشن نباشد، اعتماد به اطلاعات دشوار می‌شود.",
    approach: "سازمان‌دهی رابط براساس نقش کاربران، چارت سازمانی، طبقه‌بندی و وضعیت شفاف مدارک.",
    detail: "فضای کاری متمرکز بر اسناد، با کشف ساختارمند، نمایش متناسب با مجوزها و فعالیت قابل پیگیری.",
    features: ["دسترسی مبتنی بر نقش", "چارت سازمانی", "طبقه‌بندی مدارک", "معماری اطلاعات روشن"],
  },
];

export const copy: Record<Locale, Copy> = {
  en: {
    nav: { home: "Home", work: "Work", about: "The story", stack: "Toolkit", sound: "Soundspace", contact: "Contact" },
    menu: "Explore the space", close: "Close", switchLanguage: "فارسی",
    hero: {
      kicker: "SOFTWARE ENGINEER  /  CREATIVE BUILDER",
      title1: "Not born finished.", title2: "Built in layers.",
      description: "I'm Amirhossein Hajilari — Lary. I build thoughtful digital experiences, untangle complex systems, and believe that every layer reveals a little more.",
      button: "Explore my work", secondary: "Meet Lary", flourish: "A SPACE TO BECOME", scroll: "SCROLL TO REVEAL", layered: "A little more of me, with every layer.",
    },
    work: { eyebrow: "01 / THE WORK", title: "Ideas, brought to life.", description: "A few of the problems I've spent time understanding — and the systems shaped around them.", more: "Inside the build", challenge: "The challenge", approach: "The approach", details: "Project snapshot", features: "Engineering focus", projects: projectsEn },
    about: {
      eyebrow: "02 / THE STORY", title1: "Beyond the", title2: "shell.",
      lead: "Growth isn't always about adding more. Sometimes, it's about shedding what no longer fits — and making room for what's already there.",
      quote: "We are the sum of the layers we've moved beyond — and the things we choose to create next.", quoteBy: "THE IDEA BEHIND LARYSPACE",
      values: [
        { index: "01", title: "Curiosity", body: "Ask one more question. Look beneath the obvious." },
        { index: "02", title: "Craft", body: "Make the invisible engineering feel effortless." },
        { index: "03", title: "Integrity", body: "Build deliberately, and make every decision count." },
      ],
    },
    stack: {
      eyebrow: "03 / THE TOOLKIT", title: "Tools with a purpose.", description: "Technology matters when it helps solve the right problem. These are the languages and frameworks I reach for.",
      main: "PRIMARY LANGUAGES", toolbox: "FRAMEWORKS & SYSTEMS", build: "I like to work across the boundaries between interfaces, APIs, workflows, and data.",
      mainSkills: ["Python", "TypeScript", "JavaScript"], extras: ["React", "Next.js", "Django", "REST APIs", "PostgreSQL", "MUI", "TanStack Query", "System Design"],
    },
    sound: {
      eyebrow: "04 / SOUNDSPACE", title1: "A different", title2: "frequency.",
      description: "There's more to a person than their work. Here's a small window into the sounds that travel with me.", genre: "THE SOUNDTRACK TO MY SPACE", awaiting: "The playlist is taking shape.",
      comingSoon: "A SoundCloud track or playlist can be connected here without changing the design.", placeholder: "SOMETHING IS COMING TO LIFE",
      playlistNote: "A little of what I listen to. Choose a track and press play, right here.", openOnSoundCloud: "Listen on SoundCloud", playerTitle: "LarySpace SoundCloud playlist",
    },
    contact: {
      eyebrow: "05 / CONNECT", title1: "Let's make", title2: "something matter.", description: "A new idea, a difficult problem, or just a good conversation — my inbox is open.",
      email: "Say hello", copy: "Copy email", copied: "Copied!", github: "Explore GitHub", made: "An evolving space by Lary.", rights: "Built with purpose. Always becoming.",
      dialogTitle: "Let's connect.", dialogDescription: "Choose where you'd like to say hello.",
    },
    modal: { close: "Close project" },
  },
  fa: {
    nav: { home: "خانه", work: "نمونه‌کارها", about: "داستان من", stack: "ابزارها", sound: "موسیقی", contact: "ارتباط" },
    menu: "کاوش در فضا", close: "بستن", switchLanguage: "EN",
    hero: {
      kicker: "مهندس نرم‌افزار  /  سازندهٔ خلاق",
      title1: "کامل متولد نمی‌شویم.", title2: "لایه‌به‌لایه شکل می‌گیریم.",
      description: "من امیرحسین حاجی‌لری هستم؛ لری. تجربه‌های دیجیتال می‌سازم، پیچیدگی سیستم‌ها را باز می‌کنم و باور دارم هر لایه، بخش تازه‌ای از ما را آشکار می‌کند.",
      button: "دیدن نمونه‌کارها", secondary: "آشنایی با من", flourish: "فضایی برای شکفتن", scroll: "اسکرول کن تا آشکار شود", layered: "با هر لایه، بخش دیگری از من.",
    },
    work: { eyebrow: "۰۱ / نمونه‌کارها", title: "ایده‌ها، در دنیای واقعی.", description: "چند مسئله که برای فهمیدنشان وقت گذاشته‌ام؛ و سیستم‌هایی که برای حلشان شکل داده‌ام.", more: "پشت صحنهٔ ساخت", challenge: "چالش", approach: "رویکرد", details: "نگاهی به پروژه", features: "تمرکز مهندسی", projects: projectsFa },
    about: {
      eyebrow: "۰۲ / داستان من", title1: "آن‌سوی", title2: "پوسته.",
      lead: "رشد همیشه به معنای اضافه‌کردن نیست. گاهی باید آنچه دیگر اندازهٔ ما نیست را کنار بگذاریم تا برای آنچه حقیقتاً هستیم جا باز شود.",
      quote: "ما مجموعهٔ لایه‌هایی هستیم که از آن‌ها عبور کرده‌ایم؛ و چیزهایی که تصمیم می‌گیریم از اینجا به بعد خلق کنیم.", quoteBy: "اندیشهٔ پشت لری‌اسپیس",
      values: [
        { index: "۰۱", title: "کنجکاوی", body: "یک سؤال بیشتر بپرس. زیر ظاهر مسئله را ببین." },
        { index: "۰۲", title: "ظرافت در ساخت", body: "مهندسی پنهان را به تجربه‌ای ساده تبدیل کن." },
        { index: "۰۳", title: "اصالت", body: "آگاهانه بساز و برای هر تصمیم دلیل داشته باش." },
      ],
    },
    stack: {
      eyebrow: "۰۳ / ابزارهای من", title: "ابزارها، برای یک هدف.", description: "تکنولوژی وقتی ارزش دارد که مسئلهٔ درستی را حل کند. این‌ها زبان‌ها و ابزارهایی‌اند که با آن‌ها کار می‌کنم.",
      main: "زبان‌های اصلی", toolbox: "فریم‌ورک‌ها و سیستم‌ها", build: "دوست دارم مرز میان رابط کاربری، API، گردش‌کار و داده را به هم وصل کنم.",
      mainSkills: ["Python", "TypeScript", "JavaScript"], extras: ["React", "Next.js", "Django", "REST APIs", "PostgreSQL", "MUI", "TanStack Query", "System Design"],
    },
    sound: {
      eyebrow: "۰۴ / فضای موسیقی", title1: "در فرکانسی", title2: "دیگر.",
      description: "آدم‌ها فقط با کارشان شناخته نمی‌شوند. اینجا پنجرهٔ کوچکی است به موسیقی‌هایی که با من همراه‌اند.", genre: "موسیقیِ فضای من", awaiting: "پلی‌لیست هنوز در حال شکل‌گیری است.",
      comingSoon: "می‌توانیم یک ترک یا پلی‌لیست SoundCloud را بدون تغییر طراحی به این قسمت وصل کنیم.", placeholder: "چیزی در حال شکل‌گرفتن است",
      playlistNote: "بخشی از موسیقی‌هایی که گوش می‌دهم؛ همین‌جا آهنگ دلخواهت را انتخاب و پخش کن.", openOnSoundCloud: "شنیدن در SoundCloud", playerTitle: "پلی‌لیست لری‌اسپیس در SoundCloud",
    },
    contact: {
      eyebrow: "۰۵ / ارتباط", title1: "بیایید چیزی", title2: "ماندگار بسازیم.", description: "یک ایدهٔ تازه، مسئله‌ای پیچیده یا حتی یک گفت‌وگوی خوب؛ خوشحال می‌شوم از تو بشنوم.",
      email: "شروع گفت‌وگو", copy: "کپی ایمیل", copied: "کپی شد!", github: "دیدن گیت‌هاب", made: "فضایی در حال تکامل، از لری.", rights: "با دقت ساخته شده. همیشه در مسیر شدن.",
      dialogTitle: "در ارتباط باشیم.", dialogDescription: "راه دلخواهت را برای گفت‌وگو انتخاب کن.",
    },
    modal: { close: "بستن پروژه" },
  },
};
