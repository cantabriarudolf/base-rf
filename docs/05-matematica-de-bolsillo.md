# 05 — Matemática de bolsillo

Todo lo que sigue se calcula mentalmente o en una servilleta. Si necesitas una hoja de cálculo para una decisión de campo, el modelo está mal elegido.

---

## 1. Potencia y dB

```
P(dBm) = 10 · log10( P(mW) )
P(mW)  = 10^( P(dBm) / 10 )
```

| Potencia | dBm |
|---|---|
| 1 mW | 0 |
| 100 mW | 20 |
| 500 mW | 27 |
| 1 W | 30 |
| 5 W | 37 |
| 10 W | 40 |
| 25 W | 44 |
| 50 W | 47 |
| 100 W | 50 |
| 1.000 W | 60 |

**Reglas de oro:**

- **+3 dB = ×2** potencia. **−3 dB = ÷2**.
- **+10 dB = ×10**. **+20 dB = ×100**.
- Duplicar potencia **no** duplica alcance: en espacio libre, +6 dB duplica distancia.
- Un S-unit típico son **6 dB**. Pasar de 100 W a 200 W es **medio S-unit**: casi invisible.

---

## 2. Pérdidas, ganancias y potencia entregada

```
Potencia en la antena (dBm) = P tx (dBm) − pérdidas de cable (dB)
EIRP (dBm) = P tx (dBm) − L cable (dB) + G antena (dBi)
ERP (dBm)  = EIRP (dBm) − 2,15 dB        (referida a dipolo)
```

Las pérdidas y ganancias se **suman en dB**, no se multiplican.

| Caso | Cálculo | Resultado |
|---|---|---|
| 100 W, cable −3 dB | 50 dBm − 3 dB | 47 dBm = **50 W** |
| 100 W, cable −6 dB | 50 dBm − 6 dB | 44 dBm = **25 W** |
| 5 W, cable −3 dB, antena +3 dBi | 37 − 3 + 3 | 37 dBm EIRP = **5 W EIRP** |
| 100 W, cable −3 dB, antena +6 dBi | 50 − 3 + 6 | 53 dBm EIRP ≈ **200 W EIRP** |

**Consecuencia:** la antena y el cable importan más que el radio. 6 dB de ganancia bien puestos valen cuatro veces la potencia.

---

## 3. ROE y pérdida de retorno

```
Γ   = (ROE − 1) / (ROE + 1)
RL  = −20 · log10(Γ)                  [dB]
Pérdida por desadaptación = −10 · log10(1 − Γ²)   [dB]
```

| ROE | Γ | Pérdida de retorno | Pérdida por desadaptación |
|---|---|---|---|
| 1,0:1 | 0 | ∞ | 0 dB |
| 1,5:1 | 0,20 | 14,0 dB | 0,18 dB |
| 2,0:1 | 0,33 | 9,5 dB | 0,51 dB |
| 3,0:1 | 0,50 | 6,0 dB | 1,25 dB |
| 5,0:1 | 0,67 | 3,5 dB | 2,55 dB |

**Lectura:** una ROE de 2:1 cuesta **medio dB**. El problema no es la ROE: es lo que la causa (antena cortada, cable malo, conector con agua). No persigas 1,0:1; persigue entender por qué no lo es.

---

## 4. Presupuesto de enlace

```
P recibida (dBm) = P tx (dBm)
                 − L cable tx (dB)
                 + G antena tx (dBi)
                 − FSPL (dB)
                 + G antena rx (dBi)
                 − L cable rx (dB)

Margen (dB) = P recibida − sensibilidad del receptor
```

```
FSPL (dB) = 32,44 + 20·log10( f MHz ) + 20·log10( d km )
```

| Enlace | FSPL |
|---|---|
| 144 MHz, 10 km | 95,6 dB |
| 144 MHz, 50 km | 109,6 dB |
| 430 MHz, 10 km | 105,1 dB |
| 7 MHz, 1.000 km | 169,3 dB |

**Ejemplo completo (2 m, 10 km):**

```
37 dBm (5 W) − 3 dB + 0 dBi − 95,6 dB + 0 dBi − 3 dB = −64,6 dBm
Sensibilidad ≈ −122 dBm  →  margen ≈ 57 dB
```

