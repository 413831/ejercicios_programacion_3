
let greeter = new Greeter("Pepito");
let ironman:Heroe = {
    nombre: "Tony Stark",
    edad: 46,
    poderes: ["volar","romper todo","merca"],
    getNombre:function(){return this.nombre;},
}
let wolverine:IHeroe = {
    nombre: "James"
}
console.log(greeter);
console.log(greeter.greet());
console.log(mensaje);
console.log(vector);
console.log(tupla);
console.log(EHeroes);
console.log(EHeroes.Avengers);
console.log(EHeroes[EHeroes.Avengers]);
console.log(funcionEnviarMision("Spiderman"));
console.log(funcionEnviarMision());
console.log(funcionEnviarMision2("Batman","Ironman","Hulk"));
console.log(funcionEnviarMision3());
console.log(ironman.getNombre());
console.log(wolverine.nombre);
