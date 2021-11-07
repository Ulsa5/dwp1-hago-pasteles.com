function ObtenerDatos() {
    let url = 'https://localhost:44309/api/Movimientos/'; //Dirección del API
    // console.log(url);
    var contenido = document.querySelector('#tBodyEntregas');
    var i = 0;
    let subtotal = 0;
    let total=0;

    $.get(url, function (respuesta) { //Consumo del API con el método get de jQuery

        // console.log(respuesta)
        respuesta.forEach(function (item) {
            console.log(item)
            console.log('iteración ' + i);

            contenido.innerHTML = `
                <tr>
                    <td>${item.codigoMovimiento}</td>
                    <td>${item.fechaMovimiento}</td>
                    <td>${item.proveedores[i].nitProveedor}</td>
                    <td>${item.proveedores[i].nombreProveedor}</td>
                    <td>${item.cantidadProducto}</td>
                    <td>${item.productos[i].nombreProducto}</td>
                    <td>${item.productos[i].precioProducto}</td>
                    <td>${subtotal=item.productos[i].precioProducto*item.cantidadProducto}</td>
                    <td>${item.tipoMovimiento}</td>
                    <td>
                        <a href="../pages/nueva-entrada.html" class="btn btn-success"><i class="fas fa-edit"></i></a>
                        <a class="btn btn-danger"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>`
            i += 1;
            total+=subtotal;
            document.getElementById("totalEntradas").innerHTML=total;
        });
        

    }, "json")
    
    
}