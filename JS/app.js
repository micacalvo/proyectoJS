// Carrito para compra de los servicios 

//Objeto constructor
class Servicio {
    constructor (id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
}}

//Un arrays para los servicios 
const servicios = [];

// Se cargan los servicios al array 
servicios.push(new Servicio (1, "Imagen personal", 3000, "../Multimedia/Imagenes/asesoria-1.jpg")),
servicios.push(new Servicio (2, "Asesoría express", 3500, "../Multimedia/Imagenes/asesoria-2.jpg")),
servicios.push(new Servicio (3, "Creación", 4000, "../Multimedia/Imagenes/creaciones.jpg"));
console.log(servicios)


// Almaceno array -- Stringify me convierte el [] a texto
const saveData = (clave, valor) => { 
    localStorage.setItem(clave, valor)
};

saveData ("listaServicios", JSON.stringify(servicios));

// Accedo a los datos del array (los capturo) -- Parse lo convierte a objeto o [] de nuevo 
const data = JSON.parse(localStorage.getItem("listaServicios"));

// Se crea el template a traer en Html--DOM
// Todas las constantes a utilizar

const items = document.getElementById("items")
const cards = document.getElementById("cards").content
const imgCard = document.getElementsByClassName("card-img-top")
const buttonCard = document.getElementsByClassName("btn-primary")
let carrito = {}

// Eventos 

items.addEventListener("click", e => {
     addCart(e)
})  // con "e" capturo el elemento que quiero modificar

// Funciones
// Traigo el template para que se dibuje con la información en la página

function renderizarCards() {
    servicios.forEach(servicio => {
        // Estructura de las cards
        const container = document.createElement("div");
        container.classList.add("card"); //Con classList.add agrego las clases de CSS
        
        // Body con sus elementos
        const cardBody = document.createElement ("div");
        cardBody.classList.add("card-body");

        const imgBody = document.createElement("img");
        imgBody.classList.add("card-img-top");
        imgBody.setAttribute("src", servicio.img);

        const cardTittle = document.createElement("h5");
        cardTittle.classList.add("card-title");
        cardTittle.textContent = servicio.nombre;

        const cardPrecio = document.createElement("p");
        cardPrecio.classList.add("p");
        cardPrecio.textContent = servicio.precio;

        const cardButton = document.createElement("button");
        cardButton.classList.add("btn-primary")
        cardButton.dataset.id = servicio.id;
        cardButton.innerHTML = `¡Lo compro!`


  container.appendChild(cardBody)  
  cardBody.appendChild(imgBody)     
  cardBody.appendChild(cardTittle)
  cardBody.appendChild(cardPrecio)
  cardBody.appendChild(cardButton)

  items.appendChild(container)
});
}
renderizarCards()


const addCart = e => {
    // console.log(e.target.classList.contains("btn-primary")) // Veo en consola si el elemento contiene la clase. Me debe tirar true o false
    if (e.target.classList.contains("btn-primary")) {


    }
}
// Le muestro al usuario los servicios 

/* for(const servicio of servicios) {
    alert (`¡Bienvenido! Los servicios disponibles son: ID: ${servicio.id} ${servicio.nombre}`)
}
 */
// Interacción con el usuario 

//let seleccion = prompt("Ingrese el ID de los servicios que desea adquirir (Solo los números 1, 2 o 3)");

//Ahora dentro del array de servicios tengo que encontrar el id que coincida con el número que colocó el usuario

//const servicioElegido = servicios.find( ({ id }) =>  id === seleccion);

// Se indica el precio final del servicio elegido 

/* if (servicioElegido.id === "1") {
    alert ("El precio de tu compra es $" + " " + (servicioElegido.precio));
} else if (servicioElegido.id === "2") {
    alert ("El precio de tu compra es $" + " " +  servicioElegido.precio);
} else if (servicioElegido.id === "3") {
    alert ("El precio de tu compra es $" + " " + servicioElegido.precio);
} else {
    alert("El número ingresado no es válido")
}
 */
