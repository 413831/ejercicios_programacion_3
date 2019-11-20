/// <reference path="legislador.ts" />

class Parser{
    public datos:Legislador[];     
    public decode = (params:Array<Legislador>):Legislador[] => {        
        params.forEach(element => {
            let legislador = new Legislador(element.Id,element.Nombre,element.Apellido,
                                            element.Edad,element.Email,element.Sexo,element.TipoLegislador);
            this.datos.push(legislador);
        });
        return this.datos;
    }
    
    constructor() {
        this.datos = Array();
    }
}