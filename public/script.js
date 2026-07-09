document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("subscribe-form");
const status = document.getElementById("form-status");
const submitBtn = form.querySelector(".form-submit");
const submitLabel = submitBtn.querySelector(".btn-label");

function setStatus(message, kind) {
  status.textContent = message;
  status.className = "form-status" + (kind ? ` ${kind}` : "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("", "");

  const email = form.email.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus(t("status.invalidEmail"), "error");
    form.email.focus();
    return;
  }

  const payload = {
    name: form.name.value.trim(),
    restaurantName: form.restaurantName.value.trim(),
    phone: form.phone.value.trim(),
    email,
    language: currentLanguage(),
  };

  const restoreLabel = submitLabel.textContent;
  submitBtn.disabled = true;
  submitLabel.textContent = t("status.sending");

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      throw new Error(data.error || t("status.genericError"));
    }

    setStatus(data.alreadySubscribed ? t("status.alreadySubscribed") : t("status.success"), "success");
    form.reset();
  } catch (err) {
    setStatus(err.message || t("status.genericError"), "error");
  } finally {
    submitBtn.disabled = false;
    submitLabel.textContent = restoreLabel;
  }
});
