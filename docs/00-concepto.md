# 00 — Concepto del proyecto

## 1. El problema

Un ingeniero en telecomunicaciones egresado puede aprobar el examen de radioaficionado en una tarde y, aun así, quedar en evidencia en la primera conversación técnica real. Los modos típicos de "quedar de huevón" no son académicos:

1. **El que aprobó y no sabe qué es PEP.** Confunde potencia del radio, potencia en la antena y potencia radiada.
2. **El que compró por YouTube.** Tiene una antena "con ganancia" y no sabe qué es un plano de tierra, un balun o una corriente de modo común.
3. **El que interfiere al vecino y no sabe qué lo obliga la ley.** No conoce el artículo 40 ni el procedimiento; discute al aire en vez de registrar evidencia.
4. **El que opera fuera de banda porque "así se hace afuera".** Sintoniza 3.790 kHz o 1.900 kHz en Chile sin saber que el límite local es otro.
5. **El que promete alcance sin haber calculado nada.** "Con 50 W llego a 50 km" es una frase que se desarma con una cuenta de 30 segundos.

El problema de fondo no es falta de conocimiento: es falta de **criterio verificable**. El egresado sabe resolver ecuaciones que no usa y no sabe tomar decisiones que sí importan.

## 2. La tesis

> La distinción de un ingeniero no se declara: se demuestra cuando otro puede verificar lo que afirma.

Esa distinción tiene tres juicios y un hábito:

| Componente | Pregunta que responde | Se prueba con |
|---|---|---|
| **Juicio normativo** | ¿Está permitido? ¿Qué me expone? | Cita del artículo + decisión operativa |
| **Juicio técnico** | ¿Por qué funciona? ¿Cuánto? | Cálculo + medición + desvío explicado |
| **Juicio operativo** | ¿Qué hago cuando falla, bajo presión? | Diagnóstico cronometrado + bitácora |
| **Hábito** | ¿Cómo lo demuestro después? | Evidencia: foto, log, medición, fecha |

La radioafición es el vehículo porque es el único dominio donde un ingeniero puede ejercer el ciclo completo —diseñar, instalar, operar, medir y responder ante la autoridad— con equipo de bolsillo, sin clientes y con consecuencias reales (interferencia, sanciones, emergencia).

## 3. Por qué Chile y por qué ahora

- La norma chilena es **acotada y legible**: un reglamento (DS 523/2006, modificado por DS 213/2013), una norma de exámenes (Res. Ex. 2620/2023), una norma de distintivos y una norma técnica de repetidoras/radiobalizas.
- El examen es **online, de 45 minutos y con banco público** (Apéndices A–E). Eso elimina la excusa "no tengo cómo certificarme" y traslada el valor a la competencia real.
- El parque de equipos es **accesible**: un handheld VHF/UHF, un NanoVNA y un dummy load cuestan menos que un semestre de postgrado.
- La normativa **cambia**: el Plan General de Uso del Espectro fue modificado en 2023 (DS 192) y la tabla de bandas se actualizó en 2025. Un ingeniero que no sabe leer la fuente primaria queda desactualizado sin darse cuenta.

## 4. Principios de diseño

1. **Primacía de lo práctico.** Cada concepto entra por una decisión que cambia. Si un tema no cambia una decisión, no entra.
2. **Números defendibles.** Orden de magnitud, unidades correctas, supuestos explícitos. Nada de cifras inventadas.
3. **Una página por tema.** Definición, fórmula, valor típico, modo de falla, chequeo de campo.
4. **Evidencia sobre opinión.** Medir con lo que hay; registrar; comparar contra la predicción.
5. **Alfabetización legal.** Los límites que multan se saben de memoria; el resto se consulta.
6. **Antifrágil.** Checklists y simulacros, no memoria heroica.
7. **Honestidad epistémica.** Marcar `[verificado]` / `[pendiente]` en toda afirmación normativa. Un dato sin fuente es una opinión.

## 5. Arquitectura del programa

### Cinco capas

| Capa | Contenido | Pregunta que cierra |
|---|---|---|
| **Ley** | Licencia, permiso, bandas, potencias, identificación, prohibiciones, sanciones | ¿Puedo hacerlo? |
| **Estación** | Cadena RF, cable, conectores, ROE, balun, tierra, filtros, alimentación, térmica | ¿Va a funcionar y a durar? |
| **Propagación** | HF (ionosfera, MUF, ciclo solar), VHF/UHF (línea de vista, Fresnel, terreno), ruido | ¿Va a llegar? |
| **Medición** | VNA, vatímetro, dummy load, SDR, piso de ruido, diagnóstico | ¿Cómo lo sé? |
| **Operación** | Fonética, Q, redes, emergencia, tráfico de terceros, log, satélite, digital | ¿Qué hago y qué digo? |

