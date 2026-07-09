// Simple client-side translation: every visible string on the page lives in
// TRANSLATIONS, keyed the same way across languages. Elements opt in via
// data-i18n (textContent), data-i18n-html (innerHTML, for strings that need
// markup like the hero heading), or data-i18n-placeholder (input placeholder).
// The choice persists in localStorage so it's remembered on return visits.

const TRANSLATIONS = {
  en: {
    meta: { title: "OrderVox — AI Phone Ordering for Restaurants", description: "OrderVox answers every call, takes the order in natural conversation, and texts a confirmation — so your restaurant never misses another order." },
    nav: { features: "Features", how: "How it works", faq: "FAQ", cta: "Request Early Access" },
    hero: {
      eyebrow: "AI Phone Ordering for Restaurants",
      h1: 'Every call answered.<br>Every order taken.<br><span class="accent">Even at 9pm on a Friday.</span>',
      sub: "OrderVox picks up your restaurant's phone line, has a real conversation with the customer, takes their order accurately, and texts them a confirmation — all without a human touching the phone.",
      cta1: "Request Early Access",
      cta2: "See how it works",
      note: "Built on Twilio, GPT‑4o, and real-time speech — not a phone tree.",
    },
    pain: {
      h2: "You already know the problem.",
      card1: "The phone rings during the dinner rush and nobody can pick it up.",
      card2: "A missed call is a missed order — and the customer just calls the next place.",
      card3: "Hiring someone just to answer phones doesn't pencil out for most kitchens.",
    },
    features: {
      eyebrow: "Features",
      h2: "Everything a great host does — on every single call.",
      f1: { title: "Natural conversation, not a phone tree", desc: "Customers talk normally — \"what's good tonight?\", \"no onions, please\" — and OrderVox understands, no button-pressing required." },
      f2: { title: "Never miss a call", desc: "Answers instantly, 24/7 — during the rush, after close, on holidays. Every call becomes a chance at an order, not a hang-up." },
      f3: { title: "Handles real interruptions", desc: "If a customer cuts in mid-sentence to name their order, OrderVox stops immediately and listens — the way a good server would." },
      f4: { title: "Multi-language, automatically", desc: "Detects and switches language mid-call — English, Spanish, Dari, and more — without the customer needing to ask." },
      f5: { title: "Instant text confirmations", desc: "The moment an order is placed, the customer gets a text with their order number, total, and pickup time — no confusion, no missed pickups." },
      f6: { title: "A live dashboard for your team", desc: "Every call, transcript, and order lands in one place, so staff can see what's coming without ever picking up the phone." },
    },
    how: {
      eyebrow: "How it works",
      h2: "Live in an afternoon. No new hardware.",
      s1: { title: "Connect your number", desc: "OrderVox routes through your existing restaurant phone number — customers dial the number they already know." },
      s2: { title: "We load your menu", desc: "Your real menu, prices, and modifiers go in once — OrderVox only ever speaks from that data, never guesses." },
      s3: { title: "Customers call and order", desc: "A natural conversation, start to finish: greeting, order, confirmation, and a warm handoff to a human if anything gets complicated." },
      s4: { title: "You get the order — and the data", desc: "The order appears on your dashboard and the customer's phone, in real time." },
    },
    cta: { h2: "We're onboarding a small group of restaurants first.", p: "Request early access below and we'll reach out to get your restaurant set up." },
    subscribe: {
      h2: "Request early access",
      p: "Tell us a bit about your restaurant and we'll be in touch about getting you set up.",
      labelName: "Your name", placeholderName: "Jane Doe",
      labelRestaurant: "Restaurant name", placeholderRestaurant: "Kabul Kitchen",
      labelPhone: "Contact phone", placeholderPhone: "(555) 123-4567",
      labelEmail: "Email", placeholderEmail: "you@yourrestaurant.com",
      button: "Request Early Access",
    },
    faq: {
      eyebrow: "FAQ", h2: "Good questions",
      q1: "Does it replace my staff?", a1: "No — it handles the phone so your staff can focus on the kitchen and the dining room. Anything it can't confidently handle gets warmly transferred to a real person.",
      q2: "What if it mishears an order?", a2: "Every item is read back and confirmed before the order is placed, and the customer gets a full read-back with the total before anything is submitted.",
      q3: "Do I need new phone hardware?", a3: "No. It works with the phone number you already have.",
      q4: "What languages does it support?", a4: "English, Spanish, and Dari today, with more on the way — it detects and switches automatically mid-call.",
    },
    status: {
      invalidEmail: "Please enter a valid email address.",
      sending: "Sending...",
      success: "Thanks! We've got your request and will reach out soon.",
      alreadySubscribed: "Looks like you're already on the list — we'll be in touch!",
      genericError: "Something went wrong. Please try again.",
    },
  },

  es: {
    meta: { title: "OrderVox — Pedidos telefónicos con IA para restaurantes", description: "OrderVox contesta cada llamada, toma el pedido en una conversación natural y envía un mensaje de confirmación, para que tu restaurante nunca pierda otro pedido." },
    nav: { features: "Funciones", how: "Cómo funciona", faq: "Preguntas frecuentes", cta: "Solicitar acceso anticipado" },
    hero: {
      eyebrow: "Pedidos telefónicos con IA para restaurantes",
      h1: 'Todas las llamadas contestadas.<br>Todos los pedidos tomados.<br><span class="accent">Incluso un viernes a las 9 de la noche.</span>',
      sub: "OrderVox contesta la línea telefónica de tu restaurante, mantiene una conversación real con el cliente, toma su pedido con precisión y le envía un mensaje de confirmación — todo sin que un humano toque el teléfono.",
      cta1: "Solicitar acceso anticipado",
      cta2: "Ver cómo funciona",
      note: "Creado con Twilio, GPT‑4o y reconocimiento de voz en tiempo real — no es un menú telefónico automatizado.",
    },
    pain: {
      h2: "Ya conoces el problema.",
      card1: "El teléfono suena durante la hora pico y nadie puede contestar.",
      card2: "Una llamada perdida es un pedido perdido — y el cliente simplemente llama al siguiente lugar.",
      card3: "Contratar a alguien solo para contestar el teléfono no es rentable para la mayoría de las cocinas.",
    },
    features: {
      eyebrow: "Funciones",
      h2: "Todo lo que hace un gran anfitrión, en cada llamada.",
      f1: { title: "Conversación natural, no un menú telefónico", desc: "Los clientes hablan con naturalidad — “¿qué recomienda hoy?”, “sin cebolla, por favor” — y OrderVox entiende, sin necesidad de presionar botones." },
      f2: { title: "Nunca pierdas una llamada", desc: "Contesta al instante, las 24 horas — durante la hora pico, después de cerrar, en días festivos. Cada llamada se convierte en una oportunidad de pedido, no en una llamada perdida." },
      f3: { title: "Maneja interrupciones reales", desc: "Si un cliente interrumpe a mitad de frase para decir su pedido, OrderVox se detiene de inmediato y escucha, como lo haría un buen mesero." },
      f4: { title: "Multilingüe, automáticamente", desc: "Detecta y cambia de idioma durante la llamada — inglés, español, darí y más — sin que el cliente tenga que pedirlo." },
      f5: { title: "Confirmaciones por texto al instante", desc: "En el momento en que se hace un pedido, el cliente recibe un mensaje de texto con su número de pedido, total y hora de recogida — sin confusión, sin pedidos olvidados." },
      f6: { title: "Un panel en vivo para tu equipo", desc: "Cada llamada, transcripción y pedido llega a un solo lugar, para que el personal vea lo que se aproxima sin tener que contestar el teléfono." },
    },
    how: {
      eyebrow: "Cómo funciona",
      h2: "Listo en una tarde. Sin equipo nuevo.",
      s1: { title: "Conecta tu número", desc: "OrderVox se conecta a través del número de teléfono que ya tiene tu restaurante — los clientes marcan el número que ya conocen." },
      s2: { title: "Cargamos tu menú", desc: "Tu menú real, precios y modificadores se ingresan una sola vez — OrderVox solo habla con esos datos, nunca adivina." },
      s3: { title: "Los clientes llaman y ordenan", desc: "Una conversación natural, de principio a fin: saludo, pedido, confirmación, y una transferencia amable a un humano si algo se complica." },
      s4: { title: "Recibes el pedido — y los datos", desc: "El pedido aparece en tu panel y en el teléfono del cliente, en tiempo real." },
    },
    cta: { h2: "Estamos incorporando primero a un pequeño grupo de restaurantes.", p: "Solicita acceso anticipado abajo y nos pondremos en contacto para configurar tu restaurante." },
    subscribe: {
      h2: "Solicita acceso anticipado",
      p: "Cuéntanos un poco sobre tu restaurante y nos pondremos en contacto para configurarlo.",
      labelName: "Tu nombre", placeholderName: "Juana Pérez",
      labelRestaurant: "Nombre del restaurante", placeholderRestaurant: "Kabul Kitchen",
      labelPhone: "Teléfono de contacto", placeholderPhone: "(555) 123-4567",
      labelEmail: "Correo electrónico", placeholderEmail: "tu@turestaurante.com",
      button: "Solicitar acceso anticipado",
    },
    faq: {
      eyebrow: "Preguntas frecuentes", h2: "Buenas preguntas",
      q1: "¿Reemplaza a mi personal?", a1: "No — se encarga del teléfono para que tu personal se concentre en la cocina y el comedor. Cualquier cosa que no pueda manejar con confianza se transfiere amablemente a una persona real.",
      q2: "¿Qué pasa si escucha mal un pedido?", a2: "Cada artículo se repite y se confirma antes de realizar el pedido, y el cliente recibe un resumen completo con el total antes de que se envíe algo.",
      q3: "¿Necesito nuevo equipo telefónico?", a3: "No. Funciona con el número de teléfono que ya tienes.",
      q4: "¿Qué idiomas admite?", a4: "Inglés, español y darí por ahora, con más en camino — detecta y cambia automáticamente durante la llamada.",
    },
    status: {
      invalidEmail: "Por favor ingresa un correo electrónico válido.",
      sending: "Enviando...",
      success: "¡Gracias! Recibimos tu solicitud y nos pondremos en contacto pronto.",
      alreadySubscribed: "Parece que ya estás en la lista — ¡nos pondremos en contacto!",
      genericError: "Algo salió mal. Por favor intenta de nuevo.",
    },
  },

  prs: {
    meta: { title: "OrderVox — سفارش‌گیری تلفنی با هوش مصنوعی برای رستوران‌ها", description: "OrderVox به هر تماس پاسخ می‌دهد، سفارش را در یک گفتگوی طبیعی می‌گیرد و پیام تأیید می‌فرستد — تا رستوران شما دیگر هیچ سفارشی را از دست ندهد." },
    nav: { features: "ویژگی‌ها", how: "چگونه کار می‌کند", faq: "سوالات متداول", cta: "درخواست دسترسی زودهنگام" },
    hero: {
      eyebrow: "سفارش‌گیری تلفنی با هوش مصنوعی برای رستوران‌ها",
      h1: 'هر تماس پاسخ داده می‌شود.<br>هر سفارش گرفته می‌شود.<br><span class="accent">حتی ساعت ۹ شب جمعه.</span>',
      sub: "OrderVox تلفن رستوران شما را پاسخ می‌دهد، با مشتری گفتگوی واقعی انجام می‌دهد، سفارش او را به‌درستی می‌گیرد و برایش پیام تأیید ارسال می‌کند — همه بدون اینکه کسی تلفن را لمس کند.",
      cta1: "درخواست دسترسی زودهنگام",
      cta2: "ببینید چگونه کار می‌کند",
      note: "ساخته‌شده بر پایه Twilio، GPT‑4o و تشخیص گفتار در زمان واقعی — نه یک منوی تلفنی خودکار.",
    },
    pain: {
      h2: "شما قبلاً این مشکل را می‌دانید.",
      card1: "در زمان شلوغی، تلفن زنگ می‌زند و کسی نمی‌تواند جواب بدهد.",
      card2: "یک تماس ازدست‌رفته یعنی یک سفارش ازدست‌رفته — و مشتری به جای بعدی زنگ می‌زند.",
      card3: "استخدام کسی فقط برای جواب دادن به تلفن، برای اکثر رستوران‌ها به‌صرفه نیست.",
    },
    features: {
      eyebrow: "ویژگی‌ها",
      h2: "همه کاری که یک میزبان خوب انجام می‌دهد — در هر تماس.",
      f1: { title: "گفتگوی طبیعی، نه یک منوی تلفنی", desc: "مشتریان به‌طور طبیعی صحبت می‌کنند — «امشب چی خوب است؟»، «پیاز نباشد، لطفاً» — و OrderVox می‌فهمد، بدون نیاز به فشار دادن دکمه." },
      f2: { title: "هیچ تماسی را از دست ندهید", desc: "به‌صورت فوری پاسخ می‌دهد، ۲۴ ساعته — در زمان شلوغی، بعد از بسته شدن، در تعطیلات. هر تماس فرصتی برای سفارش می‌شود، نه یک تماس قطع‌شده." },
      f3: { title: "قطع صحبت واقعی را مدیریت می‌کند", desc: "اگر مشتری وسط جمله صحبت را قطع کند تا سفارش خود را بگوید، OrderVox فوراً متوقف می‌شود و گوش می‌دهد — درست مثل یک گارسون خوب." },
      f4: { title: "چندزبانه، به‌صورت خودکار", desc: "زبان را در جریان تماس تشخیص داده و تغییر می‌دهد — انگلیسی، اسپانیایی، دری و بیشتر — بدون اینکه مشتری لازم باشد درخواست کند." },
      f5: { title: "تأیید فوری از طریق پیامک", desc: "به محض ثبت سفارش، مشتری پیامکی با شماره سفارش، مبلغ کل و زمان تحویل دریافت می‌کند — بدون سردرگمی، بدون فراموشی." },
      f6: { title: "یک داشبورد زنده برای تیم شما", desc: "هر تماس، متن گفتگو و سفارش در یک جا قرار می‌گیرد، تا کارکنان بدون جواب دادن به تلفن بدانند چه چیزی در راه است." },
    },
    how: {
      eyebrow: "چگونه کار می‌کند",
      h2: "در یک بعدازظهر آماده شود. بدون تجهیزات جدید.",
      s1: { title: "شماره خود را وصل کنید", desc: "OrderVox از طریق شماره تلفن فعلی رستوران شما کار می‌کند — مشتریان همان شماره‌ای را که می‌شناسند می‌گیرند." },
      s2: { title: "منوی شما را وارد می‌کنیم", desc: "منو، قیمت‌ها و انتخاب‌های واقعی شما فقط یک‌بار وارد می‌شود — OrderVox فقط از همان اطلاعات صحبت می‌کند، هرگز حدس نمی‌زند." },
      s3: { title: "مشتریان زنگ می‌زنند و سفارش می‌دهند", desc: "یک گفتگوی طبیعی، از ابتدا تا انتها: سلام، سفارش، تأیید، و در صورت پیچیده شدن، انتقال گرم به یک انسان." },
      s4: { title: "شما سفارش را دریافت می‌کنید — و اطلاعات را", desc: "سفارش به‌صورت زنده در داشبورد شما و در تلفن مشتری ظاهر می‌شود." },
    },
    cta: { h2: "ما ابتدا با یک گروه کوچک از رستوران‌ها کار را آغاز می‌کنیم.", p: "در پایین درخواست دسترسی زودهنگام بدهید تا با شما تماس بگیریم و رستوران شما را راه‌اندازی کنیم." },
    subscribe: {
      h2: "درخواست دسترسی زودهنگام",
      p: "کمی درباره رستوران خود به ما بگویید تا با شما در تماس شویم.",
      labelName: "نام شما", placeholderName: "احمد کریمی",
      labelRestaurant: "نام رستوران", placeholderRestaurant: "کابل کیچن",
      labelPhone: "شماره تماس", placeholderPhone: "(555) 123-4567",
      labelEmail: "ایمیل", placeholderEmail: "you@yourrestaurant.com",
      button: "درخواست دسترسی زودهنگام",
    },
    faq: {
      eyebrow: "سوالات متداول", h2: "سوالات خوب",
      q1: "آیا این جای کارکنان من را می‌گیرد؟", a1: "نه — این تلفن را مدیریت می‌کند تا کارکنان شما بتوانند روی آشپزخانه و سالن تمرکز کنند. هر چیزی که نتواند با اطمینان مدیریت کند، با گرمی به یک انسان واقعی منتقل می‌شود.",
      q2: "اگر سفارش را اشتباه بشنود چه می‌شود؟", a2: "هر قلم قبل از ثبت سفارش خوانده و تأیید می‌شود، و مشتری قبل از ارسال هرچیزی، یک خلاصه کامل همراه با مبلغ کل دریافت می‌کند.",
      q3: "آیا به تجهیزات تلفنی جدید نیاز دارم؟", a3: "نه. با همان شماره تلفنی که هم‌اکنون دارید کار می‌کند.",
      q4: "چه زبان‌هایی را پشتیبانی می‌کند؟", a4: "در حال حاضر انگلیسی، اسپانیایی و دری، و زبان‌های بیشتر در راه است — به‌صورت خودکار در جریان تماس تشخیص داده و تغییر می‌کند.",
    },
    status: {
      invalidEmail: "لطفاً یک ایمیل معتبر وارد کنید.",
      sending: "در حال ارسال...",
      success: "متشکریم! درخواست شما دریافت شد و به‌زودی با شما تماس می‌گیریم.",
      alreadySubscribed: "به نظر می‌رسد شما قبلاً در لیست هستید — با شما تماس خواهیم گرفت!",
      genericError: "مشکلی پیش آمد. لطفاً دوباره تلاش کنید.",
    },
  },
};

