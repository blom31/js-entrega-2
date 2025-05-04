// 1. Objeto usuario para guardar nombre y apellido
const usuario = {
  nombre: "",
  apellido: "",
};

//2. Array de películas
const peliculas = [
  { id: 1, nombre: "Flow", hora: "16:00", precio: 4500 },
  { id: 2, nombre: "Anora", hora: "17:00", precio: 5000 },
  { id: 3, nombre: "Código Negro", hora: "17:30", precio: 6000 },
  { id: 4, nombre: "El Mono", hora: "20:00", precio: 7000 },
  { id: 5, nombre: "El Rey de Reyes", hora: "22:00", precio: 8500 },
];

// 3. guardar nombre y usuario con datos desde el formulario
let guardarUsuario = document.getElementById("btnGuardar");
guardarUsuario.addEventListener("click", (event) => {
  event.preventDefault(); // detiene el reinicio de la pág cuando presione el botón guardar

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;

  usuario.nombre = nombre;
  usuario.apellido = apellido;
  console.log(usuario); // verifico que se guarde correctamente los datos

  sessionStorage.setItem("nombre", usuario.nombre); //guardo los datos en el sessionStorage
  const nombreGuardado = sessionStorage.getItem("nombre"); // recupero los datos y valido que sean correctos
  console.log(nombreGuardado);

  if (nombreGuardado) {
    // si recupero datos del formulario y los guardo, muestro un saludo
    const saludo = document.getElementById("saludo");
    saludo.innerText = `Hola, ${nombreGuardado}. ¡Elige tu película! 🎬`;
  }
});

// 4. Mostrar tarjetas de películas
let cartelera = document.getElementById("cartelera");
let tarjetaPeliculas = "";

peliculas.forEach((pelicula, index) => {
  tarjetaPeliculas += `
  <div class="cardPeli">
  <h4>${pelicula.nombre}</h4>
  <p>Horario: ${pelicula.hora}</p>
  <p>Valor: $${pelicula.precio}</p>
  <button class="btn btn-light" data-index="${index}">Comprar</button>
  </div>
  `;
});
cartelera.innerHTML = tarjetaPeliculas;

// 5. Eventos para los botones de "Comprar"
let compraFinal = document.getElementById("compraFinal");
let carritoPeli = [];

let botonesComprar = document.querySelectorAll(".btn");
botonesComprar.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const index = parseInt(e.target.getAttribute("data-index"));
    const peliSeleccionada = peliculas[index];

    if (peliSeleccionada) {
      carritoPeli.push(peliSeleccionada);
      actualizarResumen();
    }
  });
});

// 6. Mostrar resumen de compra
function actualizarResumen() {
  let total = carritoPeli.reduce((sum, peli) => sum + peli.precio, 0);
  let listaPeliculas = carritoPeli
    .map((p) => `<li>${p.nombre} - $${p.precio}</li>`)
    .join("");

  compraFinal.innerHTML = `
    <div class="resumen">
      <p>Resumen de Compra</p>
      <p>Nombre: ${usuario.nombre}</p>
      <ul>${listaPeliculas}</ul>
      <p><strong>Total: $${total}</strong></p>
    </div>
  `;
}
