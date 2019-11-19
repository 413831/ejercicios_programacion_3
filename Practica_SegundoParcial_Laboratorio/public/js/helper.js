Array.prototype.unique = function() {return [...new Set(this)]};

function crearTabla(array) {
  let tbody = document.createElement("tbody");
    let col = document.createElement("div");
    col.className = "col-10";
    let tabla = document.createElement("table");
    tabla.className= "table table-responsive table-bordered table-striped table-hover";

    let cabecera = document.createElement("tr");
    cabecera.className = "table-primary justify-content-md-center";
    //Completando cabecera}
    for (atributo in array[0]) {
            let th = document.createElement("th");
            if(atributo == "num_wc" || atributo == "num_dormitorio" || atributo == "num_estacionamiento")
            {
              th.textContent = atributo.substring(4);
            }
            else {
              th.textContent = atributo;
            }
            cabecera.appendChild(th);

    }
    tbody.appendChild(cabecera)
    tabla.appendChild(tbody);

    for (i in array) {

        let fila = document.createElement("tr");
        fila.className = "table-stripped";
        let objeto = array[i];
        for (j in objeto) {
            var celda = document.createElement("td");
            var dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
        tabla.appendChild(tbody);
    }
    return tabla;
}

function crearBoxes(array, seccion) {
    for (atributo in array[0]) {
        if (atributo != "id") {
            let div = document.createElement("div");
            let labelA = document.createElement("label");
            labelA.className = "form-check-label";
            labelA.htmlFor = "chk_" + atributo; // Enlace con entre el label y el checkbox
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
            checkbox.addEventListener('click',traerAnuncios);
            checkbox.addEventListener('click',deshabilitarSelect);
            div.appendChild(labelA);
            div.appendChild(checkbox);
            seccion.append(div);
        } else {
            let div = document.createElement("div");
            seccion.append(div);
        }
    }
    return seccion;
}

function crearSelectores(array, seccion, atributo)
{
  let div = document.createElement("div");
  let select = document.createElement("select");
  let option = document.createElement('option');
  let label = document.createElement('label');
  select.id = "sel_" + atributo;
  label.htmlFor = "sel_" + atributo;
  label.appendChild(document.createTextNode(atributo));
  option.value = "Todos"; // Por defecto se agrega opcion TODOS
  option.textContent = "Todos";
  select.appendChild(option);

  array.forEach(valor => {
        let option = document.createElement('option');
        option.value = valor;
        option.textContent = valor;
        select.appendChild(option);
  });
  seccion.append(label);
  seccion.append(select);
  return seccion;
}

function limpiarSelect(select) {
    //select.options.length = 0;
    while (select.hasChildNodes()) {
        select.removeChild(select.firstElementChild);
    }
}

function deshabilitarSelect(e)
{
  console.log(e.target);
  let atributo = e.target.value;
  let selector;
  let checkbox = $('#chk_'+atributo);

  if(atributo == "num_dormitorio")
  {
    atributo = atributo.substring(4);
  }
  selector = $('#sel_'+atributo);

  if(!checkbox.prop('checked'))
  {
    selector.prop("disabled", true);
  }
  else {
    selector.prop("disabled", false);
  }
  console.log(selector);
}
