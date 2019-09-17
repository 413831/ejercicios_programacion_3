var frm;

window.addEventListener("load", inicializarManejadores);

function inicializarManejadores(){
    //console.log(document.forms[0]);
    //console.log(document.getElementsByTagName('form')[0]);
    //console.log(document.getElementById("frmAlta"));
    //console.log(document.getElementsByClassName("frm")[0]);
    frm = document.forms[0];
    
    // Se puede utilizar la propiedad OnSubmit
    // frm.onsubmit = function(){}
    frm.addEventListener('submit', manejadorSubmit);
}

function manejadorSubmit(e){
    e.preventDefault();
    console.log(e.target);
    let nuevaMascota = obtenerMascota(e.target);
    console.log(nuevaMascota.toString());
}

function obtenerMascota(frm){
    console.log(frm.elements);
    let nombre;
    let edad;
    let tipo;
    let vacunado;
    let desparasitado;
    let castrado;
    let alimento;
    
    for(elemento of frm.elements)
    {
        switch(elemento.name){
            case "nombre" :
                nombre = elemento.value;
                break;
            case "edad" :
                edad = parseInt(elemento.value);
                break;
            case "tipo" :
                if(elemento.checked){
                    tipo = elemento.value;
                }
                break;
            case "vacunado" :
                vacunado = elemento.checked; // value devuelve ON o sino nada
                break;
            case "desparasitado" :
                desparasitado = elemento.checked;
                break;
            case "castrado" :
                castrado = elemento.checked;
                break;
            case "alimento" :
                alimento = elemento.value;
                break;
        }
    }
    return new Mascota(nombre,edad,tipo,castrado,vacunado,desparasitado,alimento);
}