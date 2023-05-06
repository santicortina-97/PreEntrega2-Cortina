



fetch("datos.json")
.then(respuesta => respuesta.json())
.then(datos =>{
  const productos = datos;
/*   console.log(productos) */
  for (let i = 0; i < productos.length; i++) {
    const boton = document.querySelector("#" + productos[i].idBoton);
    boton.addEventListener("click", function() {
    agregarAlCarrito(productos[i].nombre, productos[i].precio, productos[i].icono);
    let contadorProductos = document.querySelector("#contadorProductos");
    contadorProductos.textContent = parseInt(contadorProductos.textContent) + 1;
    Toastify({
                text: "Producto agregado",
                className: "info",
                duration: 1500,
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #6898ae, #6898ae)",
                    borderRadius: "40px",
            },
            }).showToast();
    });
}
})


//Variables
let logo = "./img/SS2.png"
let carrito = []
let boton1 = document.getElementById("boton1")
let boton2 = document.getElementById("boton2")
let boton3 = document.getElementById("boton3")
let boton4 = document.getElementById("boton4")
let boton5 = document.getElementById("boton5")
let boton6 = document.getElementById("boton6")
let vaciarCarrito = document.getElementById("vaciarCarrito")
let vaciarCarritoBtn =document.getElementById("vaciarCarrito");
const img = "./img/vaciarCarrito.png";





// Verificar si la alerta ya se mostró antes
if (!sessionStorage.getItem("alertaMostrada")) {
    setTimeout(() =>{
        swal({
            icon: logo,
            title: "Bienvenido/a a nuestra tienda!",
            text: "Una vez elegido el producto presione sobre el carrito para continuar",
            style:{
                color:"black",
                backgroundColor: "rgb(245, 248, 250)",
                marginTop: "32px",
                borderTop: "1px solid #E9EEF1",
                overflow: "hidden",
            }
        });
        // Almacenar un valor en sessionStorage indicando que la alerta ya se mostró
        sessionStorage.setItem("alertaMostrada", true);
    }, 2000);
}

/* setTimeout(() =>{
    swal({
        icon: logo,
        title: "Bienvenido/a a nuestra tienda!",
        text: "Una vez elegido el producto presione sobre el carrito para continuar",
        style:{
            color:"black",
            backgroundColor: "rgb(245, 248, 250)",
            marginTop: "32px",
            borderTop: "1px solid #E9EEF1",
            overflow: "hidden",
        }
    });
}, 2000) */

document.getElementById("iconoCarrito").addEventListener("click", function() {
    let carro = document.querySelector(".contenedorProductos");
    if (carro.style.display === "none") {
        carro.style.display = "block";
    } else {
        carro.style.display = "none";
    }
});

//funciones
function agregarAlCarrito(producto,precio,icono){
    let productoEnCarrito = carrito.find((p) => p.producto === producto);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    }else{
        productoEnCarrito = {
            producto: producto,
            precio: precio,
            cantidad: 1,
            icono: icono,
        };
        carrito.push(productoEnCarrito)
    }
    actualizarCarrito()
    guardarCarritoEnStorage()
}

function actualizarCantidadProductos(){
    const contadorProductos = document.getElementById("contadorProductos");
    let cantidadTotal = 0;
    carrito.forEach((producto) =>{
        cantidadTotal += producto.cantidad;
    })
    contadorProductos.innerText = cantidadTotal;
}



function actualizarCarrito(){
    listaCarrito.innerHTML = " ";
    let carritoInfo = `<h2 class="tituloCarrito">Mi compra</h2>`;
    let precioTotal = 0;
    carrito.forEach((producto) => {
        carritoInfo += `<li class="carritoItem">
                        <div class="carritoItemCantidad"><span class="cantidad">${producto.cantidad}</span></div>
                        <div class="carritoItemDetalle">${producto.producto} - $${producto.precio} c/u</div>
                        <div class="carritoItemTotal">Total: $${producto.cantidad * producto.precio}</div>
                        <div class="menosCarrito" onclick="restarProducto('${producto.producto}')">${producto.icono}</div>
                        </li>`
                        /* <div class="menosCarrito">${producto.icono}</div> */
/*                         <div> <img src="${producto.imagen}" alt="Imagen del producto" class="carritoItemImagen"></div> */
        precioTotal += producto.cantidad * producto.precio 
    });
    const porcentajeIva = 21;
    let precioConIVA = calcularPrecioConIVA(precioTotal, porcentajeIva);
    carritoInfo += `<li class= "carritoTotal">Total: $${precioTotal} (IVA incluido: $${precioConIVA})</li>`;

    listaCarrito.innerHTML = carritoInfo;
}


function guardarCarritoEnStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularPrecioConIVA(total, porcentajeIva){
    let precioConIVA = total * (1 + porcentajeIva / 100);
    return precioConIVA.toFixed(2);
}





// for (let i = 0; i < productos.length; i++) {
//     const boton = document.querySelector("#" + productos[i].idBoton);
//     boton.addEventListener("click", function() {
//     agregarAlCarrito(productos[i].nombre, productos[i].precio, productos[i].icono);
//     let contadorProductos = document.querySelector("#contadorProductos");
//     contadorProductos.textContent = parseInt(contadorProductos.textContent) + 1;
//     Toastify({
//                 text: "Producto agregado",
//                 className: "info",
//                 duration: 1500,
//                 gravity: "bottom",
//                 style: {
//                     background: "linear-gradient(to right, #6898ae, #6898ae)",
//                     borderRadius: "40px",
//             },
//             }).showToast();
//     });
// }

//Restar productos
function restarProducto(producto) {
    let productoEnCarrito = carrito.find((p) => p.producto === producto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad === 0) {
            carrito = carrito.filter((p) => p.producto !== producto);
        }
        actualizarCantidadProductos()
        actualizarCarrito();
        guardarCarritoEnStorage();
    }
}

/* productoEnCarrito */
let miBoton = document.getElementById("miBoton");

miBoton.addEventListener("click",() =>{

});
miBoton.addEventListener("click", function (){
    if(carritoVacio()){
        swal({
            icon: "warning",
            title: "¡Atención!",
            text: "No hay productos en el carrito",
            buttons: false,
            timer: 2000,
        });
    }else{
        window.location.href = "./pages/pago.html";
    }
})



function carritoVacio() {
    return carrito.length === 0;
}

vaciarCarritoBtn.addEventListener("click", function() {
    if (carritoVacio()) {
    swal({
        icon: "warning",
        title: "¡Atención!",
        text: "No hay productos en el carrito",
        buttons: false,
        timer: 2000,
    });
    } else {
        swal({
            title: "¿Estás seguro que deseas eliminar los productos del carrito?",
            icon: img,
            buttons: {
                cancel: "Cancelar",
                confirm: {
                    text: "Aceptar",
                    value: true,
                    danger: true
                }
            },
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                carrito = [];
                actualizarCarrito();
                localStorage.removeItem("carrito");
                actualizarCantidadProductos(); // Agregamos esta línea para actualizar la cantidad de productos
                swal("El carrito se ha vaciado", {
                    icon: "success",
                });
            } else {
                swal("El carrito no se ha vaciado");
            }
        });
/*     actualizarCarrito();
    guardarCarritoEnStorage(); */
    }
});







// Verificar si hay datos en el carrito almacenados en el Storage
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
    actualizarCantidadProductos();
}
// // Verificar si hay datos en el carrito almacenados en el Storage
if (localStorage.getItem("carrito")) {
carrito = JSON.parse(localStorage.getItem("carrito"));
actualizarCarrito();
actualizarCantidadProductos();
}