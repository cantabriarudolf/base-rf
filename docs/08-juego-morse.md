# 08 — QSO CERO: el juego de Morse

**Estado:** v0.2 implementado en `game/`. Sin build, sin dependencias, funciona desde `file://`.

---

## 1. La idea en una frase

> Tu primer Hola Mundo no se escribe: se transmite. Y se transmite con tiempo, no con letras.

`QSO CERO` es un entrenador de Morse de supervivencia. No enseña el alfabeto como una tabla: te pone en una situación de radio real —escuchar, identificarte, responder, pedir repetición, cerrar— y te obliga a hacerlo con el teclado, midiendo el tiempo de cada punto y cada raya.

## 2. Opinión: por qué sí y con qué cuidado

**Sí**, porque el Morse es una habilidad de **timing**, no de memorización. Se aprende con repetición corta y feedback inmediato, y un juego puede darlo mejor que un PDF. Además, el proyecto BASE/RF necesitaba un lugar donde la competencia se pudiera **practicar sin consecuencias legales** antes de hacerlo en el aire.

**Con cuidado**, por tres razones:

1. **Un juego de Morse que se juega con múltiples opciones no enseña Morse.** Este exige teclear y mide duraciones. Si se convierte en "elige la letra", se pierde el objetivo.
2. **El oído manda.** Si la pantalla muestra el código mientras suena, el jugador aprende a leer, no a copiar. La guía visual existe, pero es un andador, no la bicicleta.
3. **Aprobar el juego no es operar.** Al final hace falta una estación real, un contacto real y un log real. El juego es el simulador; el aire es el examen.

## 3. La corrección importante: licencia vs indicativo

La idea original pedía "el número de licencia" y "presentarse". Hay que separar dos cosas:

| Dato | ¿Se transmite? | Para qué sirve |
|---|---|---|
| **Indicativo** (p. ej. CA3XYZ) | **Sí, siempre** | Es tu identidad en el aire; obliga a identificarse al inicio, al final y cada ≤ 15 minutos |
| **Número de licencia** | **No** | Es administrativo, para el trámite y el cobro; no forma parte de un contacto |
| **Nombre y QTH** | Sí, si quieres | Intercambio habitual, no obligatorio |

Por eso el juego pide el indicativo como identidad y guarda el número de licencia **solo localmente**, como folio del progreso. En pantalla lo dice: *"No se transmite. En el aire te identifica tu indicativo"*. Esa es la primera lección de criterio.

**El "Hola Mundo" correcto** no es "mi número de licencia es...". Es:

```
CQ CQ CQ DE CA3XYZ CA3XYZ K
```

Y la respuesta:

```
CE2ABC DE CA3XYZ CA3XYZ K
```

## 4. Principios de diseño

1. **Audio primero.** El código se oye; la pantalla no lo muestra mientras suena (salvo guía explícita).
2. **El tiempo es el código.** Punto = 1 unidad; raya = 3; gap intra-carácter = 1; entre caracteres = 3; entre palabras = 7. La pausa se puntúa.
3. **Identidad primero.** Antes de palabras bonitas, tu indicativo. Es lo único que no puedes olvidar.
4. **Supervivencia antes que teoría.** `CQ`, `DE`, `K`, `R`, `AGN`, `QRS`, `73`, `SK` antes que cualquier explicación de ionosfera.
5. **Pedir repetición es ganar.** El juego premia `AGN` y `QRS`; adivinar cuesta más. Es la mecánica anti-"quedar de huevón".
6. **Prosignos de verdad.** `SK` no es `S` + `K` con pausa: es un solo carácter `...-.-`.
7. **Sesiones cortas.** 10 minutos al día rinden más que una hora una vez. El progreso se guarda en el navegador.

## 5. Progresión

| Nivel | Nombre | Qué se practica | Criterio para avanzar |
|---|---|---|---|
| 1 | Identidad | Tu indicativo, `DE`, `K` | Copiar y transmitir tu indicativo sin guía |
| 2 | Llamada | `CQ CQ CQ DE ... K`, respuesta | Completar la llamada y la respuesta |
| 3 | Reporte | `RST 5NN`, `QTH`, `NAME`, `73` | Intercambiar reporte completo |
| 4 | Supervivencia | `AGN`, `QRS`, `QRM`, `QSB`, `PSE RPT` | Copiar con ruido pidiendo repetición cuando corresponde |
| 5 | QSO | Contacto completo de `CQ` a `SK` | Cerrar un QSO sin ayuda |

La velocidad se sube **solo** cuando se copia ≥ 90% a la velocidad actual. Subir WPM antes de eso es la forma más común de estancarse.

## 6. Kit de supervivencia mínimo

