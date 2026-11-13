# 07 — Fuentes y verificación

**Fecha de verificación de este documento:** 2026-11-11.

## 1. Normas y documentos

| Documento | Identificador / URL | Fecha | Uso en el proyecto | Estado |
|---|---|---|---|---|
| Ley 18.168, General de Telecomunicaciones | https://www.bcn.cl/leychile/navegar?idNorma=29591 | Versión 2026-08-19 | Base legal; art. 3, art. 32 (derechos) y Título VII (sanciones) | **Leída** (Título VII y art. 32) |
| DS 523/2006 — Reglamento del Servicio de Aficionados a las Radiocomunicaciones | https://www.bcn.cl/leychile/navegar?idNorma=257890 | Publicado 27-01-2007; versión 21-06-2013 | Columna del digesto | **Leído completo (XML BCN)** |
| DS 213/2013 — modifica el DS 523 | https://www.bcn.cl/leychile/navegar?idNorma=1052106 | 21-06-2013 | Cambios de categorías y potencias | Leído en versión consolidada |
| Res. Ex. 2620/2023 — Norma de Exámenes | https://www.bcn.cl/leychile/navegar?idNorma=1199351 | 19-12-2023 | Examen online, 45 min, banco | **Leída (arts. 1–8)** |
| Res. Ex. 765/2007 — Norma de Exámenes anterior | https://www.bcn.cl/leychile/navegar?idNorma=262126 | 26-06-2007 | Derogada por la 2620/2023 | Referencia histórica |
| Res. Ex. 1228/2008 — Distintivos de llamada | https://www.bcn.cl/leychile/navegar?idNorma=280338 | Texto consolidado 2014-01-23 | Prefijos, zonas, sufijos, móvil, especiales | **Leída** |
| Res. Ex. 175 — modifica distintivos | https://www.bcn.cl/leychile/navegar?idNorma=1058518 | 23-01-2014 | Cambios a la Res. 1228 | **Leída** en la consolidada |
| Res. Ex. 176/2014 — Repetidoras y radiobalizas | https://www.bcn.cl/leychile/navegar?idNorma=1058519 | 23-01-2014 | Potencias, frecuencias, ID, enlaces, radiobalizas | **Leída** |
| Plan General de Uso del Espectro | DS 127/2006, mod. DS 192/2023 | 25-04-2023 | Atribución de bandas | Citado vía Tabla 2025 |
| Tabla de Bandas para Radioaficionados 2025 | https://www.subtel.gob.cl/wp-content/uploads/2025/06/Tabla_de_Bandas_Actualizada_2025.pdf | 2025 | Rangos y estado primario/secundario | **Leída (transcripción)** |
| Servicios de Radioaficionados — SUBTEL | https://www.subtel.gob.cl/inicio-concesionario/servicios-de-telecomunicaciones/servicios-de-radio-aficionados/ | Consultada 2026-11-11 | Trámites, valores, calendario, formularios RAF | Usada |
| Apéndices A–E (bancos de preguntas) | Enlaces en la página de SUBTEL | 2020 | Composición del examen y temas | **Leídos encabezados, conteos y estructura**; no todas las preguntas |
| Tonos analógicos asignados por zonas | https://www.subtel.gob.cl/images/stories/apoyo_articulos/radioaficonados/tonos_analogos_13052015.pdf | 2015 | Tonos/códigos de repetidoras | `[pendiente de lectura]` |
| Guía del procedimiento para rendir examen | https://www.subtel.gob.cl/wp-content/uploads/2025/10/GUIA_2025_DEL_PROCEDIMIENTO_PARA_RENDIR.pdf | 2025 | Inscripción y requisitos | `[pendiente de lectura completa]` |

## 2. Cómo se verificó

- **DS 523/2006:** se obtuvo el XML consolidado de la Biblioteca del Congreso Nacional (`obtxml`, idNorma 257890), versión 2013-06-21, y se leyeron íntegramente los artículos 1 a 60 y las disposiciones transitorias.
- **Res. 2620/2023:** se obtuvo el XML consolidado (idNorma 1199351) y se leyeron los artículos 1 a 8.
- **Tabla de Bandas 2025:** se extrajo el texto del PDF oficial de SUBTEL y se transcribieron los rangos.
- **Página de SUBTEL:** se usó para trámites, valores (0,3 UTM), calendario de exámenes y enlaces a formularios.

## 3. Advertencias

1. **La página de SUBTEL está desactualizada en un punto:** lista la Res. 765/2007 como norma de exámenes, pero la vigente es la Res. 2620/2023.
2. **La Tabla 2025 tiene solapamientos** (por ejemplo, 10.100–10.150 kHz primario y 10.100–10.125 kHz secundario; 3.300–3.400 MHz primario y secundario). La transcripción del documento 01 es una ayuda de estudio; la fuente autoritativa es el PDF.
3. **La Res. 175 y la Res. 176 se leyeron completas en su texto consolidado.** Quedan pendientes la tabla exacta de tonos/códigos (Anexo en imagen) y el mapa de zonas del Apéndice A (también imagen). Cualquier afirmación sobre esos puntos debe verificarse antes de usarse.
4. **No se citan montos de multas.** La Ley 18.168 los establece; no se verificaron cifras para este documento.
5. **No se cita norma de exposición RF.** El reglamento remite a "otros organismos competentes" (art. 33); la norma aplicable debe verificarse antes de fijar distancias.

## 4. Cómo mantener este digesto

1. Revisar una vez al año, o cuando SUBTEL publique una norma nueva.
2. Toda afirmación nueva debe entrar con: fuente, fecha de consulta y estado (`[verificado]` o `[pendiente]`).
3. Si una fuente cambia, actualizar el documento 01 y anotar el cambio en el historial de git.
4. No borrar una afirmación sin dejar rastro: corregir con el reemplazo y el motivo.

## 5. Fuentes que conviene leer completas antes de la v1.0

- Anexo de tonos/códigos de la Res. 176 (imagen) y "Tonos Analógicos Asignados por Zonas" (2015).
- Apéndice A de la Res. 1228 (mapa de zonas, imagen).
- Apéndices A–E completos, si se va a entrenar el examen con el banco real.
- Guía 2025 del procedimiento para rendir.
- ITU-R M.1677 (timing Morse) para citar el estándar en material público.

## 6. Normas técnicas del juego

| Referencia | Uso | Estado |
|---|---|---|
| ITU-R M.1677-1 — Código Morse internacional | Timing 1:3:1:3:7 y tabla de caracteres | `[pendiente de verificación]` |
| Web Audio API (W3C) | Síntesis del tono y envolvente | Uso técnico, no normativo |

El timing 1:3:1:3:7 se usa como estándar de facto en `game/morse-core.js` y en `docs/05-matematica-de-bolsillo.md`. No se verificó la recomendación ITU-R M.1677 en fuente primaria para este documento; si se cita en material público, verificarla y anotar fecha.

La verificación interna del juego es `node game/test-core.mjs` (25 pruebas) y el smoke test `?selftest=1` en Chrome headless. No son fuentes normativas: son evidencia de que el código hace lo que dice.
