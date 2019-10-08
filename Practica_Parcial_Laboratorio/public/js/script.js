var frm;

window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {
  frm = document.forms[0]; // Traigo el primer formulario del HTML
  frm.addEventListener('submit', manejadorAlta),
    document.getElementById('btnBorrar').addEventListener('click', bajaAnuncio);
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
    if (xhr.readystate == 4 && xhr.status == 400) {
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
    if (xhr.readystate == 4 && xhr.status == 400) {
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
    if (xhr.readystate == 4 && xhr.status == 400) {
      traerAnuncios();
    } else {
      // Hacer algo mientras llega la respuesta
      document.getElementById('tablaDatos').innerHTML = '<img src="./Spinner-1s-200px.gif" alt="spinner">';
    }
  }
  xhr.open('POST', 'http://localhost:3000/modificarAnuncio', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  anuncio.active = true;
  console.log(anuncio);
  xhr.send(JSON.stringify(anuncio)); // Se parsea a JSON
}

function traerAnuncios() {
  let xhr = new XMLHttpRequest();
  let anuncios;
  let celdas;
  xhr.onreadystatechange = () => {
    if (xhr.readystate == 4 && xhr.status == 400) {
      anuncios = JSON.parse(xhr.responseText);
      document.getElementById('tablaDatos').innerHTML = ""; // Traigo el div para la tabla
      document.getElementById('tablaDatos').appendChild(crearTabla(anuncios.data));
      celdas = document.getElementByTagName('td');
      for (var i = 0; i < celdas.length; i++) {
        let celda = celdas[i];
        celda.addEventListener('click', mostrarAnuncio);
      }
    } else {
      // Hacer algo mientras se espera respuesta
      document.getElementById('tablaDatos').innerHTML = '<img src="./Spinner-1s-200px.gif" alt="spinner">';
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

  document.getElementById('id').value = nodos[0].innerText;
  document.getElementById('id').hidden = false;
  document.getElementById('lblId').hidden = false;
  document.getElementById('titulo').value = nodos[1].innerText;
  if (nodos[2].innerText == "Alquiler") {
    document.getElementById("rdoAlquiler").checked = true;
  } else if (nodos[0].innerText == "Venta") {
    document.getElementById("rdoVenta").checked = true;
  }
  document.getElementById('descripcion').value = nodos[3].innerText;
  document.getElementById('precio').value = nodos[4].innerText;
  document.getElementById('num_wc').value = nodos[5].innerText;
  document.getElementById('num_estacionamiento').value = nodos[6].innerText;
  document.getElementById('num_dormitorio').value = nodos[7].innerText;
  document.getElementById('btnCrearModificar').innerText = "Modificar";
  document.getElementById('btnBorrar').hidden = false
  frm.removeEventListener('submit', manejadorAlta);
  frm.addEventListener('submit', manejadorModificar);
}