const RTL_LANGS = new Set(["prs"]);
const STORAGE_KEY = "ordervox_lang";

function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang] ? lang : "en";
  const t = TRANSLATIONS[dict];

  document.documentElement.lang = dict === "prs" ? "prs" : dict;
  document.documentElement.dir = RTL_LANGS.has(dict) ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getPath(t, el.getAttribute("data-i18n"));
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const value = getPath(t, el.getAttribute("data-i18n-html"));
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const value = getPath(t, el.getAttribute("data-i18n-placeholder"));
    if (value !== undefined) el.setAttribute("placeholder", value);
  });

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.meta && t.meta.description) metaDesc.setAttribute("content", t.meta.description);

  const select = document.getElementById("lang-select");
  if (select) select.value = dict;

  try {
    localStorage.setItem(STORAGE_KEY, dict);
  } catch {
    // Ignore — e.g. private browsing modes that block storage. Language
    // switching itself still works for the current page view.
  }
}

function currentLanguage() {
  return document.documentElement.lang || "en";
}

function t(path) {
  const dict = TRANSLATIONS[currentLanguage()] || TRANSLATIONS.en;
  const value = getPath(dict, path);
  return value !== undefined ? value : getPath(TRANSLATIONS.en, path);
}

document.addEventListener("DOMContentLoaded", () => {
  let saved = "en";
  try {
    saved = localStorage.getItem(STORAGE_KEY) || "en";
  } catch {
    // ignore
  }
  applyLanguage(TRANSLATIONS[saved] ? saved : "en");

  const select = document.getElementById("lang-select");
  if (select) {
    select.addEventListener("change", (e) => applyLanguage(e.target.value));
  }
});
