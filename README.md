# Trabajo Práctico: Flexbox, Formularios Dinámicos y React

Sitio web con cuatro páginas relacionadas que muestran el uso de **Flexbox**,
**JavaScript común** (DOM, eventos, arreglos, funciones) y **React**.

## 🌐 Sitio publicado

👉 https://TU-USUARIO.github.io/tp-flexbox-formularios-react/

> Reemplazar por la URL real de GitHub Pages.

## 📄 Páginas

| Página | Descripción |
|--------|-------------|
| `index.html` | Página principal con enlaces a los tres ejercicios. |
| `flexbox.html` | **Ejercicio 1:** tarjetas organizadas con Flexbox, generadas desde un arreglo con JavaScript. Botones para filtrar, ordenar y resaltar. |
| `personas.html` | **Ejercicio 2:** formulario y tabla de personas con cálculo de IMC, usando HTML, CSS y JavaScript común. Permite agregar y quitar filas. |
| `react.html` | **Ejercicio 3:** la misma funcionalidad del Ejercicio 2, resuelta con React (componentes, estado y eventos). |

Todas las páginas tienen un enlace para volver al inicio.

## 🛠️ Tecnologías

- HTML5 y CSS3 (Flexbox, diseño responsive)
- JavaScript común (variables, condicionales, funciones, arreglos, DOM, eventos)
- React 18 (cargado por CDN, sin necesidad de instalar nada)

## 📁 Estructura

```
.
├── index.html
├── flexbox.html
├── personas.html
├── react.html
├── css/
│   └── estilos.css
└── js/
    ├── flexbox.js
    ├── personas.js
    └── react-app.js
```

## ▶️ Cómo probarlo

- `index.html`, `flexbox.html` y `personas.html` se pueden abrir con doble clic.
- `react.html` conviene verlo en la **URL de GitHub Pages** (o con un servidor local),
  ya que carga React/Babel y el navegador puede bloquear archivos locales.

## 🧮 Sobre el IMC

El Índice de Masa Corporal se calcula como:

```
IMC = peso / (altura × altura)
```

y se clasifica en: Bajo (&lt; 18.5), Normal (&lt; 25), Sobrepeso (&lt; 30) y Obesidad (≥ 30).
