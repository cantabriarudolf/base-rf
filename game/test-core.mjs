import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const M = require("./morse-core.js");
const CURRICULUM = require("./curriculum.js").CURRICULUM || global.CURRICULUM;

let failures = 0;
function ok(cond, msg) {
  if (cond) {
    console.log("ok   " + msg);
  } else {
    failures++;
    console.error("FAIL " + msg);
  }
}
function near(a, b, tol = 0.001) {
  return Math.abs(a - b) <= tol;
}

// --- Codificación ---
ok(M.morseString("SOS") === "... --- ...", "SOS se codifica ... --- ...");
ok(M.morseString("PARIS") === ".--. .- .-. .. ...", "PARIS se codifica por letras");
ok(M.morseString("5NN") === "..... -. -.", "5NN se codifica como dígitos/letras");

// --- Timing estándar ---
const t20 = M.timing(20);
ok(near(t20.unit, 60), "20 WPM = 60 ms por unidad");
ok(near(t20.charGap, 180), "gap entre caracteres = 3 unidades");
ok(near(t20.wordGap, 420), "gap entre palabras = 7 unidades");

const paris20 = M.schedule("PARIS", { wpm: 20 });
ok(near(paris20.duration, 43 * 60), "PARIS a 20 WPM dura 43 unidades (sin gap final)");

const paris20Space = M.schedule("PARIS X", { wpm: 20 });
ok(
  near(paris20Space.duration, 43 * 60 + 7 * 60 + 4 * 60 + 7 * 60),
  "PARIS X suma palabra y carácter"
);

// --- Ida y vuelta: schedule -> eventos ideales -> decode ---
function roundTrip(text, wpm) {
  const s = M.schedule(text, { wpm });
  const events = s.events.map((e) => ({
    down: e.start,
    up: e.start + e.duration
  }));
  return M.decodeKeying(events, { wpm });
}

ok(roundTrip("PARIS", 20).text === "PARIS", "decodifica PARIS");
ok(roundTrip("SOS", 20).text === "SOS", "decodifica SOS (tres letras)");
ok(roundTrip("CA3XYZ", 18).text === "CA3XYZ", "decodifica un indicativo");
ok(roundTrip("R 73 SK", 15).text === "R 73 SK", "decodifica palabras y prosigno SK");
ok(roundTrip("QTH SANTIAGO", 12).text === "QTH SANTIAGO", "decodifica frase con espacio");

// --- Comparación de keying ---
const s = M.schedule("CA3XYZ", { wpm: 18 });
const ideal = s.events.map((e) => ({ down: e.start, up: e.start + e.duration }));
const cmp = M.compareKeying("CA3XYZ", ideal, { wpm: 18 });
ok(cmp.accuracy === 1, "compareKeying da 100% con timing ideal");
ok(cmp.expectedCodes.length === 6, "seis caracteres esperados");

// El espacio entre palabras también es código: si no se respeta, se penaliza.
const spaced = M.schedule("R 73 SK", { wpm: 18 });
const spacedEvents = spaced.events.map((e) => ({
  down: e.start,
  up: e.start + e.duration
}));
ok(
  M.compareKeying("R 73 SK", spacedEvents, { wpm: 18 }).accuracy === 1,
  "compareKeying acepta espacios y prosigno"
);
const unspaced = M.schedule("R73 SK", { wpm: 18 });
const unspacedEvents = unspaced.events.map((e) => ({
  down: e.start,
  up: e.start + e.duration
}));
ok(
  M.compareKeying("R 73 SK", unspacedEvents, { wpm: 18 }).accuracy < 1,
  "compareKeying penaliza omitir el espacio entre palabras"
);

// Error deliberado: un punto de más
const bad = ideal.slice();
bad.push({ down: 5000, up: 5060 });
const cmpBad = M.compareKeying("CA3XYZ", bad, { wpm: 18 });
ok(cmpBad.accuracy < 1, "compareKeying penaliza un carácter extra");

// --- Timing score ---
const ts = M.timingScore(ideal, { wpm: 18 });
ok(ts > 0.99, "timing ideal = 1");

const sloppy = ideal.map((e) => ({
  down: e.down,
  up: e.up + (e.up - e.down) * 0.4
}));
const tsSloppy = M.timingScore(sloppy, { wpm: 18 });
ok(tsSloppy < 0.5, "timing con 40% de error baja de 0.5");

// --- Texto ---
ok(M.accuracy("CA3XYZ", "CA3XYZ") === 1, "accuracy exacta = 1");
ok(M.accuracy("CA3XYZ", "CA3XY") < 0.9, "accuracy con un carácter menos baja");
ok(M.levenshtein("K", "M") === 1, "levenshtein K/M = 1");

// --- Prosignos ---
const sk = M.schedule("SK", { wpm: 20 });
ok(sk.events.length === 6, "SK se transmite como prosigno (6 elementos, sin gaps de letra)");
ok(M.compareKeying("SK", sk.events.map((e) => ({ down: e.start, up: e.start + e.duration })), { wpm: 20 }).accuracy === 1, "compareKeying acepta prosigno SK");

// --- Farnsworth ---
const tF = M.timing(20, 0, 10);
ok(near(tF.unit, 60), "farnsworth mantiene unidad de elemento");
const parisF = M.schedule("PARIS", { wpm: 20, farnsworthWpm: 10 });
ok(near(parisF.duration, 4980), "PARIS Farnsworth 20/10 dura 4980 ms");
ok(near(parisF.wordGap, 1020), "wordGap Farnsworth = 1020 ms");

