# BASE/RF — Estación base para ingenieros en telecomunicaciones

> **Nombre provisional.** Clave interna: **NQH** (*no quedar de huevón*), que es literalmente el criterio de aceptación del programa.

**Estado:** v0.1 del programa + **v0.2 de QSO CERO** — concepto, digesto normativo chileno, mapa de competencias, laboratorio inicial, checklists y juego de Morse.

---

## Qué es

Un programa de formación y un manual de campo para ingenieros en telecomunicaciones **ya egresados** que quieren una base sólida y demostrable de lo que significa ser "ingeniero" en el dominio de las radiocomunicaciones. El punto de entrada es la normativa chilena de radioaficionados; el punto de salida no es la licencia, sino la capacidad de **predecir, medir, explicar y responder** por un sistema de radio real.

No enseña teoría de grado. Enseña lo que cambia una decisión: qué banda, qué potencia, qué antena, qué cable, qué hacer cuando algo interfiere, qué decir y qué no decir frente a la autoridad.

## La tesis en tres líneas

1. Un egresado tiene un título; un profesional tiene una **distinción verificable**.
2. La distinción no es saber más fórmulas: es poder **anticipar** un resultado, **medirlo**, **explicar la diferencia** y **responder** por ella.
3. La radioafición es el único laboratorio legal, barato y con consecuencias reales donde ese ciclo completo se puede practicar solo, sin clientes y sin presupuesto.

## Qué produce

| Artefacto | Para qué |
|---|---|
| Digesto normativo chileno | Saber qué está permitido, qué te expone y qué cambió |
| Mapa de competencias (6 ejes × 4 niveles) | Saber en qué nivel estás y qué te falta para subir |
| Laboratorio de 10 prácticas | Convertir conceptos en mediciones con evidencia |
| **Juego QSO CERO** | Practicar Morse de supervivencia con audio y tecleo real, sin consecuencias legales |
| Checklists de operación | No fallar bajo presión ni con testigos |
| Matemática de bolsillo | Defender números en una conversación técnica |
| Decisiones de diseño (ADR) | Que el proyecto no se degrade a curso teórico |

## Cómo se usa

- **Ruta 2 horas:** `docs/01-normativa-cl-2026.md` + `docs/04-checklists.md`. Sirve para no violar la norma esta semana.
- **Ruta 2 semanas:** agrega `docs/02-competencias.md` y los labs 0–3 de `docs/03-labs.md`.
- **Ruta 3 meses:** programa completo, con las 10 prácticas, la prueba NQH y una red de emergencia operada.
- **Ruta Morse:** abre `game/index.html` y haz 10 minutos diarios. v0.2 incluye Farnsworth configurable, niveles Koch (8), puntaje de gaps y certificado exportable. Diseño y decisiones en `docs/08-juego-morse.md`.

## Mapa del repositorio

```
README.md
AGENTS.md                      reglas para mantener el proyecto (fuentes, estilo, verificación)
docs/
  00-concepto.md               tesis, arquitectura, formas posibles, métricas, riesgos
  01-normativa-cl-2026.md      digesto táctico de la norma chilena vigente
  02-competencias.md           6 ejes, 4 niveles, prueba NQH
  03-labs.md                   10 prácticas con predicción, medición y evidencia
  04-checklists.md             pre-transmisión, auditoría, interferencia, emergencia, examen, compra, distintivo/repetidora
  05-matematica-de-bolsillo.md dB, enlace, Fresnel, ruido, ROE, PEP
  06-decisiones.md             ADRs: por qué Chile, por qué práctico, qué se excluye
  07-fuentes.md                normas, IDs, fechas, estado de verificación
  08-juego-morse.md            diseño de QSO CERO: modos, puntaje, arquitectura, roadmap
  09-plan-v0.2.md              plan ejecutado por workers y registro de verificación
  10-qa-v0.2.md                QA automático de v0.2, casos borde y riesgos residuales
game/
  index.html                   abre el juego (sin build, sin dependencias)
  README.md                    cómo jugar, controles, pruebas
docs/03-labs.md                incluye el Lab 9: QSO completo en Morse
```

## Lo que este proyecto NO es

- No es un curso de electrónica de grado ni de teoría electromagnética.
- No es una guía de compra ni un manual de DX.
- No reemplaza la normativa oficial: la cita, la traduce y marca lo que falta verificar.
- No promete que el examen sea difícil. El examen es un banco público de 45 minutos; aprobarlo no te hace competente.
- **QSO CERO** no reemplaza el aire: es un simulador de procedimiento y timing. El contacto real sigue siendo el examen final.

## Siguiente decisión del owner

Elegir la forma del proyecto (curso, manual, repositorio vivo, mentoría o servicio de auditoría) y el nombre definitivo. Ver `docs/00-concepto.md` §"Formas posibles" y `docs/06-decisiones.md`.
