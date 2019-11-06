"use strict";
/// <reference path="Greeter.ts" />
var ejemploUno = "Hola mundo";
var ejemploDos = "Hola MUNDO";
var mensaje;
mensaje = "Hola Don Pepito";
// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts
console.log(mensaje);
/// <reference path="hello.ts" />
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("Pepito");
console.log(greeter);
console.log(greeter.greet());
//# sourceMappingURL=output.js.map