**Interpretación:** sobra margen. Si no hay contacto, el problema no es la potencia: es el terreno, la altura, la polarización, el ruido o el otro extremo.

**Regla:** cada vez que duplicas distancia, pierdes **6 dB**. Cada obstáculo puede costar **10–30 dB**. La potencia es el recurso más caro y el que menos cambia el resultado.

---

## 5. Zona de Fresnel

```
F1 (m) = 17,32 · sqrt( d1(km) · d2(km) / ( f(GHz) · d(km) ) )
```

| Enlace | F1 en el punto medio | 60% de F1 |
|---|---|---|
| 144 MHz, 10 km | 72 m | 43 m |
| 144 MHz, 50 km | 161 m | 97 m |
| 430 MHz, 10 km | 42 m | 25 m |

**Regla:** necesitas despejar al menos el **60% de la primera zona de Fresnel**. Si no, la atenuación por difracción se come el margen.

---

## 6. Ruido y sensibilidad

```
Piso de ruido térmico (dBm) = −174 + 10·log10( ancho de banda Hz )
Piso con receptor         = −174 + 10·log10( BW ) + NF
Señal mínima              = piso + SNR mínima
```

| Ancho de banda | Piso térmico | Con NF = 8 dB |
|---|---|---|
| 2,4 kHz (SSB) | −140,2 dBm | −132,2 dBm |
| 15 kHz (FM) | −132,2 dBm | −124,2 dBm |
| 500 Hz (CW) | −147,0 dBm | −139,0 dBm |

**Ejemplo:** SSB, 2,4 kHz, NF 8 dB, SNR 10 dB → sensibilidad ≈ **−122 dBm**.

**Consecuencia:** el ancho de banda es una palanca de 10 dB o más. Un receptor angosto bien diseñado vence a un transmisor potente.

---

## 7. Antenas: longitudes y ganancia

```
Longitud de onda (m) = 300 / f(MHz)
Dipolo de media onda (m) ≈ 143 / f(MHz)     (hilo delgado, en espacio libre)
```

| Banda | λ | Dipolo ≈ |
|---|---|---|
| 80 m (3,65 MHz) | 82 m | 39 m |
| 40 m (7,1 MHz) | 42 m | 20 m |
| 10 m (28,5 MHz) | 10,5 m | 5,0 m |
| 6 m (50 MHz) | 6,0 m | 2,9 m |
| 2 m (144 MHz) | 2,08 m | 0,99 m |
| 70 cm (430 MHz) | 0,70 m | 0,33 m |

**Ganancia:** +3 dB = ×2 en potencia. Una antena de +6 dBi no "tiene más watts": concentra la energía en un ángulo. Si apuntas mal, pierdes más de lo que ganas.

---

## 8. PEP, promedio y térmica

```
PEP        = potencia pico de la envolvente
P promedio = PEP × ciclo de trabajo
P térmica  = la que calienta el equipo (diseño, ventilación, fusibles)
```

| Modo | Ciclo de trabajo típico | Comentario |
|---|---|---|
| FM / portadora continua | 100% | El caso más exigente para la fuente y el disipador |
| SSB (voz) | 20–30% | El vatímetro promedio marca mucho menos que la PEP |
| CW | 40–50% | Depende de la velocidad de manipulación |
| FT8 | ~80% | Ráfagas largas; no es "bajo consumo" |

**Regla:** el límite legal es PEP; el diseño térmico y la fuente se dimensionan con el promedio y el peor caso.

---

## 9. Conversión rápida dBm ↔ dBµV (50 Ω)

```
P(dBm) = V(dBµV) − 107
V(dBµV) = P(dBm) + 107
```

Sirve para leer especificaciones de receptores en µV: **0 dBµV = 1 µV en 50 Ω ≈ −107 dBm**.

---

## 10. Las cinco cuentas que debes poder hacer sin papel

1. **Potencia a la antena:** 100 W con 3 dB de pérdida → 50 W.
2. **Ganancia de duplicar:** +3 dB; medio S-unit.
3. **Espacio libre a 10 km en 2 m:** ~96 dB.
4. **Piso de ruido en 2,4 kHz:** ~−140 dBm antes del receptor.
5. **Dipolo de 2 m:** ~1 m total, ~0,5 m por brazo.
