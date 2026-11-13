# 02 — Mapa de competencias

El mapa responde dos preguntas: **¿en qué nivel estoy?** y **¿qué evidencia demuestra que subí?** Sin evidencia, el nivel es una opinión.

---

## 1. Los seis ejes

| Eje | Qué cubre | Por qué importa |
|---|---|---|
| **A. Normativo-administrativo** | Licencia, permiso, bandas, potencias, identificación, prohibiciones, renovación, sanciones | Define el espacio legal de operación y tu exposición |
| **B. Estación (RF y hardware)** | Cadena RF, cable, conectores, ROE, balun, tierra, filtros, alimentación, térmica | Es donde se pierde la mayor cantidad de potencia y de dinero |
| **C. Propagación** | HF (ionosfera, MUF, ciclo solar), VHF/UHF (línea de vista, Fresnel, terreno), ruido | Explica por qué "no llega" sin culpar al radio |
| **D. Medición** | VNA, vatímetro, dummy load, SDR/espectro, piso de ruido, diagnóstico | Convierte opiniones en evidencia |
| **E. Operación** | Fonética, Q, redes, emergencia, tráfico de terceros, log, satélite, digital | Es lo que se ve cuando hay testigos |
| **F. Seguridad y responsabilidad** | Exposición RF, eléctrica, torres, rayos, interferencia, seguro, ética | Es lo que te puede costar caro o salvar a alguien |

---

## 2. Los cuatro niveles

| Nivel | Nombre | Definición operativa |
|---|---|---|
| **N0** | Literario | Explica la norma básica, distingue lo permitido de lo prohibido y no transmite a ciegas |
| **N1** | Operador competente | Opera dentro de su categoría, se identifica, usa repetidoras, registra y no causa interferencia evitable |
| **N2** | Ingeniero de estación | Diseña, instala, mide, diagnostica y **predice con ±3 dB**; documenta y defiende sus decisiones |
| **N3** | Referente | Audita, enseña, perita, opera en emergencia y responde ante la autoridad con evidencia |

---

## 3. Descriptores por eje y nivel

### A. Normativo-administrativo

| Nivel | Descriptor | Evidencia |
|---|---|---|
| N0 | Sabe que necesita licencia, que hay bandas y potencias, y que debe identificarse | Prueba escrita 12/12 + explica el examen (30 preguntas, 45 min) y el distintivo (prefijo + zona + sufijo) |
| N1 | Cumple identificación, potencias, bandas de su categoría y renovación | Bitácora de 20 contactos sin hallazgos; usa `/zona` y `móvil` cuando corresponde |
| N2 | Diseña una estación que cumple la norma; lee el Plan y la Tabla; tramita permisos | Estación auditada + formularios RAF correctos; distingue repetidora atendida/no atendida |
| N3 | Audita a otros, interpreta normas complementarias y prepara defensa ante un requerimiento | Informe de auditoría + simulación de descargos |

### B. Estación (RF y hardware)

| Nivel | Descriptor | Evidencia |
|---|---|---|
| N0 | Distingue radio, fuente, cable y antena; sabe que la ROE existe | Explica la cadena RF en 2 minutos |
| N1 | Instala y verifica una estación simple; conectores, dummy load, ROE, tierra básica | Lab 1 y 2 aprobados |
| N2 | Diseña la cadena, calcula pérdidas, elige cable/conectores, balun/choke y protección | Lab 3 y 4 + presupuesto de enlace defendido |
| N3 | Diagnostica intermodulación, ruido y EMC; diseña sitio; perita instalaciones | Lab 5 y 8 + informe de peritaje |

### C. Propagación

| Nivel | Descriptor | Evidencia |
|---|---|---|
| N0 | Sabe que HF y VHF se comportan distinto | Explica por qué 2 m no cruza una cordillera |
| N1 | Elige banda y hora; entiende línea de vista; reconoce propagación anómala | Log con bandas y horas justificadas |
| N2 | Predice MUF y alcance; calcula Fresnel; evalúa terreno y ruido | Lab 4 y 6 con desvío explicado |
| N3 | Modela, valida con spots y planifica enlaces críticos | Predicción vs realidad en 3 escenarios |

### D. Medición

| Nivel | Descriptor | Evidencia |
|---|---|---|
| N0 | Sabe que el S-meter no es un instrumento de laboratorio | Explica sus límites |
| N1 | Usa vatímetro, dummy load y ROE; registra | Lab 2 con tabla de mediciones |
| N2 | Usa VNA, TDR, espectro (SDR) y piso de ruido; mide sensibilidad | Lab 1, 5 y 8 |
| N3 | Caracteriza receptor/transmisor, mide EMC y diseña banco de pruebas | Informe técnico con incertidumbre |

### E. Operación

