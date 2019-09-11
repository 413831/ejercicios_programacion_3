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

var foo = function(a, b, c){
    console.log("Se pueden omitir variables del argumento");
    console.log(a,b,c);
}
foo(4,21);

foo = function( a, b, c){
    console.log("La cantidad de parametros se depositan en un objeto arguments que es dinamico");
    console.log(arguments.length);
}
foo(5,8,7,9,10);

var personaUno = new Persona("Pepito","Parada",45);
var personaDos = new Persona("Ana Lisa","Meltrozo",28);
Persona.prototype.altura = 1.5; // Valor por defecto, simulando herencia
personaUno.altura = 1.8;

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
console.log(personaUno.altura);
console.log(personaDos.altura);
