"use strict";
var Anuncio = /** @class */ (function () {
    function Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, num_estacionamiento, num_dormitorio) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.num_wc = num_wc;
        this.num_estacionamiento = num_estacionamiento;
        this.num_dormitorio = num_dormitorio;
    }
    Object.defineProperty(Anuncio.prototype, "getId", {
        // Setters & Getters
        get: function () { return this.id; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setId", {
        set: function (e) { this.id = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getTitulo", {
        get: function () { return this.titulo; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setTitulo", {
        set: function (e) { this.titulo = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getTransaccion", {
        get: function () { return this.transaccion; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setTransaccion", {
        set: function (e) { this.transaccion = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getDescripcion", {
        get: function () { return this.descripcion; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setDescripcion", {
        set: function (e) { this.descripcion = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getPrecio", {
        get: function () { return this.precio; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setPrecio", {
        set: function (e) { this.precio = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getWC", {
        get: function () { return this.num_wc; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setWC", {
        set: function (e) { this.num_wc = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getEstacionamientos", {
        get: function () { return this.num_estacionamiento; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setEstacionamientos", {
        set: function (e) { this.num_estacionamiento = e; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "getDormitorios", {
        get: function () { return this.num_dormitorio; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Anuncio.prototype, "setDormitorios", {
        set: function (e) { this.num_dormitorio = e; },
        enumerable: true,
        configurable: true
    });
    ;
    return Anuncio;
}());
var tipoTransaccion;
(function (tipoTransaccion) {
    tipoTransaccion["Venta"] = "Venta";
    tipoTransaccion["Alquiler"] = "Alquiler";
    tipoTransaccion["Vacio"] = "";
})(tipoTransaccion || (tipoTransaccion = {}));
/// <reference path="anuncio.ts" />
var Controller = /** @class */ (function () {
    function Controller() {
    }
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    Controller.alta = function (anuncios) {
        var id = this.GenerateId(anuncios);
        var titulo = String($("#titulo").val());
        var descripcion = String($("#descripcion").val());
        var precio = Number($("#precio").val());
        var num_wc = Number($("#num_wc").val());
        var estacionamientos = Number($("#num_estacionamiento").val());
        var dormitorios = Number($("#num_dormitorio").val());
        var transaccion = this.tipoTransaccion(String($("input[name='transaccion']:checked").val()));
        var anuncio = new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, estacionamientos, dormitorios);
        anuncios.push(anuncio);
        return anuncios;
    };
    // Baja fisica de un elemento del listado del local storage
    Controller.baja = function (anuncios) {
        var id = Number($("#id").val());
        var index = this.GetIndex(id, anuncios);
        var anuncio = this.GetById(id, anuncios);
        if (index) {
            // Borro el elemento del indice especificado
            //listadoJSON.splice(index,1);
            anuncios.splice(index, 1);
        }
        return anuncios;
    };
    // Modificacion de un elemento del listado del local storage
    Controller.modificar = function (anuncios) {
        var titulo = String($("#titulo").val());
        var descripcion = String($("#descripcion").val());
        var precio = Number($("#precio").val());
        var num_wc = Number($("#num_wc").val());
        var estacionamientos = Number($("#num_estacionamiento").val());
        var dormitorios = Number($("#num_dormitorio").val());
        var transaccion = this.tipoTransaccion(String($("input[name='transaccion']:checked").val()));
        var id = Number($("#id").val());
        var index = this.GetIndex(id, anuncios);
        var anuncio = new Anuncio(id, titulo, descripcion, transaccion, precio, num_wc, estacionamientos, dormitorios);
        anuncios.splice(index, 1, anuncio);
        return anuncios;
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
    Controller.tipoTransaccion = function (value) {
        if (value.toLowerCase() == "venta") {
            return tipoTransaccion.Venta;
        }
        else if (value.toLowerCase() == "alquiler") {
            return tipoTransaccion.Alquiler;
        }
        return tipoTransaccion.Vacio;
    };
    Controller.PromedioPrecio = function (listado, genero) {
        var promedio = listado.map(function (elemento) { return elemento.getPrecio; }).
            reduce(function (prev, curr) { return (prev + curr); }) / listado.length;
        //$("#promedioEdad").val(promedio);
    };
    Controller.PorcentajeTransaccion = function (listado, transaccion) {
        var porcentaje = (listado.filter(function (elemento) { return String(elemento.getTransaccion).toLowerCase() === transaccion; }).
            length / listado.length) * 100;
        //$("#porcentajeSexo").val(porcentaje);
    };
    return Controller;
}());
//# sourceMappingURL=clases.js.map