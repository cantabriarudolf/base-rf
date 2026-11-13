/* QSO CERO — datos del currículo. Sin dependencias. */
(function (root) {
  "use strict";

  const survival = [
    { token: "CQ", meaning: "Llamada general. Busco a cualquier estación." },
    { token: "DE", meaning: "De. Separa a quién llamo de quién soy." },
    { token: "K", meaning: "Adelante. Invito a transmitir." },
    { token: "KN", meaning: "Solo la estación nombrada puede responder." },
    { token: "R", meaning: "Recibido." },
    { token: "AGN", meaning: "De nuevo. Repite, por favor." },
    { token: "QRS", meaning: "Más lento, por favor." },
    { token: "QRQ", meaning: "Más rápido." },
    { token: "QRM", meaning: "Interferencia de otras estaciones." },
    { token: "QRN", meaning: "Ruido atmosférico." },
    { token: "QSB", meaning: "Desvanecimiento de la señal." },
    { token: "QSY", meaning: "Cambio de frecuencia." },
    { token: "QRT", meaning: "Ceso transmisiones." },
    { token: "QRZ", meaning: "¿Quién me llama?" },
    { token: "QTH", meaning: "Ubicación." },
    { token: "QSL", meaning: "Acuse de recibo." },
    { token: "RST", meaning: "Legibilidad, intensidad, tono." },
    { token: "5NN", meaning: "599 abreviado: señal perfecta." },
    { token: "73", meaning: "Saludos cordiales." },
    { token: "TU", meaning: "Gracias." },
    { token: "PSE", meaning: "Por favor." },
    { token: "RPT", meaning: "Repite." },
    { token: "AR", meaning: "Fin del mensaje." },
    { token: "SK", meaning: "Fin del contacto." },
    { token: "BT", meaning: "Separador entre bloques." },
    { token: "AS", meaning: "Espera." }
  ];

  const levels = [
    {
      id: "identidad",
      name: "Identidad",
      desc: "Tu indicativo es lo único que no puedes olvidar.",
      items: ["{call}", "{call} DE {call}", "DE", "K"]
    },
    {
      id: "llamada",
      name: "Llamada",
      desc: "La secuencia para buscar contacto.",
      items: [
        "CQ CQ CQ DE {call} {call} K",
        "CQ DE {call} K",
        "{station} DE {call} {call} K"
      ]
    },
    {
      id: "reporte",
      name: "Reporte",
      desc: "Lo mínimo para que el otro sepa que lo escuchaste.",
      items: ["RST 5NN", "QTH {qth}", "NAME {name}", "R 73 SK"]
    },
    {
      id: "supervivencia",
      name: "Supervivencia",
      desc: "Las palabras que te salvan cuando la señal no alcanza.",
      items: ["AGN", "QRS", "QRM", "QSB", "PSE RPT", "QSY"]
    },
    {
      id: "qso",
      name: "QSO",
      desc: "El contacto completo, de CQ a SK.",
      items: [
        "{station} DE {call} R RST 5NN QTH SANTIAGO K",
        "{call} DE {station} R 73 SK"
      ]
    }
  ];

  const stations = ["CE2ABC", "CA3XYZ", "XQ1K", "CE4LM", "CD2N", "CE6RAD"];

  const koch = ["K","M","R","S","U","A","P","T","L","O","W","I",".","N","J","E","F","0","Y",",","V","G","5","/","Q","9","Z","H","3","8","B","?","4","2","7","C","1","D","6","X"];

  const kochLevels = [];
  for (let i = 0; i < koch.length; i += 5) {
    kochLevels.push(koch.slice(i, i + 5));
  }

  const qso = {
    steps: [
      {
        from: "station",
        text: "CQ CQ CQ DE {station} {station} K",
        label: "Llamada general"
      },
      {
        from: "you",
        expect: "{station} DE {call} {call} K",
        hint: "Su indicativo, DE, el tuyo, K. Sin apuro: primero la identidad."
      },
      {
        from: "station",
        text: "{call} DE {station} R RST 5NN 5NN QTH SAN BERNARDO NAME JUAN K",
        label: "Reporte"
      },
      {
        from: "you",
        expect: "R RST 5NN QTH {qth} NAME {name} K",
        hint: "Acusa con R, repite 5NN, entrega tu QTH y tu nombre, cierra con K."
      },
      {
        from: "station",
        text: "R 73 SK",
        label: "Cierre"
      },
      {
        from: "you",
        expect: "73 SK",
        hint: "Cierra con 73 SK. El SK es un prosigno: sin pausa entre S y K."
      }
    ]
  };

  const prosignTips = [
    {
      token: "SK",
      text: "SK no es S y K con pausa: es un solo carácter, ...-.-"
    },
    {
      token: "AR",
      text: "AR cierra el mensaje: .-.-."
    },
    {
      token: "BT",
      text: "BT separa bloques: -...-"
    },
    {
      token: "KN",
      text: "KN invita a responder solo a la estación nombrada: -.--."
    }
  ];

  root.CURRICULUM = {
    survival: survival,
    levels: levels,
    stations: stations,
    qso: qso,
    prosignTips: prosignTips,
    koch: koch,
    kochLevels: kochLevels
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
