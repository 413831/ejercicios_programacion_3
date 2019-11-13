// Para traspilar => tsc hello.ts
// Para configurar como proyecto TypeScript => tsc --init
// Para traspilar en tiempo real => tsc -w
// Para traspilar dos archivos en un JS => tsc -outFile output.js hello.ts Greeter.ts index.ts

// String
let mensaje:string;
mensaje = "Hola Mundo";

// Array
let vector:number[] = [1,2,3,4,5];

// Tuple
let tupla:[number,string] = [1,"Ironman"];

// Enum
enum EHeroes{
    Xmen,
    Avengers
}

// Funciones => con el '?' se indica que es un parametro opcional
let funcionEnviarMision = function(heroe?:string):string
{
    return heroe + " en camino!.";
}

// Parametros REST
let funcionEnviarMision2 = function(...heroes:string[]):void
{
    for (let index = 0; index < heroes.length; index++) {
        console.log(heroes[index] + " enviado a mision");        
    }
}

// Funcion flecha

let funcionEnviarMision3 = (heroe:string="Superman"):string=>{
    return heroe + " enviado a mision";
}

// Tipo de objeto

type Heroe = {
    nombre:string,
    edad:number,
    getNombre:()=>string;
    poderes:string[],

}

// Interfaces
interface IHeroe{
    nombre:string,
    poder?:string,
    mostrar?():string
}

// Implementacion de interfaces
// Clase con atributos privados
// Clases con metodos estaticos
class Avenger {
    private _nombre:string = "Un avenger";
    private _edad:number;
    // Constructor publico
    constructor(nombre:string, edad:number){
        this._nombre = nombre;
        this._edad = edad;
    }
    // Metodos
    public mostrar = ()=>{return "Nombre: " + this.nombre + " Edad: " + this.edad;};
    // Setters & Getters
    get edad():number{return this._edad;};
    set edad(e:number){this._edad = e};
    
    get nombre():string{return this._nombre;};
    set nombre(e:string){this._nombre = e};
} 

class Mutante implements IHeroe{
    nombre:string = "Un mutante";    
    static nombre_de_clase = "XMen";

} 

// Interface en funcion
interface IfuncDosNumeros{
    (num1:number,num2:number):number;
}

// Herencia
class GuardianDeLaGalaxia extends Avenger{
    planeta:string;

    constructor(nombre:string,edad:number,planeta:string){
        super(nombre,edad);
        this.planeta = planeta;
    }
}




