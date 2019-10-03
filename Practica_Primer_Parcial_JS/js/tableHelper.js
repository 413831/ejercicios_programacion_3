function crearTabla(array) {
    var tabla = document.createElement("table");
    // tabla.setAttribute('border', '1px solid black');
    // tabla.setAttribute('style', 'border-collapse:collapse');
    // tabla.setAttribute('width', '700px');
    tabla.className = 'tabla';

    let cabecera = document.createElement("tr");

    for (atributo in array[0]) {
        if (atributo != "toString") {
            let th = document.createElement("th");
            th.textContent = atributo;
            cabecera.appendChild(th);
        }
    }

    tabla.appendChild(cabecera);

    for (i in array) {
        var fila = document.createElement("tr");
        var objeto = array[i];

        for (j in objeto) {
            if (j != "toString") {
                var celda = document.createElement("td");
                // celda.setAttribute('style', 'text-align:center');
                var dato = document.createTextNode(objeto[j]);
                celda.appendChild(dato);
                fila.appendChild(celda);
            }
        }
        tabla.appendChild(fila);
    }
    return tabla;
}