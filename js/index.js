// Función para obtener y validar el valor de la variable para continuidad de los cálculos
function validaResp() {
  let resp = prompt("Desea calcular un Indice de Masa Corporal (IMC) S/N?");
  while (resp !== null && resp.toUpperCase() !== "S" && resp.toUpperCase() !== "N") {
    resp = prompt(
      "Introduzca un valor válido.\n\nDesea calcular un Indice de Masa Corporal (IMC) S/N?"
    );
  }
  return resp !== null ? resp : "";
}

// Función para obtener y validar el valor de las variables float que se usan en los cálculos
function validaFloat(msg) {
  let valor = prompt(msg);
  while (valor !== null && !parseFloat(valor)) {
    valor = prompt("Introduzca un valor válido.\n\n" + msg);
  }
  return valor !== null ? valor : null;
}

// Cálculo del IMC
function imcFunction(alto, peso) {
  let valor = (peso / alto / alto) * 10000;
  let msg = "";
  switch (true) {
    case valor <= 16:
      msg = "Delgadez Severa";
      break;
    case valor > 16 && valor <= 17:
      msg = "Delgadez Moderada";
      break;
    case valor > 17 && valor <= 18.5:
      msg = "Delgadez Leve";
      break;
    case valor > 18.5 && valor <= 25:
      msg = "Normal";
      break;
    case valor > 25 && valor <= 30:
      msg = "Exceso de peso";
      break;
    case valor > 30 && valor <= 35:
      msg = "Obeso Clase I";
      break;
    case valor > 35 && valor <= 40:
      msg = "Obeso Clase II";
      break;
    case valor > 40:
      msg = "Obeso Clase II";
      break;
  }
  return "IMC: " + valor.toFixed(2) + " - " + msg;
}

// Variable para continuidad de ejecución de los cálculos
let resp = validaResp();

// Ciclo para realizar los cálculos
while (resp.toUpperCase() === "S") {
  let alto = validaFloat("Ingrese la altura en centímetros (cm)");
  if (alto === null) {
    break;
  }

  let peso = validaFloat("Ingrese el peso en kilogramos (kg)");
  if (peso === null) {
    break;
  }

  let imcMsg = imcFunction(alto, peso);
  alert(imcMsg);

  resp = validaResp();
}

// Mensaje de despedida
alert("Hasta pronto...");
