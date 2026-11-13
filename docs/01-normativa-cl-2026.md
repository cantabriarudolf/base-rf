# 01 — Normativa chilena de radioaficionados: digesto táctico

**Verificado:** 2026-11-11 contra fuente primaria (BCN/LeyChile y SUBTEL).
**Alcance:** lo que cambia una decisión de operación, instalación o defensa frente a la autoridad. No es un comentario jurídico.

> Regla del digesto: cada dato lleva artículo o resolución. Lo que no se pudo verificar se marca `[pendiente]`. Un dato sin fuente es una opinión.

---

## 1. Pirámide normativa

```
Ley 18.168, General de Telecomunicaciones
  └─ DS 523/2006 — Reglamento del Servicio de Aficionados a las Radiocomunicaciones
       └─ DS 213/2013 — modifica el reglamento (versión vigente consolidada)
            ├─ Res. Ex. 2620/2023 — Norma de Exámenes (deroga la Res. 765/2007)
            ├─ Res. Ex. 175/2008 (y modificación) — Norma de Señales Distintivas
            ├─ Res. Ex. 176 — Norma técnica de repetidoras y radiobalizas
            └─ Plan General de Uso del Espectro: DS 127/2006, mod. DS 192/2023
                 └─ Tabla de Bandas para Radioaficionados (actualización 2025)
```

**Consecuencia práctica:** la página de SUBTEL todavía lista la Res. 765/2007 como norma de exámenes. La norma vigente es la **Res. Ex. 2620/2023** (publicada el 19-12-2023). Si citas la 765, quedas desactualizado.

---

## 2. Los 12 números que hay que saber de memoria

| # | Dato | Valor | Fuente |
|---|---|---|---|
| 1 | Vigencia de la licencia | 5 años, renovable | DS 523, art. 6 |
| 2 | Plazo para pedir renovación | ≥ 90 días antes del vencimiento | DS 523, art. 17 |
| 3 | Gracia sin examen tras vencer | 12 meses | DS 523, art. 17 |
| 4 | Costo de la licencia | 0,30 UTM (Aspirante exento); instituciones 0,60 UTM; repetidora 0,75 UTM | Ley 18.168, art. 32 |
| 5 | Examen | Online, 45 minutos, 30 preguntas (reglamento + técnica), banco público | Res. 2620/2023 y Apéndices A–E |
| 6 | Identificación | Inicio, fin y cada ≤ 15 minutos | DS 523, art. 44 |
| 7 | Potencia fija HF — Superior/General | 1.200 W PEP a la entrada de la línea | DS 523, arts. 9.c y 11 |
| 8 | Potencia fija HF — Novicio | 200 W PEP | DS 523, art. 13.b |
| 9 | Potencia fija HF — Aspirante | 100 W PEP (solo 3,5 / 7 / 28 MHz) | DS 523, art. 15.a |
| 10 | Potencia VHF fija — Superior/General | 100 W (Novicio y Aspirante: 50 W; móvil: 50 W) | DS 523, arts. 9, 13, 15 |
| 11 | Descargos ante una sanción | 10 días desde la notificación | DS 523, art. 59 |
| 12 | Permiso experimental (solo Superior) | Potencia: ≤ 3 meses; bandas no atribuidas: < 7 días | DS 523, art. 9.e |

**Regla mnemotécnica:** *5-90-12 / 45-15 / 1200-200-100 / 10.* Cinco años, noventa días, doce meses; cuarenta y cinco minutos, quince minutos; mil doscientos, doscientos, cien; diez días de descargos.

---

## 3. Matriz de categorías

