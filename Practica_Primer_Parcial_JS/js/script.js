let frm;

window.addEventListener('load', inicializarManejadores);
window.addEventListener('load', armarTabla);

function inicializarManejadores() {
    frm = document.forms[0];
    frm.addEventListener('submit', manejadorSubmit);
    document.getElementById("btnBorrar").addEventListener('click', borrarPersona);
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevaPersona = obtenerPersona(e.target, false);
    altaPersona(nuevaPersona);
}

function manejadorModificar(e) {
    e.preventDefault();
    let persona = obtenerPersona(e.target, true);
    modificarPersona(persona);
}

function obtenerPersona(frm, tieneId) {
    let nombre;
    let apellido;
    let edad;
    let id = -1;
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
            case "idPersona":
                if (tieneId == true) {
                    id = element.value;
                } else {
                    id = -1;
                }
                break;
        }
    }
    return new Persona(id, nombre, apellido, edad);
}

function obtenerId(frm) {
    for (element of frm.elements) {
        if (element.name === "idPersona") {
            return `id=${element.value}`;
        }
    }
}

function armarTabla() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                document.getElementById("divTabla").innerHTML = "";
                let personas = JSON.parse(xhr.responseText);
                document.getElementById("divTabla").appendChild(crearTabla(personas));
                let tds = document.getElementsByTagName("td");
                for (var i = 0; i < tds.length; i++) {
                    let td = tds[i];
                    td.addEventListener('click', setValues);
                }
            } else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
            }
        }
    }
    xhr.open('GET', 'http://localhost:3000/traerPersonas', true);
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

function limpiarValues() {
    document.getElementById("idPersona").value = "";
    document.getElementById("idPersona").hidden = true;

    document.getElementById("lblId").hidden = true;
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = 1;

    document.getElementById("btnCrearModificar").innerText = "Crear";
    document.getElementById("btnBorrar").hidden = true;
}

function altaPersona(persona) {
    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            limpiarValues();
        }
    }
    xhr.open('POST', 'http://localhost:3000/altaPersona', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));
}

function borrarPersona() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
        }
    }
    xhr.open('POST', 'http://localhost:3000/bajaPersona?', true);
    xhr.setRequestHeader('Content-type', 'Application/x-www-form-urlencoded');
    xhr.send(obtenerId(frm));
}

function modificarPersona(persona) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            armarTabla();
            limpiarValues();
            frm.removeEventListener('submit', manejadorModificar);
            frm.addEventListener('submit', manejadorSubmit);
        }
    }
    xhr.open('POST', 'http://localhost:3000/modificarPersona', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(persona));
}

///////////////////////////////// NO LO BORRO POR LAS DUDAS /////////////////////////////////

// function getPersonas() {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 return JSON.parse(xhr.responseText);
//             } else {
//                 console.log(`Error: ${xhr.status} - ${xhr.statusText}`)
//             }
//         }
//     }
//     xhr.open('GET', 'http://localhost:3000/traerPersonas', true);
//     xhr.send();
// }

// function altaPersona(persona) {
//     let xhr = new XMLHttpRequest();
//     // manejador de eventos que se ejecuta cada vez que cambia el estado
//     xhr.onreadystatechange = () => {
//         // se actualiza la tabla cuando se haya completado la request correctamente
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             armarTabla();
//             limpiarValues();
//             // document.getElementById("divTabla").innerHTML = "";
//             // getPersonas().then((personas) => {
//             //     console.log(personas);
//             //     //document.getElementById("divTabla").appendChild(crearTabla(personas));
//             // });
//         }
//     }
//     xhr.open('POST', 'http://localhost:3000/altaPersona', true);
//     xhr.setRequestHeader('Content-type', 'application/json');
//     xhr.send(JSON.stringify(persona));
// }