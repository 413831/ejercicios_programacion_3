"use strict";
// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts
// String
var mensaje;
mensaje = "Hola Mundo";
// Array
var vector = [1, 2, 3, 4, 5];
// Tuple
var tupla = [1, "Ironman"];
// Enum
var EHeroes;
(function (EHeroes) {
    EHeroes[EHeroes["Xmen"] = 0] = "Xmen";
    EHeroes[EHeroes["Avengers"] = 1] = "Avengers";
})(EHeroes || (EHeroes = {}));
// Funciones => con el '?' se indica que es un parametro opcional
var funcionEnviarMision = function (heroe) {
    return heroe + " en camino!.";
};
/// <reference path="hello.ts" />
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hola, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("Pepito");
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
//# sourceMappingURL=output.js.map