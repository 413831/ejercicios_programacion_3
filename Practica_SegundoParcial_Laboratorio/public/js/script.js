$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  traerData();
  console.log(localStorage);
  $("#btnBorrar").click(manejadorBaja);
  $('#btnFiltrar').click(mostrar);
  $("#form").submit(manejadorAlta);

  let datosJSON = JSON.parse(localStorage.getItem("anuncios"));
  // Creacion boxes y selectores para filtros
  crearBoxes(datosJSON, $("#checkBoxes")); // Corregir
  crearSelectores(datos.map(objeto => objeto.transaccion.toLowerCase()).unique().sort(),$("#selectores"),"transaccion");
  crearSelectores(["100000","300000","500000"],$("#selectores"),"precio");
  crearSelectores(["1","3","5"],$("#selectores"),"dormitorio");
}

function manejadorAlta(e) {
  e.preventDefault();
  let listadoJSON = JSON.parse(localStorage.getItem("anuncios"));
  let anuncios = CrearAnuncios(listadoJSON);

  anuncios = Controller.alta(legisladores);
  localStorage.setItem("anuncios",JSON.stringify(anuncios));
  console.log("Alta realizada");

  mostrar();
}

function manejadorModificar(e) {
  e.preventDefault();
  let listadoJSON = JSON.parse(localStorage.getItem("anuncios"));
  let anuncios = CrearAnuncios(listadoJSON);

  anuncios = Controller.modificar(anuncios);
  localStorage.setItem("anuncios",JSON.stringify(anuncios));
  console.log("Modificacion realizada");

  mostrar();
}

function manejadorBaja(e) {
  e.preventDefault();
  let listadoJSON = JSON.parse(localStorage.getItem("anuncios"));
  let anuncios = CrearAnuncios(listadoJSON);

  anuncios = Controller.baja(anuncios);
  localStorage.setItem("anuncios",JSON.stringify(anuncios));
  console.log("Baja realizada");

  mostrar();
}

function mostrar() {
  let datos = JSON.parse(localStorage.getItem("anuncios"));
  datos = filtrarCheckbox(datos);
  $("#tablaDatos").html("");
  $("#tablaDatos").append(crearTabla(datos));

  let uncheckedBox = $("input:checkbox:not(:checked)");
  let selectores = $("#selectores .form-control");

  selectores.map(x => {
    if(selectores[x].disabled == true)
    {
      selectores[x].disabled = false;
    }
  });

  selectores.map(x =>{
    uncheckedBox.each( elemento => {
      if(uncheckedBox[elemento].id.substring(4) == selectores[x].id.substring(4).toLowerCase())
      {
        selectores[x].disabled = true;
      }
    });
  });
}

function CrearAnuncios(datosJSON) {
    var listaAnuncios = [];

    if(datosJSON != null && datosJSON != "")
    {
      datosJSON.forEach(elemento => listaAnuncios.push(new Anuncio(elemento.id, elemento.titulo, elemento.descripcion,
                                                      elemento.transaccion,elemento.precio,elemento.num_wc,
                                                      elemento.num_estacionamiento, elemento.num_dormitorio)));
    }
    return listaAnuncios;
}

function cargarFormulario(e) {
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
  return datosFiltrados;
}

function deshabilitarSelect(array)
{
  selectores = $("select");

  selectores = selectores.each(selector => console.log(selectores[selector]));
}
