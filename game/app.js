/* QSO CERO — interfaz y flujo del juego. Sin dependencias. */
(function () {
  "use strict";

  const M = window.MorseCore;
  const C = window.CURRICULUM;
  const audio = new window.MorseAudio();

  const $ = function (id) {
    return document.getElementById(id);
  };

  const el = {
    tabs: Array.prototype.slice.call(document.querySelectorAll(".tab")),
    stage: $("stage"),
    feedback: $("feedback"),
    keylight: $("keylight"),
    btnPlay: $("btn-play"),
    btnRepeat: $("btn-repeat"),
    btnSlow: $("btn-slow"),
    btnKey: $("btn-key"),
    btnEval: $("btn-eval"),
    btnClear: $("btn-clear"),
    btnNext: $("btn-next"),
    kit: $("kit"),
    score: $("score"),
    level: $("level"),
    callsign: $("callsign"),
    license: $("license"),
    qth: $("qth"),
    name: $("name"),
    category: $("category-hint"),
    wpm: $("wpm"),
    wpmOut: $("wpm-out"),
    gap: $("gap"),
    gapOut: $("gap-out"),
    farnsworth: $("farnsworth"),
    farnsworthOut: $("farnsworth-out"),
    koch: $("koch"),
    volume: $("volume"),
    tone: $("tone"),
    btnCert: $("btn-cert")
  };

  const S = {
    mode: "listen",
    level: 0,
    wpm: 12,
    gap: 0,
    farnsworth: 0,
    kochLevel: 0,
    call: "CA3XYZ",
    license: "",
    qth: "SANTIAGO",
    name: "OPERADOR",
    station: "CE2ABC",
    current: null,
    keyEvents: [],
    keying: false,
    keyStartAt: 0,
    holdTimer: null,
    playing: false,
    guide: true,
    qso: null,
    lastStationText: "",
    replays: 0,
    hasInteracted: false,
    best: { listen: 0, send: 0, qso: 0, survival: 0 }
  };

  // ---------- utilidades ----------
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function sanitize(value) {
    return M.normalize(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Z0-9 .,?/=\-+:'"@!()&$_]/g, "");
  }

  function pct(value) {
    return Math.round(Math.max(0, Math.min(1, value)) * 100) + "%";
  }

  function withFarnsworth(opts) {
    opts = opts || {};
    if (!S.farnsworth) return opts;
    const out = {};
    for (const k in opts) out[k] = opts[k];
    out.farnsworthWpm = S.farnsworth;
    return out;
  }

  function fill(template) {
    return sanitize(
      String(template == null ? "" : template)
        .replace(/\{call\}/g, S.call)
        .replace(/\{station\}/g, S.station)
        .replace(/\{qth\}/g, S.qth)
        .replace(/\{name\}/g, S.name)
    );
  }

  function expected() {
    if (S.mode === "qso") {
      const step = qsoStep();
      return step && step.expect ? fill(step.expect) : "";
    }
    return S.current ? fill(S.current.template) : "";
  }

  function qsoStep() {
    if (!S.qso) return null;
    return C.qso.steps[S.qso.step] || null;
  }

  function qsoWaiting() {
    const step = qsoStep();
    return !!(step && step.from === "you");
  }

  function normalizedKeyEvents() {
    if (!S.keyEvents.length) return [];
    const base = S.keyEvents[0].down;
    return S.keyEvents.map(function (ev) {
      return { down: ev.down - base, up: ev.up - base };
    });
  }

  function feedback(html, kind) {
    el.feedback.className = "feedback " + (kind || "");
    el.feedback.innerHTML = html || "";
  }

  function saveSetup() {
    try {
      localStorage.setItem(
        "qso-cero-setup",
        JSON.stringify({
          call: S.call,
          license: S.license,
          qth: S.qth,
          name: S.name,
          wpm: S.wpm,
          gap: S.gap,
          level: S.level,
          farnsworth: S.farnsworth,
          kochLevel: S.kochLevel,
          guide: S.guide
        })
      );
    } catch (e) {
      /* modo privado */
    }
  }

  function loadSetup() {
    try {
      const raw = localStorage.getItem("qso-cero-setup");
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.call) S.call = sanitize(data.call) || S.call;
      if (typeof data.license === "string") S.license = sanitize(data.license);
      if (data.qth) S.qth = sanitize(data.qth);
      if (data.name) S.name = sanitize(data.name);
      if (data.wpm) S.wpm = Math.min(25, Math.max(5, Number(data.wpm)));
      if (data.gap) S.gap = Math.min(200, Math.max(0, Number(data.gap)));
      if (data.level) S.level = Math.min(C.levels.length - 1, Math.max(0, Number(data.level)));
      if (data.farnsworth != null) {
        const fv = Number(data.farnsworth);
        if (Number.isFinite(fv)) {
          S.farnsworth = fv <= 0 ? 0 : Math.min(20, Math.max(5, fv));
        }
      }
      if (data.kochLevel != null) {
        const kv = Number(data.kochLevel);
        if (Number.isFinite(kv)) S.kochLevel = Math.min(8, Math.max(0, Math.round(kv)));
      }
      if (typeof data.guide === "boolean") S.guide = data.guide;
    } catch (e) {
      /* ignorar */
    }
  }

  function saveBest() {
    try {
      localStorage.setItem("qso-cero-best", JSON.stringify(S.best));
    } catch (e) {
      /* modo privado */
    }
  }

  function loadBest() {
    try {
      const raw = localStorage.getItem("qso-cero-best");
      if (!raw) return;
      const data = JSON.parse(raw);
      ["listen", "send", "qso", "survival"].forEach(function (k) {
        if (typeof data[k] === "number") S.best[k] = Math.max(0, Math.min(1, data[k]));
      });
    } catch (e) {
      /* ignorar */
    }
  }

  function updateCategory() {
    const prefix = S.call.slice(0, 2);
    const map = { XQ: "Superior", CE: "General (o club)", CA: "Novicio", CD: "Aspirante" };
    el.category.textContent = map[prefix]
      ? "Categoría por prefijo: " + map[prefix]
      : "Prefijo no reconocido: revisa tu indicativo.";
  }

  // ---------- audio ----------
  function playText(text, wpm, noise, onEnd) {
    const sched = M.schedule(text, withFarnsworth({
      wpm: wpm || S.wpm,
      extraGapMs: S.gap
    }));
    if (!sched.events.length) {
      feedback("No se pudo codificar ese texto.", "error");
      if (onEnd) onEnd();
      return false;
    }
    S.playing = true;
    updateControls();
    try {
      audio.play(sched, {
        noise: noise,
        onEvent: function (on) {
          el.keylight.classList.toggle("on", !!on);
        },
        onEnd: function () {
          S.playing = false;
          el.keylight.classList.remove("on");
          updateControls();
          if (onEnd) onEnd();
        }
      });
    } catch (err) {
      S.playing = false;
      updateControls();
      feedback("No se pudo iniciar el audio: " + esc(err && err.message ? err.message : err), "error");
      if (onEnd) onEnd();
      return false;
    }
    return true;
  }

  function stopAudio() {
    audio.stop();
    S.playing = false;
    el.keylight.classList.remove("on");
    updateControls();
  }

  // ---------- keying ----------
  function keyStart(e) {
    if (e) e.preventDefault();
    if (S.playing || S.keying) return;
    if (!(S.mode === "send" || (S.mode === "qso" && qsoWaiting()))) return;
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;

    S.keying = true;
    S.keyStartAt = performance.now();
    try {
      audio.keyOn();
    } catch (err) {
      S.keying = false;
      feedback("No se pudo iniciar el audio: " + esc(err && err.message ? err.message : err), "error");
      updateControls();
      return;
    }
    el.keylight.classList.add("on");
    S.holdTimer = setTimeout(keyEnd, 10000);
    updateControls();
  }

  function keyEnd(e) {
    if (e) e.preventDefault();
    if (!S.keying) return;
    clearTimeout(S.holdTimer);
    const up = performance.now();
    audio.keyOff();
    el.keylight.classList.remove("on");
    S.keyEvents.push({ down: S.keyStartAt, up: up });
    S.keying = false;
    updateLive();
    updateControls();
  }

  function updateLive() {
    const live = document.querySelector("#live");
    if (!live) return;
    const events = normalizedKeyEvents();
    if (!events.length) {
      live.textContent = "—";
      return;
    }
    const decoded = M.decodeKeying(events, withFarnsworth({ wpm: S.wpm }));
    live.textContent = decoded.text || "…";
  }

  // ---------- render ----------
  function setMode(mode) {
    stopAudio();
    S.mode = mode;
    S.hasInteracted = true;
    S.keyEvents = [];
    S.replays = 0;
    S.current = null;
    S.qso = null;
    el.tabs.forEach(function (b) {
      b.classList.toggle("active", b.dataset.mode === mode);
    });
    if (mode === "qso") {
      startQSO();
    } else {
      newItem();
    }
  }

  function newItem() {
    if (S.kochLevel > 0) {
      const pool = C.kochLevels.slice(0, S.kochLevel).flat();
      const count = S.kochLevel === 1 ? 1 : (Math.random() < 0.5 ? 2 : 3);
      const symbols = [];
      for (let i = 0; i < count; i++) {
        symbols.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      S.current = { template: symbols.join(" ") };
      S.keyEvents = [];
      S.replays = 0;
      S.lastStationText = "";
      feedback("");
      renderStage();
      updateControls();
      return;
    }
    const level = C.levels[S.level];
    let template = level.items[0];
    if (level.items.length > 1) {
      for (let i = 0; i < 8; i++) {
        template = level.items[Math.floor(Math.random() * level.items.length)];
        if (!S.current || template !== S.current.template) break;
      }
    }
    S.current = { template: template };
    S.keyEvents = [];
    S.replays = 0;
    S.lastStationText = "";
    feedback("");
    renderStage();
    updateControls();
  }

  function renderStage() {
    if (S.mode === "qso") {
      renderQSO();
      return;
    }

    const level = C.levels[S.level];
    const send = S.mode === "send";
    const survival = S.mode === "survival";
    const title = send ? "Transmite" : survival ? "Copia con ruido" : "Escucha y escribe";
    const subtitle = send
      ? "Mantén Espacio o el botón. Punto = 1 unidad; raya = 3. La pausa también es código."
      : survival
        ? "Hay QRM. Si no copiaste, pide AGN: cuesta menos que adivinar."
        : "Reproduce el audio y escribe exactamente lo que oíste.";

    let body = "";
    if (send) {
      body =
        '<div class="target-card">' +
        '<p class="label">Objetivo</p>' +
        '<p class="target ' + (S.guide ? "" : "blurred") + '">' + esc(expected()) + "</p>" +
        (S.guide ? '<p class="morse-hint">' + esc(M.morseString(expected())) + "</p>" : "") +
        "</div>" +
        '<div class="live-card"><p class="label">Lo que estás transmitiendo</p>' +
        '<p id="live" class="live">' + (S.keyEvents.length ? "…" : "—") + "</p></div>" +
        '<label class="check"><input type="checkbox" id="guide" ' + (S.guide ? "checked" : "") + "> Mostrar guía</label>";
    } else {
      body =
        '<div class="target-card">' +
        '<p class="label">' + (survival ? "Señal con ruido" : "Audio") + "</p>" +
        '<p class="big-unknown" aria-hidden="true">• • •</p>' +
        "</div>" +
        '<input id="answer" class="answer" placeholder="Escribe lo que oíste" autocomplete="off" spellcheck="false" autocapitalize="characters">' +
        '<p class="muted small">Enter para evaluar · usa AGN? / QRS para repetir</p>';
    }

    el.stage.innerHTML =
      '<div class="stage-head">' +
      '<p class="eyebrow">' +
      (S.kochLevel > 0
        ? "Koch " + S.kochLevel + " · " + esc(C.kochLevels.slice(0, S.kochLevel).flat().join(" "))
        : "Nivel " + (S.level + 1) + " · " + esc(level.name)) +
      "</p>" +
      "<h2>" + esc(title) + "</h2>" +
      '<p class="muted">' + esc(subtitle) + "</p>" +
      "</div>" +
      body;

    if (send) {
      const guide = document.querySelector("#guide");
      if (guide) {
        guide.addEventListener("change", function (e) {
          S.guide = e.target.checked;
          saveSetup();
          renderStage();
        });
      }
      if (S.keyEvents.length) updateLive();
    } else {
      const input = document.querySelector("#answer");
      if (input && !S.playing && S.hasInteracted) {
        setTimeout(function () {
          input.focus();
        }, 50);
      }
    }
  }

  function renderQSO() {
    if (!S.qso) return;
    const log = S.qso.transcript
      .map(function (t) {
        return (
          '<div class="log-entry ' + t.who + '">' +
          '<span class="who">' + (t.who === "station" ? esc(S.station) : "TÚ") + "</span>" +
          '<span class="said">' + esc(t.text) + "</span>" +
          "</div>"
        );
      })
      .join("");

    const step = qsoStep();
    let turn = "";
    if (S.qso.done) {
      turn =
        '<div class="turn done"><h3>QSO completado</h3>' +
        "<p>Hiciste un contacto completo: llamada, respuesta, reporte y cierre. Eso ya es más de lo que hace la mayoría.</p>" +
        '<button class="btn ghost" id="qso-again">Repetir QSO</button></div>';
    } else if (step && step.from === "you") {
      turn =
        '<div class="turn you">' +
        '<p class="eyebrow">Tu turno</p>' +
        '<p class="hint">' + esc(step.hint || "") + "</p>" +
        '<p class="target ' + (S.guide ? "" : "blurred") + '">' + esc(expected()) + "</p>" +
        (S.guide ? '<p class="morse-hint">' + esc(M.morseString(expected())) + "</p>" : "") +
        '<label class="check"><input type="checkbox" id="qso-guide" ' + (S.guide ? "checked" : "") + "> Mostrar guía</label>" +
        '<p class="muted small">Transmite con Espacio. Enter para evaluar.</p>' +
        "</div>";
    } else {
      turn =
        '<div class="turn station">' +
        '<p class="eyebrow">Turno de la estación</p>' +
        '<p class="muted">Escucha. Cuando termine, te toca.</p>' +
        "</div>";
    }

    el.stage.innerHTML =
      '<div class="stage-head"><p class="eyebrow">Primer QSO</p>' +
      "<h2>Contacto guiado</h2>" +
      '<p class="muted">La estación llama, tú respondes, intercambian reporte y cierran.</p></div>' +
      '<div class="qso-log">' + (log || '<p class="muted small">Sin tráfico todavía.</p>') + "</div>" +
      turn;

    const again = document.querySelector("#qso-again");
    if (again) {
      again.addEventListener("click", function () {
        startQSO();
      });
    }
    const qsoGuide = document.querySelector("#qso-guide");
    if (qsoGuide) {
      qsoGuide.addEventListener("change", function (e) {
        S.guide = e.target.checked;
        saveSetup();
        renderQSO();
      });
    }
  }

  function updateControls() {
    const qso = S.mode === "qso";
    const send = S.mode === "send";
    const waiting = qso && qsoWaiting();

    el.btnKey.hidden = !(send || qso);
    el.btnKey.disabled = S.playing;
    el.btnKey.classList.toggle("armed", waiting);
    el.btnEval.disabled = S.playing;
    el.btnPlay.textContent = S.playing ? "■ Detener" : "▶ Reproducir";
    el.btnRepeat.disabled = S.playing;
    el.btnSlow.disabled = S.playing;
    el.btnClear.disabled = S.playing;
    el.btnNext.textContent = qso ? "Reiniciar QSO" : "Siguiente";
    el.btnNext.disabled = S.playing;
  }

  // ---------- evaluación ----------
  function evaluate() {
    if (S.mode === "listen" || S.mode === "survival") {
      evaluateListen();
    } else if (S.mode === "send") {
      evaluateSend();
    } else if (S.mode === "qso") {
      evaluateQSO();
    }
  }

  function evaluateListen() {
    const input = document.querySelector("#answer");
    const typed = sanitize(input ? input.value : "");
    const exp = expected();
    const acc = M.accuracy(exp, typed);
    const kind = acc >= 0.9 ? "ok" : acc >= 0.6 ? "warn" : "error";

    let extra = "";
    if (S.mode === "survival") {
      const criterion = S.replays === 0 ? (acc >= 0.8 ? 1 : 0.4) : Math.max(0.2, 1 - 0.15 * S.replays);
      const score = acc * 0.6 + criterion * 0.4;
      extra =
        "<br><span class=\"muted\">Criterio: " +
        (S.replays === 0
          ? acc >= 0.8
            ? "copiaste sin pedir ayuda."
            : "adivinaste sin pedir AGN."
          : "pediste AGN " + S.replays + " vez/veces.") +
        "</span>";
      if (score > S.best.survival) {
        S.best.survival = score;
        saveBest();
        renderScore();
      }
      feedback(
        "<b>" + pct(score) + "</b> · copia " + pct(acc) +
          "<br>Esperado: <code>" + esc(exp) + "</code> · Tú: <code>" + esc(typed || "—") + "</code>" + extra,
        kind
      );
    } else {
      if (acc > S.best.listen) {
        S.best.listen = acc;
        saveBest();
        renderScore();
      }
      feedback(
        "<b>" + pct(acc) + "</b><br>Esperado: <code>" + esc(exp) +
          "</code> · Tú: <code>" + esc(typed || "—") + "</code>",
        kind
      );
    }
  }

  function evaluateSend() {
    const exp = expected();
    const events = normalizedKeyEvents();
    if (!events.length) {
      feedback("No transmitiste nada. Mantén Espacio o el botón y vuelve a intentar.", "warn");
      return;
    }
    const cmp = M.compareKeying(exp, events, withFarnsworth({ wpm: S.wpm }));
    const timing = M.timingScore(events, withFarnsworth({ wpm: S.wpm }));
    const total = cmp.accuracy * 0.7 + timing * 0.3;
    const kind = total >= 0.9 ? "ok" : total >= 0.65 ? "warn" : "error";

    let tip = "";
    if (cmp.accuracy < 1) {
      for (let i = 0; i < C.prosignTips.length; i++) {
        if (exp.indexOf(C.prosignTips[i].token) !== -1) {
          tip = '<br><span class="muted">' + esc(C.prosignTips[i].text) + "</span>";
          break;
        }
      }
      if (!tip && S.gap > 120) {
        tip = '<br><span class="muted">La pausa extra es alta: el receptor puede oír espacios donde no los hay.</span>';
      }
    }

    feedback(
      "<b>" + pct(total) + "</b> · copia " + pct(cmp.accuracy) + " · timing " + pct(timing) +
        "<br>Esperado: <code>" + esc(M.morseString(exp)) + "</code>" +
        "<br>Tú: <code>" +
        esc(
          cmp.actualCodes
            .map(function (c) {
              return c === " " ? "/" : c;
            })
            .join(" ")
        ) +
        "</code>" +
        tip,
      kind
    );

    if (total > S.best.send) {
      S.best.send = total;
      saveBest();
      renderScore();
    }
  }

  function evaluateQSO() {
    const step = qsoStep();
    if (!step || step.from !== "you") {
      feedback("Espera el turno de la estación.", "warn");
      return;
    }
    const exp = fill(step.expect);
    const events = normalizedKeyEvents();
    if (!events.length) {
      feedback("No transmitiste nada. La estación espera tu respuesta.", "warn");
      return;
    }
    const cmp = M.compareKeying(exp, events, withFarnsworth({ wpm: S.wpm }));
    if (cmp.accuracy >= 0.8) {
      S.qso.transcript.push({ who: "you", text: exp });
      S.qso.step++;
      S.keyEvents = [];
      feedback("Copiado. Precisión " + pct(cmp.accuracy) + ".", "ok");
      nextQSO();
    } else {
      S.qso.attempts = (S.qso.attempts || 0) + 1;
      feedback(
        "La estación no te copió (" + pct(cmp.accuracy) + "). Te repite más lento." +
          (S.guide ? "<br>Esperado: <code>" + esc(exp) + "</code>" : ""),
        "warn"
      );
      if (S.lastStationText) {
        playText(S.lastStationText, Math.max(5, S.wpm * 0.75));
      }
      renderQSO();
    }
  }

  // ---------- flujo QSO ----------
  function pickStation() {
    let candidates = C.stations.filter(function (s) {
      return s !== S.call;
    });
    if (!candidates.length) candidates = C.stations;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function startQSO() {
    stopAudio();
    S.station = pickStation();
    S.qso = { step: 0, transcript: [], attempts: 0, done: false };
    S.keyEvents = [];
    S.replays = 0;
    S.lastStationText = "";
    feedback("");
    nextQSO();
  }

  function finishStationStep(text) {
    if (!S.qso) return;
    const last = S.qso.transcript[S.qso.transcript.length - 1];
    if (!last || last.who !== "station" || last.text !== text) {
      S.qso.transcript.push({ who: "station", text: text });
    }
    S.qso.step++;
    nextQSO();
  }

  function nextQSO() {
    if (!S.qso) return;
    if (S.qso.step >= C.qso.steps.length) {
      S.qso.done = true;
      S.best.qso = Math.max(S.best.qso, 1);
      saveBest();
      renderScore();
      renderQSO();
      updateControls();
      feedback("QSO completo. Llamaste, respondiste, reportaste y cerraste.", "ok");
      return;
    }
    const step = qsoStep();
    if (step.from === "station") {
      const text = fill(step.text);
      S.lastStationText = text;
      renderQSO();
      playText(text, S.wpm, 0, function () {
        finishStationStep(text);
      });
    } else {
      renderQSO();
      updateControls();
      setTimeout(function () {
        const key = el.btnKey;
        if (key) key.focus();
      }, 50);
    }
  }

  function playStationStep(step, wpm) {
    if (!step || step.from !== "station") return;
    const text = fill(step.text);
    S.lastStationText = text;
    playText(text, wpm || S.wpm, 0, function () {
      finishStationStep(text);
    });
  }

  function refreshQSOIfWaiting() {
    if (S.mode === "qso" && S.qso && !S.qso.done && qsoWaiting() && !S.playing) {
      renderQSO();
    }
  }

  // ---------- controles ----------
  function togglePlay() {
    if (S.playing) {
      stopAudio();
      return;
    }
    S.hasInteracted = true;
    if (S.mode === "qso") {
      if (!S.qso || S.qso.done) {
        startQSO();
        return;
      }
      if (qsoWaiting()) {
        if (S.lastStationText) playText(S.lastStationText, S.wpm);
      } else {
        playStationStep(qsoStep(), S.wpm);
      }
      return;
    }
    const noise = S.mode === "survival" ? 0.12 : 0;
    playText(expected(), S.wpm, noise);
  }

  function repeat() {
    if (S.playing) return;
    if (S.mode === "survival") S.replays++;
    if (S.mode === "qso") {
      if (qsoWaiting()) {
        if (S.lastStationText) playText(S.lastStationText, S.wpm);
      } else {
        playStationStep(qsoStep(), S.wpm);
      }
      return;
    }
    playText(expected(), S.wpm, S.mode === "survival" ? 0.12 : 0);
  }

  function slow() {
    if (S.playing) return;
    S.replays++;
    if (S.mode === "qso") {
      if (qsoWaiting()) {
        if (S.lastStationText) playText(S.lastStationText, Math.max(5, S.wpm * 0.7));
      } else {
        playStationStep(qsoStep(), Math.max(5, S.wpm * 0.7));
      }
      return;
    }
    playText(expected(), Math.max(5, S.wpm * 0.7), S.mode === "survival" ? 0.12 : 0);
  }

  function nextItemOrQSO() {
    if (S.playing) return;
    if (S.mode === "qso") {
      startQSO();
    } else {
      newItem();
    }
  }

  function clearAnswer() {
    S.keyEvents = [];
    const input = document.querySelector("#answer");
    if (input) input.value = "";
    updateLive();
    feedback("");
  }

  // ---------- kit y puntaje ----------
  function renderKit() {
    el.kit.innerHTML = C.survival
      .map(function (item) {
        return (
          '<button class="kit-item" data-token="' + esc(item.token) + '" title="Escuchar ' + esc(item.token) + '">' +
          "<b>" + esc(item.token) + "</b>" +
          "<span>" + esc(item.meaning) + "</span>" +
          "</button>"
        );
      })
      .join("");
    el.kit.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-token]");
      if (!btn) return;
      playText(btn.dataset.token, Math.max(6, S.wpm - 2));
    });
  }

  function renderScore() {
    const rows = [
      ["Escucha", S.best.listen],
      ["Transmite", S.best.send],
      ["QSO", S.best.qso],
      ["Supervivencia", S.best.survival]
    ];
    const all = rows.every(function (r) {
      return r[1] >= 0.8;
    });
    el.score.innerHTML =
      rows
        .map(function (r) {
          return (
            '<div class="score-row"><span>' + r[0] + "</span>" +
            '<div class="bar"><i style="width:' + Math.round(r[1] * 100) + '%"></i></div>' +
            "<b>" + Math.round(r[1] * 100) + "</b></div>"
          );
        })
        .join("") +
      (all ? '<p class="badge-ok">QSO CERO desbloqueado</p>' : "");
  }

  function buildCertificate() {
    return {
      schema: "qso-cero/certificate/v1",
      version: "0.2",
      callsign: S.call,
      date: new Date().toISOString(),
      wpm: S.wpm,
      farnsworth: S.farnsworth,
      kochLevel: S.kochLevel,
      best: {
        listen: S.best.listen,
        send: S.best.send,
        qso: S.best.qso,
        survival: S.best.survival
      }
    };
  }

  function downloadCertificate() {
    const cert = buildCertificate();
    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qso-cero-" + S.call + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function renderLevels() {
    el.level.innerHTML = C.levels
      .map(function (l, i) {
        return '<option value="' + i + '">' + (i + 1) + " · " + esc(l.name) + "</option>";
      })
      .join("");
    el.level.value = String(S.level);
  }

  // ---------- eventos ----------
  function bind() {
    el.tabs.forEach(function (b) {
      b.addEventListener("click", function () {
        setMode(b.dataset.mode);
      });
    });

    el.btnPlay.addEventListener("click", togglePlay);
    el.btnRepeat.addEventListener("click", repeat);
    el.btnSlow.addEventListener("click", slow);
    el.btnEval.addEventListener("click", evaluate);
    el.btnClear.addEventListener("click", clearAnswer);
    el.btnNext.addEventListener("click", nextItemOrQSO);

    el.btnKey.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      keyStart();
    });
    el.btnKey.addEventListener("pointerup", function (e) {
      e.preventDefault();
      keyEnd();
    });
    el.btnKey.addEventListener("pointerleave", function () {
      if (S.keying) keyEnd();
    });
    el.btnKey.addEventListener("pointercancel", function () {
      if (S.keying) keyEnd();
    });

    window.addEventListener("keydown", function (e) {
      const tag = (document.activeElement && document.activeElement.tagName) || "";
      const typing = /INPUT|TEXTAREA|SELECT/.test(tag);
      if (e.code === "Space" && !typing && !e.repeat) {
        if (S.mode === "send" || (S.mode === "qso" && qsoWaiting())) {
          keyStart(e);
        }
      }
      if (e.key === "Enter" && !e.repeat) {
        if (!typing || (document.activeElement && document.activeElement.id === "answer")) {
          e.preventDefault();
          evaluate();
        }
      }
      if ((e.key === "r" || e.key === "R") && !typing) {
        e.preventDefault();
        repeat();
      }
      if ((e.key === "n" || e.key === "N") && !typing) {
        e.preventDefault();
        nextItemOrQSO();
      }
    });

    window.addEventListener("keyup", function (e) {
      if (e.code === "Space") {
        const tag = (document.activeElement && document.activeElement.tagName) || "";
        if (S.keying && !/INPUT|TEXTAREA|SELECT/.test(tag)) {
          keyEnd(e);
        }
      }
    });

    window.addEventListener("blur", function () {
      if (S.keying) keyEnd();
    });

    el.callsign.addEventListener("input", function () {
      S.call = sanitize(el.callsign.value).slice(0, 10) || "CA3XYZ";
      el.callsign.value = S.call;
      updateCategory();
      saveSetup();
      refreshQSOIfWaiting();
    });

    el.license.addEventListener("input", function () {
      S.license = sanitize(el.license.value).slice(0, 20);
      el.license.value = S.license;
      saveSetup();
    });

    el.qth.addEventListener("input", function () {
      S.qth = sanitize(el.qth.value).slice(0, 24) || "SANTIAGO";
      el.qth.value = S.qth;
      saveSetup();
      refreshQSOIfWaiting();
    });

    el.name.addEventListener("input", function () {
      S.name = sanitize(el.name.value).slice(0, 20) || "OPERADOR";
      el.name.value = S.name;
      saveSetup();
      refreshQSOIfWaiting();
    });

    el.wpm.addEventListener("input", function () {
      S.wpm = Number(el.wpm.value);
      el.wpmOut.textContent = S.wpm + " WPM";
      saveSetup();
    });

    el.gap.addEventListener("input", function () {
      S.gap = Number(el.gap.value);
      el.gapOut.textContent = S.gap + " ms";
      saveSetup();
    });

    el.farnsworth.addEventListener("input", function () {
      S.farnsworth = Number(el.farnsworth.value);
      el.farnsworthOut.textContent = S.farnsworth ? S.farnsworth + " WPM" : "Apagado";
      saveSetup();
    });

    el.koch.addEventListener("change", function () {
      S.kochLevel = Number(el.koch.value);
      saveSetup();
      if (S.mode !== "qso") newItem();
    });

    el.volume.addEventListener("input", function () {
      audio.setVolume(Number(el.volume.value));
    });

    el.tone.addEventListener("change", function () {
      audio.setTone(Number(el.tone.value));
    });

    el.level.addEventListener("change", function () {
      S.level = Number(el.level.value);
      saveSetup();
      if (S.mode === "qso") startQSO();
      else newItem();
    });

    if (el.btnCert) {
      el.btnCert.addEventListener("click", downloadCertificate);
    }
  }

  // ---------- init ----------
  function init() {
    loadSetup();
    loadBest();

    el.callsign.value = S.call;
    el.license.value = S.license;
    el.qth.value = S.qth;
    el.name.value = S.name;
    el.wpm.value = String(S.wpm);
    el.wpmOut.textContent = S.wpm + " WPM";
    el.gap.value = String(S.gap);
    el.gapOut.textContent = S.gap + " ms";
    if (el.farnsworth) {
      el.farnsworth.value = String(S.farnsworth);
      el.farnsworthOut.textContent = S.farnsworth ? S.farnsworth + " WPM" : "Apagado";
    }
    if (el.koch) {
      el.koch.value = String(S.kochLevel);
    }
    el.volume.value = "0.7";
    audio.setVolume(0.7);
    audio.setTone(650);

    updateCategory();
    renderLevels();
    renderKit();
    renderScore();
    bind();

    const params = new URLSearchParams(location.search);
    if (params.has("level")) {
      const requested = Number(params.get("level"));
      if (Number.isFinite(requested)) {
        S.level = Math.min(C.levels.length - 1, Math.max(0, requested));
        el.level.value = String(S.level);
      }
    }
    if (params.has("farnsworth")) {
      const f = Number(params.get("farnsworth"));
      if (Number.isFinite(f)) {
        S.farnsworth = f <= 0 ? 0 : Math.min(20, Math.max(5, f));
        el.farnsworth.value = String(S.farnsworth);
        el.farnsworthOut.textContent = S.farnsworth ? S.farnsworth + " WPM" : "Apagado";
      }
    }
    if (params.has("koch")) {
      const k = Number(params.get("koch"));
      if (Number.isFinite(k)) {
        S.kochLevel = Math.min(8, Math.max(0, Math.round(k)));
        el.koch.value = String(S.kochLevel);
      }
    }
    const requestedMode = params.get("mode");
    if (requestedMode && ["listen", "send", "qso", "survival"].indexOf(requestedMode) !== -1) {
      setMode(requestedMode);
    } else {
      setMode("listen");
    }

    window.QSO_CERO = {
      state: S,
      expected: expected,
      evaluate: evaluate,
      startQSO: startQSO,
      setMode: setMode,
      buildCertificate: buildCertificate
    };
    window.buildCertificate = buildCertificate;

    if (params.get("selftest") === "2") {
      S.mode = "send";
      S.current = { template: S.call };
      S.keyEvents = M.schedule(S.call, withFarnsworth({ wpm: S.wpm })).events.map(function (e) {
        return { down: e.start + 1000, up: e.start + e.duration + 1000 };
      });
      evaluate();
      const okSend = (document.getElementById("feedback").textContent || "").indexOf("100%") !== -1;
      document.body.dataset.selftestSend = okSend ? "ok" : "fail";
      document.title = "SELFTEST2 " + (okSend ? "OK" : "FAIL");
    } else if (params.get("selftest") === "3") {
      const cert = buildCertificate();
      const ok = !!(cert && cert.schema === "qso-cero/certificate/v1" && cert.callsign === S.call && cert.best && typeof cert.best === "object");
      document.body.dataset.selftestCert = ok ? "ok" : "fail";
      document.title = "SELFTEST3 " + (ok ? "OK" : "FAIL");
      feedback("SELFTEST3 " + (ok ? "OK" : "FAIL"), ok ? "ok" : "error");
    } else if (params.has("selftest")) {
      const text = "CQ DE " + S.call + " K";
      const sched = M.schedule(text, withFarnsworth({ wpm: 15 }));
      const events = sched.events.map(function (e) {
        return { down: e.start, up: e.start + e.duration };
      });
      const decoded = M.decodeKeying(events, withFarnsworth({ wpm: 15 }));
      const ok = decoded.text === text;
      document.body.dataset.selftest = ok ? "ok" : "fail";
      document.title = "SELFTEST " + (ok ? "OK" : "FAIL");
      feedback("SELFTEST " + (ok ? "OK" : "FAIL") + " :: " + esc(decoded.text), ok ? "ok" : "error");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
