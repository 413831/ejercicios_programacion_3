function crearTabla(array) {
  var tabla = document.createElement('table');
  var cabecera = document.createElement('tr');
  tabla.className = "tabla";

  for(atributo in array[0]) // Se crea cabecera de la tabla
  {
    let th = document.createElement('th');
    if(atributo == "num_wc" || atributo == "num_dormitorio" || atributo == "num_estacionamiento")
    {
      th.textContent = atributo.substring(4);
    }
    else {
      th.textContent = atributo;
    }
    cabecera.appendChild(th);
  }
  tabla.appendChild(cabecera);

  for(i in array){
    var fila = document.createElement('tr');
    var objeto = array[i];
    for(j in objeto){
        var celda = document.createElement('td');
        var dato = document.createTextNode(objeto[j]);
        celda.appendChild(dato);
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  return tabla;
}

function crearBoxes(array, seccion) {
    var divBox = seccion;
    for (atributo in array[0]) {
        if (atributo != "id") {
            let div = document.createElement("div");
            div.classList.add("box");
            let labelA = document.createElement("label");
            labelA.htmlFor = "chk_" + atributo;
            if(atributo == "num_wc" || atributo == "num_dormitorio" || atributo == "num_estacionamiento")
            {
              labelA.appendChild(document.createTextNode(atributo.substring(4)));
            }
            else {
              labelA.appendChild(document.createTextNode(atributo));
            }
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "chk_" + atributo;
            checkbox.id = "chk_" + atributo;
            checkbox.value = atributo;
            checkbox.checked = true;
            checkbox.onclick = filtrarCheckbox;
            div.appendChild(labelA);
            div.appendChild(checkbox);
            divBox.append(div);
        } else {
            let div = document.createElement("div");
            divBox.append(div);
        }
    }
    return divBox;
}

function crearSelector(array){
  let div = document.createElement('div');



}