| | **Superior** | **General** | **Novicio** | **Aspirante** |
|---|---|---|---|---|
| **Edad mínima** | 18 años | 15 años (menores representados) | 12 años (menores representados) | 10 años (menores representados) |
| **Requisito de tiempo** | 5 años como General | 3 años como Novicio | 1 año como Aspirante (o 6 meses con curso de radio club) | — |
| **Examen** | Sí (técnico + reglamentario) | Sí | Sí | Sí |
| **Requisito adicional** | Actuación destacada acreditada por organización | — | — | — |
| **Prefijo** | XQ | CE | CA | CD |
| **Bandas** | Todas las atribuidas | Todas las atribuidas | 3,5 / 7 / 10 / 28 MHz; 50 / 144 / 220 MHz; 430 / 1.270 / 2.400 / 5.650 MHz | 3,5 / 7 / 28 MHz; 144 MHz |
| **Fija HF** | 1.200 W PEP | 1.200 W PEP | 200 W PEP | 100 W PEP |
| **Fija VHF** | 100 W | 100 W | 50 W | 50 W (144 MHz) |
| **Fija UHF ≤ 1.270 MHz** | 50 W | 50 W | 25 W | — |
| **Fija > 1.270 MHz** | 10 W | 10 W | 10 W (2.400 / 5.650 MHz) | — |
| **Móvil HF** | 200 W PEP | 200 W PEP | 50 W PEP | — |
| **Móvil VHF** | 50 W | 50 W | 50 W | 50 W (144 MHz) |
| **Móvil UHF ≤ 1.270 MHz** | 25 W | 25 W | 25 W | — |
| **Móvil > 1.270 MHz** | 10 W | 10 W | 10 W | — |
| **Satélite** | Sí | Sí | Sí | No listado en el art. 15 `[verificar]` |
| **Extras** | Permiso experimental (art. 9.e); distintivo especial | — | — | < 15 años: supervisión en HF |

**Lectura clave:** la potencia se mide **a la entrada de la línea de alimentación de la antena**, no en la salida del radio ni en la antena. Es PEP en HF. No es ERP.

### 3.1 Distintivos de llamada

Norma: **Res. Ex. 1228/2008**, modificada por **Res. Ex. 175** (publicada el 23-01-2014). Texto consolidado: BCN idNorma 280338, versión 2014-01-23.

**Estructura:** prefijo + número de zona + sufijo.

| Prefijo | Categoría |
|---|---|
| XQ | Superior |
| CE | General |
| CA | Novicio |
| CD | Aspirante |
| CB, XR, 3G | Especiales (CB tiene régimen transitorio para licencias antiguas) |

- **Sufijo:** Superior y General, 1 a 3 letras; Novicio y Aspirante, exactamente 3 letras; clubes y sedes del Estado, CE + zona + 2 o 3 letras.
- **Una letra:** solo General/Superior con más de 20 años de actividad destacada en HF (art. 9) o distintivo especial.
- **Especiales:** CB/XR/3G + zona + uno o más números + una o más letras; solo Superior/General y clubes, por la duración del evento.
- **Zona 0:** estaciones espaciales y territorios insulares. Sufijos: X para Sala y Gómez, San Félix y San Ambrosio; Y para Isla de Pascua; Z para Juan Fernández.
- **Fuera de tu zona:** indicativo + `/` + número de zona (ej. `CA3ABC/4`).
- **Móvil:** indicativo + `móvil`, `móvil marítima` o `móvil aérea`; si la zona es distinta, + `/` + zona.
- **Extranjero con permiso internacional:** `CE` + zona + `/` + indicativo de origen.
- **Identificación:** inicio y fin de cada transmisión, y cada ≤ 15 minutos. Si operas una estación ajena, primero el indicativo de la estación y luego el tuyo (art. 4).

**Zonas (referencia secundaria):** el Apéndice A oficial es una imagen; la tabla siguiente es orientativa y conserva nombres históricos. No reemplaza el Apéndice A.

