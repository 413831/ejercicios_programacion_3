function crearTabla(array){
    var tabla = document.createElement("table");
    //tabla.className = "tabla" y darle estilo desde el css

    tabla.setAttribute('border','1px solid black');
    tabla.setAttribute('style','border-collapse:collapse');
    tabla.setAttribute('width','700px');
    
    let cabecera = document.createElement("tr");

    for(atributo in array[0]){
        let th = document.createElement("th");
        th.textContent = atributo; 
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for(var i in array){
        var fila = document.createElement("tr");
        var unObjeto = array[i];

        for(j in unObjeto)
        {
            var celda = document.createElement("td");
            celda.setAttribute("style","text-align:center");
            var dato = document.createTextNode(unObjeto[j]);
            celda.appendChild(dato);            
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    
    //manejadorTR(table.querySelectorAll("tr"));
    return tabla;
}