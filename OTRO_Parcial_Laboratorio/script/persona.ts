class Persona
{
    protected id:any;
    protected nombre:string;
    protected apellido:string;
    protected edad:number;
    protected email:string;
    protected sexo:string;

    constructor(id:any,nombre: string, apellido: string, edad: number, email: string, sexo:string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.sexo = sexo;
    }

    // Setters & Getters
    get Nombre():string{return this.nombre;};
    set Nombre(e:string){this.nombre = e};

    get Apellido():string{return this.apellido;};
    set Apellido(e:string){this.apellido = e};

    get Edad():number{return this.edad;};
    set Edad(e:number){this.edad = e};
    
    get Email():string{return this.email;};
    set Email(e:string){this.email = e};

    get Sexo():string{return this.sexo;};
    set Sexo(e:string){this.sexo = e};

    get Id():string{return this.id;};
    set Id(e:string){this.id = e};
}

enum tipoLegislador{
    Diputado,
    Senador
}