| Zona | Territorio |
|---|---|
| 0 | Rapa Nui, Sala y Gómez, San Félix, San Ambrosio, Juan Fernández; estaciones espaciales |
| 1 | Tarapacá, Antofagasta y Atacama |
| 2 | Coquimbo y Valparaíso, salvo territorios insulares de zona 0 |
| 3 | Región Metropolitana |
| 4 | O'Higgins, Maule y provincia de Ñuble |
| 5 | Provincias de Concepción, Arauco y Biobío |
| 6 | Araucanía y provincias de Valdivia y Osorno |
| 7 | Llanquihue, Chiloé, Palena y Aysén |
| 8 | Magallanes |
| 9 | Territorio Antártico Chileno |

---

## 4. Bandas autorizadas (Tabla 2025)

Fuente: Tabla de Frecuencias para Radioaficionados, Plan General de Uso del Espectro (DS 127/2006, mod. DS 192/2023), actualización 2025 de SUBTEL.

### 4.1 HF / MF / LF

| Banda | Rango | Estado | Servicio |
|---|---|---|---|
| 160 m | 1.800 – 1.850 kHz | Primario | Aficionado |
| 80 m | 3.500 – 3.750 kHz | Primario (*) | Aficionado |
| 60 m | 5.351,5 – 5.366,5 kHz | Primario | Aficionado |
| 40 m | 7.000 – 7.100 kHz | Primario | Aficionado y satélite |
| 40 m | 7.100 – 7.300 kHz | Primario (*) | Aficionado |
| 30 m | 10.100 – 10.150 kHz | Primario | Aficionado |
| 30 m | 10.100 – 10.125 kHz | Secundario | Aficionado |
| 20 m | 14.000 – 14.250 kHz | Primario | Aficionado y satélite |
| 20 m | 14.250 – 14.350 kHz | Primario | Aficionado |
| 17 m | 18.068 – 18.168 kHz | Primario | Aficionado y satélite |
| 15 m | 21.000 – 21.450 kHz | Primario | Aficionado y satélite |
| 12 m | 24,89 – 24,99 MHz | Primario | Aficionado y satélite |
| 10 m | 28 – 29,7 MHz | Primario | Aficionado y satélite |
| 2.200 m | 135,7 – 137,8 kHz | Secundario | Aficionado |
| 630 m | 472 – 479 kHz | Secundario | Aficionado |

### 4.2 VHF / UHF

| Banda | Rango | Estado | Servicio |
|---|---|---|---|
| 6 m | 50 – 54 MHz | Primario | Aficionado |
| 2 m | 144 – 146 MHz | Primario | Aficionado y satélite |
| 2 m | 146 – 148 MHz | Primario | Aficionado |
| 1,25 m | 220 – 225 MHz | Primario (*) | Aficionado |
| 70 cm | 430 – 432 / 432 – 438 / 438 – 440 MHz | Secundario | Aficionado |
| 23 cm | 1.240 – 1.300 MHz | Secundario | Aficionado |
| 13 cm | 2.400 – 2.450 MHz | Secundario | Aficionado |
| 9 cm | 3.300 – 3.400 MHz | Primario y secundario | Aficionado |
| 6 cm | 5.650 – 5.725 / 5.725 – 5.830 / 5.830 – 5.850 MHz | Secundario | Aficionado (5.830–5.850 también satélite) |

### 4.3 Microondas y milimétricas

| Rango | Estado | Servicio |
|---|---|---|
| 10,45 – 10,5 GHz | Secundario | Aficionado y satélite |
| 24 – 24,05 GHz | Primario | Aficionado y satélite |
| 24,05 – 24,25 GHz | Secundario | Aficionado |
| 47 – 47,2 GHz | Primario | Aficionado y satélite |
| 76 – 77,5 / 78 – 79 / 79 – 81 GHz | Secundario | Aficionado (y satélite en 76–81) |
| 122,25 – 123 GHz | Secundario | Aficionado |
| 134 – 136 GHz | Primario | Aficionado y satélite |
| 136 – 141 GHz | Secundario | Aficionado y satélite |
| 241 – 248 GHz | Secundario | Aficionado (y satélite) |
| 248 – 250 GHz | Primario | Aficionado y satélite |

