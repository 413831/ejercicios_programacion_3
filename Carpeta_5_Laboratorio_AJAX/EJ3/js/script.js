window.addEventListener('load', ()=>{
    document.getElementById('btnTraer').addEventListener('click',traerTexto);
});

function traerTexto(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = ()=>{
        // manejador del evento de la peticion
        let info = document.getElementById('info');

        if(xhr.readyState == 4){
            if(xhr.status == 200){
                setTimeout(()=>{
                    let lista = JSON.parse(xhr.responseText);
                    info.innerHTML = "";
                    for(persona of lista){
                        info.innerHTML += `${persona.id} ${persona.nombre} ${persona.email} ${persona.sexo}`; 
                        info.innerHTML += "<hr/>"; 
                    }
                    // Porque es solo texto
                    clearTimeout(tiempo);
                },1000);                
                info.innerHTML = '<img src="./images/icons8-spinner-80.png" alt="spinner">';
            }
            else{
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`);  
            }
        }
        else{
        }
    }
    // Se abre peticion
    xhr.open('GET', './persona.json',true);
    // Se envia peticion
    xhr.send();
    var tiempo = setTimeout(()=>{
        xhr.abort();
        info.innerHTML = 'El servidor no pudo ejecutar la peticion';
    },3000);

}