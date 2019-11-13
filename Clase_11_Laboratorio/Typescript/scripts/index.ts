
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
let unAvenger = new Avenger("Capitan America",30);
let unMutante = new Mutante();
let miFuncion:IfuncDosNumeros;
let starLord = new GuardianDeLaGalaxia("Peter Quill",34);
miFuncion = (num1,num2)=>num1 + num2;

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
console.log(unAvenger.mostrar());
console.log(miFuncion(1,5));
console.log(Mutante.nombre_de_clase);