> `(*)` = rango modificado por DS 192/2023. La tabla oficial separa algunos tramos y repite estados (p. ej. 3.300–3.400 MHz aparece como primario y secundario). **La fuente autoritativa es el PDF de la Tabla 2025**, no esta transcripción.
>
> **Bandas que NO están en la tabla chilena:** 3.750–4.000 kHz, 1.850–2.000 kHz, 902–928 MHz, 5.150–5.350 MHz. Si tu radio las tiene, no significa que puedas usarlas.

### 4.4 Repetidoras y radiobalizas

Norma: **Res. Ex. 176/2014** (BCN idNorma 1058519).

**Repetidora atendida**
- Amparada por licencia General/Superior o permiso de club; no necesita permiso específico.
- Debe estar en el domicilio autorizado; fuera de él solo en emergencia calificada.
- ID al menos cada 15 minutos con el indicativo del radioaficionado que la controla.
- Potencia máxima a la entrada de la línea: 20 W PEP en HF (1,8–29,7 MHz), 10 W en 50–225 MHz, 5 W en 430–440 MHz, 1 W sobre 1 GHz.
- Plan VHF: entrada 144,5–144,9 MHz, salida 145,2–145,5 MHz; UHF 432–435 MHz; separación 12,5 kHz.

**Repetidora no atendida**
- Solo Círculos, Radio Clubes, asociaciones o federaciones.
- Permiso expreso de Subtel y pago de derechos (0,75 UTM).
- Indicativo asignado; ID automático en voz, Morse o protocolo UIT, ≤ 15 min.
- Autonomía mínima 24 h a plena carga.
- Acceso libre a radioaficionados según su licencia; puede usar silenciamiento analógico/digital con los tonos/códigos del Anexo.
- Potencia máxima: 100 W PEP en HF, 50 W en 50–225 MHz, 10 W en 430–440 MHz, 1 W sobre 1 GHz.
- Armónicas/espurias: >50 dB bajo la salida en HF; >60 dB bajo portadora en VHF/UHF (50 dB en UHF <5 W).
- Estabilidad: ±2,5 ppm entre -30 y 60 °C en VHF/UHF.
- Ganancia de antena: ≤9 dBd en VHF, ≤15 dBi en UHF; enlaces ≤15/18 dBi.
- Subtel asigna frecuencia con radio de protección de 300 km; si no hay disponibilidad, el solicitante instala decodificador de squelch.
- Debe tener control local/remoto para cesar transmisiones y protección que suspenda si la fuente no mantiene espurias/ancho/estabilidad.
- Responsable: un radioaficionado; en instituciones, su presidente. Suspensión o restablecimiento: informar a Subtel en 10 días hábiles.

**Enlaces y internet**
- Enlaces entre repetidoras: solo General/Superior y clubes con repetidora atendida, a petición del responsable de la no atendida, transitorios y bajo control; cesan si lo piden.
- Acceso a una repetidora por internet: permitido para audio entre radioaficionados; no es interconexión con telefonía pública ni navegación.

**Radiobalizas o radiofaros**
- Solo clubes; se consideran repetidoras para el pago de derechos.
- Bandas: 1.800–1.850 kHz; 3.500–3.750 kHz; 7.000–7.050 kHz; 14.099–14.101 kHz; 18.109–18.111 kHz; 21,149–21,151 MHz; 24,929–24,931 MHz; 28,190–28,300 MHz; 50,06–50,08 MHz; 1.296,3–1.296,4 MHz; 3.350–3.351 MHz; 5.760,3–5.760,4 MHz; 10.450–10.500 MHz.
- Una por banda; automáticas.
- Potencia mínima necesaria; máx. 100 W PEP o 50 W continuos HF, 50 W VHF, 10 W UHF, 1 W SHF.
- ID en Morse a 10–15 WPM o digital público, ≤ 1 minuto.
- Emisiones bajo 1.296,3 MHz: A1A, F1B o J2A; sobre esa frecuencia, cualquier tipo; F1B/J2A con desplazamiento ≤1.000 Hz.

