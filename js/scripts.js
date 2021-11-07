function go() {

    if (document.login.nombre.value == 'admin' && document.login.contrasenia.value == '12345') {
        document.login.submit();

    } else {
        Swal.fire({
            title: 'Error',
            text: 'Datos de acceso incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

}

function alertaInicio() {
    Swal.fire({
        title: 'Bienvenido al sistema',
        text: 'Control de Inventarios',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    });
}

//Funciones para movimiento de Entradas

var entradas = [];
var entradasCotizacion = [];

//Aseguramos que el arreglo se vuelve a llenar con el localStorage y no se sobre escriba la info
function inicializarArregloCotizacion() {
    if (localStorage.getItem('productosCotizacion') != null) {
        entradasCotizacion = JSON.parse(localStorage.getItem('productosCotizacion'));
    }

    llenarTablaCotizaciones();
}


function entradaCotizacion(codigo, producto, cantidad, precio) {
    this.codigo = codigo,
        this.producto = producto,
        this.cantidad = cantidad,
        this.precio = precio
}

function agregarEntradasCotizacion() {
    var codigo = document.getElementById("codigo-coti").value;
    var producto = document.getElementById("producto-coti").value;
    var cantidad = document.getElementById("cantidad-coti").value;
    var precio = document.getElementById("precio-coti").value;

    var entrada = new entradaCotizacion(codigo, producto, cantidad, precio);

    entradasCotizacion.push(entrada);

    //almacenar el array de entradas en formato json en el local storage
    localStorage.setItem("productosCotizacion", JSON.stringify(entradasCotizacion));
}


function llenarTablaCotizaciones() {
    var scriptDeLlenado = "";
    var prioridad = document.getElementById("prioridadEntrega");
    var totalEntradas = new Number(); //para la sumatoria de los subtotales 
    for (let index = 0; index < entradasCotizacion.length; index++) {
        scriptDeLlenado += "<tr>";
        scriptDeLlenado += "<td>" + entradasCotizacion[index].codigo + "</td>";
        scriptDeLlenado += "<td>" + entradasCotizacion[index].producto + "</td>";
        scriptDeLlenado += "<td>" + entradasCotizacion[index].cantidad + "</td>";
        scriptDeLlenado += "<td>" + entradasCotizacion[index].precio + "</td>";
        scriptDeLlenado += "<td>" + entradasCotizacion[index].cantidad * entradasCotizacion[index].precio + "</td>";
        scriptDeLlenado += "</tr>"
        totalEntradas += Number.parseFloat(entradasCotizacion[index].cantidad * entradasCotizacion[index].precio);
    }
    document.getElementById("tBodyCotizacion").innerHTML = scriptDeLlenado;
    document.getElementById("subTotalCotizacion").innerHTML = "Q. " + totalEntradas.toFixed(2);
    document.getElementById("totalDescuento").innerHTML = "Q. " + Number.parseFloat(calcularPorcentaje(totalEntradas)).toFixed(2);
    document.getElementById("totalCotizacion").innerHTML = "Q. " + (totalEntradas - Number.parseFloat(calcularPorcentaje(totalEntradas))).toFixed(2);

}

function calcularPorcentaje(subtotal) {
    var tipoEntrega = document.getElementById("prioridadEntrega");
    var percent = new Number;
    // alert(porcentaje.selectedIndex); para saber que index tengo seleccionado
    // 1 = inmediata(10 % )
    // 2 = normal(5 % )

    if (tipoEntrega.selectedIndex === 1) {
        percent = 0.1;
        document.getElementById("porcentajeDescuento").innerHTML = " 10%:";
    } else if (tipoEntrega.selectedIndex === 2) {
        percent = 0.05;
        document.getElementById("porcentajeDescuento").innerHTML = " 5%:";
    } else {
        percent = 0;
        document.getElementById("porcentajeDescuento").innerHTML = " 0%:";
    }

    return percent * subtotal;

}




function limpiarControlesCotizacion() {
    document.getElementById("codigo-coti").value = "";
    document.getElementById("producto-coti").value = "";
    document.getElementById("cantidad-coti").value = "";
    document.getElementById("precio-coti").value = "";
    document.getElementById("codigo-coti").focus();
}

function guardarLocalStorage() {
    localStorage.setItem(entradasCotizacion);
}

function validarCamposCotizacion() {
    if (document.getElementById("codigo-coti").value == "") {
        alert("El campo Codigo no debe estar vacío");
        return false;
    }
    if (document.getElementById("producto-coti").value == "") {
        alert("El campo Producto no debe estar vacío");
        return false;
    }
    if (document.getElementById("cantidad-coti").value == "") {
        alert("El campo Cantidad no debe estar vacío");
        return false;
    }
    if (document.getElementById("precio-coti").value == "") {
        alert("El campo Precio no debe estar vacío");
        return false;
    }
}

function agregarEntradaCotizacion() {

    // validar campos
    if (validarCamposCotizacion() == false) {
        return false;
    }

    //Agregar la entrada al arreglo
    agregarEntradasCotizacion();

    //Poblar la tabla
    llenarTablaCotizaciones();


    //Limpiar controles
    limpiarControlesCotizacion();
}









//Aseguramos que el arreglo vuelva a  llenarse con el localStorage y no se sobre escriba la info
function inicializarArreglo() {
    if (localStorage.getItem('producto') != null) {
        entradas = JSON.parse(localStorage.getItem('producto'));
    }

    llenarTabla();
}

function Entrada(codigo, producto, cantidad, precio) {
    this.codigo = codigo,
        this.producto = producto,
        this.cantidad = cantidad,
        this.precio = precio
}

function agregarEntradas() {
    var codigo = document.getElementById("codigoEntrada").value;
    var producto = document.getElementById("productoEntrada").value;
    var cantidad = document.getElementById("cantidadEntrada").value;
    var precio = document.getElementById("precioEntrada").value;

    var entrada = new Entrada(codigo, producto, cantidad, precio);

    entradas.push(entrada);

    //almacenar el array de entradas en formato json en el local storage
    localStorage.setItem("producto", JSON.stringify(entradas));
}

function llenarTabla() {
    var scriptDeLlenado = "";
    var totalEntradas = new Number(); //para la sumatoria de los subtotales 
    for (let index = 0; index < entradas.length; index++) {
        scriptDeLlenado += "<tr>";
        scriptDeLlenado += "<td>" + entradas[index].codigo + "</td>";
        scriptDeLlenado += "<td>" + entradas[index].producto + "</td>";
        scriptDeLlenado += "<td>" + entradas[index].cantidad + "</td>";
        scriptDeLlenado += "<td>" + entradas[index].precio + "</td>";
        scriptDeLlenado += "<td>" + entradas[index].cantidad * entradas[index].precio + "</td>";
        scriptDeLlenado += "</tr>"
        totalEntradas += Number.parseInt(entradas[index].cantidad * entradas[index].precio);
    }
    document.getElementById("tBodyEntradas").innerHTML = scriptDeLlenado;
    document.getElementById("totalEntradas").innerHTML = totalEntradas;
}

function limpiarControles() {
    document.getElementById("codigoEntrada").value = "";
    document.getElementById("productoEntrada").value = "";
    document.getElementById("cantidadEntrada").value = "";
    document.getElementById("precioEntrada").value = "";
    document.getElementById("codigoEntrada").focus();

}

function guardarLocalStorage() {
    localStorage.setItem(entradas);
}

function validarCampos() {
    if (document.getElementById("codigoEntrada").value == "") {
        alert("El campo Codigo no debe estar vacío");
        return false;
    }
    if (document.getElementById("productoEntrada").value == "") {
        alert("El campo Producto no debe estar vacío");
        return false;
    }
    if (document.getElementById("cantidadEntrada").value == "") {
        alert("El campo Cantidad no debe estar vacío");
        return false;
    }
    if (document.getElementById("precioEntrada").value == "") {
        alert("El campo Precio no debe estar vacío");
        return false;
    }
}

function agregarEntrada() {

    // validar campos
    if (validarCampos() == false) {
        return false;
    }

    //Agregar la entrada al arreglo
    agregarEntradas();

    //Poblar la tabla
    llenarTabla();


    //Limpiar controles
    limpiarControles();
}



// Funciones para movimiento de Salidas

var salidas = entradas;

function Salida(codigo, producto, cantidad, precio) {
    this.codigo = codigo,
        this.producto = producto,
        this.cantidad = cantidad,
        this.precio = precio
}

function agregarSalidas() {
    var codigo = document.getElementById("codigoSalida").value; //para saber que producto modificar
    var cantidad = document.getElementById("cantidadSalida").value; // cantidad del producto que se modificará
    var productos = JSON.parse(localStorage.getItem("producto"));

    for (let index = 0; index < productos.length; index++) {
        if (productos[index].codigo == codigo) {
            productos[index].cantidad -= cantidad;
            // console.log(productos[index]);
            localStorage.setItem("producto", JSON.stringify(productos));
        }
    }

    inicializarArreglo();
}


function validarCamposSalida() {
    if (document.getElementById("codigoSalida").value == "") {
        alert("El campo Codigo no debe estar vacío");
        return false;
    }
    if (document.getElementById("cantidadSalida").value == "") {
        alert("El campo Cantidad no debe estar vacío");
        return false;
    }
}

function limpiarControlesSalida() {
    document.getElementById("codigoSalida").value = "";
    document.getElementById("cantidadSalida").value = "";
}

function agregarSalida() {

    // validar campos
    if (validarCamposSalida() == false) {
        return false;
    }

    //Agregar la entrada al arreglo
    agregarSalidas();

    //Poblar la tabla
    // llenarTabla();

    //Limpiar controles
    limpiarControlesSalida();
}