// Se le muestra al usuario los servicios disponibles, debería poder elegir el que necesite, se le comunica precio.
// app.js se activa en la página de servicios 

//Objeto constructor
class Servicio {
    constructor (id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
}}

//Un arrays para los servicios 

const servicios = [];

// Se cargan los servicios al array 
servicios.push(new Servicio ("1", "Imagen personal", 3000)),
servicios.push(new Servicio ("2", "Asesoría express", 3500)),
servicios.push(new Servicio ("3", "Creación", 4000));

// Le muestro al usuario los servicios 

for(const servicio of servicios) {
    alert (`¡Bienvenido! Los servicios disponibles son: ID: ${servicio.id} ${servicio.nombre}`)
}

// Interacción con el usuario 

let seleccion = prompt("Ingrese el ID de los servicios que desea adquirir (Solo los números 1, 2 o 3)");

//Ahora dentro del array de servicios tengo que encontrar el id que coincida con el número que colocó el usuario

const servicioElegido = servicios.find( ({ id }) =>  id === seleccion);

// Se indica el precio final del servicio elegido 

if (servicioElegido.id === "1") {
    alert ("El precio de tu compra es $" + " " + (servicioElegido.precio));
} else if (servicioElegido.id === "2") {
    alert ("El precio de tu compra es $" + " " +  servicioElegido.precio);
} else if (servicioElegido.id === "3") {
    alert ("El precio de tu compra es $" + " " + servicioElegido.precio);
} else {
    alert("El número ingresado no es válido")
}

// Dom en la sección servicios 
// Tomo la sección creada en HTML

let serviceContainer = document.getElementById("container-services");
console.log(serviceContainer);

const containers = [
    {id: 1, nombre: "Imagen personal", precio: 3000},
    {id: 2, nombre: "Asesoría express", precio: 3500},
    {id: 3, nombre: "Creación", precio: 4000},
];

//Creo cards para los servicios 
for(const container of containers);

let card = document.createElement("card");
card.innerHTML = 
`<h3> Nombre del servicio: ${container.nombre} </h3>
<h4> Precio: ${container.precio} </h4>
<a class="btn btn-primary"> ¡Lo quiero! </a>`;

document.body.appendChild(card);
console.log(card)

