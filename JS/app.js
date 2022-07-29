// Carrito para compra de los servicios

// Todas las constantes a utilizar

const cards = document.getElementById("cards")
const items = document.getElementById("items")
const templateCards = document.getElementById("template-cards").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const footer = document.getElementById("footer")
const fragment = document.createDocumentFragment()
let carrito = {}
//Como tengo que recorrer elementos, es necesario usar fragments, para evitar reflow. También lo necesito porque estoy usando templates
//.content me sirve para recorrer los elementos

// Eventos 

// "DOMContentLoaded" se dispara cuando toda la página HTML esta cargada
document.addEventListener('DOMContentLoaded', e => { 
    fetchData(e)
    if (localStorage.getItem("carrito")) { //Guardo en localStorage para que cuando reinicie la página, no se borre lo que guarde en el carrito
        carrito = JSON.parse(localStorage.getItem("carrito"))
        dibujoCarrito()
    }
}); 

cards.addEventListener("click", e => {
    addCart(e) // con "e" capturo el elemento que quiero modificar, en este caso el botón comprar

    if (e.target.classList.contains("btn-primaryA")) { 
    Swal.fire ({
        title: '¡Bien!',
        text: 'Has agregado el servicio al carrito',
        icon: 'success',
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        width: 400,
        background: "#dadada",
        color: "#131d39"
    })}
}) 

items.addEventListener("click", e => {
    //console.log(e)
   btnMenos(e)
})

// Funciones

// Traigo los datos del objeto del .json
// Con fetch accedo a los datos del .json

const fetchData = async () => {
        const respuesta = await fetch("../JSON/datos.json");
        const data = await respuesta.json()
        //console.log(data)
        dibujoCard(data)
}

// Traigo el template para que se dibuje con la información en la página-- Dibujo de cards

const dibujoCard = data => {
    data.forEach(item => {
    console.log(item)
        
        // Estructura de las cards
        templateCards.querySelector("h5").textContent = item.nombre
        templateCards.querySelector("p").textContent = item.precio
        templateCards.querySelector("img").setAttribute("src", item.img)
        templateCards.querySelector("button").dataset.id = item.id
        
        const clone = templateCards.cloneNode(true) //Hago una clonación para pasar el fragment
        fragment.appendChild(clone)
})
    cards.appendChild(fragment);
}

// Función para agregar al carrito

const addCart = e => {
//console.log(e.target.classList.contains("btn-primary")) // Veo en consola si el elemento contiene la clase. Me debe tirar true o false    
if (e.target.classList.contains("btn-primaryA")) {
    //console.log(e.target.parentElement)
    setCart(e.target.parentElement) 
} e.stopPropagation() // Con stopPropagation detengo cualquier otro evento que se pueda generar en "cards" que es el contenedor padre
}

// Función para manipular el carrito 
// A setCart le tengo que empujar todo el objeto (nombre del servicio, id y precio)

const setCart = item => {
// Creo el objeto de los servicios
    const servicio = { 
        id: item.querySelector("button").dataset.id,
        nombre: item.querySelector("h5").textContent,
        precio: item.querySelector("p").textContent,
        cantidad: 1
   }
// Si el usuario quisiera aumentar la cantidad de servicios en el carrito, uso la propiedad "hasOwnProperty", que lo que hace es buscar el ID del servicio
   if (carrito.hasOwnProperty(servicio.id)) {
    servicio.cantidad = carrito[servicio.id].cantidad + 1
}
   //console.log(servicio)
   carrito[servicio.id] = {...servicio} //Con "..." estoy haciendo una copia de los servicios, para empujarlos al carrito en su propiedad ID
    
dibujoCarrito()
}

// Dibujo el carrito-- Se va a ejecutar cuando agregue un servicio al carrito

const dibujoCarrito = () => {

    items.innerHTML = ''  // Lo reinicio en 0 para que no se sobre escriba la información

    // Necesito hacer un ciclo forEach, pero como no se pueden ocupar las propiedades de un array debo utilizar "Objet.values"
    Object.values(carrito).forEach((servicio) => {

        // Estructura fila del carrito
        templateCarrito.querySelector("th").textContent = servicio.id
        templateCarrito.querySelectorAll("td")[0].textContent = servicio.nombre
        templateCarrito.querySelectorAll("td")[1].textContent = servicio.cantidad
        templateCarrito.querySelector("span").textContent = servicio.precio * servicio.cantidad
        templateCarrito.querySelector(".btn-danger").dataset.id = servicio.id

const clone = templateCarrito.cloneNode(true)
fragment.appendChild(clone)
})
items.appendChild(fragment)

dibujoFooter()

localStorage.setItem("carrito", JSON.stringify(carrito))

} 

// Cuando se agregue un servicio al carrito, se ejecuta el footer. El footer cuando esta vacio dice "Comience a comprar", if lo uso para que cambie cuando el usuario agregue los servicios al carrito o vacie el carrito

const dibujoFooter = () => {
    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) { // Keys y length cuentan si hay elementos en el carrito 
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - ¡Comience a comprar!</th>
        `
        return
    }

const sumaCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0); //Vuelvo a usar el "Object.values" para acceder al carrito y "cantidad" para que en cada iteración me vaya sumando lo anterior

const precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);

templateFooter.querySelectorAll("td")[0].textContent = sumaCantidad
templateFooter.querySelector("span").textContent = precioTotal

const clone = templateFooter.cloneNode(true)
fragment.appendChild(clone)
footer.appendChild(fragment)

const vaciarCart = document.getElementById("vaciar-carrito")
vaciarCart.addEventListener("click", (e) => {
    carrito = {}
    dibujoCarrito()

if (e.target.classList.contains("btn-danger")){
    Swal.fire ({
        title: '¡NO!',
        text: "Se eliminara el servicio del carrito",
        icon: 'warning',
        position: "bottom",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        width: 400,
        background: "#dadada",
        color: "rgb(0, 0, 0)",
})
}
})
}

const btnMenos = e => { //Función para disminuir un solo objeto del carrito 
   // console.log(e.target.classList.contains("btn-danger"))
    if(e.target.classList.contains("btn-danger")) {
        const servicio = carrito[e.target.dataset.id]
        servicio.cantidad--
        if(servicio.cantidad === 0) {
            delete carrito[e.target.dataset.id] //Con delete cuando llega a 0 borra la línea del carrito 
        } else {
            carrito[e.target.dataset.id] = {...servicio}
        }
        dibujoCarrito() 
       
if (e.target.classList.contains("btn-danger")){
    Swal.fire ({
        title: '¡NO!',
        text: "Se eliminara el servicio del carrito",
        icon: 'warning',
        position: "bottom",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 3000,
        width: 400,
        background: "#dadada",
        color: "rgb(0, 0, 0)",
    })
}
} e.stopPropagation()
} 
