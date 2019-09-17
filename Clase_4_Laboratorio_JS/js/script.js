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
}

//Ejemplos de callbacks

function operar(a,b,callback)
{
    return callback(a,b);
}

function sumar(a,b)
{
    return a + b;
}

function restar(a,b)
{
    return a - b;
}

function multiplicar(a,b)
{
    return a * b;
}

function dividir(a,b)
{
    let z;
    if(b != 0)
    {
        z = a / b;
    }
    return z;
}
