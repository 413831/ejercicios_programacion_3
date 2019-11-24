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
    get getNombre():string{return this.nombre;};
    set setNombre(e:string){this.nombre = e};

    get getApellido():string{return this.apellido;};
    set setApellido(e:string){this.apellido = e};

    get getEdad():number{return this.edad;};
    set setEdad(e:number){this.edad = e};

    get getEmail():string{return this.email;};
    set setEmail(e:string){this.email = e};

    get getSexo():string{return this.sexo;};
    set setSexo(e:string){this.sexo = e};

    get getId():number{return this.id;};
    set setId(e:number){this.id = e};
}

enum tipoLegislador{
    Diputado = "Diputado",
    Senador = "Senador",
    Vacio = ""
}
