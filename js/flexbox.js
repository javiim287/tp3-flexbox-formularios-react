// ===========================================================
// EJERCICIO 1 - Flexbox + JavaScript común
// Conceptos usados: variables, arreglos, funciones,
// condicionales, manipulación del DOM y manejo de eventos.
// ===========================================================

// 1) ARREGLO de datos. Cada fruta es un objeto con sus propiedades.
const frutas = [
  { nombre: "Manzana",  emoji: "🍎", precio: 800  },
  { nombre: "Banana",   emoji: "🍌", precio: 600  },
  { nombre: "Naranja",  emoji: "🍊", precio: 950  },
  { nombre: "Frutilla", emoji: "🍓", precio: 1500 },
  { nombre: "Uva",      emoji: "🍇", precio: 1200 },
  { nombre: "Sandía",   emoji: "🍉", precio: 1800 },
  { nombre: "Pera",     emoji: "🍐", precio: 700  },
  { nombre: "Cereza",   emoji: "🍒", precio: 2000 }
];

// Guardamos la referencia al contenedor donde van las tarjetas.
const galeria = document.getElementById("galeria");

// 2) FUNCIÓN que dibuja las tarjetas en pantalla a partir de un arreglo.
//    "resaltarCara" es opcional: si es true, marca la fruta más cara.
function mostrarFrutas(lista, resaltarCara) {
  // Vaciamos lo que había antes (manipulación del DOM).
  galeria.innerHTML = "";

  // Si nos piden resaltar, buscamos cuál es el precio más alto.
  let precioMasAlto = 0;
  if (resaltarCara) {
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].precio > precioMasAlto) {
        precioMasAlto = lista[i].precio;
      }
    }
  }

  // Por cada fruta creamos su tarjeta y la insertamos en la galería.
  lista.forEach(function (fruta) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    // Condicional: agregamos la clase "resaltada" a la más cara.
    if (resaltarCara && fruta.precio === precioMasAlto) {
      tarjeta.classList.add("resaltada");
    }

    tarjeta.innerHTML =
      '<div class="emoji">' + fruta.emoji + '</div>' +
      '<h3>' + fruta.nombre + '</h3>' +
      '<p class="precio">$' + fruta.precio + '</p>';

    galeria.appendChild(tarjeta);
  });
}

// 3) EVENTOS de los botones.

// Mostrar todas las frutas.
document.getElementById("btnTodas").addEventListener("click", function () {
  mostrarFrutas(frutas, false);
});

// Filtrar: solo las que cuestan menos de $1000.
document.getElementById("btnEconomicas").addEventListener("click", function () {
  const economicas = frutas.filter(function (fruta) {
    return fruta.precio < 1000;
  });
  mostrarFrutas(economicas, false);
});

// Ordenar por precio de menor a mayor.
// Usamos una copia con slice() para no modificar el arreglo original.
document.getElementById("btnOrdenar").addEventListener("click", function () {
  const ordenadas = frutas.slice().sort(function (a, b) {
    return a.precio - b.precio;
  });
  mostrarFrutas(ordenadas, false);
});

// Resaltar la fruta más cara.
document.getElementById("btnResaltar").addEventListener("click", function () {
  mostrarFrutas(frutas, true);
});

// 4) Al cargar la página mostramos todas las frutas por defecto.
mostrarFrutas(frutas, false);
