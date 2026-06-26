// ===========================================================
// EJERCICIO 3 - Personas con React
// Misma funcionalidad que el Ejercicio 2, pero con componentes,
// estado (useState) y eventos de React.
// ===========================================================

const { useState } = React;

// Funciones auxiliares (las mismas ideas que en el Ejercicio 2).
function calcularImc(peso, altura) {
  return (peso / (altura * altura)).toFixed(1);
}

function categoriaImc(imc) {
  if (imc < 18.5) return "Bajo";
  if (imc < 25)   return "Normal";
  if (imc < 30)   return "Sobrepeso";
  return "Obesidad";
}

// -----------------------------------------------------------
// Componente del FORMULARIO.
// Recibe por props la función "onAgregar" que ejecuta cuando
// el usuario carga una persona.
// -----------------------------------------------------------
function FormularioPersona({ onAgregar }) {
  // Un estado por cada campo del formulario (componentes controlados).
  const [nombre, setNombre]     = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad]         = useState("");
  const [altura, setAltura]     = useState("");
  const [peso, setPeso]         = useState("");

  // Se ejecuta al enviar el formulario.
  function manejarEnvio(evento) {
    evento.preventDefault();

    // Validación simple.
    if (nombre.trim() === "" || apellido.trim() === "") {
      alert("Por favor completá nombre y apellido.");
      return;
    }
    if (Number(altura) <= 0 || Number(peso) <= 0) {
      alert("La altura y el peso deben ser mayores a cero.");
      return;
    }

    // Avisamos al componente padre con los datos de la persona.
    onAgregar({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      edad: edad,
      altura: Number(altura),
      peso: Number(peso)
    });

    // Limpiamos el formulario.
    setNombre("");
    setApellido("");
    setEdad("");
    setAltura("");
    setPeso("");
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <div className="campo">
        <label>Nombre</label>
        <input type="text" value={nombre}
               onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Ana" />
      </div>

      <div className="campo">
        <label>Apellido</label>
        <input type="text" value={apellido}
               onChange={(e) => setApellido(e.target.value)} placeholder="Ej: Pérez" />
      </div>

      <div className="campo">
        <label>Edad</label>
        <input type="number" value={edad} min="1"
               onChange={(e) => setEdad(e.target.value)} placeholder="Años" />
      </div>

      <div className="campo">
        <label>Altura (m)</label>
        <input type="number" value={altura} step="0.01" min="0.5"
               onChange={(e) => setAltura(e.target.value)} placeholder="Ej: 1.70" />
      </div>

      <div className="campo">
        <label>Peso (kg)</label>
        <input type="number" value={peso} step="0.1" min="1"
               onChange={(e) => setPeso(e.target.value)} placeholder="Ej: 65" />
      </div>

      <div className="campo campo-boton">
        <button type="submit" className="boton">Agregar</button>
      </div>
    </form>
  );
}

// -----------------------------------------------------------
// Componente de la TABLA. Recibe la lista de personas y la
// función para quitar una persona por su posición.
// -----------------------------------------------------------
function TablaPersonas({ personas, onQuitar }) {
  // Si no hay personas, mostramos un mensaje.
  if (personas.length === 0) {
    return <p className="mensaje-vacio">Todavía no hay personas cargadas.</p>;
  }

  return (
    <table className="tabla">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Altura (m)</th>
          <th>Peso (kg)</th>
          <th>IMC</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {personas.map((persona, indice) => {
          const imc = calcularImc(persona.peso, persona.altura);
          return (
            <tr key={indice}>
              <td>{persona.nombre}</td>
              <td>{persona.apellido}</td>
              <td>{persona.edad}</td>
              <td>{persona.altura}</td>
              <td>{persona.peso}</td>
              <td>{imc} ({categoriaImc(imc)})</td>
              <td>
                <button className="boton-quitar" onClick={() => onQuitar(indice)}>
                  Quitar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// -----------------------------------------------------------
// Componente PRINCIPAL (App). Maneja la lista de personas
// en su estado y la pasa a los componentes hijos.
// -----------------------------------------------------------
function App() {
  const [personas, setPersonas] = useState([]);

  // Agrega una persona al final del arreglo del estado.
  function agregarPersona(persona) {
    setPersonas([...personas, persona]);
  }

  // Quita la persona que está en la posición "indice".
  function quitarPersona(indice) {
    // filter deja todas menos la de esa posición (sin mutar el estado).
    setPersonas(personas.filter((_, i) => i !== indice));
  }

  return (
    <div>
      <h2>Cargar persona</h2>
      <p className="intro">
        Completá los datos y presioná "Agregar". El IMC se calcula solo.
      </p>

      <FormularioPersona onAgregar={agregarPersona} />

      <h2>Personas cargadas</h2>
      <TablaPersonas personas={personas} onQuitar={quitarPersona} />
    </div>
  );
}

// Montamos la aplicación dentro del div #raiz.
const raiz = ReactDOM.createRoot(document.getElementById("raiz"));
raiz.render(<App />);
