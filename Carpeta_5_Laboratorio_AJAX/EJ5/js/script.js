window.addEventListener('load', () => {
    document.forms[0].addEventListener('submit', enviarDatos);

});

function enviarDatos(e) {
    e.preventDefault();
    let data = traerDatos(e.target); ///e.target = es el emisor del evento, en este caso el form
    //peticion
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        // aca va el codigo que maneja la peticion
        let info = document.getElementById('info');
        if (xhr.readyState == 4) { // peticion finalizada, tiene 5 pasos (0 a 4)
            if (xhr.status == 200) // la peticiion fue correcta, salio todo ok
            {
                //Demora para mostrar el spinner
                setTimeout(() => {
                    info.innerText = xhr.responseText;

                    clearTimeout(tiempo);
                }, 3000);
            } else {
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`);
            }

        } else {
            info.innerHTML = '<img src="./images/icons8-spinner-80.png" alt= "spinner">';
        }
    }
    xhr.open('GET', "./servidor.php?" + data, true); //abrimos conexion servidor    
    xhr.send(); //enviamos peticion
    var tiempo = setTimeout(() => {
        xhr.abort();
        info.innerHTML = 'Servidor ocupado. Intente mas tarde';
    }, 5000);
}
//Traer datos de un form
function traerDatos(form) {
    let nombre = form.nombre.value;
    let apellido = form.apellido.value;

    return `nombre=${nombre}&apellido=${apellido}`;
}