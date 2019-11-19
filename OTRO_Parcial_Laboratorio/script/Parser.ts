/// <reference path="legislador.ts" />

class Parser{
    public datos:Persona[];     
    public decode = (params:Array<object>):object => {
        
        params.forEach(element => {
            let legislador = new Legislador(element.value[0],element.value[1],element.value[2],
                            element.value[3],element.value[4],element.value[5],element.value[6]);
                            this.datos.push(legislador);
        });
        return params;
    }
    
    constructor() {
        this.datos = Array();
    }


}