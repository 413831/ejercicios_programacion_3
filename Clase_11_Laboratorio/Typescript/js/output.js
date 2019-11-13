"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts index.ts
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
// Parametros REST
var funcionEnviarMision2 = function () {
    var heroes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        heroes[_i] = arguments[_i];
    }
    for (var index = 0; index < heroes.length; index++) {
        console.log(heroes[index] + " enviado a mision");
    }
};
// Funcion flecha
var funcionEnviarMision3 = function (heroe) {
    if (heroe === void 0) { heroe = "Superman"; }
    return heroe + " enviado a mision";
};
// Implementacion de interfaces
// Clase con atributos privados
// Clases con metodos estaticos
var Avenger = /** @class */ (function () {
    // Constructor publico
    function Avenger(nombre, edad) {
        var _this = this;
        this._nombre = "Un avenger";
        // Metodos
        this.mostrar = function () { return "Nombre: " + _this.nombre + " Edad: " + _this.edad; };
        this._nombre = nombre;
        this._edad = edad;
    }
    Object.defineProperty(Avenger.prototype, "edad", {
        // Setters & Getters
        get: function () { return this._edad; },
        set: function (e) { this._edad = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Avenger.prototype, "nombre", {
        get: function () { return this._nombre; },
        set: function (e) { this._nombre = e; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Avenger;
}());
// Implementacion de una interfaz en una clase
var Mutante = /** @class */ (function () {
    function Mutante() {
        this.nombre = "Un mutante";
    }
    Mutante.nombre_de_clase = "XMen";
    return Mutante;
}());
// Herencia
var GuardianDeLaGalaxia = /** @class */ (function (_super) {
    __extends(GuardianDeLaGalaxia, _super);
    function GuardianDeLaGalaxia(nombre, edad, planeta) {
        var _this = _super.call(this, nombre, edad) || this;
        _this.planeta = planeta;
        return _this;
    }
    return GuardianDeLaGalaxia;
}(Avenger));
// Namespaces
var Funciones;
(function (Funciones) {
    function f1() {
        console.log("Yo soy la f1 la re frula de tu virola madre");
    }
    Funciones.f1 = f1;
    function f2() {
        console.log("la f2 sabe lo que hiciste eh...");
    }
    Funciones.f2 = f2;
    var Generica = /** @class */ (function () {
        function Generica() {
        }
        Generica.test = function () {
            console.log("Esto es un ejemplo de clase dentro de un Namespace");
        };
        return Generica;
    }());
    Funciones.Generica = Generica;
})(Funciones || (Funciones = {}));
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
var ironman = {
    nombre: "Tony Stark",
    edad: 46,
    poderes: ["volar", "romper todo", "merca"],
    getNombre: function () { return this.nombre; },
};
var wolverine = {
    nombre: "James"
};
var unAvenger = new Avenger("Capitan America", 30);
var unMutante = new Mutante();
var miFuncion;
var starLord = new GuardianDeLaGalaxia("Peter Quill", 34, "Tierra");
miFuncion = function (num1, num2) { return num1 + num2; };
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
console.log(funcionEnviarMision2("Batman", "Ironman", "Hulk"));
console.log(funcionEnviarMision3());
console.log(ironman.getNombre());
console.log(wolverine.nombre);
console.log(unAvenger.mostrar());
console.log(miFuncion(1, 5));
console.log(Mutante.nombre_de_clase);
console.log(starLord.mostrar());
Funciones.Generica.test;
//# sourceMappingURL=output.js.map