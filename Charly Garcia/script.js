console.log("holaa");

var input_nombre = document.getElementById("nombre");
var input_apellido = document.getElementById("apellido");
var input_edad = document.getElementById("edad");
var input_telefono = document.getElementById("telefono");
var input_email = document.getElementById("email");
var input_submit = document.getElementById("submit");

console.log("input_nombre");
console.log("input_submit");
console.log("input_apellido");
console.log("input_email");
console.log("input_telefono");
console.log("input_edad");

input_submit.addEventListener("click", enviarFormulario);


function enviarFormulario (event){
   event.preventDefault();

console.log("nombre:", input_nombre);
console.log("apellido:", input_apellido);
console.log("email:", input_email);
console.log("telefono:", input_telefono);

    var valor_nombre = input_nombre.value;
    var valor_apellido = input_apellido.value;
    var valor_email = input_email.value;
    var valor_telefono = input_telefono.value;
   
   console.log(input_nombre);
   console.log(input_submit);
   console.log(input_apellido);
   console.log(input_email);
   console.log(input_telefono);


   var placeholder_nombre = document.getElementById("nombre_spaceholder");
   var placeholder_apellido = document.getElementById("apellido_spaceholder");

   placeholder_nombre.innerHTML = valor_nombre;
   placeholder_apellido.innerHTML = valor_apellido;

   elemento_feedback = document.getElementById("feedback")
   elemento_feedback.classList.remove("oculto") 

   elemento_formulario = document.getElementById("forms")
   elemento_formulario.classList.add("oculto") 
}


const carrusel = document.getElementById("carrusel");
const btnDerecha = document.querySelector(".derecha");
const btnIzquierda = document.querySelector(".izquierda");

const card = document.querySelector(".Artista");
const cardWidth = card.offsetWidth + 100; 

let scrollPosition = 0;

btnDerecha.addEventListener("click", () => {
  scrollPosition += cardWidth;

  carrusel.scrollTo({
    left: scrollPosition,
    behavior: "smooth"
  });
});

btnIzquierda.addEventListener("click", () => {
  scrollPosition -= cardWidth;

  if (scrollPosition < 0) scrollPosition = 0;

  carrusel.scrollTo({
    left: scrollPosition,
    behavior: "smooth"
  });
});

