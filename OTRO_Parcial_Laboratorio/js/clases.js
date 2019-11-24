"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Persona = /** @class */ (function () {
    function Persona(id, nombre, apellido, edad, email, sexo) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.sexo = sexo;
    }
    Object.defineProperty(Persona.prototype, "getNombre", {
        // Setters & Getters
        get: function () { return this.nombre; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "setNombre", {
        set: function (e) { this.nombre = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "getApellido", {
        get: function () { return this.apellido; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "setApellido", {
        set: function (e) { this.apellido = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "getEdad", {
        get: function () { return this.edad; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "setEdad", {
        set: function (e) { this.edad = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "getEmail", {
        get: function () { return this.email; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "setEmail", {
        set: function (e) { this.email = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "getSexo", {
        get: function () { return this.sexo; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "setSexo", {
        set: function (e) { this.sexo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "getId", {
        get: function () { return this.id; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Persona.prototype, "setId", {
        set: function (e) { this.id = e; },
        enumerable: true,
        configurable: true
    });
    ;
    return Persona;
}());
var tipoLegislador;
(function (tipoLegislador) {
    tipoLegislador["Diputado"] = "Diputado";
    tipoLegislador["Senador"] = "Senador";
    tipoLegislador["Vacio"] = "";
})(tipoLegislador || (tipoLegislador = {}));
/// <reference path="persona.ts" />
var Legislador = /** @class */ (function (_super) {
    __extends(Legislador, _super);
    function Legislador(id, nombre, apellido, edad, email, sexo, cargo) {
        var _this = _super.call(this, id, nombre, apellido, edad, email, sexo) || this;
        _this.cargo = cargo;
        return _this;
    }
    Object.defineProperty(Legislador.prototype, "getTipoLegislador", {
        get: function () { return this.cargo; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Legislador.prototype, "setTipoLegislador", {
        set: function (e) { this.cargo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    return Legislador;
}(Persona));
/// <reference path="legislador.ts" />
var Controller = /** @class */ (function () {
    function Controller() {
    }
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    Controller.alta = function (legisladores) {
        var nombre = String($("#nombre").val());
        var apellido = String($("#apellido").val());
        var email = String($("#email").val());
        var edad = Number($("#edad").val());
        var sexo = String($("input[name='sexo']:checked").val());
        var cargo = this.TipoLegislador(String($("input[name='funcion']:checked").val()));
        var id = this.GenerateId(legisladores);
        var legislador = new Legislador(id, nombre, apellido, edad, email, sexo, cargo);
        legisladores.push(legislador);
        return legisladores;
    };
    // Baja fisica de un elemento del listado del local storage
    Controller.baja = function (legisladores) {
        var id = Number($("#id").val());
        var index = this.GetIndex(id, legisladores);
        var legislador = this.GetById(id, legisladores);
        console.log(legislador);
        if (index) {
            // Borro el elemento del indice especificado
            //listadoJSON.splice(index,1);
            legisladores.splice(index, 1);
        }
        return legisladores;
    };
    // Modificacion de un elemento del listado del local storage
    Controller.modificar = function (legisladores) {
        var nombre = String($("#nombre").val());
        var apellido = String($("#apellido").val());
        var email = String($("#email").val());
        var edad = Number($("#edad").val());
        var sexo = String($("input[name='sexo']:checked").val());
        var cargo = this.TipoLegislador(String($("input[name='funcion']:checked").val()));
        var id = Number($("#id").val());
        var index = this.GetIndex(id, legisladores);
        var legislador = new Legislador(id, nombre, apellido, edad, email, sexo, cargo);
        legisladores.splice(index, 1, legislador);
        return legisladores;
    };
    // Obtengo el index de un objeto del listado
    Controller.GetIndex = function (id, listado) {
        var index = 0;
        if (listado && id) {
            for (var i = 0; i < listado.length; i++) {
                if (listado[i].getId == id) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    // Busca el último ID de un objeto del listado y retorna el siguiente
    Controller.GenerateId = function (listado) {
        var IDMasAlto;
        if (listado) {
            IDMasAlto = listado.reduce(function (IDMasAlto, elemento, i, array) {
                if (elemento.getId > IDMasAlto) {
                    IDMasAlto = elemento.getId;
                }
                ;
                return IDMasAlto;
            }, 0);
            return IDMasAlto + 1;
        }
        return 0;
    };
    // Retorna un elemento de un listado de objetos por el Id
    Controller.GetById = function (id, listado) {
        var objeto = listado;
        if (listado) {
            objeto = listado.filter(function (elemento) {
                if (elemento.getId == id)
                    return elemento;
            });
        }
        return objeto[0];
    };
    // Funcion para castear el string en valor del ENUM tipoLegislador
    Controller.TipoLegislador = function (value) {
        if (value.toLowerCase() == "diputado") {
            return tipoLegislador.Diputado;
        }
        else if (value.toLowerCase() == "senador") {
            return tipoLegislador.Senador;
        }
        return tipoLegislador.Vacio;
    };
    Controller.PromedioEdad = function (listado, genero) {
        var promedio = listado.map(function (elemento) { return parseInt(elemento.getEdad); }).
            reduce(function (prev, curr) { return (prev + curr); }) / listado.length;
        $("#promedioEdad").val(promedio);
    };
    Controller.PorcentajeSexo = function (listado, genero) {
        var porcentaje = (listado.filter(function (elemento) { return String(elemento.getSexo).toLowerCase() === genero; }).length / listado.length) * 100;
        $("#porcentajeSexo").val(porcentaje);
    };
    return Controller;
}());
//# sourceMappingURL=clases.js.map