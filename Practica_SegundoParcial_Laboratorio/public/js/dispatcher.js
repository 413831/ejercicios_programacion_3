function altaAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        traerAnuncios();
      } else {
        // Hacer algo mientras llega la respuesta
        $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
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
        $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
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
  
//   function traerAnuncios() {
//     let xhr = new XMLHttpRequest();
//     let anuncios;
//     let celdas;
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         anuncios = JSON.parse(xhr.responseText);
//         datosJSON = anuncios.data;
//         $("#tablaDatos").html("");
//         $("#tablaDatos").append(crearTabla(filtrarCheckbox(datosJSON)));
//         $("td").click(mostrarAnuncio);
//       } else {
//         $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
//       }
//     }
//     xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
//     xhr.send();
//   }

  function traerAnuncios() {
    let xhr = new XMLHttpRequest();
    let anuncios;
    let celdas;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        anuncios = JSON.parse(xhr.responseText);
        localStorage.setItem("anuncios",JSON.stringify(anuncios.data));
        mostrar();
      } else {
        $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
      }
    }
    xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
    xhr.send();
  }