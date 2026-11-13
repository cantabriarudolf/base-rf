# 09 — Plan v0.2 de QSO CERO

**Estado:** completado (v0.2).
**Objetivo:** cerrar la primera rebanada del roadmap v0.2 sin convertirlo en una reescritura.
**QA humano:** el owner. Los tests automáticos son compuertas, no reemplazo de QA.

---

## 1. Alcance

Entra:

| Unidad | Qué | Archivos |
|---|---|---|
| **W1 — Núcleo** | Farnsworth, puntaje de gaps, orden Koch | `game/morse-core.js`, `game/curriculum.js`, `game/test-core.mjs` |
| **W2 — Interfaz** | Controles de Farnsworth y Koch, certificado exportable | `game/app.js`, `game/index.html`, `game/styles.css` |
| **W3 — Documentación** | Estado v0.2, API nueva, límites | `docs/08-juego-morse.md`, `game/README.md`, `README.md`, `AGENTS.md` |

No entra (queda para v0.3): QSB simulado, paleta iámbica, audio de radio real, backend, modo examen cronometrado.

## 2. Contrato de calidad

- Sin dependencias nuevas, sin build, funciona desde `file://`.
- `node game/test-core.mjs` en verde.
- Smoke tests `?selftest=1` y `?selftest=2` en verde.
- `node --check` sobre todos los `.js`.
- No se borran ni debilitan pruebas existentes.
- El número de licencia sigue siendo local; nunca se transmite.

## 3. W1 — Núcleo

### 3.1 Farnsworth

API compatible:

```js
timing(wpm)                         // como hoy
timing(wpm, extraGapMs)             // como hoy
timing(wpm, extraGapMs, farnsworthWpm)
schedule(text, { wpm, extraGapMs, farnsworthWpm })
decodeKeying(events, { wpm, extraGapMs, farnsworthWpm })
```

Regla: si `farnsworthWpm < wpm`, se mantiene la velocidad de los elementos y se agrega pausa en los gaps. Fórmula:

```
base = 50 * (1200 / wpm)          // duración PARIS a velocidad de elemento
target = 50 * (1200 / farnsworthWpm)
extra = max(0, target - base) / 5 // 4 gaps de carácter + 1 de palabra
charGap += extra
wordGap += extra
```

Prueba de aceptación: `schedule("PARIS", { wpm: 20, farnsworthWpm: 10 })` sin gap final = **4980 ms** (6000 ms menos el gap de palabra de 1020 ms).

### 3.2 Puntaje de gaps

`timingScore(events, opts)` sigue devolviendo un número 0..1, ahora combinado:

- 60% marcas (punto ≈ 1 unidad, raya ≈ 3).
- 40% gaps (intra ≈ 1 unidad, carácter ≈ `charGap`, palabra ≈ `wordGap`).
- Un gap se compara contra el candidato más cercano; el error es relativo.
- Con timing ideal = 1; con 40% de error en marcas y gaps < 0.5.

### 3.3 Orden Koch

Agregar a `CURRICULUM`:

```js
koch: ["K","M","R","S","U","A","P","T","L","O","W","I",".","N","J","E","F","0","Y",",","V","G","5","/","Q","9","Z","H","3","8","B","?","4","2","7","C","1","D","6","X"],
kochLevels: [ /* grupos de 5, en orden */ ]
```

`kochLevels` se deriva de `koch` en grupos de 5; no se escriben a mano dos veces.

## 4. W2 — Interfaz

- Slider **Farnsworth** (0 = apagado; valores 5–20 WPM). Si es 0, no se pasa la opción.
- Selector de **nivel Koch**: además de los niveles temáticos actuales, un modo "Koch N" que genera ítems con las letras acumuladas.
- Botón **Certificado**: descarga un `.json` con:
  - `schema: "qso-cero/certificate/v1"`
  - indicativo, fecha ISO, WPM, Farnsworth, nivel Koch, puntajes `best`, versión `0.2`.
- No se envía nada a la red.
- `?selftest=3` valida que el certificado se genera y contiene los campos.

## 5. W3 — Documentación

- `docs/08-juego-morse.md`: estado v0.2, API Farnsworth, puntaje de gaps, Koch, certificado; mover lo no hecho a v0.3.
- `game/README.md`: controles nuevos y cómo exportar el certificado.
- `README.md`: mención breve de v0.2.
- `AGENTS.md`: reglas nuevas (Farnsworth no rompe compatibilidad; gaps se puntúan; Koch se deriva).

## 6. Criterio de terminado

- [x] W1, W2 y W3 aplicados.
- [x] `node game/test-core.mjs` verde (54 pruebas).
- [x] `?selftest=1`, `?selftest=2`, `?selftest=3` verdes.
- [x] `node --check` sin errores (todos los `.js`).
- [x] `check-routing.py` sin problemas (modelos free) — verificado el 2026-11-11 con `problems: 0`.
- [x] Informe final con archivos, pruebas y deuda declarada (ver §7).

## 7. Deuda declarada (pasa a v0.3)

Lo NO hecho en v0.2, explícitamente diferido:

- QSB simulado (atenuación aleatoria por elemento) y QRN real.
- Paleta iámbica además de tecla recta.
- Audio de radio real (hoy el tono es sintético).
- Modo examen cronometrado (sin guía, sin reintentos, con tiempo).
- Backend / puntaje compartido (hoy solo `localStorage`).
- Validación estricta de indicativos chilenos, `SOS` como prosigno, español chileno vs neutro y si el certificado cuenta como evidencia formal del Lab 9 (decisiones abiertas, §15 de `docs/08-juego-morse.md`).

## 8. Registro de ejecución (2026-11-11)

| Unidad | Worker | Modelo | Resultado |
|---|---|---|---|
| W1 — Núcleo | `gentle-ai-worker` | `opencode-go/beam-free` (free) | Farnsworth, gaps, Koch; 54 pruebas en verde |
| W2 — Interfaz | `gentle-ai-worker` | `opencode-go/beam-free` (free) | Slider Farnsworth, selector Koch, certificado; selftests 1/2/3 en verde |
| W3 — Documentación | `gentle-ai-worker` | `opencode-go/beam-free` (free) | Docs actualizadas; sin cambios de código |

Verificación final:

```bash
node game/test-core.mjs          # 54 pruebas
node --check game/*.js           # sin errores
# Chrome headless: ?selftest=1, ?selftest=2, ?selftest=3 -> ok
python3 ~/.agents/skills/gentle-ai-model-routing/assets/check-routing.py  # problems: 0
```

Routing de subagentes al cierre: perfil activo `wisepi` (todos free, fallbacks free de opencode-go), `check-routing.py` con `problems: 0`. QA humano: pendiente del owner. No se lanzaron agentes de QA.
