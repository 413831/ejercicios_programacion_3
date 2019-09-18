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

    return tabla;
}