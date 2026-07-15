// Interactive ROI calculator. All numbers come from sliders the visitor
// controls themselves — this is a live calculation, not a claimed result,
// and is labeled as an estimate in the UI (see roi.disclaimer in i18n.js).
(function () {
  const callsInput = document.getElementById("roi-calls");
  const orderInput = document.getElementById("roi-order");
  const rateInput = document.getElementById("roi-rate");
  const callsOut = document.getElementById("roi-calls-out");
  const orderOut = document.getElementById("roi-order-out");
  const rateOut = document.getElementById("roi-rate-out");
  const resultEl = document.getElementById("roi-output");
  const formulaEl = document.getElementById("roi-formula");
  const annualEl = document.getElementById("roi-annual");
  const ctaTextEl = document.getElementById("roi-cta-text");

  if (!callsInput || !orderInput || !rateInput || !resultEl) return;

  const WEEKS_PER_MONTH = 4.33;

  function recalc() {
    const calls = Number(callsInput.value);
    const order = Number(orderInput.value);
    const rate = Number(rateInput.value);

    callsOut.textContent = calls;
    orderOut.textContent = "$" + order;
    rateOut.textContent = rate + "%";

    const recoveredPerWeek = calls * (rate / 100);
    const monthlyRevenue = Math.round(recoveredPerWeek * order * WEEKS_PER_MONTH);
    const annualRevenue = monthlyRevenue * 12;

    resultEl.textContent = monthlyRevenue.toLocaleString("en-US");
    if (annualEl) annualEl.textContent = annualRevenue.toLocaleString("en-US");

    const callsWord = typeof t === "function" ? t("roi.unitCalls") : "calls";
    const recoveredWord = typeof t === "function" ? t("roi.unitRecovered") : "recovered";
    const weeksWord = typeof t === "function" ? t("roi.unitWeeks") : "weeks/month";

    formulaEl.textContent = `${calls} ${callsWord} × ${rate}% ${recoveredWord} × $${order} × ${WEEKS_PER_MONTH} ${weeksWord}`;

    if (ctaTextEl) {
      const template = typeof t === "function" ? t("roi.ctaTemplate") : "Claim My {amount}/Month";
      ctaTextEl.textContent = template.replace("{amount}", "$" + monthlyRevenue.toLocaleString("en-US"));
    }
  }

  [callsInput, orderInput, rateInput].forEach((el) => el.addEventListener("input", recalc));

  // Recompute when the language changes so the formula words stay translated.
  const langSelect = document.getElementById("lang-select");
  if (langSelect) langSelect.addEventListener("change", () => setTimeout(recalc, 0));

  recalc();
})();
