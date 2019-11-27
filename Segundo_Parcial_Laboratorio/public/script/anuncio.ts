class Anuncio
{
    protected id:any;
    protected titulo:string;
    protected transaccion:ETransaccion;
    protected descripcion:string;
    protected precio:number;
    protected num_wc:number;
    protected num_estacionamiento:number;
    protected num_dormitorio:number;

    constructor(id:any, titulo:string, descripcion:string, transaccion:ETransaccion,precio:number,
                num_wc:number, num_estacionamiento:number, num_dormitorio:number) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;        
        this.descripcion = descripcion;
        this.precio = precio;
        this.num_wc = num_wc;
        this.num_estacionamiento = num_estacionamiento;
        this.num_dormitorio = num_dormitorio;
    }

    // Setters & Getters
    get getId():any{return this.id;};
    set setId(e:any){this.id = e};

    get getTitulo():string{return this.titulo;};
    set setTitulo(e:string){this.titulo = e};

    get getTransaccion():ETransaccion{return this.transaccion;};
    set setTransaccion(e:ETransaccion){this.transaccion = e};

    get getDescripcion():string{return this.descripcion;};
    set setDescripcion(e:string){this.descripcion = e};

    get getPrecio():number{return this.precio;};
    set setPrecio(e:number){this.precio = e};

    get getWC():number{return this.num_wc;};
    set setWC(e:number){this.num_wc = e};

    get getEstacionamientos():number{return this.num_estacionamiento;};
    set setEstacionamientos(e:number){this.num_estacionamiento = e};

    get getDormitorios():number{return this.num_dormitorio;};
    set setDormitorios(e:number){this.num_dormitorio = e};
}


