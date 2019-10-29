let selPaises;
let selCiudades;
// ... => Spread operator
Array.prototype.unique = function() {return [...new Set(this)]};

 

window.addEventListener('load',function(){
    selPaises = document.getElementById('selPaises');
    selCiudades = document.getElementById('selCiudades');

    cargarSelect(selPaises,obtenerPaises(datos));
    cargarSelect(selCiudades,obtenerCiudades(datos,selPaises.value));
    
    selPaises.addEventListener('change',(e)=>{
        
        cargarSelect(selCiudades,obtenerCiudades(datos,e.target.value));
    });

});

function cargarPais(array)
{


}

function obtenerPaises(array)
{  
    // Map recibe el valor, el indice del elemento y el array
    let paises = array.map(elemento => elemento.pais).unique().sort();
    console.log(paises);
    return paises;
}

function obtenerCiudades(array, pais)
{
    let paises = array.filter(elemento => elemento.pais === pais)
                        .map(elemento => elemento.ciudad)
                        .unique()
                        .sort();
    return paises;
}

function cargarSelect(select, array)
{
    select.options.length = 0;  
    array.forEach(element => {
        let opcion = document.createElement('option');
        opcion.setAttribute('value',element);
        let texto = document.createTextNode(element);
        opcion.appendChild(texto);
        select.appendChild(opcion);
    });
}

function limpiarSelect(select)
{
    // Manera cabeza => select.option.length = 0;
    while(select.hasChildNodes()){
        select.remove(sel.firstElementChild);
    }
}