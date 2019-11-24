$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  traerData();
  console.log(localStorage);
  $("#btnBorrar").click(manejadorBaja);
  $('#btnFiltrar').click(mostrar);
  $("#form").submit(manejadorAlta);

  let datosJSON = JSON.parse(localStorage.getItem("legisladores"));
  // Creacion boxes y selectores para filtros
  crearBoxes(datosJSON, $("#checkBoxes")); // Corregir
  crearSelectores(datosJSON.map(objeto => objeto.tipo.toLowerCase()).unique().sort(),$("#selectores"),"Cargo");
  crearSelectores(datosJSON.map(objeto => objeto.sexo.toLowerCase()).unique().sort(),$("#selectores"),"Sexo");
}

function manejadorAlta(e) {
  e.preventDefault();
  let listadoJSON = JSON.parse(localStorage.getItem("legisladores"));
  let legisladores = ToLegisladores(listadoJSON);

  legisladores = Controller.alta(legisladores);
  localStorage.setItem("legisladores",JSON.stringify(legisladores));
  console.log("Alta realizada");

  mostrar();
}

function manejadorModificar(e) {
  e.preventDefault();
  let listadoJSON = JSON.parse(localStorage.getItem("legisladores"));
  let legisladores = ToLegisladores(listadoJSON);

  legisladores = Controller.modificar(legisladores);
  localStorage.setItem("legisladores",JSON.stringify(legisladores));
  console.log("Modificacion realizada");

  mostrar();
}

function manejadorBaja(e) {
  e.preventDefault();
  let listadoJSON = JSON.parse(localStorage.getItem("legisladores"));
  let legisladores = ToLegisladores(listadoJSON);

  legisladores = Controller.baja(legisladores);
  localStorage.setItem("legisladores",JSON.stringify(legisladores));
  console.log("Baja realizada");

  mostrar();
}

function mostrar() {
  let datos = JSON.parse(localStorage.getItem("legisladores"));

  $("#tablaDatos").html("");
  $("#tablaDatos").append(crearTabla(filtrarCheckbox(datos)));
}

function ToLegisladores(datosJSON) {
    var listaLegisladores = [];

    if(datosJSON != null && datosJSON != "")
    {
        for (var i = 0; i < datosJSON.length; i++) {
            let id = datosJSON[i].id;
            let nombre = datosJSON[i].nombre;
            let apellido = datosJSON[i].apellido;
            let edad = datosJSON[i].edad;
            let email = datosJSON[i].email;
            let sexo = datosJSON[i].sexo;
            let tipo = datosJSON[i].tipo;

            var legislador = new Legislador(id,nombre, apellido, edad, email, sexo, tipo);
            listaLegisladores.push(legislador);
        }
        return listaLegisladores;
    }
}

function cargarFormulario(e) {
  let fila = e.target.parentElement;
  let nodos = fila.childNodes;

  $("#id").val(nodos[0].innerText);
  $("#nombre").val(nodos[1].innerText);
  $("#apellido").val(nodos[2].innerText);
  $("#edad").val(nodos[3].innerText);
  $("#email").val(nodos[4].innerText);

  if (nodos[5].innerText == "Female") {
    $("#rdoMujer").prop('checked',true);
  } else if (nodos[5].innerText == "Male") {
    $("#rdoHombre").prop('checked',true);
  }

  if (nodos[6].innerText == "Senador") {
    $("#rdoSenador").prop('checked',true);
  } else if (nodos[6].innerText == "Diputado") {
    $("#rdoDiputado").prop('checked',true);
  }

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
        case "sel_Cargo":
          datosFiltrados = datosFiltrados.filter(elemento => {
            if(elemento.transaccion != undefined) elemento.tipo.toLowerCase() === selectores[indice].value;
          });
          break;
        case "sel_Sexo": // Corregir
          datosFiltrados = datosFiltrados.filter(elemento => elemento.sexo.toLowerCase() === selectores[indice].value);
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
