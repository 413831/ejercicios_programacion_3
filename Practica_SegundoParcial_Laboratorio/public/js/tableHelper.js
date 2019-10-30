function crearTabla(array) {
  var tabla = document.createElement('table');
  tabla.className = "tabla";
  var cabecera = document.createElement('tr');

  for(atributo in array[0]) // Se crea cabecera de la tabla
  {
    let th = document.createElement('th');
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type","checkbox");
    checkbox.id = "check" + atributo;
    th.textContent = atributo;
    th.appendChild(checkbox);
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

function crearSelector(array){
  let div = document.createElement('div');



}