**Tonos y códigos:** el Anexo de la Res. 176 es una imagen; la tabla exacta queda `[pendiente]`. Subtel publica además "Tonos Analógicos Asignados por Zonas" (2015), que también hay que verificar antes de programar una repetidora.

---

## 5. Las 10 trampas

### 1. Los bordes de banda no son los de IARU Región 2
Chile termina 80 m en **3.750 kHz** y 160 m en **1.850 kHz**. Un radio importado sintoniza 3.790 sin quejarse. Operar ahí es fuera de banda, aunque "afuera se haga".
**Qué hacer:** conocer los bordes de tu categoría y verificar el dial con un VNA o con la lectura de frecuencia del equipo, no con la memoria.

### 2. PEP no es lo que marca el vatímetro
El límite es **potencia PEP a la entrada de la línea de alimentación**. Un vatímetro promedio mide otra cosa; un vatímetro mal calibrado miente. En SSB la potencia media es una fracción de la PEP.
**Qué hacer:** distinguir PEP, promedio y térmica; medir con dummy load y un instrumento razonablemente calibrado; declarar el supuesto.

### 3. No hay límite de ERP en el reglamento
El reglamento limita potencia conducida, no potencia radiada. Eso no te libera de: interferencia perjudicial (art. 40), exposición RF (remisión del art. 33) y normas técnicas.
**Qué hacer:** usar ganancia de antena es legal, pero la responsabilidad por interferencia y seguridad sigue siendo tuya.

### 4. Novicio no tiene 20, 17, 15 ni 12 metros
El art. 13 lista 3,5 / 7 / 10 / 28 MHz, 50 / 144 / 220 MHz y 430 / 1.270 / 2.400 / 5.650 MHz. Tampoco tiene 160 m ni 60 m.
**Qué hacer:** si eres Novicio, no planees una estación de 20 m. Si eres General, recuerda que heredaste todas las bandas del Superior salvo el art. 9.e.

### 5. Aspirante menor de 15 años: supervisión obligatoria en HF
El art. 15.a exige compañía y supervisión de un Novicio, General o Superior para instalar y operar HF.
**Qué hacer:** planificar la supervisión como parte del diseño, no como trámite.

### 6. Solo los clubes pueden instalar repetidoras no atendidas y radiobalizas
El art. 52 reserva esas estaciones a Círculos, Radio Clubes, asociaciones o federaciones. Un particular sí puede tener una repetidora **atendida** (art. 29: baja potencia, en presencia de un radioaficionado).
**Qué hacer:** no compres un repetidor para "dejarlo en el cerro" sin club y sin norma técnica (Res. 176).

### 7. Terceros, remuneración, música y cifrado
El art. 36 prohíbe usar el servicio para mensajes por recompensa (ni siquiera de emergencia), difundir mensajes contra la moral/orden público, transmitir música y cifrar para ocultar el significado. El art. 38 permite tráfico internacional de terceros **solo** en emergencia o socorro.
**Qué hacer:** si alguien te ofrece pagar por pasar un mensaje, la respuesta es no. Si necesitas confidencialidad, el servicio equivocado es este.

### 8. La renovación tiene dos relojes
90 días antes para pedirla; 12 meses de gracia para volver sin examen. Después, examen de nuevo. Subtel asigna el mismo indicativo si está disponible.
**Qué hacer:** una alerta de calendario a 120 días del vencimiento, no a 30.

### 9. Operar equipo ajeno te obliga a identificarte dos veces
El art. 45 exige anunciar el indicativo de la estación operada seguido del propio. El titular del permiso responde por la correcta operación (arts. 37 y 39).
**Qué hacer:** si prestas tu estación, prestas también tu responsabilidad. Deja el checklist visible.

