/**
 ***********************************************************
 ********************** VARIABLES **************************
 ***********************************************************
 */

// #region //* VARIABLES *//

const _html = document;
const _head = _html.head;
const _body = _html.body;
const _title = _html.createElement("title");
const _header = _html.createElement("header");
const _main = _html.createElement("main");
const _footer = _html.createElement("footer");
const _form = _html.createElement("form");
const _btnCalcular = _html.createElement("button");
let _div = _html.createElement("form");
let _element;

// Variable con la fecha y hora actual de ejecución del proceso
let fechaIMC = new Date();

// Constante array para almacenar los valores de la tabla de IMC
const tablaIMC = [];

// #endregion //* VARIABLES *//

/**
 ***********************************************************
 ********************** FUNCIONES **************************
 ***********************************************************
 */

// #region //* FUNCIONES *//

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

// Función para vaildar los valores ingresados
function validaValor(valor) {
  return valor > 0;
}

// Cálculo del IMC
function imcFunction(alto, peso) {
  let valor = (peso / alto / alto) * 10000;

  const imcObj = tablaIMC.find((n) => {
    return valor > n.minVal && valor <= n.maxVal;
  });

  // return "IMC: " + valor.toFixed(2) + " - " + imcObj.msg;
  return {
    imc: valor.toFixed(2),
    msg: imcObj.msg,
  };
}

// Función para mostrar mensaje de error
function showError(msg) {
  Toastify({
    text: msg,
    position: "cebter",
    duration: 3000,
    stopOnFocus: false,
    style: {
      background: "#dc3545",
    },
  }).showToast();
}

// #endregion //* FUNCIONES *//

/**
 ***********************************************************
 ********************** INTERFAZ *************************
 ***********************************************************
 */

// #region //* INTERFAZ *//

_title.innerText = "Calculadora BMI";
_head.appendChild(_title);

_body.prepend(_footer);
_body.prepend(_main);
_body.prepend(_header);
_body.classList = "container-fluid d-flex justify-content-center";

_element = _html.createElement("h1");
_element.innerText = "Calculadora BMI";
_element.classList = "text-center pt-5";
_main.appendChild(_element);

_element = _html.createElement("h2");
_element.innerText = "Indice de Masa Corporal (IMC)";
_element.classList = "text-center mb-3";
_main.appendChild(_element);

_main.appendChild(_form);

_element = _html.createElement("label");
_element.innerText = "Ingrese la altura en centímetros (cm)";
_element.classList = "form-label";
_form.appendChild(_element);

_div = _html.createElement("div");
_div.classList = "form-floating mb-3";
_form.appendChild(_div);
_element = _html.createElement("input");
_element.type = "number";
_element.classList = "form-control";
_element.id = "inputAltura";
_element.placeholder = "Altura (cm)";
_div.appendChild(_element);
_element = _html.createElement("label");
_element.innerText = "Altura (cm)";
_element.htmlFor = "inputAltura";
_div.appendChild(_element);

_element = _html.createElement("label");
_element.innerText = "Ingrese el peso en kilogramos (kg)";
_element.classList = "form-label";
_form.appendChild(_element);

_div = _html.createElement("div");
_div.classList = "form-floating mb-3";
_form.appendChild(_div);
_element = _html.createElement("input");
_element.type = "number";
_element.classList = "form-control";
_element.id = "inputPeso";
_element.placeholder = "Peso (kg)";
_div.appendChild(_element);
_element = _html.createElement("label");
_element.innerText = "Peso (kg)";
_element.htmlFor = "inputPeso";
_div.appendChild(_element);

_btnCalcular.innerText = "Calcular";
_btnCalcular.type = "submit";
_btnCalcular.classList = "btn btn-primary";
_form.appendChild(_btnCalcular);

_element = _html.createElement("button");
_element.innerText = "Limpiar";
_element.type = "reset";
_element.classList = "btn btn-secondary ms-1";
_form.appendChild(_element);

// #endregion //* INTERFAZ *//

/**
 ***********************************************************
 ********************** APLICACION *************************
 ***********************************************************
 */

// #region //* APLICACION *//

//Evento botón Calcular
_btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();

  const inputAltura = _html.getElementById("inputAltura");
  const alto = inputAltura.value;
  if (!validaValor(alto)) {
    showError("Introduzca un valor válido para la altura");
    inputAltura.focus();
    return;
  }

  const inputPeso = _html.getElementById("inputPeso");
  const peso = inputPeso.value;
  if (!validaValor(peso)) {
    showError("Introduzca un valor válido para el peso");
    inputPeso.focus();
    return;
  }

  const imcDate = fechaIMC.toLocaleDateString();
  const imcHour = fechaIMC.toLocaleTimeString();
  const imcCalc = imcFunction(alto, peso);

  const IMC = {
    Fecha: imcDate,
    Hora: imcHour,
    Alto: alto,
    Peso: peso,
    ...imcCalc,
  };

  Swal.fire({
    titleText: `IMC: ${IMC.imc} - ${IMC.msg}`,
    text: `Altura: ${IMC.Alto}cm - Peso: ${IMC.Peso}kg`,
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
    footer: `Fecha: ${IMC.Fecha} - Hora: ${IMC.Hora}`,
  });

  inputAltura.value = "";
  inputPeso.value = "";
});

// #endregion //* APLICACION *//
