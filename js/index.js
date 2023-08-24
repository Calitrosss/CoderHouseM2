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
const _btnHistorial = _html.createElement("button");
let _div = _html.createElement("form");
let _element;

// Variable con la fecha y hora actual de ejecución del proceso
let fechaIMC = new Date();

// Constante array para almacenar los valores de la tabla de IMC
const tablaIMC = [];

// Constante para almacenar la clave del local storage para el último resultado del cálculo final
const imcStorageKey = "lastIMC";

// #endregion //* VARIABLES *//

/**
 ***********************************************************
 ********************** FUNCIONES **************************
 ***********************************************************
 */

// #region //* FUNCIONES *//

// Método para llenar la tabla de valores IMC en el array
function addIMC(valorMin, valorMax, mensaje, imagen) {
  const IMC = {
    id: tablaIMC.length,
    minVal: valorMin,
    maxVal: valorMax,
    msg: mensaje,
    img: imagen,
  };

  tablaIMC.push(IMC);
}

//Se llena la tabla de IMC con los valores correspondientes
addIMC(-Infinity, 16, "Delgadez Severa", "../img/imc0.png");
addIMC(16, 17, "Delgadez Moderada", "../img/imc1.png");
addIMC(17, 18.5, "Delgadez Leve", "../img/imc2.png");
addIMC(18.5, 25, "Normal", "../img/imc3.png");
addIMC(25, 30, "Exceso de peso", "../img/imc4.png");
addIMC(30, 35, "Obesidad Clase I", "../img/imc5.png");
addIMC(35, 40, "Obesidad Clase II", "../img/imc6.png");
addIMC(40, Infinity, "Obesidad Clase III", "../img/imc7.png");

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

  return {
    imc: valor.toFixed(2),
    msg: imcObj.msg,
    img: imcObj.img,
  };
}

// Función para mostrar mensaje de error
function showError(msg) {
  Toastify({
    text: msg,
    position: "center",
    duration: 2500,
    stopOnFocus: false,
    style: {
      background: "#dc3545",
    },
  }).showToast();
}

// Función para mostrar eel resultado del cálculo final
function showIMC({ fecha, hora, alto, peso, imc, msg, img }) {
  Swal.fire({
    titleText: `IMC: ${imc} - ${msg}`,
    html: `
    <div class="swal2-html-container" id="swal2-html-container" style="display: block;">Altura: ${alto}cm - Peso: ${peso}kg
    </div><img src="${img}">
    `,
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Calculadora BMI",
    footer: `Fecha: ${fecha} - Hora: ${hora}`,
  });
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

_div = _html.createElement("div");
_div.classList = "d-flex flex-wrap justify-content-evenly mb-3 gap-1";
_form.appendChild(_div);
_btnCalcular.innerText = "Calcular";
_btnCalcular.type = "submit";
_btnCalcular.classList = "btn btn-primary";
_div.appendChild(_btnCalcular);
_element = _html.createElement("button");
_element.innerText = "Limpiar";
_element.type = "reset";
_element.classList = "btn btn-secondary";
_div.appendChild(_element);
_btnHistorial.innerText = "Último";
_btnHistorial.type = "button";
_btnHistorial.classList = "btn btn-outline-light";
_div.appendChild(_btnHistorial);

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

  const IMC = {
    fecha: fechaIMC.toLocaleDateString(),
    hora: fechaIMC.toLocaleTimeString(),
    alto: alto,
    peso: peso,
    ...imcFunction(alto, peso),
  };

  showIMC(IMC);

  localStorage.removeItem(imcStorageKey);
  localStorage.setItem(imcStorageKey, JSON.stringify(IMC));

  inputAltura.value = "";
  inputPeso.value = "";
});

// Evento botón Último
_btnHistorial.addEventListener("click", () => {
  const IMC = JSON.parse(localStorage.getItem(imcStorageKey));
  IMC ? showIMC(IMC) : showError("No hay datos almacenados");
});

// #endregion //* APLICACION *//
