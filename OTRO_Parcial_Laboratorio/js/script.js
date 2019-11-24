var datosJSON;

$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  traerData();
  console.log(localStorage);
  $("#btnBorrar").click(manejadorBaja);
  $('#btnFiltrar').click(mostrar);
  $("#form").submit(manejadorAlta);
  //crearBoxes(datosJSON, $("#checkBoxes")); // Corregir
  //crearSelectores(datos.map(objeto => objeto.transaccion.toLowerCase()).unique().sort(),$("#selectores"),"transaccion");
}

function manejadorAlta(e) {
  e.preventDefault();
  console.log(e);
  let listadoJSON = JSON.parse(localStorage.getItem("legisladores"));
  let legisladores = ToLegisladores(listadoJSON);
  legisladores =   Controller.alta(legisladores);
  console.log(legisladores);
  localStorage.setItem("legisladores",JSON.stringify(legisladores));

  console.log("Alta realizada");
  mostrar();
}

function manejadorModificar(e) {
  e.preventDefault();

  let persona = obtenerPersona(e.target, true);
  console.log(persona);
  modificar(persona.id);
}

function manejadorBaja(e) {
  e.preventDefault();
  Controller.baja();
}

// function alta(persona) {
//   let personas = JSON.parse(localStorage.getItem("legisladores"));
//
//   personas.push(persona);
//
//   localStorage.setItem("legisladores",JSON.stringify(personas));
//   console.log("Alta realizada");
//   mostrar();
// }

// function baja(e) {
//   let personas = JSON.parse(localStorage.getItem("legisladores"));
//   let id = $("#id").val();
//   let index = GetIndex(id);
//
//   personas.splice(index,1);
//
//   localStorage.setItem("legisladores",JSON.stringify(personas));
//   console.log("Baja realizada");
//   mostrar();
// }

function modificar(id) {
  let personas = JSON.parse(localStorage.getItem("legisladores"));
  let persona = GetById(id);
  let index = GetIndex(id);

  personas.splice(index,1,persona[0]);
  localStorage.setItem("legisladores",JSON.stringify(personas));
  mostrar();
}

function mostrar() {
  let personas = JSON.parse(localStorage.getItem("legisladores"));
  $("#tablaDatos").html("");
  //$("#tablaDatos").append(crearTabla(filtrarCheckbox(JSON.parse(personas))));
  $("#tablaDatos").append(crearTabla(personas));
  $("td").click(mostrarPersona);
}

function obtenerPersona(frm, tieneId) {
  let id;
  let nombre;
  let apellido;
  let edad;
  let email;
  let sexo;
  let funcion;
  let legislador;

  for (element of frm.elements) {
    switch (element.name) {
      case "nombre":
        nombre = element.value;
        break;
      case "apellido":
        apellido = element.value;
        break;
      case "edad":
        edad = element.value;
        break;
      case "email":
        email = element.value;
        break;
      case "sexo":
        if (element.checked === true) {
          sexo = element.value;
        }
        break;
      case "funcion":
        if (element.checked === true) {
          funcion = element.value;
        }
        break;
      case "id":
        if (tieneId == true) {
          id = element.value;
        }
        else{
          id = GenerateId();
        }
        break;
    }
  }
  legislador = new Legislador(id,nombre, apellido, edad, email, sexo, funcion);
  console.log(legislador);
  return legislador;
}

function GenerateId()
{
  let legisladores = JSON.parse(localStorage.getItem("legisladores"));

  if(legisladores)
  {
    var IDMasAlto = legisladores.reduce(function (IDMasAlto, legislador, i, array) {
               if (legislador.id > IDMasAlto) {
                   IDMasAlto = legislador.id;
               };
               return IDMasAlto;
           }, 0);
    return IDMasAlto+1;
  }
}

function GetById(id)
{
  let legisladores = JSON.parse(localStorage.getItem("legisladores"));

  if(legisladores)
  {
    var legislador = legisladores.filter(x =>{
      if(x.id == id) return x;
    });
  }
  return legislador;
}

function GetIndex(id)
{
  let legisladores = JSON.parse(localStorage.getItem("legisladores"));
  let index = 0;

  if(legisladores)
  {
    for(index = 0 ; index < legisladores.length;index++)
    {
      if(legisladores[index].id == id)
      {
        break;
      }
    }
  }
  return index;
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


function mostrarPersona(e) {
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
