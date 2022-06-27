//form.js está habilitado para contacto.html

// Dom y Eventos 
// Utilizo el form creado en Desarrollo Web para recolectar datos

// Necesito que los campos nombres y correo electrónico sean obligatorios
let inputN = document.getElementById("inputName");
inputN.addEventListener("change", () => {
    if(inputN.value === ""){
        alert ("Este campo es obligatorio");
} else (console.log (inputN.value))});    

let inputEmail = document.getElementById("inputEmail4");
inputEmail.addEventListener("change", () => {
    if(inputEmail.value === ""){
        alert ("Este campo es obligatorio");
} else {console.log(inputEmail.value);}
});

//Para todos necesito guardar los datos 

let inputCountry = document.getElementById("inputCountry");
inputCountry.addEventListener("input", () => {
    console.log(inputCountry.value)
});

let inputCity = document.getElementById("inputCity");
inputCity.addEventListener("input", () => {
    console.log(inputCity.value)
});

// Intente que me tirara una alerta cuando el mensaje era demasiado corto, pero es molesta porque sale todo el tiempo
let inputComent = document.getElementById("inputComent");
inputComent.addEventListener("input", () => {
    console.log(inputComent.value)
});

//Evito que se borre los datos al recargar la página
//Problema con el botón enviar

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("El mensaje ha sido enviado con éxito")
});
