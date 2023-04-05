alert("Bienvenido a nuestro showrrom, porfavor seleccione un producto de la siguiente lista para agregar al carrito:");

let carrito = [];

do {
    let entrada = parseInt(prompt("Ingresá el número del producto que deseas agregar: \n 1- Remera Adidas de $6500 \n 2- Buzo Puma de $9000 \n 3- Campera Puma de $25000"));

    switch (entrada) {
        case 1:
            carrito.push({ producto: "Remera Adidas", precio: 6500 });
            alert("Se agregó la Remera Adidas al carrito");
        break;
        case 2:
            carrito.push({ producto: "Buzo Puma", precio: 9000 });
            alert("Se agregó el Buzo Puma al carrito");
        break;
        case 3:
            carrito.push({ producto: "Campera Puma", precio: 25000 });
            alert("Se agregó la Campera Puma al carrito");
        break;
        default:
            alert("La entrada no es válida");
    }
} while (carrito.length === 0 || confirm("¿Deseas agregar otro producto al carrito?"));

let carritoInfo = "Productos en el carrito:\n";

carrito.forEach( producto => carritoInfo += `- ${producto.producto} ($${producto.precio})\n`);

const porcentajeIva = 21;
const precioTotal = carrito.reduce((total, producto) => {return total + producto.precio;}, 0);

const precioConIVA = calcularPrecioConIVA(precioTotal, porcentajeIva);
carritoInfo = carritoInfo.concat('Total: $', precioTotal, ' (IVA incluido: $', precioConIVA, ')');

alert(carritoInfo);

function calcularPrecioConIVA(total, porcentajeIva) {
    const precioConIVA = total * (1 + porcentajeIva / 100);
    return precioConIVA;
}