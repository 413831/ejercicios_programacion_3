
function altaAnuncio(anuncio)
{
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            traerAnuncios();
        }
        else {
            var spinner = '<img src="./Spinner-1s-200px.gif" alt="spinner" >';
            document.getElementById("tablaDatos").innerHTML = spinner;
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
        else {
            var spinner = '<img src="./Spinner-1s-200px.gif" alt="spinner" >';
            document.getElementById("tablaDatos").innerHTML = spinner;
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
        else {
            var spinner = '<img src="./Spinner-1s-200px.gif" alt="spinner" >';
            document.getElementById("tablaDatos").innerHTML = spinner;
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
        else {
            var spinner = '<img src="./Spinner-1s-200px.gif" alt="spinner" >';
            document.getElementById("tablaDatos").innerHTML = spinner;
        }
    }
    xhr.open('GET', 'http://localhost:3000/traerAnuncios', true);
    xhr.send();
}
