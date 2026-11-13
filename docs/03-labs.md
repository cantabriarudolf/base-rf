# 03 — Laboratorio: 10 prácticas con evidencia

**Regla del laboratorio:** primero se predice, después se mide. Si mides antes de predecir, no aprendes: confirmas.

Cada práctica se registra en una ficha de una página:

```
Lab:            (número y nombre)
Fecha / hora:
Pregunta:
Predicción:     (número, unidad, supuesto)
Montaje:        (foto o diagrama)
Medición:       (tabla)
Desvío:         (medido − predicho)
Explicación:    (por qué falló la predicción)
Trampa:         (qué me habría engañado)
```

---

## 0. Materiales mínimos

| Equipo | Para qué | Costo aproximado |
|---|---|---|
| Handheld VHF/UHF (2 m / 70 cm) | Operar, repetidoras, medir potencia relativa | Variable |
| NanoVNA (o VNA equivalente) | ROE, pérdida de retorno, resonancia, TDR | USD 50–70 |
| Dummy load 50 Ω | Referencia de 1:1 y medición de potencia | USD 20 |
| Vatímetro / medidor de potencia | Potencia directa y reflejada | USD 30–60 |
| Multímetro | Continuidad, tensión, corriente | USD 20 |
| Coax + conectores | Cadena real | USD 30 |
| SDR (RTL-SDR o similar) | Espectro, piso de ruido, caza de interferencia | USD 30 |
| Fuente de alimentación | Reproducible | Variable |

**Total mínimo razonable:** USD 150–200, sin contar el radio. Se puede empezar con menos: los labs 0, 4 y 7 no requieren instrumentos.

---

## 1. Lab 0 — Auditoría legal de tu estación (2 h)

**Pregunta:** ¿puedo operar legalmente hoy, con lo que tengo, donde estoy?

**Predicción:** "creo que sí" no es respuesta. Escribe qué categoría tienes, qué bandas y potencias te corresponden y qué te falta.

**Procedimiento:**
1. Llenar la matriz de categoría (documento 01, §3) con tus datos reales.
2. Verificar que cada banda de tu radio esté en la Tabla 2025 y en tu categoría.
3. Verificar potencia máxima por banda y tipo de estación (fija/móvil).
4. Verificar vigencia de licencia y permiso; anotar fecha de vencimiento y alerta a 120 días.
5. Revisar prohibiciones: música, cifrado, terceros, remuneración.
6. Listar lo que no sabes y la fuente para resolverlo.

**Evidencia:** matriz completa + lista de brechas con fecha.

**Criterio:** 0 bandas no autorizadas; 0 potencias fuera de límite; alerta de vencimiento creada.

**Trampa:** confundir "el radio lo permite" con "la norma lo permite".

---

## 2. Lab 1 — La cadena RF y la ROE (3 h)

**Pregunta:** ¿qué me dice realmente la ROE y qué me oculta?

**Predicción:** antes de medir, estima la ROE de: dummy load, antena, cable abierto, cable en corto.

**Procedimiento:**
1. Calibrar el VNA (open / short / load).
2. Medir ROE y pérdida de retorno de: dummy load, antena, extremo abierto, extremo en corto.
3. Calcular Γ y pérdida de retorno a partir de la ROE: `Γ = (ROE−1)/(ROE+1)`, `RL = −20·log10(Γ)`.
4. Medir el mismo cable con y sin antena; comparar.
5. Repetir en 3 frecuencias dentro de la banda.

**Evidencia:** tabla frecuencia / ROE / RL / Γ / interpretación.

**Criterio:** explicar por qué una ROE de 1:1 puede ser un dummy load (y no una buena antena) y por qué una ROE alta no siempre significa antena mala (puede ser cable o conector).

**Trampa:** creer que ROE baja = antena eficiente. La ROE mide desadaptación, no ganancia ni patrón.

---

## 3. Lab 2 — Potencia real en la antena (2 h)

**Pregunta:** de los vatios que declara el radio, ¿cuántos llegan a la antena?

**Predicción:** con 100 W y una ROE de 2:1, ¿cuánto se refleja y cuánto se entrega?

**Procedimiento:**
1. Medir potencia directa y reflejada con dummy load (referencia).
2. Medir con la antena real en 3 frecuencias.
3. Calcular `P entregada = P directa − P reflejada`.
4. Calcular la pérdida del cable con el VNA y comparar.
5. Repetir con 5 W, 25 W y 100 W para ver si el medidor es lineal.

