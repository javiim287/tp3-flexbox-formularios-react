// ===========================================================
// EJERCICIO 2 - Personas con HTML, CSS y JavaScript común
// Conceptos: variables, arreglos, funciones, condicionales,
// manipulación del DOM, eventos y carga dinámica en tabla.
// ===========================================================

// ARREGLO donde guardamos todas las personas cargadas.
let personas = [];

// Referencias a elementos del DOM que vamos a usar.
const formulario   = document.getElementById("formPersona");
const cuerpoTabla  = document.getElementById("cuerpoTabla");
const mensajeVacio = document.getElementById("mensajeVacio");

// FUNCIÓN que calcula el IMC = peso / (altura * altura).
// Devuelve el número redondeado a un decimal.
function calcularImc(peso, altura) {
  const imc = peso / (altura * altura);
  return imc.toFixed(1); // toFixed(1) deja un decimal, ej: "22.5"
}

// FUNCIÓN que devuelve una etiqueta según el valor del IMC.
function categoriaImc(imc) {
  if (imc < 18.5) {
    return "Bajo";
  } else if (imc < 25) {
    return "Normal";
  } else if (imc < 30) {
    return "Sobrepeso";
  } else {
    return "Obesidad";
  }
}

// FUNCIÓN que devuelve la clase CSS de color según la categoría.
function claseImc(imc) {
  if (imc < 18.5)  return "imc-bajo";
  if (imc < 25)    return "imc-normal";
  if (imc < 30)    return "imc-sobrepeso";
  return "imc-obesidad";
}

// FUNCIÓN que vuelve a dibujar toda la tabla a partir del arreglo.
function dibujarTabla() {
  // Vaciamos el cuerpo de la tabla antes de redibujar.
  cuerpoTabla.innerHTML = "";

  // Si no hay personas, mostramos el mensaje y salimos.
  if (personas.length === 0) {
    mensajeVacio.style.display = "block";
    return;
  }
  mensajeVacio.style.display = "none";

  // Creamos una fila por cada persona del arreglo.
  personas.forEach(function (persona, indice) {
    const imc = calcularImc(persona.peso, persona.altura);

    const fila = document.createElement("tr");
    fila.innerHTML =
      "<td>" + persona.nombre + "</td>" +
      "<td>" + persona.apellido + "</td>" +
      "<td>" + persona.edad + "</td>" +
      "<td>" + persona.altura + "</td>" +
      "<td>" + persona.peso + "</td>" +
      "<td>" + imc + ' <span class="imc-badge ' + claseImc(imc) + '">' +
        categoriaImc(imc) + "</span></td>" +
      '<td><button class="boton-quitar" data-indice="' + indice + '">Quitar</button></td>';

    cuerpoTabla.appendChild(fila);
  });
}

// EVENTO: al enviar el formulario, agregamos la persona.
formulario.addEventListener("submit", function (evento) {
  // Evitamos que la página se recargue al enviar.
  evento.preventDefault();

  // Leemos los valores de los campos.
  const nombre   = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const edad     = parseInt(document.getElementById("edad").value);
  const altura   = parseFloat(document.getElementById("altura").value);
  const peso     = parseFloat(document.getElementById("peso").value);

  // Validación simple con condicionales.
  if (nombre === "" || apellido === "") {
    alert("Por favor completá nombre y apellido.");
    return;
  }
  if (altura <= 0 || peso <= 0) {
    alert("La altura y el peso deben ser mayores a cero.");
    return;
  }

  // Agregamos la persona al arreglo.
  personas.push({
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    altura: altura,
    peso: peso
  });

  // Redibujamos la tabla y limpiamos el formulario.
  dibujarTabla();
  formulario.reset();
  document.getElementById("nombre").focus();
});

// EVENTO: quitar una fila. Usamos "delegación de eventos":
// escuchamos los clics en toda la tabla y reaccionamos solo si
// se hizo clic en un botón con la clase "boton-quitar".
cuerpoTabla.addEventListener("click", function (evento) {
  if (evento.target.classList.contains("boton-quitar")) {
    const indice = parseInt(evento.target.getAttribute("data-indice"));
    personas.splice(indice, 1); // saca 1 elemento en esa posición
    dibujarTabla();
  }
});

// Dibujamos la tabla al cargar (al inicio muestra el mensaje vacío).
dibujarTabla();
