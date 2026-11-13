# 04 — Checklists

Imprimir o tener a mano. Un checklist que no se usa no es un checklist: es decoración.

---

## 1. Pre-transmisión (30 segundos)

- [ ] Licencia vigente y **categoría habilitada** para esta banda.
- [ ] Frecuencia **dentro de los bordes chilenos** (no los de IARU R2).
- [ ] Potencia dentro del límite **fija/móvil** de mi categoría.
- [ ] Modo permitido (sin cifrado para ocultar el significado).
- [ ] Contenido permitido: sin música, sin negocio, sin terceros salvo emergencia.
- [ ] Escuché antes de transmitir y la frecuencia está libre.
- [ ] Permiso de estación vigente y estoy en el domicilio autorizado (o es móvil).
- [ ] Antena, cable y tierra en condiciones seguras.
- [ ] Sé cómo identificarme: indicativo completo al inicio y cada ≤ 15 minutos.

**Si algo no está marcado, no transmito.**

---

## 2. Auditoría anual de estación

### Documentos
- [ ] Licencia y permiso vigentes; copia a la vista.
- [ ] Inventario de estaciones actualizado (formulario RAF-6 si corresponde).
- [ ] Alertas de renovación a 120 días.
- [ ] Seguro o cobertura de responsabilidad civil (si aplica).

### Cadena RF
- [ ] Inspección visual de cable y conectores (humedad, corrosión, tensión).
- [ ] ROE medida en cada banda y frecuencia de uso.
- [ ] Pérdida de retorno y pérdida de inserción del cable (VNA).
- [ ] Choke/balun de modo común instalado y medido.
- [ ] Antena sujeta, sin elementos sueltos, con margen de viento.

### Seguridad eléctrica y rayos
- [ ] Puesta a tierra: barra, conductor, conexiones limpias.
- [ ] Protección contra rayos y protocolo de desconexión.
- [ ] Fusible o breaker en la línea de alimentación.
- [ ] Sin cables cruzando pasillos ni cerca de agua.

### Exposición RF
- [ ] Distancia a personas en el peor caso (potencia máxima, frecuencia más crítica).
- [ ] Antenas direccionales evaluadas en la dirección de haz.
- [ ] Señalización y acuerdo con convivientes.

### Operación
- [ ] Bitácora al día.
- [ ] Frecuencias de emergencia y repetidoras locales anotadas.
- [ ] Fuente de energía de respaldo probada.

**Un hallazgo crítico (tierra, rayos, exposición, licencia) invalida la auditoría hasta corregirse.**

---

## 3. Interferencia: si tú causas o si te reclaman

### Registra antes de actuar
- [ ] Fecha y hora exacta.
- [ ] Frecuencia y modo.
- [ ] Indicativo y potencia.
- [ ] Antena y altura.
- [ ] Equipo afectado (marca, modelo, instalación).
- [ ] Síntoma (audio, imagen, ruido, alcance).
- [ ] Duración y periodicidad.
- [ ] Testigos y contacto del afectado.
- [ ] Foto/video/audio si es posible.

### Qué NO hacer
- [ ] No discutir al aire.
- [ ] No culpar sin medir.
- [ ] No modificar la instalación sin registrar el estado anterior.
- [ ] No ignorar un requerimiento de SUBTEL.

### Ruta técnica
1. Reproducir con dummy load: si desaparece, el problema está en antena/cable/entorno.
2. Revisar conectores, tierra, choke y filtros.
3. Medir con SDR el espectro de la propia emisión (armónicos, espurias).
4. Coordinar con el afectado; probar filtro en su receptor si corresponde.
5. Documentar y, si persiste, informar a SUBTEL.

**Base legal:** art. 40 DS 523 (subsanar en el plazo que fije SUBTEL; si no, suspensión) y art. 42 (cese ordenado en catástrofe).

---

## 4. Red de emergencia: guion de control

### Antes
- [ ] Rol asignado: control, campo, enlace, registro.
- [ ] Frecuencia principal y de respaldo.
- [ ] Energía y antena de respaldo.
- [ ] Formato de mensaje impreso.
- [ ] Hora de apertura y cierre.

### Durante
- [ ] "Red de emergencia, [indicativo], control".
- [ ] Precedencia: **emergencia / prioridad / rutina**.
- [ ] Mensajes cortos, con origen, destino, hora y texto.
- [ ] Acuse obligatorio; repetir si no hay acuse.
- [ ] No especular; no dar información no verificada.
- [ ] Fonética estándar; pausas; un transmisor a la vez.
- [ ] Registrar todo, incluso lo que no se cursó.

### Después
- [ ] Cierre formal de la red.
- [ ] After-action review: qué se perdió, qué se repitió, qué se omitió.
- [ ] 3 mejoras concretas con responsable y fecha.
- [ ] Informe a la autoridad si corresponde.

---

