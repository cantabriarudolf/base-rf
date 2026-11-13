# AGENTS.md — Reglas para mantener BASE/RF

Este repositorio es un manual de campo, no una tesis. Las reglas existen para que no se degrade.

## 1. Jerarquía de verdad

1. **Fuente primaria:** Ley 18.168, DS 523/2006, DS 213/2013, Res. Ex. 2620/2023, Res. 175, Res. 176, Plan General de Uso del Espectro y Tabla de Bandas vigente.
2. **Este repositorio:** digesto, competencias, labs, checklists.
3. **Fuente secundaria:** radio clubes, blogs, foros, videos. Sirve para descubrir, no para citar.

Si una fuente secundaria contradice a la primaria, gana la primaria.

## 2. Reglas para afirmaciones normativas

- Toda afirmación legal lleva **artículo o resolución** y **fecha de consulta**.
- Si no se verificó, se marca `[pendiente]`. No se disimula.
- No se copia la norma completa: se traduce a una decisión y se deja el puntero.
- No se citan montos de multas, límites de exposición RF ni requisitos técnicos de repetidoras sin fuente verificada.
- Cuando una norma cambie, se actualiza `docs/01-normativa-cl-2026.md`, la matriz de `docs/02-competencias.md` si aplica, y `docs/07-fuentes.md`.

## 3. Reglas para números

- Todo número debe poder derivarse de una fórmula, una medición o una fuente citada.
- Los valores "típicos" se declaran como típicos y con su rango.
- Las estimaciones de costo se marcan como estimaciones.
- No se inventan tablas de pérdida de coax, sensibilidad de equipos ni ganancia de antenas.

## 4. Reglas de estilo

- Español chileno directo. Frases cortas. Sin relleno.
- Una página por tema. Tablas cuando comparan; listas cuando ordenan.
- Cada concepto termina en una decisión, un chequeo o una medición.
- Se prefieren ejemplos numéricos a definiciones abstractas.
- No se usa lenguaje de marketing ("revolucionario", "definitivo", "garantizado").

## 5. Reglas de contenido

- **No** teoría de grado sin aplicación práctica.
- **No** contenido centrado en aprobar el examen.
- **No** promoción de marcas ni enlaces de afiliado.
- **No** asesoría legal: el digesto informa y deriva a la fuente.
- **Sí** diagnósticos, mediciones, checklists, errores comunes y decisiones defendibles.

## 6. Estructura

```
docs/NN-tema.md          documento temático, numerado
docs/03-labs.md          cada lab: pregunta, predicción, montaje, medición, evidencia, criterio, trampa
docs/06-decisiones.md    ADR: contexto, decisión, consecuencias, condición de revisión
```

Un documento nuevo debe enlazarse desde `README.md` y, si es normativo, desde `docs/07-fuentes.md`.

## 7. Definición de "terminado" para un documento

- [ ] Responde una pregunta concreta.
- [ ] Cada afirmación normativa tiene fuente o marca `[pendiente]`.
- [ ] Cada número se puede recalcular.
- [ ] Tiene al menos un chequeo o una decisión accionable.
- [ ] Está enlazado desde el README.
- [ ] No duplica contenido de otro documento: lo referencia.

## 8. Protocolo de cambio

1. Antes de editar, leer el documento completo y `docs/07-fuentes.md`.
2. Si el cambio es normativo, verificar la fuente primaria y anotar fecha.
3. Si el cambio afecta una decisión de diseño, actualizar el ADR correspondiente.
4. Si el cambio invalida un lab, actualizar el lab y anotar por qué.
5. Commit con mensaje que diga **qué cambió y por qué**, no "update".

## 9. Reglas del juego QSO CERO

- **El núcleo no toca el DOM.** `game/morse-core.js` debe seguir siendo puro y ejecutable en Node.
- **Cada cambio al núcleo exige `node game/test-core.mjs` en verde.** Si agregas una tabla, un prosigno o una regla de scoring, agrega su prueba.
- **No convertir el Morse en múltiple opción.** Si un modo no exige teclear o copiar audio, no es QSO CERO.
- **La identidad es el indicativo.** El número de licencia es local y no se transmite; no lo pongas en ninguna secuencia de aire.
- **El timing es código.** No agregues atajos que acepten puntos y rayas sin medir duración, salvo en el modo "estudio" explícito.
- **La guía visual es un andador.** En niveles altos debe poder apagarse; el modo examen no la muestra.
- **Sin dependencias externas ni build.** El juego debe abrirse desde `file://`.
- **Prosignos con prioridad.** `AR`, `BT`, `KN`, `AS`, `SK` se transmiten sin gap interno; si agregas uno, actualiza `PROSIGNS`, `PROSIGN_BY_CODE` y las pruebas.
- **Los espacios entre palabras se puntúan.** No los filtres del `compareKeying`.
- **Farnsworth no rompe compatibilidad.** `timing(wpm)` y `timing(wpm, extraGapMs)` siguen funcionando; `farnsworthWpm` se agrega como tercer parámetro y en `opts` de `schedule`/`decodeKeying`. Si es 0 o no se pasa, no hay pausa extra.
- **Los gaps se puntúan.** `timingScore` combina 60% marcas y 40% gaps y sigue devolviendo 0..1; no se elimina el puntaje de marcas.
- **Koch se deriva.** `kochLevels` se genera en grupos de 5 desde `koch`; no se escriben a mano dos veces.
