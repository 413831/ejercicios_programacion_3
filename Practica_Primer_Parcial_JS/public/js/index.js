var frm;

window.addEventListener('load',inicializarManejadores);

function inicializarManejadores(){
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorAlta);
    document.getElementById("btnBorrar").addEventListener('click',borrarAnuncio);
    traerAnuncios();
}

function manejadorAlta(e){
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, false);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target, true);
    modificarAnuncio(nuevoAnuncio);
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
                if(element.checked === true)
                {
                    transaccion = element.value;
                }
                break;
            case "num_dormitorio":
                dormitorios = element.value;
                break;
            case "num_wc":
                wc = element.value;
                break;
            case "num_estacionamiento":
                estacionamiento = element.value;
                break;
            case "idAnuncio": // QUE ONDA EL ID
                if (tieneId == true) {
                    id = element.value;
                } else {
                    id = -1;
                }
                break;
        }
    }
    return new Anuncio(id,titulo, descripcion, precio , dormitorios, estacionamiento ,wc, transaccion);
}

function altaAnuncio(anuncio)
{
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            traerAnuncios();
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    console.log(anuncio);
    xhr.send(JSON.stringify(anuncio));
}


function borrarAnuncio() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorAlta);
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaAnuncio', true);
    xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
    xhr.send(obtenerId(frm));
}

function modificarAnuncio(anuncio) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            traerAnuncios();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorAlta);
        }
    }
    xhr.open('POST', 'http://localhost:3000/modificarAnuncio', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    anuncio.active = true;
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
                let tds = document.getElementsByTagName("td");
                for (var i = 0; i < tds.length; i++)
                 {
                    let td = tds[i];
                    td.addEventListener('click', setValues);
                }
            } else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
    xhr.send();
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idAnuncio") {
            return `id=${element.value}`;
        }
    }
}

function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;

    document.getElementById("lblId").hidden = false;
    document.getElementById("titulo").value = nodos[1].innerText;
    if(nodos[2].innerText == "Venta")
    {
        document.getElementById("rdoVenta").checked = true;
    }
    else if(nodos[2].innerText == "Alquiler" )
    {
        document.getElementById("rdoAlquiler").checked = true;
    }
    document.getElementById("descripcion").value = nodos[3].innerText;
    document.getElementById("precio").value = nodos[4].innerText;
    document.getElementById("num_wc").value = nodos[5].innerText;
    document.getElementById("num_estacionamiento").value = nodos[6].innerText;
    document.getElementById("num_dormitorio").value = nodos[7].innerText;

    document.getElementById("btnCrearModificar").innerText = "Modificar";
    document.getElementById("btnBorrar").hidden = false;
    frm.removeEventListener('submit', manejadorAlta);
    frm.addEventListener('submit', manejadorModificar);
}

function limpiarValues() {
    document.getElementById("idAnuncio").value = "";
    document.getElementById("idAnuncio").hidden = true;

    document.getElementById("lblId").hidden = true;
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = 0;
    document.getElementById("num_dormitorio").value = 0;
    document.getElementById("num_estacionamiento").value = 0;
    document.getElementById("num_wc").value = 0;
    document.getElementById("rdoVenta").checked = false;
    document.getElementById("rdoAlquiler").checked = false;

    document.getElementById("btnCrearModificar").innerText = "Crear";
    document.getElementById("btnBorrar").hidden = true;
}