## 5. Día del examen

- [ ] Inscripción hecha **el mes anterior** en el Portal de Trámites de SUBTEL.
- [ ] Documentos de respaldo cargados (edad, categoría anterior, curso de radio club si aplica).
- [ ] Pago de 0,3 UTM (Aspirante exento) cuando corresponda.
- [ ] Conexión a internet estable y equipo probado.
- [ ] 45 minutos disponibles, sin interrupciones.
- [ ] Banco de preguntas estudiado (Apéndices A–E), no "leído por encima".
- [ ] Recordatorio: aprobar habilita; no certifica competencia.

---

## 6. Compra inicial: qué sí y qué no

### Primero (en este orden)
1. Dummy load 50 Ω.
2. Multímetro.
3. NanoVNA o VNA equivalente.
4. Coax de calidad y conectores correctos.
5. Adaptadores y un buen cable de medición.

### Después
6. Vatímetro o medidor de potencia.
7. SDR para espectro y ruido.
8. Chokes/ferritas.
9. Fuente de alimentación decente.

### No comprar todavía
- Amplificador antes de saber medir.
- Antena "milagro" con ganancia no especificada.
- Torre o mástil antes de revisar permisos y seguridad.
- Radio de 100 W antes de resolver dónde va la antena.
- Curso caro para un examen cuyo banco es público.

**Criterio:** cada compra responde a una medición o a una necesidad documentada, no a un video.

---

## 7. Distintivo, zona y repetidora

### Antes de identificarte
- [ ] Mi indicativo es el asignado; no invento sufijos.
- [ ] Si opero fuera de mi zona: `indicativo/numero_de_zona`.
- [ ] Si opero móvil: `indicativo móvil` (o marítima/aérea) y `/zona` si cambia.
- [ ] Si opero una estación ajena: primero el indicativo de la estación, luego el mío.
- [ ] Me identifico al inicio, al final y cada ≤ 15 minutos.

### Repetidora atendida
- [ ] Está en el domicilio autorizado (fuera, solo emergencia calificada).
- [ ] La controla un General/Superior o un club con permiso.
- [ ] Entrada/salida VHF: 144,5–144,9 / 145,2–145,5 MHz; UHF 432–435 MHz; 12,5 kHz.
- [ ] Potencia: 20 W HF, 10 W VHF, 5 W UHF, 1 W >1 GHz.
- [ ] Se identifica cada ≤ 15 minutos.

### Repetidora no atendida
- [ ] La instala un club, no un particular.
- [ ] Tiene permiso expreso de Subtel y pago de 0,75 UTM.
- [ ] Tiene indicativo, ID automático ≤ 15 min, control de cese y protección de espurias.
- [ ] Autonomía ≥ 24 h a plena carga.
- [ ] Potencia: 100 W HF, 50 W VHF, 10 W UHF, 1 W >1 GHz.
- [ ] Tono/código de acceso verificado con el Anexo de la Res. 176 y la tabla de tonos por zona.

### Radiobaliza
- [ ] La instala un club.
- [ ] Banda autorizada (lista de la Res. 176, art. 23).
- [ ] ID en Morse 10–15 WPM o digital público, ≤ 1 minuto.
- [ ] Potencia: 100 W PEP o 50 W continuos HF, 50 W VHF, 10 W UHF, 1 W SHF.

---

## 8. Doce afirmaciones que debes poder refutar

| Afirmación | Respuesta corta |
|---|---|
| "Más watts = más alcance" | Duplicar potencia = +3 dB = medio S-unit. El terreno vale decenas de dB |
| "ROE 1:1 = antena perfecta" | Puede ser un dummy load; la ROE no mide ganancia ni patrón |
| "Antena con ganancia siempre es mejor" | Depende del ángulo de radiación y del entorno; puede empeorar |
| "Digital necesita menos potencia" | Depende de sensibilidad, ancho de banda y ciclo de trabajo; no es magia |
| "El repetidor me escucha, entonces llego" | Probaste el uplink; el downlink y el otro receptor son otra cosa |
| "El medidor del equipo es confiable" | Sin calibración, es un indicador relativo |
| "En HF el cable no importa" | A 28 MHz sí; y en VHF/UHF mucho más |
| "Más altura siempre es mejor" | Fresnel y obstáculos mandan; a veces el ángulo empeora |
| "El balun no hace falta" | Sin choke hay modo común, ruido y patrón deformado |
| "La licencia me cubre afuera" | Necesitas permiso internacional o acuerdo vigente (art. 18) |
| "Puedo usar la radio del club" | Necesitas licencia idónea e identificarte con ambos indicativos (art. 45) |
| "Puedo hablar de negocios" | Art. 36: sin fines de lucro, sin recompensa, ni siquiera en emergencia |

**Frase de cierre:** "No sé" es una respuesta profesional si va seguida de "y lo mido así".
