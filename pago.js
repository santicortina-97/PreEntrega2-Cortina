let segundos = 0;
let minutos = 0;
let intervalo;

function actualizarContador(){
segundos++;

if(segundos == 60){
    segundos = 0;
    minutos++;
}

//formateo minutos y segundos
const minutosString = minutos < 10 ? "0" + minutos : minutos;
const segundosString = segundos < 10 ? "0" + segundos : (segundos >= 10 && segundos < 60) ? segundos : "00";

//actualizamod el HTML
document.getElementById("contador").innerHTML = `${minutosString}:${segundosString}`;

//Si llegamos a 4 minutos, se detiene
if(minutos == 4){
clearInterval(intervalo);
window.location.href = "../index.html"
}
}
intervalo = setInterval(actualizarContador, 1000);



//VARIABLES
// Obtener una referencia al elemento select
const formaPago = document.getElementById("formaPago");
const botonFinalizar = document.getElementById("botonFinalizar")
const tarjeta = document.getElementById("tarjeta");
const formulario = document.getElementById("formularioTarjeta");
const yearActual = new Date().getFullYear();
const numeroTarjeta = document.getElementById("numeroTarjeta");
const nombreTarjeta = document.getElementById("nombreTarjeta");
const logo = document.getElementById("logo");
const mesExpiracion = document.getElementById("mes");
const yearExpiracion = document.getElementById("year");
const agregarCvv = document.getElementById("agregarCvv");
const botonEnviarDatos = document.getElementById("botonEnviarDatos")



// Agregar un controlador de eventos al elemento select
formaPago.addEventListener("change", function() {
// Obtener una referencia al elemento pagoTarjeta
const pagoTarjeta = document.querySelector(".pagoTarjeta");

// Si la opción seleccionada es "Tarjeta", hacer visible el elemento pagoTarjeta
if (formaPago.value === "Tarjeta") {
    pagoTarjeta.style.display = "block";
    botonFinalizar.style.display = "none";
} else {
    pagoTarjeta.style.display = "none";
    botonFinalizar.style.display = "block";
}
});




tarjeta.addEventListener("click", () => {
tarjeta.classList.toggle("active");
})

//Dar vuelta la tarjeta para que se vea la parte de adelante
const mostrarFrente = () => {
if(tarjeta.classList.contains("active")){
    tarjeta.classList.remove("active")
}
}

//SELECT DEL MES
for (let i = 1; i <= 12; i++) {
let opcion = document.createElement("option");
opcion.value = i;
opcion.innerText = i;
formulario.selectMes.appendChild(opcion);
}



//SELECT DEL AÑO

for(let i = yearActual; i <= yearActual + 10; i++){
let opcion = document.createElement("option")
opcion.value = i;
opcion.innerText = i;
formulario.selectYear.appendChild(opcion);
}


//INPUT NUMERO DE TARJETA

formulario.inputNumero.addEventListener("keyup", (e) =>{
let valorInput = e.target.value;
// ELIMINAR ESPACIOS EN BLANCO
valorInput = valorInput.replace(/\s/g, "")
// ELIMINAR LAS LETRAS
valorInput = valorInput.replace(/\D/g, "")
// ESPACIO CADA 4 NÚMEROS
valorInput = valorInput.replace(/([0-9]{4})/g, "$1 ")
//ELIMINA EL ÚLTIMO ESPACIO
valorInput = valorInput.trim()
// ASIGNAR VALOR AL INPUT
formulario.inputNumero.value = valorInput;

numeroTarjeta.textContent = valorInput;

if(valorInput[0] == 4){
    logo.innerHTML = "";
    const imagen = document.createElement ("img")
    imagen.src = "../img/visa.png";
    logo.appendChild(imagen)
} else if(valorInput[0] == 5){
logo.innerHTML = "";
const imagen = document.createElement ("img")
imagen.src = "../img/mastercard.png";
logo.appendChild(imagen)
}
if(valorInput == ""){
logo.innerHTML = "";
}

//Dar vuelta la tarjeta para que se vea la parte de adelante
mostrarFrente()
})

