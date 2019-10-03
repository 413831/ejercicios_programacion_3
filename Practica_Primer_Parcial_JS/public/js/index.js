var frm;

window.addEventListener('load',inicializarManejadores);

function inicializarManejadores(){
    frm = document.forms[0];

    frm.addEventListener('submit', manejadorSubmit);
}

function manejadorSubmit(e){
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    altaAnuncio(nuevoAnuncio);
}

function obtenerAnuncio(frm, tieneId) {
    let titulo;
    let descripcion;
    let precio;
    let transaccion;
    let dormitorios;
    let wc;
    let estacionamiento;
    let id = -1;
    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "transaccion":
                transaccion = element.checked;
                break;
            case "dormitorios":
                dormitorios = element.value;
                break;
            case "wc":
                wc = element.value;
                break;
            case "estacionamiento":
                estacionamiento = element.value;
                break;
            case "idPersona": // QUE ONDA EL ID
                if (tieneId == true) {
                    id = element.value;
                } else {
                    id = -1;
                }
                break;
        }
    }
    return new Anuncio(titulo, descripcion, precio , dormitorios, estacionamiento ,wc, transaccion);
}

function altaAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    console.log(anuncio);
    xhr.send(JSON.stringify(anuncio));
}

function traerAnuncios() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.getElementById("tablaDatos").innerHTML = "";
                let anuncios = JSON.parse(xhr.responseText);
                document.getElementById("tablaDatos").appendChild(crearTabla(anuncios.data));
          //      let tds = document.getElementsByTagName("td");
               // for (var i = 0; i < tds.length; i++) {
            //        let td = tds[i];
              //      td.addEventListener('click', setValues);
           //     }
            } else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
    xhr.send();
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idPersona").value = nodos[0].innerText;
    document.getElementById("idPersona").hidden = false;

    document.getElementById("lblId").hidden = false;
    document.getElementById("nombre").value = nodos[1].innerText;
    document.getElementById("apellido").value = nodos[2].innerText;
    document.getElementById("edad").value = nodos[3].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);
}