### 10. El examen es un banco público y la norma vigente no es la que aparece primero
45 minutos, online, preguntas seleccionadas al azar de los Apéndices A–E. Aprobarlo no te hace competente; solo te habilita. Y la norma aplicable es la Res. 2620/2023, no la Res. 765/2007 que aún figura en la página de SUBTEL.
**Qué hacer:** estudiar el banco para aprobar; estudiar este proyecto para operar.

---

## 6. Zonas grises y remisiones

| Tema | Estado | Qué hacer |
|---|---|---|
| **Exposición RF** | El reglamento no fija límites; el art. 33 remite a "otros organismos competentes" | Verificar la norma vigente antes de citar cifras; medir distancias y potencias en el peor caso |
| **Torres y altura** | Fuera del reglamento; puede aplicar normativa municipal/OGUC/DGAC según el caso | Consultar antes de instalar; documentar la consulta |
| **Seguro y responsabilidad civil** | No exigido por el reglamento | Relevante para clubes, repetidoras y emergencia |
| **Permisos internacionales** | Art. 18 remite a convenios vigentes | Verificar país, acuerdo y vigencia antes de operar |
| **Repetidoras** | Res. 176 leída; el Anexo de tonos/códigos es una imagen `[pendiente]` | Verificar tonos y códigos antes de programar; no instalar no atendidas sin club y permiso |
| **Modos digitales** | No prohibidos; el art. 36 prohíbe cifrar para ocultar el significado | Operar dentro de banda; no usar el modo para eludir la prohibición |
| **Operación remota** | No regulada explícitamente | Aplican arts. 37, 39 y 44: responsable e identificación |
| **Estación de club** | El permiso es de la institución; el operador necesita licencia idónea (arts. 20 y 37) | El operador no se escuda en el club |
| **Satélite para Aspirante** | El art. 15 no lo lista; el art. 4 dice que la licencia habilita el servicio | `[verificar]` con SUBTEL antes de operar satélite como Aspirante |

---

## 7. Fiscalización, derechos y sanciones

### 7.1 Derechos (Ley 18.168, art. 32)

| Concepto | Derecho |
|---|---|
| Aspirante | Exento |
| Novicio, General, Superior | 0,30 UTM |
| Instituciones | 0,60 UTM |
| Permiso de estación repetidora | 0,75 UTM |

### 7.2 Fiscalización

- **SUBTEL** es la Administración Chilena de Telecomunicaciones: regula, fiscaliza y dicta normas complementarias (DS 523, art. 55).
- Puede requerir antecedentes e informes y pedir fuerza pública (DS 523, art. 56; Ley 18.168, art. 39 bis).
- Puede requerir colaboración de radio clubes para controlar el uso de bandas (DS 523, art. 57).
- Puede ordenar el cese de transmisiones en calamidad pública o catástrofe (DS 523, art. 42).
- Por interferencia perjudicial, el responsable debe subsanar en el plazo que fije SUBTEL; si no, suspensión temporal o definitiva (DS 523, art. 40).
- **Art. 37 Ley 18.168:** mantener copia autorizada de la licencia o permiso en lugar visible o a disposición de la autoridad.
- **Art. 38:** cada día sin ajustarse a la orden y plazo de SUBTEL es una infracción distinta; los equipos no autorizados caen en comiso.
- **Art. 39:** SUBTEL puede suspender hasta 30 días el servicio si no se subsanan observaciones técnicas; reclamación ante la Corte de Apelaciones dentro de 5 días hábiles.

### 7.3 Sanciones (Título VII, Ley 18.168)