**Evidencia:** tabla potencia declarada / directa / reflejada / entregada / pérdida de cable.

**Criterio:** identificar al menos una fuente de error (medidor, cable, calibración, potencia no PEP).

**Trampa:** medir PEP con un vatímetro promedio y creer que el radio "no da lo que dice".

---

## 4. Lab 3 — Dipolo de 2 m (4 h)

**Pregunta:** ¿puedo construir una antena que resuene donde quiero y demostrarlo?

**Predicción:** longitud total ≈ `143 / f(MHz)` metros; para 144 MHz, ≈ 0,99 m (cada brazo ≈ 0,50 m). ¿En qué frecuencia crees que resonará?

**Procedimiento:**
1. Cortar dos brazos un 5% más largos que la predicción.
2. Montar en horizontal, a una altura conocida, lejos de objetos metálicos.
3. Medir resonancia (mínima ROE) con VNA.
4. Recortar simétricamente y volver a medir; registrar frecuencia de resonancia y ancho de banda (ROE < 2:1).
5. Cambiar la altura y medir de nuevo; explicar el efecto.
6. Comparar con una vertical o con la antena del handheld.

**Evidencia:** tabla longitud / frecuencia de resonancia / ancho de banda / altura.

**Criterio:** resonancia dentro del 2% de la frecuencia objetivo; explicar el efecto de la altura y del entorno.

**Trampa:** medir con la antena cerca del cuerpo, del suelo o de una pared metálica y creer que el resultado es el de la antena.

---

## 5. Lab 4 — Presupuesto de enlace (2 h papel + 1 h campo)

**Pregunta:** ¿a qué distancia puedo comunicar con lo que tengo, y por qué?

**Predicción:** calcular antes de salir.

```
P recibida (dBm) = P tx (dBm) − L cable tx + G antena tx
                   − FSPL + G antena rx − L cable rx
FSPL (dB) = 32,44 + 20·log10(f MHz) + 20·log10(d km)
```

Ejemplo a 144 MHz, 10 km: FSPL ≈ 95,6 dB. Con 5 W (37 dBm), 0 dBi, 3 dB de cable por lado:
`37 − 3 + 0 − 95,6 + 0 − 3 = −64,6 dBm`. Sensibilidad típica: −120 dBm. Margen ≈ 55 dB.

**Procedimiento:**
1. Calcular el enlace para 5, 10 y 30 km.
2. Salir a terreno y probar en 3 puntos con línea de vista y 3 sin ella.
3. Registrar potencia, ROE, altura, obstáculos y resultado.
4. Comparar medido vs predicho; explicar el desvío (terreno, Fresnel, ruido, polarización).

**Evidencia:** planilla de cálculo + bitácora de campo + foto del perfil.

**Criterio:** el 80% de los puntos debe caer dentro de ±10 dB de la predicción; los que no, con explicación física.

**Trampa:** comparar potencias sin considerar antenas, altura y terreno. 3 dB de potencia no compensan 30 dB de obstáculo.

---

## 6. Lab 5 — Caza de ruido (3 h)

**Pregunta:** ¿de dónde viene el ruido que me tapa las señales débiles?

**Predicción:** antes de medir, apuesta a la fuente (fuente switching, LED, Ethernet, inversor solar, cargador).

**Procedimiento:**
1. Medir el piso de ruido en una banda con la antena conectada y desconectada (dummy load).
2. Apagar circuitos selectivamente; registrar el cambio en dB.
3. Identificar la fuente dominante.
4. Instalar un choke de modo común (ferrita) en el cable de antena y medir de nuevo.
5. Repetir con el cable de alimentación y con el de red.

**Evidencia:** tabla fuente / piso antes / piso después / diferencia en dB.

**Criterio:** reducir al menos 6 dB el ruido dominante y explicar si era conducido o radiado.

**Trampa:** culpar al vecino antes de medir tu propia casa. La mayoría del ruido urbano es local.

---

## 7. Lab 6 — Propagación HF (2 h + 24 h)

**Pregunta:** ¿puedo predecir si una banda abrirá a una hora y distancia dadas?

**Predicción:** usar un predictor (VOACAP o similar) para 3 bandas, 2 horas y 2 destinos. Anotar MUF estimada y probabilidad.

**Procedimiento:**
1. Registrar la predicción.
2. Escuchar o transmitir en las bandas elegidas en las horas elegidas.
3. Verificar con spots de WSPR/FT8 o con el log de contactos.
4. Comparar aciertos y errores.
5. Repetir al día siguiente con el ciclo solar como variable de contexto.

