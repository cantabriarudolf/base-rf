# QSO CERO — juego de Morse

Entrenador de Morse de supervivencia para BASE/RF. Audio primero, tecleo real, sin dependencias.

## Abrir

```bash
xdg-open index.html
# o
python3 -m http.server 8000
# http://localhost:8000
```

No necesita build ni servidor: los scripts son clásicos y funcionan desde `file://`.

## Controles

| Acción | Cómo |
|---|---|
| Reproducir | Botón `▶ Reproducir` |
| Repetir | `R` o botón `AGN?` |
| Más lento | Botón `QRS` |
| Transmitir | Mantener `Espacio` o el botón `Mantén para transmitir` |
| Evaluar | `Enter` o botón `Evaluar` |
| Borrar | Botón `Borrar` |
| Siguiente | `N` o botón `Siguiente` |
| Farnsworth | Slider `Farnsworth` (0 = Apagado; 5–20 WPM). Si es 0, no se pasa la opción |
| Nivel Koch | Selector `Koch` (Apagado / Koch 1..8) |
| Certificado | Botón `Exportar certificado` descarga un `.json` local |

En móvil, el botón de transmitir usa `pointerdown`/`pointerup` y `touch-action: none`.

## Modos

1. **Escucha** — suena una palabra o frase; escribe lo que oíste.
2. **Transmite** — te muestra un objetivo; lo tecleas en Morse y se puntúa copia + timing.
3. **Primer QSO** — contacto guiado: `CQ` → respuesta → reporte → cierre.
4. **Supervivencia** — copia con ruido; pedir `AGN` cuesta menos que adivinar.

## Puntaje

- **Copia**: códigos correctos, en orden, con los espacios correctos.
- **Timing**: puntos ~1 unidad, rayas ~3 unidades.
- **Criterio** (supervivencia): copiar sin ayuda > pedir ayuda > adivinar.

El mejor puntaje se guarda en `localStorage`. No se envía a ninguna parte.

## Certificado

El botón `Exportar certificado` descarga un `.json` con schema `qso-cero/certificate/v1`, versión `0.2`: indicativo, fecha ISO, WPM, Farnsworth, nivel Koch y `best {listen,send,qso,survival}`. Todo local; no hay red.

## Pruebas

```bash
node test-core.mjs
```

Cubre codificación, timing, ida y vuelta `schedule → decode`, prosignos, espacios entre palabras, scoring, Farnsworth y Koch (54 pruebas).

Smoke test de la página:

```bash
google-chrome --headless=new --no-sandbox \
  --virtual-time-budget=4000 --dump-dom \
  "file://$PWD/index.html?selftest=1"

# smoke test del camino de evaluación (tecleo simulado)
google-chrome --headless=new --no-sandbox \
  --virtual-time-budget=4000 --dump-dom \
  "file://$PWD/index.html?selftest=2"

# smoke test del certificado (genera y valida campos)
google-chrome --headless=new --no-sandbox \
  --virtual-time-budget=4000 --dump-dom \
  "file://$PWD/index.html?selftest=3"
```

## Deep links

```
index.html?mode=send&level=2
index.html?mode=send&koch=2&farnsworth=10
index.html?mode=qso
index.html?mode=survival
index.html?selftest=1
index.html?selftest=2
index.html?selftest=3
```

## Nota de criterio

El juego pide tu **indicativo** porque es lo que se transmite. El **número de licencia** es administrativo: se guarda solo localmente y nunca se envía al aire. En el aire te identifica tu indicativo (DS 523/2006, art. 44).

## Diseño

- `morse-core.js`: lógica pura, sin DOM; se prueba en Node.
- `curriculum.js`: niveles, kit de supervivencia, guion del QSO.
- `audio.js`: Web Audio, envolvente de 5 ms, tono de 650 Hz, ruido para supervivencia.
- `app.js`: interfaz, tecleo y máquina de estados del QSO.
- `docs/08-juego-morse.md`: diseño completo, decisiones y roadmap.
