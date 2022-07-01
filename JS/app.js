// Carrito para compra de los servicios -- app.js se activa en carrito.html

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

// Se crea el template a traer en Html--DOM
// Todas las constantes a utilizar

const fragment = document.createDocumentFragment() //Fragment es como una memoria vólatil, lo creo para evitar el reflow
const items = document.getElementById("items")
const cards = document.getElementById("cards")
const templateCards = document.getElementById("template-cards").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const footer = document.getElementById("footer")
const bVaciar = document.getElementById("vaciar-carrito")
let carrito = {}

// Eventos 

document.addEventListener('DOMContentLoaded', (e) => { // "DOMContentLoaded" se dispara cuando toda la página HTML esta cargada
    console.log(e)
}); 

items.addEventListener("click", e => {
     addCart(e)
}) // con "e" capturo el elemento que quiero modificar, en este caso el botón comprar

cards.addEventListener("click", e => {
    dibujoCard(e)
})

// Funciones
// Traigo el template para que se dibuje con la información en la página-- Dibujo de cards

function dibujoCard() {
    servicios.forEach((servicio) => {
    
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
    cardBody.appendChild(cardButton)
    cardBody.appendChild(cardPrecio)
    cardBody.appendChild(cardTittle)
    items.appendChild(container)
})
    items.appendChild(fragment);
}
dibujoCard()
 

// Función para agregar al carrito

const addCart = e => {
    // console.log(e.target.classList.contains("btn-primary")) // Veo en consola si el elemento contiene la clase. Me debe tirar true o false
    if (e.target.classList.contains("btn-primary")) {
       //console.log(e.target.parentElement)

       setCart(e.target.parentElement)
} e.stopPropagation() // Con stopPropagation detengo cualquier otro evento que se pueda generar en "items" que es el contenedor padre
}

// Función para manipular el carrito 
// A setCart le tengo que empujar todo el objeto (la card con su img, nombre del servicio, id y precio)

const setCart = items => {
     // Creo el objeto de los servicios
     const servicio = { 
     id: items.querySelector(".btn-primary").dataset.id,
     nombre: items.querySelector("h5").textContent,
     precio: items.querySelector ("p").textContent,
     cantidad: 1
}

    carrito[servicio.id] = {...servicio} // Con "..." estoy haciendo una copia de los servicios, para empujarlos al carrito en su propiedad ID
    dibujoCarrito()
}

// Dibujo el carrito-- Se va a ejecutar cuando agregue un servicio al carrito

const dibujoCarrito = () => { 
    
   cards.innerHTML = ''  // Lo reinicio en 0 para que no se sobre escriba la información

    // Necesito hacer un ciclo forEach, pero como no se pueden ocupar los objetos debo utilizar "Objet.values"
    Object.values(carrito).forEach((servicio) => {

    templateCarrito.querySelector("th").textContent = servicio.id
    templateCarrito.querySelectorAll("td")[0].textContent = servicio.nombre
    templateCarrito.querySelectorAll("td")[1].textContent = servicio.cantidad  // Uso el "querySelectorAll" porque tengo varios "td"
    templateCarrito.querySelector("span").textContent = servicio.cantidad * servicio.precio

    const clone = templateCarrito.cloneNode(true) // La const "clone" la uso para poder pasarle el fragment
    fragment.appendChild(clone)
})
    items.appendChild(fragment)
    dibujoFooter()
}

// Cuando se agregue un servicio al carrito, se ejecuta el footer. El footer cuando esta vacio dice "Comience a comprar", if lo uso para que cambie cuando el usuario agregue los servicios al carrito o vacie el carrito

const dibujoFooter = () => {
    footer.innerHTML = '' 
    if (Object.keys(carrito).length === 0) { // Keys y length cuentan si hay elementos en el carrito 
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - ¡Comience a comprar!</th>`
        return
    }

    const sumaCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)    //Vuelvo a usar el "Objects.values" para acceder al carrito y "cantidad" para que en cada iteración me vaya sumando lo anterior

   const precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
   console.log(precioTotal)

   templateFooter.querySelectorAll("td")[0].textContent = sumaCantidad 
   templateFooter.querySelector("span").textContent = precioTotal

   const clone = templateFooter.cloneNode(true)
   fragment.appendChild(clone)
   footer.appendChild(fragment)

   const bVaciar = document.getElementById("vaciar-carrito")
   // Evento vaciar carrito
   bVaciar.addEventListener("click", () => {
    carrito = {}
    dibujoCarrito()
})}

// Para evitar que el carrito se borre cuando actualizo la página necesito un localStorage. La información original del carrito es un objeto vacio, ahora tengo que imprimir la nueva información. Esta nueva información la guardo en localStorage.setItem

// Almaceno array -- Stringify me convierte el {} o [] a texto
localStorage.setItem("servicios", JSON.stringify(servicios))

// Accedo a los datos del array (los capturo) -- Parse lo convierte a {} o [] de nuevo 
servicios = JSON.parse(localStorage.getItem('servicios'));