//INPUT NOMBRE DE TARJETA

formulario.inputNombre.addEventListener("keyup", (e) => {
let valorInput = e.target.value;
    // ELIMINAR ESPACIOS EN BLANCO
    valorInput = valorInput.replace(/[0-9]/g, "")
    formulario.inputNombre.value = valorInput;

    nombreTarjeta.textContent = valorInput

    //Dar vuelta la tarjeta para que se vea la parte de adelante
mostrarFrente()
})



formulario.selectMes.addEventListener("change", (e) =>{
mesExpiracion.textContent = e.target.value;
mostrarFrente()
})

formulario.selectYear.addEventListener("change", (e) =>{
yearExpiracion.textContent = e.target.value.slice(2);
mostrarFrente()
})

formulario.inputCVV.addEventListener("keyup", (e) =>{
if(!tarjeta.classList.contains("active")){
    tarjeta.classList.toggle("active")
}
formulario.inputCVV.value = formulario.inputCVV.value
    // ELIMINAR ESPACIOS EN BLANCO
    .replace(/\s/g, "")
    // ELIMINAR LAS LETRAS
    .replace(/\D/g, "");
agregarCvv.textContent = e.target.value;    
})









let formularioFinalizar = document.getElementById("formularioFinalizar");

formularioFinalizar.addEventListener("submit", function(event){
event.preventDefault();
swal({
    title: "Desea finalizar la compra?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
})
.then((willDelete) => {
    if (willDelete) {
    swal({
        title: "La compra ha sido Finalizada",
        text: "Muchas gracias por confiar en nosotros :)",
        icon: "success",
    }).then(() => {
        formularioFinalizar.submit();
        // Vaciar localStorage
        localStorage.clear();
        // Redirigir a index.html
        window.location.href = "../index.html";
    });
    } else {
    swal("El formulario no ha sido enviado");
    }
});
});




formularioTarjeta.addEventListener("submit", function(event){
    event.preventDefault();
    swal({
    title: "Desea finalizar la compra?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    })
    .then((willDelete) => {
    if (willDelete) {
        swal({
        title: "La compra ha sido Finalizada",
        text: "Muchas gracias por confiar en nosotros :)",
        icon: "success",
        }).then(() => {
        formularioTarjeta.submit();
        // Vaciar localStorage
        localStorage.clear();
        // Redirigir a index.html
        window.location.href = "../index.html";
        });
    } else {
        swal("El formulario no ha sido enviado");
    }
    });
});






function calcularPrecioIVA(total, porcentajeIva){
let precioIva = total * (1 + porcentajeIva / 100);
return precioIva.toFixed(2);
}

function mostrarCarrito(){
let baseDeDatos = JSON.parse(localStorage.getItem("carrito"))
if(baseDeDatos !== null){
    let elements = document.getElementById("elements");
    let precioTotal = 0;
    

    let titulo = elements.querySelector('thead tr');
    titulo.insertAdjacentHTML('afterbegin', '<th class = "productoTh">Producto</th>  <th class = "productoTh">Precio</th> <th class = "productoTh">Cantidad</th> <th class = "productoTh">Subtotal</th> ');

    baseDeDatos.forEach(element => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td class = "productoTd">${element.producto}</td>
                    <td class = "productoTd">$${element.precio}</td>
                    <td class = "productoTd">${element.cantidad}</td>
                    <td class = "productoTd">$${element.cantidad * element.precio}</td>`
    elements.appendChild(tr);
    precioTotal += element.cantidad * element.precio;
    });
    const porcentajeDeIva = 21;
    let precioIVA = calcularPrecioIVA(precioTotal, porcentajeDeIva);
    let trTotal = document.createElement("tr");
    trTotal.innerHTML = `<td class = "productoTd totalTd">Total:</td>
                        <td class = "productoTd totalTd">$${precioTotal}</td>
                        <td class = "productoTd totalTd">IVA incluido:</td>
                        <td class = "productoTd totalTd">$${precioIVA}</td>`;
    elements.appendChild(trTotal);
}
}
mostrarCarrito();


