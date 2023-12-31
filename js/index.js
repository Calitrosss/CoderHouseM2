// Variable con la fecha y hora actual de ejecución del proceso
let fechaIMC = new Date();

// Constante array para almacenar los valores de la tabla de IMC
const tablaIMC = [];

// Método para llenar la tabla de valores IMC en el array
function addIMC(valorMin, valorMax, mensaje) {
  const IMC = {
    id: tablaIMC.length,
    minVal: valorMin,
    maxVal: valorMax,
    msg: mensaje,
  };

  tablaIMC.push(IMC);
}

//Se llena la tabla de IMC con los valores correspondientes
addIMC(-Infinity, 16, "Delgadez Severa");
addIMC(16, 17, "Delgadez Moderada");
addIMC(17, 18.5, "Delgadez Leve");
addIMC(18.5, 25, "Normal");
addIMC(25, 30, "Exceso de peso");
addIMC(30, 35, "Obesidad Clase I");
addIMC(35, 40, "Obesidad Clase II");
addIMC(40, Infinity, "Obesidad Clase III");

// Función para obtener y validar el valor de la variable para continuidad de los cálculos
function validaResp(msg) {
  let resp = prompt(msg);
  while (resp !== null && resp.toUpperCase() !== "S" && resp.toUpperCase() !== "N") {
    resp = prompt("Introduzca un valor válido.\n\n" + msg);
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

  const imcObj = tablaIMC.find((n) => {
    return valor > n.minVal && valor <= n.maxVal;
  });

  return "IMC: " + valor.toFixed(2) + " - " + imcObj.msg;
}

// Variable para continuidad de ejecución de los cálculos
let resp = validaResp("Desea calcular un Indice de Masa Corporal (IMC) S/N?");

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

  let imcMsg =
    "Fecha: " +
    fechaIMC.toLocaleDateString() +
    " / Hora: " +
    fechaIMC.toLocaleTimeString() +
    "\n" +
    imcFunction(alto, peso);
  alert(imcMsg);

  resp = validaResp("Desea calcular un nuevo Indice de Masa Corporal (IMC) S/N?");
}

// Mensaje de despedida
alert("Hasta pronto...");