| Token | Significado | Cuándo se usa |
|---|---|---|
| `CQ` | Llamada general | Buscar contacto |
| `DE` | De | Separar destinatario de emisor |
| `K` | Adelante | Invitar a transmitir |
| `KN` | Solo la estación nombrada | Evitar que otro conteste |
| `R` | Recibido | Acuse |
| `AGN` | De nuevo | No copiaste |
| `QRS` | Más lento | La velocidad es mucha |
| `QRM` | Interferencia | Hay otras estaciones encima |
| `QRN` | Ruido atmosférico | El ruido tapa la señal |
| `QSB` | Desvanecimiento | La señal sube y baja |
| `QTH` | Ubicación | Intercambio |
| `RST` | Legibilidad, intensidad, tono | Reporte |
| `5NN` | 599 abreviado | Reporte rápido |
| `73` | Saludos | Cierre |
| `SK` | Fin de contacto | Cierre definitivo |

El kit completo (26 tokens) está en `game/curriculum.js` y se puede escuchar haciendo clic en cada uno.

## 7. Modos

### 7.1 Escucha
Suena una palabra, frase o indicativo. El jugador escribe lo que oyó. Se puntúa la copia. Si no copió, puede repetir (`R` o `AGN?`).

### 7.2 Transmite
Se muestra un objetivo (con guía opcional). El jugador mantiene `Espacio` o el botón y teclea. Se puntúa:
- **Copia** (comparación de códigos, incluyendo espacios entre palabras).
- **Timing** (duración de puntos y rayas).
- **Prosignos** (si corresponde, se avisa que `SK`/`AR`/`BT`/`KN` van sin pausa).

### 7.3 Primer QSO
Contacto guiado de 6 pasos: `CQ` → respuesta → reporte → acuse → cierre → `73 SK`. La estación habla; el jugador responde tecleando. Si la respuesta no se copia, la estación repite más lento. Al completar, se desbloquea el puntaje de QSO.

### 7.4 Supervivencia
Copia con ruido (QRM). El jugador puede pedir `AGN` (repite) o `QRS` (más lento). Se puntúa copia + criterio:
- Copiar sin ayuda: criterio 1.
- Adivinar sin pedir ayuda: criterio 0,4.
- Pedir ayuda: −0,15 por repetición (piso 0,2).

La lección: **pedir repetición no es vergüenza; inventar sí.**

## 8. Puntaje

| Dimensión | Peso en "Transmite" | Qué mide |
|---|---|---|
| Copia | 70% | ¿Los códigos son los correctos, en el orden correcto, con los espacios correctos? |
| Timing | 30% | ¿Los puntos duran ~1 unidad y las rayas ~3? |

En "Escucha" y "Supervivencia" se guarda la mejor precisión. En "QSO" se guarda 1 al completar. Cuando los cuatro puntajes superan 80, se desbloquea **QSO CERO**.

El puntaje se guarda en `localStorage`; no se envía a ninguna parte.

**Timing (v0.2):** `timingScore(events, opts)` sigue devolviendo 0..1, ahora combinado: 60% marcas (punto ≈ 1 unidad, raya ≈ 3) y 40% gaps (intra ≈ 1, carácter ≈ `charGap`, palabra ≈ `wordGap`). Cada gap se compara contra el candidato más cercano; el error es relativo. Con timing ideal = 1; con 40% de error en marcas y gaps < 0,5.

## 9. Arquitectura

```
game/
  index.html        estructura y controles
  styles.css        interfaz (tema radio, responsive)
  morse-core.js     lógica pura: tabla, timing, schedule, decode, scoring
  curriculum.js     niveles, kit de supervivencia, guion del QSO, prosignos
  audio.js          Web Audio: tono, envolvente, ruido
  app.js            UI, tecleo, máquina de estados del QSO
  test-core.mjs     54 pruebas del núcleo en Node
```

**Decisiones técnicas:**
- **Sin build y sin dependencias.** Se abre `index.html` y funciona. Portable, auditable, sin cadena de suministro.
- **Web Audio con envolvente de 5 ms.** Evita clicks; el tono por defecto es 650 Hz.
- **El núcleo no toca el DOM.** Se prueba en Node (`node game/test-core.mjs`), incluyendo ida y vuelta `texto → schedule → eventos → decode`.
- **El decodificador usa la unidad objetivo** (WPM configurado), no una estimación adaptativa. Es predecible para el juego; un decodificador general necesitaría estimar la unidad.
- **Los prosignos tienen prioridad sobre la puntuación** al decodificar (`+` = `AR`, `=` = `BT`, `&` = `AS`, `(` = `KN`). Para el juego es correcto; no es un decodificador universal.
- **Los espacios entre palabras se comparan.** Si el jugador hace una pausa de 7 unidades donde no corresponde, pierde copia.
- **Farnsworth (v0.2):** `timing(wpm)`, `timing(wpm, extraGapMs)` y `timing(wpm, extraGapMs, farnsworthWpm)` son compatibles. Si `farnsworthWpm < wpm`, se mantiene la velocidad de los elementos y se agrega pausa en los gaps: `base = 50*(1200/wpm)`, `target = 50*(1200/farnsworthWpm)`, `extra = max(0, target-base)/5` (4 gaps de carácter + 1 de palabra). `schedule` y `decodeKeying` aceptan `farnsworthWpm` en `opts`. Prueba de aceptación: `schedule("PARIS", { wpm: 20, farnsworthWpm: 10 })` sin gap final = 4980 ms.
- **Koch (v0.2):** `CURRICULUM.koch` tiene 40 símbolos; `CURRICULUM.kochLevels` deriva grupos de 5 (8 grupos), no se escriben a mano dos veces.

