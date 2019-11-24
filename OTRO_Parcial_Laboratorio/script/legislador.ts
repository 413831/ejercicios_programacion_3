/// <reference path="persona.ts" />

class Legislador extends Persona{

    private tipo:tipoLegislador;

    constructor(id:any,nombre: string, apellido: string, edad: number, email: string,
                sexo:string, cargo:tipoLegislador){
        super(id,nombre,apellido,edad,email,sexo);
        this.cargo = cargo;
    }

    get getTipoLegislador():tipoLegislador{return this.cargo;};
    set setTipoLegislador(e:tipoLegislador){this.cargo = e};
}
