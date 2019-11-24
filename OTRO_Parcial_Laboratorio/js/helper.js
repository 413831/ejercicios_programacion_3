Array.prototype.unique = function() {return [...new Set(this)]};

function crearTabla(array) {
    let tabla = document.createElement("table");
    let cabecera = document.createElement("thead");
    let cuerpo = document.createElement("tbody");
    let tr = document.createElement("tr");
    // Atributos para Bootstrap
    tabla.className= "table table-dark  table-striped table-hover";
    tr.className = "table-primary";

    //Completando cabecera
    for (atributo in array[0]) {
            let th = document.createElement("th");

            th.textContent = atributo;
            th.scope = "col";
            tr.appendChild(th);
            cabecera.appendChild(tr);
    }

    tabla.appendChild(cabecera);

    for (i in array) {
        let fila = document.createElement("tr");
        let objeto = array[i];
        for (j in objeto) {
            var celda = document.createElement("td");
            var dato = document.createTextNode(objeto[j]);
            celda.addEventListener('click',cargarFormulario);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        cuerpo.appendChild(fila);
        tabla.appendChild(cuerpo);
    }
    return tabla;
}

function crearBoxes(array, seccion) {
    for (atributo in array[0]) {
        if (atributo != "id") {
            let label = document.createElement("label");
            let checkbox = document.createElement("input");
            let inputGroup = document.createElement("div");
            let inputText = document.createElement("div");
            // Atributos para Bootstrap
            label.className = "form-control";
            inputGroup.className = "input-group-prepend";
            inputText.className = "input-group-text";

            label.htmlFor = "chk_" + atributo; // Enlace con entre el label y el checkbox
            label.appendChild(document.createTextNode(atributo));

            checkbox.type = "checkbox";
            checkbox.name = "chk_" + atributo;
            checkbox.id = "chk_" + atributo;
            checkbox.value = atributo;
            checkbox.checked = true;
            checkbox.addEventListener('click',traerData);
            checkbox.addEventListener('click',deshabilitarOpcion);
            inputText.appendChild(checkbox);
            inputGroup.appendChild(inputText);

            seccion.append(inputGroup);
            seccion.append(label);
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

  select.className = "form-control col-5";
  select.id = "sel_" + atributo;
  label.className = "form-check-label";
  label.htmlFor = "sel_" + atributo;
  label.id = "lbl_" + atributo;
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

function deshabilitarOpcion(e)
{
  console.log(e.target);
  let atributo = e.target.value;
  let selector;
  let checkbox = $('#chk_'+atributo);

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
