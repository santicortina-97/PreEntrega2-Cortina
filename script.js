let carrito = [];
let listaCarrito = document.getElementById("listaCarrito");


function agregarAlCarrito(producto, precio){
    let productoEnCarrito = {
        producto: producto,
        precio: precio
    };
    carrito.push(productoEnCarrito);
    actualizarCarrito();
    guardarCarritoEnStorage();
}

function agregarRemeraAlCarrito(){
    agregarAlCarrito("Remera Adidas", 6500);
}

function agregarBuzoAlCarrito(){
    agregarAlCarrito("Buzo Puma", 9000);
}

function agregarCamperaAlCarrito(){
    agregarAlCarrito("Campera Puma", 25000);
}

let boton1 = document.getElementById("boton1")
let boton2 = document.getElementById("boton2")
let boton3 = document.getElementById("boton3")

boton1.addEventListener("click", agregarRemeraAlCarrito);
boton2.addEventListener("click", agregarBuzoAlCarrito)
boton3.addEventListener("click", agregarCamperaAlCarrito)


function actualizarCarrito() {
    listaCarrito.innerHTML = " ";
    let carritoInfo = "Productos en el carrito:";
    let precioTotal = 0;
    carrito.forEach(producto => {
        carritoInfo += `<li>${producto.producto} ($${producto.precio})</li>`;
        precioTotal += producto.precio;
    });
    const porcentajeIva = 21;
    let precioConIVA = calcularPrecioConIVA(precioTotal, porcentajeIva);
    carritoInfo += `<li>Total: $${precioTotal} (IVA incluido: $${precioConIVA})</li>`;
    listaCarrito.innerHTML = carritoInfo;
}

function calcularPrecioConIVA(total, porcentajeIva) {
    let precioConIVA = total * (1 + porcentajeIva / 100);
    return precioConIVA.toFixed(2);
}

function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Verificar si hay datos en el carrito almacenados en el Storage
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
}

//Vaciar Carrito

let vaciarCarritoBtn = document.getElementById("vaciarCarrito");

vaciarCarritoBtn.addEventListener ("click", function(){
        carrito = [];
    actualizarCarrito();
    localStorage.removeItem("carrito");
})
