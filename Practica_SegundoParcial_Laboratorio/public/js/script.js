var datosJSON;

$(function () {
    inicializarManejadores();
})

function inicializarManejadores() {
  $("#btnBorrar").click(bajaAnuncio);
  $("#form").submit(manejadorAlta);
  traerAnuncios();
  crearBoxes(datos, $("#checkBoxes")); // Corregir
  crearSelectores(datos.map(objeto => objeto.transaccion.toLowerCase()).unique().sort(),$("#selectores"),"Transaccion");
  crearSelectores(["100.000","300.000","500.000"],$("#selectores"),"Precio");
}

function manejadorAlta(e) {
  e.preventDefault();
  let nuevoAnuncio = obtenerAnuncio(e.target, false);
  altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
  e.preventDefault();
  let anuncio = obtenerAnuncio(e.target, true);
  modificarAnuncio(anuncio);
}

function altaAnuncio(anuncio) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      traerAnuncios();
    } else {
      // Hacer algo mientras llega la respuesta
      document.getElementById('tablaDatos').innerHTML = '<img src="./Spinner-1s-200px.gif" alt="spinner">';
    }
  }
  xhr.open('POST', 'http://localhost:3000/altaAnuncio', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(anuncio);
  xhr.send(JSON.stringify(anuncio)); // Se parsea a JSON
}

function bajaAnuncio(anuncio) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      traerAnuncios();
    } else {
      // Hacer algo mientras llega la respuesta
      document.getElementById('tablaDatos').innerHTML = '<img src="./Spinner-1s-200px.gif" alt="spinner">';
    }
  }
  xhr.open('POST', 'http://localhost:3000/bajaAnuncio', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  console.log(anuncio);
  xhr.send(JSON.stringify(anuncio)); // Se parsea a JSON
}

function modificarAnuncio(anuncio) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      traerAnuncios();
    } else {
      // Hacer algo mientras llega la respuesta
      // document.getElementById('tablaDatos').innerHTML = '<img src="./Spinner-1s-200px.gif" alt="spinner">';
      $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
    }
  }
  xhr.open('POST', 'http://localhost:3000/modificarAnuncio', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  if(anuncio != undefined)
  {
    anuncio.active = true;
  }
  console.log(anuncio);
  xhr.send(JSON.stringify(anuncio)); // Se parsea a JSON
}

function traerAnuncios() {
  let xhr = new XMLHttpRequest();
  let anuncios;
  let celdas;
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      anuncios = JSON.parse(xhr.responseText);
      datosJSON = anuncios.data;
      $("#tablaDatos").html("");
      $("#tablaDatos").append(crearTabla(filtrarCheckbox(datosJSON)));
      $("td").click(mostrarAnuncio);
    } else {
      $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
    }
  }
  xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
  xhr.send();
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
  return datosFiltrados;
}
