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
                    let persona = JSON.parse(xhr.responseText);
                    // Porque es solo texto
                    info.innerText = `Nombre : ${persona.nombre} ${persona.apellido} Edad: ${persona.edad}`; 
                    info.innerHTML = '<img src="./images/icons8-spinner-80.png" alt="spinner">';
                    clearTimeout(tiempo);
                },1000);                
            }
            else{
                console.log(`Error: ${xhr.status} - ${xhr.statusText}`);  
            }
        }
        else{
        }
    }
    // Se abre peticion
    xhr.open('GET', './js/persona.json',true);
    // Se envia peticion
    xhr.send();
    var tiempo = setTimeout(()=>{
        xhr.abort();
        info.innerHTML = 'El servidor no pudo ejecutar la peticion';
    },3000);

}