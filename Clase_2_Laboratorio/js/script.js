var btnSaludar; 

window.addEventListener('load', function(){
    btnSaludar = document.getElementById('btnSaludar');    
    btnSaludar.addEventListener('click', saludar);
}); 

function saludar(){
    console.log("HOLUS");
    alert("HOLUS");
}