// Compatibilidad: sin farnsworth igual que antes
const t0 = M.timing(20);
const t1 = M.timing(20, 0);
ok(near(t0.charGap, t1.charGap) && near(t0.wordGap, t1.wordGap), "timing(20) y timing(20,0) iguales");
const p0 = M.schedule("PARIS", { wpm: 20 });
const p1 = M.schedule("PARIS", { wpm: 20, extraGapMs: 0 });
ok(near(p0.duration, p1.duration), "schedule sin farnsworth compatible");

// Round trip con Farnsworth
function roundTripF(text, wpm, fw) {
  const s = M.schedule(text, { wpm, farnsworthWpm: fw });
  const events = s.events.map((e) => ({ down: e.start, up: e.start + e.duration }));
  return M.decodeKeying(events, { wpm, farnsworthWpm: fw });
}
ok(roundTripF("PARIS", 20, 10).text === "PARIS", "decodifica PARIS con Farnsworth");
ok(roundTripF("R 73 SK", 18, 9).text === "R 73 SK", "decodifica frase con Farnsworth");

// Farnsworth apagado si >= wpm
const noOp = M.timing(20, 0, 25);
ok(near(noOp.charGap, 3 * 60) && near(noOp.wordGap, 7 * 60), "farnsworthWpm >= wpm no agrega pausa");

// --- timingScore combinado ---
const ideal2 = M.schedule("CA3XYZ", { wpm: 18 }).events.map((e) => ({ down: e.start, up: e.start + e.duration }));
const ts2 = M.timingScore(ideal2, { wpm: 18 });
ok(ts2 > 0.99, "timingScore ideal (con gaps) = ~1");

const sloppy2 = ideal2.map((e) => ({ down: e.down, up: e.up + (e.up - e.down) * 0.4 }));
const tsSloppy2 = M.timingScore(sloppy2, { wpm: 18 });
ok(tsSloppy2 < 0.5, "timingScore con 40% de error < 0.5");

// Rango 0..1
ok(ts2 >= 0 && ts2 <= 1, "timingScore en rango 0..1");

// --- Koch ---
ok(Array.isArray(CURRICULUM.koch), "CURRICULUM.koch es array");
ok(CURRICULUM.koch.length === 40, "koch tiene 40 símbolos");
ok(Array.isArray(CURRICULUM.kochLevels), "CURRICULUM.kochLevels es array");
ok(CURRICULUM.kochLevels.length === 8, "kochLevels tiene 8 grupos");
ok(CURRICULUM.kochLevels.every((g) => Array.isArray(g) && g.length === 5), "cada grupo tiene 5");
ok(CURRICULUM.kochLevels.flat().join(",") === CURRICULUM.koch.join(","), "kochLevels se deriva de koch");
ok(CURRICULUM.kochLevels[0].join("") === "KMRSU", "primer grupo KMRSU");

// --- Casos borde v0.2 ---
// Farnsworth + pausa extra se suman (4 gaps de carácter en PARIS).
const tExtra = M.timing(20, 80, 10);
ok(near(tExtra.charGap, 780 + 80), "Farnsworth + pausa extra suma en charGap");
const parisExtra = M.schedule("PARIS", { wpm: 20, farnsworthWpm: 10, extraGapMs: 80 });
ok(near(parisExtra.duration, 4980 + 4 * 80), "PARIS Farnsworth + extra = 5300 ms");

// Sin marcas y una sola marca.
ok(M.timingScore([], { wpm: 20 }) === 0, "timingScore sin marcas = 0");
ok(near(M.timingScore([{ down: 0, up: 60 }], { wpm: 20 }), 1), "timingScore con una marca perfecta = 1");

// Gaps deformados: mismas duraciones de marca, peor puntaje.
const gapDistorted = ideal2.map((e, i) =>
  i === 0 ? { down: e.down, up: e.up } : { down: e.down + 150, up: e.up + 150 }
);
const tsGapBad = M.timingScore(gapDistorted, { wpm: 18 });
ok(tsGapBad < ts2, "timingScore penaliza gaps deformados");
ok(tsGapBad >= 0 && tsGapBad <= 1, "timingScore con gaps deformados sigue en 0..1");

// Ida y vuelta con Farnsworth + pausa extra.
function roundTripExtra(text, wpm, fw, extra) {
  const s = M.schedule(text, { wpm, farnsworthWpm: fw, extraGapMs: extra });
  const events = s.events.map((e) => ({ down: e.start, up: e.start + e.duration }));
  return M.decodeKeying(events, { wpm, farnsworthWpm: fw, extraGapMs: extra });
}
ok(roundTripExtra("R 73 SK", 18, 9, 40).text === "R 73 SK", "decodifica con Farnsworth + extra");

// Koch sin duplicados y derivación exacta.
ok(new Set(CURRICULUM.koch).size === CURRICULUM.koch.length, "koch no tiene símbolos duplicados");
ok(CURRICULUM.kochLevels.flat().length === CURRICULUM.koch.length, "kochLevels cubre todos los símbolos");

// Compatibilidad dura: los dos primeros argumentos no cambian.
ok(near(M.timing(20).charGap, M.timing(20, 0, 0).charGap), "timing(wpm) === timing(wpm,0,0)");
ok(near(M.schedule("PARIS", { wpm: 20 }).duration, 2580), "PARIS sin opciones sigue en 2580 ms");

if (failures) {
  console.error("\n" + failures + " prueba(s) fallaron");
  process.exit(1);
}
console.log("\nTodas las pruebas del núcleo pasaron.");
