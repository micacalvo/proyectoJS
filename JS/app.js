// Carrito para compra de los servicios -- app.js se activa en carrito.html

// Todas las constantes a utilizar

const cards = document.getElementById("cards")
const items = document.getElementById("items")
const templateCards = document.getElementById("template-cards").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const footer = document.getElementById("footer")
const vaciar = document.getElementById("vaciar-carrito")
let carrito = {}

// Eventos 

// "DOMContentLoaded" se dispara cuando toda la página HTML esta cargada
document.addEventListener('DOMContentLoaded', e => { 
    fetchData()
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        dibujoCarrito()
    }
}); 

cards.addEventListener("click", e => {
    addCart(e)
}) // con "e" capturo el elemento que quiero modificar, en este caso el botón comprar

items.addEventListener("click", e => {
    //console.log(e)
    btndisminuir(e)
    /* dibujoCard()
    dibujoCarrito()
    dibujoFooter()
     */ /* Swal.fire ({
        title: '¡Bien!',
        text: 'Has agregado el servicio al carrito',
        icon: 'success',
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        width: 400,
        background: "#dadada",
        color: "#131d39"
    }) */ 
})

// Funciones

// Traigo los datos del objeto del .json

const fetchData = async () => {
        const respuesta = await fetch("../JSON/datos.json");
        const data = await respuesta.json()
        //console.log(data)
        dibujoCard(data)
}

// Traigo el template para que se dibuje con la información en la página-- Dibujo de cards

const dibujoCard = data => {
    data.forEach(item => {
    //console.log(item)
        
        // Estructura de las cards
        const cards = document.createElement("div")
        cards.classList.add("cards") //Con classList.add agrego las clases de CSS
        
        // Body con sus elementos
        const cardBody = document.createElement ("div");
        cardBody.classList.add("card-body");

        const imgBody = document.createElement("img");
        imgBody.classList.add("card-img-top");
        imgBody.setAttribute("src", item.img);

        const cardTittle = document.createElement("h5");
        cardTittle.classList.add("card-title");
        cardTittle.textContent = item.nombre;

        const cardPrecio = document.createElement("p");
        cardPrecio.classList.add("p");
        cardPrecio.textContent = item.precio;

        const cardButton = document.createElement("button");
        cardButton.classList.add("btn-primary")
        cardButton.dataset.id = item.id;
        cardButton.innerHTML = `¡Lo compro!`
 
    templateCards.appendChild(cards)
    cards.appendChild(cardBody)
    cards.appendChild(imgBody)
    cards.appendChild(cardButton)
    cards.appendChild(cardPrecio)
    cards.appendChild(cardTittle)
})
    cards.appendChild(templateCards);
}

// Función para agregar al carrito

const addCart = e => {
    //console.log(e.target.classList.contains("btn-primary")) // Veo en consola si el elemento contiene la clase. Me debe tirar true o false    
if (e.target.classList.contains("btn-primary")) {
    //console.log(e.target.parentElement)
    setCart(e.target.parentElement)
} e.stopPropagation() // Con stopPropagation detengo cualquier otro evento que se pueda generar en "cards" que es el contenedor padre
}


// Función para manipular el carrito 
// A setCart le tengo que empujar todo el objeto (nombre del servicio, id y precio)

const setCart = cards => {
    // Creo el objeto de los servicios
    const servicio = { 
        id: cards.querySelector(".btn-primary").dataset.id,
        nombre: cards.querySelector("h5").textContent,
        precio: cards.querySelector ("p").textContent,
        cantidad: 1
   }

   if (carrito.hasOwnProperty(servicio.id)) {
    servicio.cantidad = carrito[servicio.id].cantidad + 1
}
   //console.log(servicio)
   carrito[servicio.id] = {...servicio} //Con "..." estoy haciendo una copia de los servicios, para empujarlos al carrito en su propiedad ID
    dibujoCarrito()
}

// Dibujo el carrito-- Se va a ejecutar cuando agregue un servicio al carrito

const dibujoCarrito = () => {

    //items.innerHTML = ''  // Lo reinicio en 0 para que no se sobre escriba la información

    // Necesito hacer un ciclo forEach, pero como no se pueden ocupar los objetos debo utilizar "Objet.values"
    Object.values(carrito).forEach((item) => {

        // Estructura fila del carrito
        const name = document.createElement("row");
        name.classList.add("name");
        name.textContent = item.nombre

        const cantidad = document.createElement("row");
        cantidad.classList.add("cantidad");
        cantidad.textContent = item.cantidad

        const precio = document.createElement("row");
        precio.classList.add("precio");
        precio.textContent = item.cantidad * item.precio;

        const btnvaciar = document.createElement("button");
        btnvaciar.querySelector(".btn-danger");
        btnvaciar.dataset.id = item.id

        templateCarrito.appendChild(name)
        templateCarrito.appendChild(cantidad)
        templateCarrito.appendChild(precio)
        templateCarrito.appendChild(btnvaciar);
})
items.appendChild(templateCarrito);
dibujoFooter()
localStorage.setItem("carrito", JSON.stringify("carrito"))
} 

// Cuando se agregue un servicio al carrito, se ejecuta el footer. El footer cuando esta vacio dice "Comience a comprar", if lo uso para que cambie cuando el usuario agregue los servicios al carrito o vacie el carrito

const dibujoFooter = () => {
    footer.innerHTML = '' 
    if (Object.keys(carrito).length === 0) { // Keys y length cuentan si hay elementos en el carrito 
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - ¡Comience a comprar!</th>`
        return
    }

const sumaCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0);   //Vuelvo a usar el "Object.values" para acceder al carrito y "cantidad" para que en cada iteración me vaya sumando lo anterior
const sumaTotal = document.createElement("div");
sumaTotal.classList.add("sumaCantidad");
sumaTotal.textContent = sumaCantidad

const precioTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0);
const precioFinal = document.createElement("div");
precioFinal.classList.add("precioTotal");
precioFinal.textContent = precioTotal

templateFooter.appendChild(sumaTotal)
templateFooter.appendChild(precioFinal)
footer.appendChild(templateFooter)

const vaciarCart = document.querySelector("#vaciar-carrito")
vaciarCart.addEventListener("click", () => {
    carrito = {}
    dibujoCarrito()
})
}

const btndisminuir = e => {
    if(servicio.cantidad === 0) {
        delete carrito [e.target.dataset.id]
    }
dibujoCarrito();
}
   /*  dibujoCarrito()
  Swal.fire ({
        title: '¡NO!',
        text: "Se vaciara el carrito",
        icon: 'warning',
        position: "bottom",
        showCancelButton: true,
        showConfirmButton: false,
        timer: 3000,
        width: 400,
        background: "#dadada",
        color: "rgb(0, 0, 0)",
})  */