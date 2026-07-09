// Simulated "live call" player for the demo section. There's no real audio
// file to embed here, so this creates the *feel* of a call playing back —
// animated waveform, a running timer, and the transcript revealing itself
// line by line in sync — without claiming to be an actual audio recording.
(function () {
  const playBtn = document.getElementById("demo-play-btn");
  const playIcon = document.getElementById("demo-play-icon");
  const waveform = document.getElementById("demo-waveform");
  const timerEl = document.getElementById("demo-timer");
  const transcript = document.getElementById("demo-transcript");

  if (!playBtn || !waveform || !timerEl || !transcript) return;

  const lines = Array.from(transcript.querySelectorAll(".transcript-line"));
  const LINE_INTERVAL_MS = 2200;

  let playing = false;
  let elapsedSeconds = 0;
  let revealIndex = 0;
  let timerHandle = null;
  let revealHandle = null;

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function setIcon(iconId) {
    playIcon.innerHTML = `<use href="#${iconId}"/>`;
  }

  function resetTranscript() {
    lines.forEach((line) => line.classList.remove("visible"));
    revealIndex = 0;
  }

  function revealNext() {
    if (revealIndex >= lines.length) {
      stopDemo(true);
      return;
    }
    lines[revealIndex].classList.add("visible");
    lines[revealIndex].scrollIntoView({ block: "nearest", behavior: "smooth" });
    revealIndex++;
    revealHandle = setTimeout(revealNext, LINE_INTERVAL_MS);
  }

  function startDemo() {
    if (playing) return;
    if (revealIndex >= lines.length) {
      resetTranscript();
      elapsedSeconds = 0;
    }
    playing = true;
    playBtn.classList.add("playing");
    waveform.classList.add("animating");
    setIcon("icon-pause");

    timerHandle = setInterval(() => {
      elapsedSeconds++;
      timerEl.textContent = formatTime(elapsedSeconds);
    }, 1000);

    revealNext();
  }

  function stopDemo(finished) {
    playing = false;
    playBtn.classList.remove("playing");
    waveform.classList.remove("animating");
    setIcon("icon-play");
    clearInterval(timerHandle);
    clearTimeout(revealHandle);
    if (finished) {
      // Leave the finished transcript visible; next click starts over.
    }
  }

  playBtn.addEventListener("click", () => {
    if (playing) {
      stopDemo(false);
    } else {
      startDemo();
    }
  });
})();
