var datosJSON;

$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  $("#btnBorrar").click(baja);
  $('#btnFiltrar').click(mostrar);
  $("#form").submit(alta);
  // traerData();
  console.log(localStorage);
 // mostrar();
  crearBoxes(datosJSON, $("#checkBoxes")); // Corregir
  crearSelectores(datos.map(objeto => objeto.transaccion.toLowerCase()).unique().sort(),$("#selectores"),"transaccion");

}

function manejadorAlta(e) {
  e.preventDefault();
  let nuevaPersona = obtenerPersona(e.target, false);
  alta(nuevaPersona);
}

function manejadorModificar(e) {
  e.preventDefault();
  let persona = obtenerPersona(e.target, true);
  modificar(persona);
}

function alta(persona) {
  let personas = JSON.parse(localStorage.getItem("anuncios"));
  personas.push(persona);
  localStorage.setItem("legisladores",JSON.stringify(personas));
  console.log("Alta realizada");
  mostrar();
}

function baja(persona) {
  let personas = JSON.parse(localStorage.getItem("anuncios"));
  personas.slice(personas.indexOf(persona),persona);
  localStorage.setItem("legisladores",JSON.stringify(personas));
  console.log("Baja realizada");
  mostrar();
}

function modificar(persona) {
  let personas = JSON.parse(localStorage.getItem("anuncios"));
  personas.filter(elemento => {
    if(elemento.id === anuncio.id)
    {
      elemento = persona;
      console.log("Modificacion realizada");
    }
  });
  localStorage.setItem("anuncios",JSON.stringify(personas));
  mostrar();
}

function mostrar() {
  let personas = localStorage.getItem("anuncios");
  
  $("#tablaDatos").html("");
  $("#tablaDatos").append(crearTabla(filtrarCheckbox(JSON.parse(personas))));
  $("td").click(mostrarAnuncio);
}

function obtenerPersona(frm, tieneId) {
  let id;
  let nombre;
  let apellido;
  let edad;
  let email;
  let sexo;
  let funcion;

  for (element of frm.elements) {
    switch (element.name) {
      case "nombre":
        titulo = element.value;
        break;
      case "apellido":
        descripcion = element.value;
        break;
      case "edad":
        precio = element.value;
        break;
      case "email":
        num_wc = element.value;
        break;
      case "sexo":
        if (element.checked === true) {
          transaccion = element.value;
        }
        break;
      case "funcion":
        if (element.checked === true) {
          transaccion = element.value;
        }
        break;
      case "id":
        if (tieneId == true) {
          id = element.value;
        }
        break;
    }
  }
  return new Legislador(id,nombre, apellido, edad, email, sexo, funcion);
}

function mostrarPersona(e) {
  let fila = e.target.parentElement;
  let nodos = fila.childNodes;

  $("#nombre").val(nodos[0].innerText);

  if (nodos[2].innerText == "Alquiler") {
    $("#rdoAlquiler").prop('checked',true);
    // document.getElementById("rdoAlquiler").checked = true;
  } else if (nodos[0].innerText == "Venta") {
    $("#rdoVenta").prop('checked',true);
    // document.getElementById("rdoVenta").checked = true;
  }

  $("#descripcion").val(nodos[3].innerText);
  $("#precio").val(nodos[4].innerText);
  $("#num_wc").val(nodos[5].innerText);
  $("#num_estacionamiento").val(nodos[6].innerText);
  $("#num_dormitorio").val(nodos[7].innerText);
  $("#btnCrearModificar").text("Modificar");

  $("#btnBorrar").show();
  $("#form").off("submit",manejadorAlta);
  $("#form").submit(manejadorModificar);

  // document.getElementById('descripcion').value = nodos[3].innerText;
  // document.getElementById('precio').value = nodos[4].innerText;
  // document.getElementById('num_wc').value = nodos[5].innerText;
  // document.getElementById('num_estacionamiento').value = nodos[6].innerText;
  // document.getElementById('num_dormitorio').value = nodos[7].innerText;
  // document.getElementById('btnCrearModificar').innerText = "Modificar";
  // document.getElementById('btnBorrar').hidden = false
  // frm.removeEventListener('submit', manejadorAlta);
  // frm.addEventListener('submit', manejadorModificar);
}

function filtrarCheckbox(datosJSON) {
  let opciones = ['id'];
  let datosFiltrados = [];
  let objeto;
  // Levanto todos los checkboxes seleccionados
  $('.box input:checked').each(function() {
    opciones.push($(this).val());
  })
  // Filtro cada objeto del JSON por los atributos de los checkboxes
  datosFiltrados = datosJSON.map( dato => {
      objeto = new Object();
      opciones.forEach(atributo => objeto[atributo] = dato[atributo]);
      return objeto;
  });
  return filtrarPorSelector(datosFiltrados);
}

function filtrarPorSelector(array)
{
  let selectores = $('#selectores select');
  let datosFiltrados = array;
  selectores = selectores.filter(indice => selectores[indice].value != "Todos");
  console.log(selectores)
  // Ver como hacerlo generico
  if(selectores.length > 0)
  {
    selectores.each( indice => {
      selector = selectores[indice].id;
      switch (selector) {
        case "sel_Transaccion":
          datosFiltrados = datosFiltrados.filter(elemento => {
            if(elemento.transaccion != undefined) elemento.transaccion.toLowerCase() === selectores[indice].value;
          });
          break;
        case "sel_Precio": // Corregir
          datosFiltrados = datosFiltrados.filter(elemento => elemento.precio <= selectores[indice].value);
          break;
        case "sel_Dormitorios": // Corregir
          datosFiltrados = datosFiltrados.filter(elemento => elemento.num_dormitorio >= selectores[indice].value);
          break;
        default:
          break;
      }
    });
  }
  else if (datosFiltrados.length == 0){
    return array;
  }
  console.log(datosFiltrados);
  return datosFiltrados;
}
