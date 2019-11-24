/// <reference path="persona.ts" />

class Legislador extends Persona{

    private tipo:tipoLegislador;

    constructor(id:any,nombre: string, apellido: string, edad: number, email: string,
                sexo:string, tipo:tipoLegislador){
        super(id,nombre,apellido,edad,email,sexo);
        this.tipo = tipo;
    }

    get getTipoLegislador():tipoLegislador{return this.tipo;};
    set setTipoLegislador(e:tipoLegislador){this.tipo = e};
}
