var datosJSON;

$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  traerData();
  console.log(localStorage);
  $("#btnBorrar").click(baja);
  $('#btnFiltrar').click(mostrar);
  $("#form").submit(manejadorAlta);
  //crearBoxes(datosJSON, $("#checkBoxes")); // Corregir
  //crearSelectores(datos.map(objeto => objeto.transaccion.toLowerCase()).unique().sort(),$("#selectores"),"transaccion");

}

function manejadorAlta(e) {
  e.preventDefault();
  console.log(e);
  let nuevaPersona = obtenerPersona(e.target, false);
  console.log(nuevaPersona);
  alta(nuevaPersona);
}

function manejadorModificar(e) {
  e.preventDefault();

  let persona = obtenerPersona(e.target, true);
  console.log(persona);
  modificar(persona);
}

function manejadorBaja(e) {
  e.preventDefault();
  let persona = obtenerPersona(e.target, true);
  modificar(persona);
}

function alta(persona) {
  let personas = JSON.parse(localStorage.getItem("legisladores"));
  personas.push(persona);
  localStorage.setItem("legisladores",JSON.stringify(personas));
  console.log("Alta realizada");
  mostrar();
}

function baja(e) {
  let personas = JSON.parse(localStorage.getItem("legisladores"));
  let id = $("#id").val();
  let persona = GetById(id);

  console.log(id);
  console.log("BAJA" + persona);
  personas.splice(persona.id,1);
  console.log(personas);

  localStorage.setItem("legisladores",JSON.stringify(personas));
  console.log("Baja realizada");
  mostrar();
}

function modificar(persona) {
  let personas = JSON.parse(localStorage.getItem("legisladores"));
  console.log(persona);
  personas.splice(persona.id,1,persona);
  console.log(personas);
  localStorage.setItem("legisladores",JSON.stringify(personas));
  mostrar();
}

function mostrar() {
  let personas = localStorage.getItem("legisladores");
  console.log(JSON.parse(personas));
  $("#tablaDatos").html("");
  //$("#tablaDatos").append(crearTabla(filtrarCheckbox(JSON.parse(personas))));
  $("#tablaDatos").append(crearTabla(JSON.parse(personas)));
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
          let id = GenerateId();
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
