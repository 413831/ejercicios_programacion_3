/// <reference path="persona.ts" />

class Legislador extends Persona{

    private tipo:tipoLegislador;

    constructor(id:any,nombre: string, apellido: string, edad: number, email: string, 
                sexo:string, tipo:tipoLegislador){
        super(id,nombre,apellido,edad,email,sexo);
        this.tipo = tipo;
    }

    get TipoLegislador():tipoLegislador{return this.tipo;};
    set TipoLegislador(e:tipoLegislador){this.tipo = e};
}