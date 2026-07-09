require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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
        subject: "New OrderVox early-access request",
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