| Nivel | Descriptor | Evidencia |
|---|---|---|
| N0 | Fonética, indicativo, no interrumpir | Simulacro de 10 minutos + QSO CERO nivel 1–2 |
| N1 | Contactos, repetidoras, Q, log y nets | 20 contactos + 1 net + QSO CERO niveles 3–4 |
| N2 | Control de red, emergencia, tráfico formal, satélite/digital | Lab 7 + QSO CERO QSO completo sin guía |
| N3 | Instruye, audita procedimientos y coordina emergencia | Rol de net control en ejercicio real |

### F. Seguridad y responsabilidad

| Nivel | Descriptor | Evidencia |
|---|---|---|
| N0 | Sabe que la electricidad y la RF pueden matar o dañar | Explica riesgos básicos |
| N1 | Fusibles, tierra, distancias, no tocar antenas energizadas | Checklist de seguridad firmado |
| N2 | Evalúa exposición RF, protección de rayos, torres y responsabilidad civil | Auditoría anual completa |
| N3 | Plan de seguridad, análisis de riesgo y respuesta a incidentes | Plan escrito + simulacro |

---

## 4. La prueba NQH

Doce preguntas orales, sin apuntes, con respuesta defendible. No se evalúa memorizar: se evalúa **cómo respondes y qué haces cuando no sabes**.

| # | Pregunta | Respuesta defendible |
|---|---|---|
| 1 | Tienes 100 W y 3 dB de pérdida en el cable. ¿Cuánto llega a la antena? | 50 W (3 dB = mitad de potencia) |
| 2 | ¿Cuánto mejora duplicar la potencia? | 3 dB; medio S-unit (6 dB por S-unit). Casi imperceptible |
| 3 | ¿Dónde termina la banda de 80 m en Chile? | 3.750 kHz; 3.750–4.000 no está autorizada |
| 4 | ¿Puede un Novicio operar 20 m? | No. Art. 13: 3,5 / 7 / 10 / 28 MHz, 50 / 144 / 220, 430 / 1.270 / 2.400 / 5.650 |
| 5 | ¿Potencia máxima de un General en HF fija? | 1.200 W PEP a la entrada de la línea de alimentación |
| 6 | ¿Cuándo debes identificarte? | Al inicio, al final y cada ≤ 15 minutos (art. 44) |
| 7 | Interfieres al vecino. ¿Qué obliga la ley? | Art. 40: subsanar en el plazo que fije SUBTEL; si no, suspensión |
| 8 | El repetidor te escucha. ¿Está todo bien? | No: prueba el uplink. El downlink y el receptor del otro extremo son otra cosa |
| 9 | PEP vs potencia promedio | PEP es el pico de la envolvente; el promedio depende del ciclo de trabajo. El límite es PEP |
| 10 | Piso de ruido térmico en 2,4 kHz | ≈ −140 dBm antes del factor de ruido (−174 dBm/Hz + 34 dB) |
| 11 | ¿Qué bandas de IARU R2 no están en Chile? | 3.750–4.000 kHz, 1.850–2.000 kHz, 902–928 MHz, entre otras |
| 12 | ¿Qué te habilita el examen? | Operar dentro de tu categoría. No te hace competente ni te cubre en el exterior sin permiso |

**Regla de oro:** si no sabes el número, di cómo lo averiguas en 5 minutos y qué fuente usarías. Eso también es competencia.

---

## 5. Las 10 cosas que un operador no sabe hacer (y un ingeniero sí)

1. Convertir potencia a dBm y sumar ganancias y pérdidas sin calculadora.
2. Calcular espacio libre y zona de Fresnel para decidir si un enlace es viable.
3. Distinguir PEP, promedio y límite térmico, y explicar cuál aplica.
4. Medir un cable con VNA y leer pérdida de retorno, no solo ROE.
5. Detectar corriente de modo común y resolverla con choke/balun.
6. Predecir cobertura desde el terreno en vez de desde el folleto.
7. Distinguir un armónico de una intermodulación.
8. Diseñar puesta a tierra y protección contra rayos.
9. Leer un espectro e identificar el piso de ruido y las señales propias.
10. Escribir un presupuesto de enlace y defenderlo con mediciones.

---

## 6. Cómo se evalúa

| Componente | Peso | Instrumento |
|---|---|---|
| Laboratorio | 40% | Evidencia de los 10 labs (predicción, medición, desvío) |
| Prueba oral NQH | 30% | 12 preguntas, sin apuntes, con repregunta |
| Auditoría de estación | 20% | Checklist anual + foto + mediciones |
| Bitácora | 10% | Registro fechado y consistente |

**Instrumento del eje E:** QSO CERO. El certificado de puntajes (o captura) cuenta como evidencia del Lab 9, no como reemplazo del contacto real. Un QSO de 6 pasos completado sin guía equivale a N2 en operación; con guía, a N1.

**Aprueba el nivel** quien acumula ≥ 80% y no tiene ningún hallazgo crítico de seguridad. Un hallazgo crítico (sin tierra, sin fusible, sin protección de rayos, exposición RF) invalida el nivel hasta corregirse.
