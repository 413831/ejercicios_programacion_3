/// <reference path="Greeter.ts" />

let ejemploUno:string = "Hola mundo";
let ejemploDos = "Hola MUNDO";
let mensaje:string;

mensaje = "Hola Don Pepito";

// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts
console.log(mensaje);