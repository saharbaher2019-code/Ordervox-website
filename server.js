require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
// Serves the compiled React + Framer Motion app (built from ./app via
// `npm run build`, output lands in ./public_dist — see app/vite.config.js).
// The API routes below are unchanged, so the frontend rebuild doesn't touch
// the subscribe-form contract at all.
app.use(express.static(path.join(__dirname, "public_dist")));

const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

function loadSubscribers() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveSubscribers(list) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

// Only wire up email notifications if SMTP credentials are actually
// configured — lets the form keep working (saving to disk) even before
// email is set up, instead of crashing the whole server.
let transporter = null;
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sent straight back to the person who just filled out the form, so they
// know what happens next instead of wondering if the request went through.
// Kept in the language they were browsing the site in.
const NEXT_STEPS_EMAIL = {
  en: {
    subject: "You're on the list — here's what happens next",
    body: (name) => [
      `Hi ${name || "there"},`,
      "",
      "Thanks for requesting a demo of OrderVox! Here's exactly what happens next:",
      "",
      "1. We'll reach out within 1 business day to schedule a free 15-minute demo call.",
      "2. On that call, we'll set up your menu and connect your restaurant's phone line together — this is when your 14-day free trial starts. No credit card required.",
      "3. Once you're live, we'll send you your dashboard login so you can see every call, order, and transcript in one place.",
      "",
      "No self-serve wizard, no waiting around — we do the setup with you personally.",
      "",
      "Talk soon,",
      "The OrderVox Team",
    ].join("\n"),
  },
  es: {
    subject: "Ya estás en la lista — esto es lo que sigue",
    body: (name) => [
      `Hola ${name || ""}`.trim() + ",",
      "",
      "¡Gracias por solicitar una demo de OrderVox! Esto es exactamente lo que sigue:",
      "",
      "1. Nos pondremos en contacto en menos de 1 día hábil para agendar una demo gratuita de 15 minutos.",
      "2. En esa llamada, configuramos tu menú y conectamos la línea telefónica de tu restaurante juntos — ahí comienza tu prueba gratuita de 14 días. No se requiere tarjeta de crédito.",
      "3. Una vez que estés en vivo, te enviaremos tu acceso al panel para que veas cada llamada, pedido y transcripción en un solo lugar.",
      "",
      "Sin asistente de autoservicio, sin esperas — hacemos la configuración contigo, en persona.",
      "",
      "Hablamos pronto,",
      "El equipo de OrderVox",
    ].join("\n"),
  },
  prs: {
    subject: "شما در لیست هستید — مراحل بعدی این‌گونه است",
    body: (name) => [
      `${name ? name + " عزیز،" : "سلام،"}`,
      "",
      "از درخواست دموی OrderVox متشکریم! مراحل بعدی دقیقاً این‌گونه است:",
      "",
      "۱. ما ظرف ۱ روز کاری با شما تماس می‌گیریم تا یک دموی رایگان ۱۵ دقیقه‌ای هماهنگ کنیم.",
      "۲. در آن تماس، منو و خط تلفن رستوران شما را با هم راه‌اندازی می‌کنیم — از همان‌جا دوره آزمایشی رایگان ۱۴ روزه شما آغاز می‌شود. نیازی به کارت اعتباری نیست.",
      "۳. به‌محض فعال شدن، اطلاعات ورود به داشبورد را برایتان می‌فرستیم تا هر تماس، سفارش و متن گفتگو را در یک‌جا ببینید.",
      "",
      "بدون ویزارد خودکار، بدون معطلی — راه‌اندازی را شخصاً با شما انجام می‌دهیم.",
      "",
      "به‌زودی صحبت می‌کنیم،",
      "تیم OrderVox",
    ].join("\n"),
  },
};

// Every subscription request notification goes to these addresses by
// default. Override by setting NOTIFY_EMAIL in .env to a comma-separated
// list (e.g. "a@x.com,b@x.com") if that ever needs to change.
const DEFAULT_NOTIFY_EMAILS = ["saharbaher2019@gmail.com", "faizisafiullah@gmail.com"];
const notifyEmails = process.env.NOTIFY_EMAIL
  ? process.env.NOTIFY_EMAIL.split(",").map((e) => e.trim()).filter(Boolean)
  : DEFAULT_NOTIFY_EMAILS;

app.post("/api/subscribe", async (req, res) => {
  const { name, email, restaurantName, phone, language } = req.body || {};

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const subscribers = loadSubscribers();

  if (subscribers.some((s) => s.email === cleanEmail)) {
    // Not an error — just let them know they're already on the list.
    return res.json({ ok: true, alreadySubscribed: true });
  }

  const entry = {
    name: (name || "").trim(),
    email: cleanEmail,
    restaurantName: (restaurantName || "").trim(),
    phone: (phone || "").trim(),
    language: (language || "en").trim(),
    submittedAt: new Date().toISOString(),
  };
  subscribers.push(entry);
  saveSubscribers(subscribers);

  if (transporter) {
    transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to: notifyEmails.join(","),
        subject: "New OrderVox demo request",
        text: [
          `Name: ${entry.name || "(not provided)"}`,
          `Restaurant: ${entry.restaurantName || "(not provided)"}`,
          `Phone: ${entry.phone || "(not provided)"}`,
          `Email: ${entry.email}`,
          `Language: ${entry.language}`,
          `Submitted: ${entry.submittedAt}`,
        ].join("\n"),
      })
      .catch((err) => console.error("Notification email failed:", err.message));

    // Confirmation back to the person who just subscribed, so they know
    // what to expect instead of wondering if the form actually worked.
    const template = NEXT_STEPS_EMAIL[entry.language] || NEXT_STEPS_EMAIL.en;
    transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to: entry.email,
        subject: template.subject,
        text: template.body(entry.name),
      })
      .catch((err) => console.error("Next-steps email failed:", err.message));
  }

  res.json({ ok: true });
});

// Simple way to check who's signed up without opening the JSON file directly.
app.get("/api/subscribers", (req, res) => {
  res.json(loadSubscribers());
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log("OrderVox marketing site running at http://localhost:" + PORT);
  if (!transporter) {
    console.log("(Email notifications disabled - set SMTP_USER/SMTP_PASS in .env to enable them.)");
  }
});
