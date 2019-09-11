var x = 30;
var texto = "Pepito" ;
function Persona(nombre,apellido,edad) {
    this.nombre = nombre,
    this.apellido = apellido,
    this.edad = edad,
    this.saludar = function(){
        return "Hola, me llamo " + this.nombre + " " + this.apellido;
    }
};

var personaUno = new Persona("Pepito","Parada",45);
var personaDos = new Persona("Ana Lisa","Meltrozo",28);

var funcion = function(){
    return 4 + 3; 
}

console.log(typeof x);
console.log(typeof texto);
console.log(typeof funcion);
console.log(typeof objeto);
console.log(funcion());
console.log(x);
console.log(personaUno.saludar());
console.log(personaDos.saludar());