### Cuatro niveles

| Nivel | Nombre | Criterio |
|---|---|---|
| **N0** | Literario | Explica la norma básica y no la viola |
| **N1** | Operador competente | Hace contactos, cumple identificación y potencias, usa repetidoras, registra |
| **N2** | Ingeniero de estación | Diseña, instala, mide, diagnostica y predice con ±3 dB |
| **N3** | Referente | Audita, enseña, perita y opera en emergencia; defiende decisiones ante la autoridad |

### Tres ritmos

- **Semana 1–2:** ley + estación + matemática de bolsillo.
- **Semana 3–6:** labs 0–4 con evidencia.
- **Semana 7–12:** labs 5–8, prueba NQH y una red de emergencia real.

**Instrumento transversal:** `game/` (QSO CERO). Es el simulador de la capa de operación: audio, tecleo y timing real. No enseña el alfabeto como tabla ni reemplaza el contacto real; entrena la secuencia, la identificación y el criterio de pedir repetición. Diseño en `docs/08-juego-morse.md`.

## 6. Formas posibles del proyecto

| Forma | Ventaja | Costo | Cuándo conviene |
|---|---|---|---|
| **Repositorio vivo** (este) | Portable, versionable, sin costo marginal | Mantención | Base de todo lo demás |
| **Manual de campo** (PDF/impreso) | Usable sin computador, en terreno | Diagramación | Si el público opera en emergencia |
| **Curso cohorte** (8 semanas) | Compromiso, evaluación, comunidad | Facilitación | Si hay institución o radio club aliado |
| **Mentoría 1:1** | Personalización y diagnóstico real | Tiempo | Para N2 → N3 |
| **Auditoría de estación** | Ingreso y evidencia de valor | Responsabilidad | Si se vuelve servicio |

**Recomendación v0.1:** repositorio + manual derivado + una cohorte piloto de 8–12 personas. El curso se diseña después de que los labs estén probados; al revés se convierte en diapositivas.

## 7. Métricas de éxito

| Métrica | Meta | Cómo se mide |
|---|---|---|
| Aprobación del examen | 100% en 1 intento | Certificado |
| Cálculo de enlace | ±3 dB vs medición | Lab 4 |
| Diagnóstico de fallas | 5 fallas en <30 min | Lab 8 |
| Límites legales | 12/12 sin apuntes | Prueba NQH |
| Estación auditada | 0 hallazgos críticos | Checklist anual |
| Interferencias | 0 sin resolver; 100% con evidencia | Bitácora |
| Red de emergencia | 1 operada y evaluada | After-action review |
| QSO en Morse | 1 completo sin guía | QSO CERO + Lab 9 |

## 8. Plan de arranque 30 / 60 / 90

- **Día 0–30:** cerrar el digesto normativo, validar los labs 0–2 con equipo propio, escribir la prueba NQH y probar QSO CERO con 5 personas.
- **Día 31–60:** labs 3–6, corregir supuestos con mediciones reales, producir el manual imprimible.
- **Día 61–90:** cohorte piloto, lab 7 (red de emergencia) y lab 8 (fallas), revisión de resultados y decisión de continuidad.

## 9. Riesgos y sesgos

| Riesgo | Señal | Mitigación |
|---|---|---|
| **Normativitis** | El proyecto se vuelve comentario de artículos | Cada artículo termina en una decisión o un checklist |
| **Teoritis** | Aparecen derivadas que nadie usa | Regla: si no cambia una medición o una decisión, se corta |
| **Gadgetitis** | Se compran equipos antes de medir | Labs 0–2 se hacen con lo mínimo; la compra se justifica con una medición |
| **Examen-centrismo** | El éxito se mide en aprobar | El examen es requisito, no criterio de egreso |
| **Gamificación sin transferencia** | Buen puntaje en el juego, mal contacto real | Lab 9 exige un QSO real y un log; el juego es el simulador, no el examen |
| **Punto único de falla** | Todo depende de un solo equipo | Cada lab tiene variante con SDR/handheld |
| **Sobreajuste a Chile** | Se ignoran acuerdos internacionales | El digesto cita la capa internacional cuando cambia una decisión (CEPT, IARU R2) |

## 10. Decisiones abiertas

1. Nombre definitivo (BASE/RF es provisional).
2. Público primario: ingenieros egresados, técnicos, o ambos con rutas separadas.
3. Formato: repo, manual, curso o programa mixto.
4. Licencia del contenido y política de contribuciones.
5. Si se publica en español neutro o en chileno directo (recomendación: chileno directo; el registro es parte del método).
6. Si se busca aval de un radio club, universidad o colegio profesional.
