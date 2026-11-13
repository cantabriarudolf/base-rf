# 06 — Decisiones de diseño (ADR)

Cada decisión tiene contexto, decisión, consecuencias y una condición de revisión. Una decisión sin condición de revisión es una cláusula pétrea disfrazada.

---

## ADR-001 — Chile primero, con la capa internacional explícita

**Contexto:** el proyecto nace en Chile y la normativa local tiene bordes que no coinciden con IARU Región 2 (80 m hasta 3.750 kHz, 160 m hasta 1.850 kHz, sin 902–928 MHz).

**Decisión:** la norma chilena es la columna vertebral. La capa internacional (UIT, IARU, CEPT) se cita solo cuando cambia una decisión: permisos en el exterior, bandas no atribuidas, satélite.

**Consecuencias:**
- El digesto no es un tratado de derecho internacional.
- Un lector de otro país puede usar la estructura, pero debe reemplazar la capa normativa.
- Se evita el error de "así se hace afuera".

**Revisar cuando:** el proyecto se expanda a otro país o cuando cambie el Plan General de Uso del Espectro.

---

## ADR-002 — Primacía de lo práctico

**Contexto:** el público es ingeniero egresado; ya tuvo teoría. Lo que le falta es criterio de campo.

**Decisión:** cada concepto entra por una decisión que cambia. Si un tema no cambia una medición, una instalación o una decisión legal, no entra.

**Consecuencias:**
- Se excluyen derivaciones, demostraciones y modelos que no terminan en una acción.
- La matemática se limita a lo que se calcula en una servilleta.
- El material puede parecer "incompleto" a un académico; es intencional.

**Revisar cuando:** aparezca un tema que, sin teoría, impida diagnosticar. Ahí se agrega la teoría mínima, no antes.

---

## ADR-003 — El examen no es el objetivo

**Contexto:** el examen es online, de 45 minutos y con banco público. Aprobarlo es trivial para un ingeniero.

**Decisión:** el examen es un requisito de habilitación, no el criterio de egreso. El egreso se mide con la prueba NQH, los labs y la auditoría.

**Consecuencias:**
- No se venden "cursos para aprobar".
- El banco de preguntas se usa como alfabetización mínima, no como currículo.
- El valor está en la competencia demostrable.

**Revisar cuando:** cambie la norma de exámenes (Res. 2620/2023) o el banco.

---

## ADR-004 — Digesto con punteros, no copia de la norma

**Contexto:** la normativa es pública, pero está dispersa y cambia. Copiarla completa genera un documento que envejece mal y compite con la fuente.

**Decisión:** el digesto traduce la norma a decisiones, cita artículo y fuente, y marca `[verificado]` / `[pendiente]`.

**Consecuencias:**
- El lector siempre puede ir a la fuente primaria.
- El proyecto no reemplaza asesoría legal.
- Las afirmaciones sin fuente se consideran deuda.

**Revisar cuando:** una norma cambie o una afirmación `[pendiente]` se resuelva.

---

## ADR-005 — Medición con equipo mínimo; la compra se justifica

**Contexto:** el mercado empuja a comprar radios, amplificadores y antenas antes de saber medir.

**Decisión:** los labs 0–4 se hacen con handheld, dummy load, VNA y multímetro. Cada compra posterior debe responder a una medición o a una necesidad documentada.

**Consecuencias:**
- El costo de entrada es bajo.
- Se aprende a diagnosticar antes de gastar.
- El proyecto no depende de una marca.

**Revisar cuando:** un lab demuestre que el equipo mínimo no alcanza para el objetivo.

---

## ADR-006 — Español chileno directo

**Contexto:** el registro importa. Un texto neutro y ceremonial no se usa en terreno.

**Decisión:** español chileno, frases cortas, ejemplos locales, sin jerga innecesaria. La claridad manda sobre la elegancia.

**Consecuencias:**
- El material se lee como un manual de campo, no como una tesis.
- Puede requerir adaptación para otros públicos hispanohablantes.

**Revisar cuando:** se publique una edición internacional.

---

## ADR-007 — Repositorio Markdown primero; datos y herramientas después

**Contexto:** la tentación es empezar por una app, una calculadora o una base de datos.

**Decisión:** v0.1 es Markdown versionable. La estructura de datos (bandas, categorías, potencias) y las calculadoras se construyen cuando los labs validen qué se necesita.

