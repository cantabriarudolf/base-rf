/*
 * QSO CERO — núcleo Morse
 * Funciona en navegador (window.MorseCore) y en Node (module.exports).
 * Sin dependencias.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.MorseCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  // Tabla internacional. Los prosignos van aparte porque se transmiten
  // como un solo carácter (sin gap interno de 3 unidades).
  const TABLE = {
    A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
    G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
    S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..",
    0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
    5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "/": "-..-.",
    "=": "-...-", "+": ".-.-.", "-": "-....-", ":": "---...",
    "'": ".----.", '"': ".-..-.", "@": ".--.-.", "!": "-.-.--",
    "(": "-.--.", ")": "-.--.-", "&": ".-...", "$": "...-..-",
    "_": "..--.-", ";": "-.-.-."
  };

  const PROSIGNS = {
    AR: ".-.-.",   // fin de mensaje
    SK: "...-.-",  // fin de contacto
    BT: "-...-",   // separador
    KN: "-.--.",   // solo la estación nombrada
    AS: ".-...",   // espera
    KA: "-.-.-",   // atención / inicio
    HH: "........" // error
  };

  const REVERSE = Object.create(null);
  for (const [ch, code] of Object.entries(TABLE)) {
    if (!(code in REVERSE)) REVERSE[code] = ch;
  }

  // Para mostrar prosignos al decodificar. Tiene prioridad sobre la
  // puntuación que comparte código (+ = AR, = = BT, & = AS, ( = KN).
  const PROSIGN_BY_CODE = Object.create(null);
  for (const [name, code] of Object.entries(PROSIGNS)) {
    if (!(code in PROSIGN_BY_CODE)) PROSIGN_BY_CODE[code] = name;
  }

  function normalize(text) {
    return String(text == null ? "" : text)
      .toUpperCase()
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function timing(wpm, extraGapMs, farnsworthWpm) {
    const safeWpm = Math.min(40, Math.max(3, Number(wpm) || 12));
    const unit = 1200 / safeWpm; // ms por unidad (estándar PARIS)
    const extra = Math.max(0, Number(extraGapMs) || 0);
    let charGap = 3 * unit + extra;
    let wordGap = 7 * unit + extra;
    const fw = Number(farnsworthWpm);
    if (fw && fw > 0) {
      const safeFw = Math.min(40, Math.max(3, fw));
      const base = 50 * (1200 / safeWpm);
      const target = 50 * (1200 / safeFw);
      const fExtra = Math.max(0, target - base) / 5;
      charGap += fExtra;
      wordGap += fExtra;
    }
    return {
      unit,
      charGap: charGap,
      wordGap: wordGap
    };
  }

  function tokenize(text) {
    const t = normalize(text);
    return t ? t.split(" ") : [];
  }

  function encode(text) {
    return tokenize(text).map(function (token) {
      if (Object.prototype.hasOwnProperty.call(PROSIGNS, token)) {
        return {
          token: token,
          prosign: true,
          error: false,
          chars: [{ ch: token, code: PROSIGNS[token] }]
        };
      }
      const chars = token.split("");
      const out = [];
      for (let i = 0; i < chars.length; i++) {
        const code = TABLE[chars[i]];
        if (!code) {
          return { token: token, prosign: false, error: true, chars: out };
        }
        out.push({ ch: chars[i], code: code });
      }
      return { token: token, prosign: false, error: false, chars: out };
    });
  }

  function schedule(text, opts) {
    opts = opts || {};
    const t = timing(opts.wpm, opts.extraGapMs, opts.farnsworthWpm);
    const tokens = encode(text);
    const events = [];
    let cursor = 0;

    tokens.forEach(function (tok, ti) {
      if (tok.error) return;
      tok.chars.forEach(function (c, ci) {
        const code = c.code;
        for (let i = 0; i < code.length; i++) {
          const duration = code[i] === "." ? t.unit : 3 * t.unit;
          events.push({
            start: cursor,
            duration: duration,
            ch: c.ch,
            element: code[i]
          });
          cursor += duration;
          if (i < code.length - 1) cursor += t.unit;
        }
        if (ci < tok.chars.length - 1) cursor += t.charGap;
      });
      if (ti < tokens.length - 1) cursor += t.wordGap;
    });

    return {
      events: events,
      duration: cursor,
      unit: t.unit,
      charGap: t.charGap,
      wordGap: t.wordGap,
      text: normalize(text)
    };
  }

  function marksFromEvents(events) {
    const marks = [];
    for (let i = 0; i < events.length; i++) {
      const ev = events[i];
      const duration = ev.up - ev.down;
      if (duration > 0) {
        marks.push({ down: ev.down, up: ev.up, duration: duration });
      }
    }
    return marks;
  }

  function decodeKeying(events, opts) {
    opts = opts || {};
    const t = timing(opts.wpm, opts.extraGapMs, opts.farnsworthWpm);
    const unit = opts.unit || t.unit;
    const marks = marksFromEvents(events || []);
    if (!marks.length) {
      return { text: "", codes: [], marks: [], unit: unit };
    }

    // Umbrales de gap basados en la configuración (Farnsworth/extra incluidos).
    const charGap = t.charGap;
    const wordGap = t.wordGap;
    const charWordThreshold = (charGap + wordGap) / 2;

    const codes = [];
    let code = "";

    for (let i = 0; i < marks.length; i++) {
      const m = marks[i];
      code += m.duration <= 2 * unit ? "." : "-";
      const next = marks[i + 1];
      if (!next) {
        codes.push(code);
        code = "";
        break;
      }
      const gap = next.down - m.up;
      if (gap < 1.5 * unit) {
        // mismo carácter
      } else if (gap < charWordThreshold) {
        codes.push(code);
        code = "";
      } else {
        codes.push(code);
        codes.push(" "); // frontera de palabra
        code = "";
      }
    }

    const text = codes
      .map(function (c) {
        if (c === " ") return " ";
        return PROSIGN_BY_CODE[c] || REVERSE[c] || "?";
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim();

    return { text: text, codes: codes, marks: marks, unit: unit };
  }

  function levenshteinArray(a, b) {
    const m = a.length;
    const n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = new Array(n + 1);
    let curr = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      curr[0] = i;
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(
          prev[j] + 1,
          curr[j - 1] + 1,
          prev[j - 1] + cost
        );
      }
      const tmp = prev;
      prev = curr;
      curr = tmp;
    }
    return prev[n];
  }

  function levenshtein(a, b) {
    return levenshteinArray(String(a), String(b));
  }

  function accuracy(expected, actual) {
    const e = normalize(expected);
    const a = normalize(actual);
    if (!e.length) return a.length ? 0 : 1;
    return Math.max(0, 1 - levenshtein(e, a) / e.length);
  }

  function timingScore(events, opts) {
    opts = opts || {};
    const t = timing(opts.wpm, opts.extraGapMs, opts.farnsworthWpm);
    const unit = opts.unit || t.unit;
    const marks = marksFromEvents(events || []);
    if (!marks.length) return 0;

    // 60% marcas (punto ≈ 1 unidad, raya ≈ 3).
    let markError = 0;
    for (let i = 0; i < marks.length; i++) {
      const d = marks[i].duration;
      const expected = d <= 2 * unit ? unit : 3 * unit;
      markError += Math.abs(d - expected) / expected;
    }
    const meanMarkError = markError / marks.length;
    const markScore = Math.max(0, Math.min(1, 1 - meanMarkError / 0.5));

    // 40% gaps (intra ≈ 1, carácter ≈ charGap, palabra ≈ wordGap).
    const gaps = [];
    for (let i = 0; i < marks.length - 1; i++) {
      const g = marks[i + 1].down - marks[i].up;
      if (g >= 0) gaps.push(g);
    }
    let gapScore = 1;
    if (gaps.length) {
      const candidates = [unit, t.charGap, t.wordGap];
      let gapError = 0;
      for (let i = 0; i < gaps.length; i++) {
        const g = gaps[i];
        let best = candidates[0];
        let bestDist = Math.abs(g - best);
        for (let c = 1; c < candidates.length; c++) {
          const dist = Math.abs(g - candidates[c]);
          if (dist < bestDist) {
            bestDist = dist;
            best = candidates[c];
          }
        }
        const rel = best ? Math.abs(g - best) / best : 0;
        gapError += rel;
      }
      const meanGapError = gapError / gaps.length;
      gapScore = Math.max(0, Math.min(1, 1 - meanGapError / 0.5));
    }

    return Math.max(0, Math.min(1, 0.6 * markScore + 0.4 * gapScore));
  }

  function compareKeying(expectedText, events, opts) {
    const expectedCodes = [];
    const encoded = encode(expectedText);
    for (let i = 0; i < encoded.length; i++) {
      const tok = encoded[i];
      if (tok.error) continue;
      if (i > 0) expectedCodes.push(" ");
      for (let j = 0; j < tok.chars.length; j++) {
        expectedCodes.push(tok.chars[j].code);
      }
    }

    const decoded = decodeKeying(events, opts);
    const actualCodes = decoded.codes;

    const acc = expectedCodes.length
      ? Math.max(
          0,
          1 - levenshteinArray(expectedCodes, actualCodes) / expectedCodes.length
        )
      : 0;

    return {
      expectedCodes: expectedCodes,
      actualCodes: actualCodes,
      accuracy: acc,
      text: decoded.text,
      marks: decoded.marks,
      unit: decoded.unit
    };
  }

  function morseString(text) {
    return encode(text)
      .map(function (tok) {
        return tok.chars
          .map(function (c) {
            return c.code;
          })
          .join(" ");
      })
      .join(" / ");
  }

  function estimatedUnit(events) {
    const marks = marksFromEvents(events || []);
    if (!marks.length) return 0;
    const dots = marks
      .map(function (m) {
        return m.duration;
      })
      .sort(function (a, b) {
        return a - b;
      });
    return dots[Math.floor(dots.length / 2)];
  }

  return {
    TABLE: TABLE,
    PROSIGNS: PROSIGNS,
    normalize: normalize,
    timing: timing,
    encode: encode,
    schedule: schedule,
    decodeKeying: decodeKeying,
    compareKeying: compareKeying,
    timingScore: timingScore,
    accuracy: accuracy,
    levenshtein: levenshtein,
    morseString: morseString,
    estimatedUnit: estimatedUnit
  };
});
