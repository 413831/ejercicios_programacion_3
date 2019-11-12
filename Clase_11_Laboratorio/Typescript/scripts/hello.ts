// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts index.ts

// String
let mensaje:string;
mensaje = "Hola Mundo";

// Array
let vector:number[] = [1,2,3,4,5];

// Tuple
let tupla:[number,string] = [1,"Ironman"];

// Enum
enum EHeroes{
    Xmen,
    Avengers
}

// Funciones => con el '?' se indica que es un parametro opcional
let funcionEnviarMision = function(heroe?:string):string
{
    return heroe + " en camino!.";
}

// Parametros REST
let funcionEnviarMision2 = function(...heroes:string[]):void
{
    for (let index = 0; index < heroes.length; index++) {
        console.log(heroes[index] + " enviado a mision");        
    }
}

// Funcion flecha

let funcionEnviarMision3 = (heroe:string="Superman"):string=>{
    return heroe + " enviado a mision";
}

// Tipo de objeto

type Heroe = {
    nombre:string,
    edad:number,
    getNombre:()=>string;
    poderes:string[],

}

// Interfaces
interface IHeroe{
    nombre:string,
    poder?:string,
    mostrar?():string
}

// Implementacion de interfaces
class Avenger implements IHeroe{
    nombre:string = "Un avenger";
} 

class Mutante implements IHeroe{
    nombre:string = "Un mutante";    
} 

// Interface en funcion
interface IfuncDosNumeros{
    (num1:number,num2:numer):number;
}
let miFuncion:IfuncDosNumeros;



