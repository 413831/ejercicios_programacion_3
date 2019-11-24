function guardarData(data) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        mostrar();
      } else {
        // Hacer algo mientras llega la respuesta
        $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
      }
    }
    xhr.open('POST', './data/MOCK_DATA.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data)); // Se parse a a string
  }



  function traerData() {
    let xhr = new XMLHttpRequest();
    let legisladores;
    let celdas;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        //legisladores = JSON.parse(xhr.responseText);
        localStorage.setItem("legisladores",xhr.responseText);
        mostrar();
      } else {
        $("#tablaDatos").html('<img src="./Spinner-1s-200px.gif" alt="spinner">');
      }
    }
    xhr.open('GET', './data/MOCK_DATA.json', true); // Archivo JSON
    xhr.send();
  }
