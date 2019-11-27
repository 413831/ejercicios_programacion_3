/// <reference path="anuncio.ts" />

class BienRaiz extends Anuncio
{
    constructor(id:any, titulo:string, descripcion:string, transaccion:ETransaccion, precio:number,
                 num_wc:number, num_estacionamiento:number, num_dormitorio:number)
    {
        super(id,titulo,descripcion,transaccion,precio,num_wc,num_estacionamiento,num_dormitorio);
    }      
}

enum ETransaccion{
    Venta = "Venta",
    Alquiler = "Alquiler",
    Vacio = ""
}