- **Art. 36:** amonestación; multa de **5 a 500 UTM** para concesiones de radiodifusión de libre recepción y de **5 a 5.000 UTM** en los demás casos; la reincidencia puede triplicar el máximo; suspensión de transmisiones hasta por 20 días por reiteración grave; caducidad de la concesión o permiso en los casos a)–i), obligatoria en c), d) y g) (la letra f está derogada).
- **Art. 36 A:** notificación de cargos, **10 días** para descargos, término de prueba si hay hechos controvertidos; apelación ante la **Corte de Apelaciones de Santiago** (caducidad: Corte Suprema), dentro de 10 días.
- **Art. 36 B:** la interferencia maliciosa a un servicio de telecomunicaciones es delito (presidio menor en su grado máximo y comiso); la interceptación de señales de servicios públicos también (presidio menor en su grado medio y multa de 50 a 5.000 UTM). **No es solo una multa administrativa.**
- **DS 523, arts. 58–59:** el Ministro aplica la sanción; notificación, 10 días de descargos, término de prueba y apelación ante la Corte de Apelaciones de Santiago.

**Lo que un ingeniero debe retener:** la sanción no empieza con la multa; empieza con el requerimiento y el plazo. La evidencia (bitácora, mediciones, fotos, horas) es tu defensa. Ignorar un requerimiento convierte un problema técnico en uno administrativo, y cada día cuenta como infracción distinta.

---

## 8. Qué revisar cada año

1. DS 523/2006 y sus modificaciones (BCN idNorma 257890).
2. Res. Ex. 2620/2023 (exámenes) y los Apéndices A–E vigentes.
3. Res. Ex. 1228/2008 y Res. Ex. 175 (distintivos de llamada).
4. Res. Ex. 176/2014 (repetidoras y radiobalizas).
5. Plan General de Uso del Espectro: DS 127/2006 + DS 192/2023 + Tabla de Bandas vigente.
6. Ley 18.168: Título VII (infracciones y sanciones) y art. 32 (derechos).
7. Valor de la UTM (licencia 0,30; instituciones 0,60; repetidora 0,75).
8. Página de Radioaficionados de SUBTEL: calendario, formularios RAF y listados de repetidoras.

---

## 9. Fuentes y estado de verificación

| Norma / documento | Identificador | Fecha | Estado |
|---|---|---|---|
| Ley 18.168, General de Telecomunicaciones | BCN idNorma 29591 | Versión 2026-08-19 | **Leída** (Título VII y art. 32) |
| DS 523/2006 — Reglamento del Servicio de Aficionados | BCN idNorma 257890 | Publicado 27-01-2007; versión 21-06-2013 | **Leído completo** |
| DS 213/2013 — modifica el reglamento | BCN idNorma 1052106 | 21-06-2013 | Leído en la versión consolidada |
| Res. Ex. 2620/2023 — Norma de Exámenes | BCN idNorma 1199351 | 19-12-2023 | **Leída** (arts. 1–8) |
| Res. Ex. 765/2007 — Norma de Exámenes anterior | BCN idNorma 262126 | 26-06-2007 | Derogada por la 2620/2023 |
| Res. Ex. 1228/2008 — Distintivos de llamada | BCN idNorma 280338 | Texto consolidado 2014-01-23 | **Leída** |
| Res. Ex. 175 — modifica distintivos | BCN idNorma 1058518 | 23-01-2014 | **Leída** en la versión consolidada |
| Res. Ex. 176/2014 — Repetidoras y radiobalizas | BCN idNorma 1058519 | 23-01-2014 | **Leída** |
| Plan General de Uso del Espectro | DS 127/2006, mod. DS 192/2023 | 25-04-2023 | Citado vía Tabla 2025 |
| Tabla de Bandas para Radioaficionados 2025 | SUBTEL (PDF) | 2025 | **Leída** (transcripción) |
| Página Servicios de Radioaficionados | subtel.gob.cl | Consultada 2026-11-11 | Usada para trámites, valores y formularios |
| Apéndices A–E (bancos de preguntas) | SUBTEL (PDF) | 2020 | **Leídos encabezados, conteos y estructura**; no todas las preguntas |
| Tonos analógicos asignados por zonas | SUBTEL (PDF) | 2015 | `[pendiente de lectura]` |

**Advertencia de vigencia:** este digesto es una foto. La norma cambia por decreto y por resolución. Antes de una decisión con consecuencias legales, leer la fuente primaria y anotar fecha de consulta.