**Evidencia:** tabla banda / hora / destino / predicho / observado / explicación.

**Criterio:** explicar al menos un acierto y un error con un mecanismo físico (ángulo, absorción, MUF, capa).

**Trampa:** confundir "hoy no abrió" con "la banda no sirve". La HF es hora, ángulo y ciclo solar.

---

## 8. Lab 7 — Red de emergencia (3 h)

**Pregunta:** ¿puedo operar una red con 4 estaciones, mensajes priorizados y bitácora, sin caos?

**Predicción:** estima cuántos mensajes alcanzas a cursar en 30 minutos con 4 estaciones.

**Procedimiento:**
1. Definir 4 roles: control, estación de campo, estación de enlace, registro.
2. Usar un formato de mensaje: precedencia (emergencia / prioridad / rutina), origen, destino, hora, texto, acuse.
3. Operar 30 minutos con tráfico simulado (incluyendo un mensaje mal escrito a propósito).
4. Cerrar la red y hacer after-action review: qué se perdió, qué se repitió, qué se omitió.
5. Repetir con una falla inyectada (pérdida de la estación de enlace).

**Evidencia:** bitácora + audio si es posible + AAR de 1 página.

**Criterio:** 0 mensajes perdidos sin acuse; 100% de los mensajes con precedencia y hora; AAR con 3 mejoras concretas.

**Trampa:** improvisar. La red de emergencia se falla por procedimiento, no por potencia.

---

## 9. Lab 8 — Inyección de fallas (2 h)

**Pregunta:** ¿puedo aislar una falla en menos de 30 minutos sin cambiar piezas al azar?

**Procedimiento:** un compañero inyecta 5 fallas, una a la vez, sin decir cuál:
1. Conector mal crimpado (intermitente).
2. Coax con cortocircuito.
3. Antena cortada para otra banda.
4. Lazo de tierra (ruido o audio distorsionado).
5. Repetidora con offset o tono incorrecto.

**Método esperado:** árbol de diagnóstico, no prueba y error.

```
¿Enciende? → ¿Transmite a dummy load? → ¿ROE? → ¿Potencia?
→ ¿Recibe? → ¿Con antena? → ¿Con otra antena? → ¿Con otro cable?
→ ¿Con otra radio? → ¿Con otra fuente?
```

**Evidencia:** tabla falla / tiempo de aislamiento / método / pieza reemplazada (si aplica).

**Criterio:** 5/5 en < 30 minutos; 0 piezas cambiadas sin diagnóstico.

**Trampa:** empezar por el equipo más caro. El 80% de las fallas está en conectores, cable, alimentación y configuración.

---

## 10. Lab 9 — QSO completo en Morse (QSO CERO + aire)

**Pregunta:** ¿puedo sostener un contacto completo en Morse, sin guía, sin inventar y sin pedir ayuda en cada palabra?

**Predicción:** antes de empezar, estima cuántos días necesitas para copiar tu indicativo y la secuencia `CQ ... K` sin mirar. Anota el número.

**Procedimiento:**
1. Abre `game/index.html` y haz **10 minutos diarios** durante 10 días. Registra fecha, nivel, WPM y puntajes.
2. Empieza con guía; apágala cuando copies ≥ 90% en el nivel actual.
3. Sube WPM solo cuando la copia se mantenga ≥ 90% durante dos sesiones seguidas.
4. Completa el **Primer QSO** de 6 pasos sin guía. Si fallas, la estación repite más lento: eso también es parte del ejercicio.
5. Haz un contacto real (o un simulacro con otra persona en 2 m/70 cm) usando el mismo guion: `CQ` → respuesta → `RST 5NN` → `QTH`/`NAME` → `73 SK`.
6. Registra el contacto en la bitácora: hora, frecuencia, indicativo, RST recibido, RST enviado, notas.

**Evidencia:** captura de los cuatro puntajes + bitácora de 10 sesiones + log del contacto + una reflexión de 5 líneas (qué te costó, qué pediste repetir, qué harías distinto).

**Criterio:** QSO de 6 pasos completo sin guía; copia ≥ 80%; 10 sesiones registradas; un contacto real o simulado con log y ambos indicativos.

**Trampa:** confundir el juego con el aire. El juego mide timing y procedimiento; el aire mide propagación, ruido, paciencia y criterio. También es trampa subir WPM antes de copiar: la velocidad sin copia es teatro.
