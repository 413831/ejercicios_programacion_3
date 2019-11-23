var datosJSON;

$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  $("#btnBorrar").click(baja);
  $('#btnFiltrar').click(mostrar);
  $("#form").submit(manejadorAlta);
  traerAnuncios();
  console.log(localStorage);
 // mostrar();
  crearBoxes(datos, $("#checkBoxes")); // Corregir
  crearSelectores(datos.map(objeto => objeto.transaccion.toLowerCase()).unique().sort(),$("#selectores"),"transaccion");
  crearSelectores(["100000","300000","500000"],$("#selectores"),"precio");
  crearSelectores(["1","3","5"],$("#selectores"),"dormitorio");
}

function manejadorAlta(e) {
  e.preventDefault();
  let nuevoAnuncio = obtenerAnuncio(e.target, false);
  console.log(nuevoAnuncio);
  alta(nuevoAnuncio);
}

function manejadorModificar(e) {
  e.preventDefault();
  let anuncio = obtenerAnuncio(e.target, true);
  modificar(anuncio);
}

function alta(anuncio) {
  let anuncios = JSON.parse(localStorage.getItem("anuncios"));
  anuncios.push(anuncio);
  localStorage.setItem("anuncios",JSON.stringify(anuncios));
  console.log("Alta realizada");
  mostrar();
}

function baja(anuncio) {
  let anuncios = JSON.parse(localStorage.getItem("anuncios"));
  anuncios.slice(anuncios.indexOf(anuncio),anuncio);
  localStorage.setItem("anuncios",JSON.stringify(anuncios));
  console.log("Baja realizada");
  mostrar();
}

function modificar(anuncio) {
  let anuncios = JSON.parse(localStorage.getItem("anuncios"));
  anuncios.filter(elemento => {
    if(elemento.id === anuncio.id)
    {
      elemento = anuncio;
      console.log("Modificacion realizada");
    }
  });
  localStorage.setItem("anuncios",JSON.stringify(anuncios));
  mostrar();
}

function mostrar() {
  let anuncios = localStorage.getItem("anuncios");
  console.log("FUNCION MOSTRAR");
  $("#tablaDatos").html("");
  $("#tablaDatos").append(crearTabla(filtrarCheckbox(JSON.parse(anuncios))));
  $("td").click(mostrarAnuncio);
}

function obtenerAnuncio(frm, tieneId) {
  let id;
  let titulo;
  let descripcion;
  let transaccion;
  let precio;
  let num_wc;
  let num_estacionamiento;
  let num_dormitorio;

  for (element of frm.elements) {
    switch (element.name) {
      case "titulo":
        titulo = element.value;
        break;
      case "descripcion":
        descripcion = element.value;
        break;
      case "transaccion":
        if (element.checked === true) {
          transaccion = element.value;
        }
        break;
      case "precio":
        precio = element.value;
        break;
      case "num_wc":
        num_wc = element.value;
        break;
      case "num_estacionamiento":
        num_estacionamiento = element.value;
        break;
      case "num_dormitorio":
        num_dormitorio = element.value;
        break;
      case "id":
        if (tieneId == true) {
          id = element.value;
        }
        break;
    }
  }
  return new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, num_estacionamiento, num_dormitorio);
}

function mostrarAnuncio(e) {
  let fila = e.target.parentElement;
  let nodos = fila.childNodes;

  //document.getElementById('id').value = nodos[0].innerText;
  $("#id").val(nodos[0].innerText);
  $("#id").show();
  $("#lblId").show();
  $("#titulo").val( nodos[1].innerText);

  if (nodos[2].innerText == "Alquiler" || nodos[2].innerText == "alquiler") {
    $("#rdoAlquiler").prop('checked',true);
    // document.getElementById("rdoAlquiler").checked = true;
  } else if (nodos[2].innerText == "Venta" || nodos[2].innerText == "venta") {
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
          datosFiltrados = datosFiltrados.filt  er(elemento => elemento.num_dormitorio >= selectores[indice].value);
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
