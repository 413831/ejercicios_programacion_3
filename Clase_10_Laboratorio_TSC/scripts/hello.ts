// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts

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

