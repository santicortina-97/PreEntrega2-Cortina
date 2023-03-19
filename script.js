let nombre = prompt("Ingresá tu nombre");

if(nombre){
    alert("Hola " + nombre + ", elige para que día deseas sacar turno" )
}else{
    alert("Porfavos ingresá tu nombre")
}

do{
    let elegir = Number(prompt ("Selecciona su turno \n 1- Para Lunes \n 2- Para Martes \n 3- Para Miercoles \n 4- Para Jueves \n 5- Para Viernes"))
    switch (elegir) {
        case 1:
            alert(nombre + ", tienes turno para el día Lunes")
            break;
        case 2:
            alert(nombre + ", tienes turno para el día Martes")
            break;
        case 3:
            alert(nombre + ", tienes turno para el día Miércoles")     
            break;
        case 4:
            alert(nombre + ", tienes turno para el día Jueves")     
            break;
        case 5:
            alert(nombre + ", tienes turno para el día Viernes")     
            break;
        default:
            alert(nombre + ", solo se dan turnos de Lunes a Viernes")
            break;
    }
}while(confirm("Su turno ya fue reservado, desea elejir otro?"))