## 10. Cómo se ejecuta y se prueba

```bash
# Abrir el juego
xdg-open game/index.html

# Pruebas del núcleo
node game/test-core.mjs

# Smoke test en Chrome headless
google-chrome --headless=new --no-sandbox \
  --virtual-time-budget=4000 --dump-dom \
  "file://$PWD/game/index.html?selftest=1"
```

Deep links útiles:

```
game/index.html?mode=send&level=2
game/index.html?mode=send&koch=2&farnsworth=10
game/index.html?mode=qso
game/index.html?mode=survival
game/index.html?selftest=1
game/index.html?selftest=2
game/index.html?selftest=3
```

## 11. Integración con BASE/RF

| Documento | Cómo se integra |
|---|---|
| `docs/02-competencias.md` | Evidencia del eje E (operación) para N0–N2; el "timing" alimenta el eje D |
| `docs/03-labs.md` | Lab 9: completar un QSO en Morse y registrar puntajes |
| `docs/04-checklists.md` | El kit de supervivencia es la versión oral del checklist de operación |
| `docs/01-normativa-cl-2026.md` | La identificación (art. 44) es la regla que el juego hace cumplir |
| `AGENTS.md` | Reglas para no degradar el juego a múltiple opción |

## 12. Lo que el juego no hace (todavía)

- No enseña el alfabeto en orden A–Z: usa el orden Koch (40 símbolos, 8 niveles de 5) y el kit de supervivencia.
- No simula propagación, QSB real ni pile-ups (queda para v0.3).
- No reemplaza una estación real ni una licencia.
- No evalúa procedimiento legal (eso es el digesto y los checklists).
- No tiene audio de radio real; el tono es sintético (queda para v0.3).

## 13. Roadmap v0.2 — estado

Hecho en v0.2:

1. **Orden Koch** (40 símbolos, 8 niveles de 5).
2. **Farnsworth** configurable (slider 0=apagado, 5–20 WPM).
3. **Puntaje de gaps** además de marcas (60/40).
4. **Certificado exportable** (JSON, schema `qso-cero/certificate/v1`, versión `0.2`), descarga local, sin red.

Queda para v0.3:

5. **QSB simulado** (atenuación aleatoria por elemento) y QRN.
6. **Paleta iámbica** además de tecla recta.
7. **Copiado de indicativos reales** desde un banco de audio.
8. **Modo examen**: sin guía, sin reintentos, con tiempo.

Además: backend / puntaje compartido sigue fuera de alcance.

## 14. Riesgos y mitigaciones

| Riesgo | Señal | Mitigación |
|---|---|---|
| Muleta visual | El jugador solo acierta con la guía | La guía se apaga en niveles altos; el modo examen la elimina |
| Inflación de velocidad | Sube WPM con 60% de copia | Bloquear el aumento hasta 90% |
| Frustración | Abandono en la primera sesión | 10 minutos, nivel 1, guía encendida |
| Gamificación sin transferencia | Buen puntaje, mal contacto real | Lab 9 exige un QSO real y un log |
| Decodificador rígido | El jugador teclea bien y el juego no lo reconoce | v0.2: estimación adaptativa de unidad y tolerancia configurable |
| Ambigüedad de prosignos | `+` se muestra como `AR` | Documentado; el juego prioriza prosignos |
| Audio bloqueado por el navegador | No suena al cargar | El audio se inicia con un clic (Reproducir o pestaña) |

## 15. Decisiones abiertas

1. Validación estricta de indicativos chilenos (prefijo + número + sufijo) o validación laxa.
2. Incluir `SOS` como prosigno o dejarlo fuera (hoy se trata como tres letras).
3. Español chileno en la interfaz o español neutro.
4. Puntaje compartido (captura) o solo local.
5. Si el certificado del juego cuenta como evidencia formal del Lab 9 o solo como práctica.