**Consecuencias:**
- Se evita programar antes de entender el dominio.
- El contenido es portable y auditable.
- La deuda técnica es baja.

**Revisar cuando:** los labs 0–4 estén validados y se repita una necesidad de cálculo.

---

## ADR-008 — Público: egresados, no estudiantes de primer año

**Contexto:** el proyecto nace de una carencia de criterio profesional, no de formación básica.

**Decisión:** el material asume título de ingeniero en telecomunicaciones o equivalente. No enseña electricidad desde cero; enseña a decidir con electricidad.

**Consecuencias:**
- Los labs son exigentes en criterio, no en cálculo.
- Un técnico puede usarlo, pero necesita apoyo en los ejes C y D.

**Revisar cuando:** se abra una ruta para técnicos o estudiantes avanzados.

---

## ADR-009 — La seguridad invalida el nivel

**Contexto:** un ingeniero con buen cálculo y mala seguridad es un pasivo.

**Decisión:** un hallazgo crítico (tierra, rayos, exposición RF, licencia) invalida la evaluación de nivel hasta corregirse.

**Consecuencias:**
- No se negocia seguridad por nota.
- La auditoría anual es obligatoria, no optativa.

**Revisar cuando:** nunca. Si se revisa, que sea para agregar criterios, no para quitar.

---

## ADR-010 — Licencia: contenido abierto, código libre

**Contexto:** el proyecto puede ser abierto, vendido como curso o quedar privado. v0.1 la dejó `[pendiente]`; el 2026-11-13 el owner pidió publicarlo con licencia colaborativa. La normativa citada es pública y se referencia, no se reclama como propia.

**Decisión:** doble licencia, por tipo de artefacto.

| Artefacto | Licencia | Archivo |
|---|---|---|
| Contenido (`README.md`, `AGENTS.md`, `docs/`, `game/README.md`, textos de la interfaz) | CC BY-SA 4.0 | `LICENSE-docs.md` |
| Código (`game/*.js`, `game/*.css`, `game/index.html`) | MIT | `LICENSE` |

- Las contribuciones entran bajo la misma licencia del archivo que tocan; pull request contra `main`.
- La marca gráfica de `assets/` no se relicencia: viene de dharmatec.cl y se usa como sello del autor.

**Consecuencias:**
- Cualquier adaptación publicada del manual tiene que quedar en CC BY-SA 4.0 y mantener la atribución del repositorio fuente. Comercializar un taller es posible; cerrar los materiales derivados, no.
- El código del juego queda reutilizable sin arrastrar la licencia del manual.
- Vender sigue abierto, pero se vende **facilitación, evaluación o auditoría**, no el texto cerrado.
- Aparece una obligación de mantenimiento: si se cambia el alcance de la licencia, se actualizan `LICENSE`, `LICENSE-docs.md`, `README.md` y este ADR en el mismo commit.

**Revisar cuando:** alguien pida una licencia incompatible (por ejemplo CC BY-NC), o el proyecto se convierta en producto cerrado.

---

## ADR-011 — QSO CERO: audio primero, tecleo real, sin build

**Contexto:** el proyecto necesitaba una dinámica para practicar Morse. La tentación era hacer un quiz de letras o un juego de múltiple opción. Eso no enseña Morse: el Morse es una habilidad de timing y de copia bajo ruido.

**Decisión:** el juego se implementa como una página web sin build y sin dependencias, con:
- audio sintetizado (Web Audio) y envolvente de 5 ms;
- tecleo real con `Espacio` o botón, midiendo duraciones;
- un núcleo puro (`morse-core.js`) sin DOM, probado en Node;
- identidad por **indicativo**, no por número de licencia;
- puntaje de copia + timing + criterio (pedir `AGN` en vez de adivinar).

**Consecuencias:**
- El juego funciona desde `file://` y no depende de una cadena de suministro.
- El núcleo se puede reutilizar en una app móvil o en un CLI.
- El decodificador prioriza prosignos sobre puntuación (`+` = `AR`, `=` = `BT`, `&` = `AS`, `(` = `KN`); es correcto para el juego, no para un decodificador universal.
- No reemplaza el aire: el Lab 9 exige un contacto real o simulado con log.

**Revisar cuando:** se agregue decodificación adaptativa, modo móvil o un modo examen sin guía.
