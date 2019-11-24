/// <reference path="legislador.ts" />

  class Controller
  {
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    public static alta(legisladores:Array<Legislador>):Array<Legislador> {
      let nombre:string = String($("#nombre").val());
      let apellido:string = String($("#apellido").val());
      let email:string = String($("#email").val());
      let edad:number = Number($("#edad").val());
      let sexo:string = String($("input[name='sexo']:checked").val());
      let cargo:tipoLegislador = this.TipoLegislador(String($("input[name='funcion']:checked").val()));
      let id:number = this.GenerateId(legisladores);

      let legislador = new Legislador(id,nombre, apellido, edad, email, sexo, cargo);

      legisladores.push(legislador);
      return legisladores;
    }

    // Baja fisica de un elemento del listado del local storage
    public static baja(legisladores:Array<Legislador>):Array<Legislador> {
      let id:number = Number($("#id").val());
      let index:number = this.GetIndex(id, legisladores);
      let legislador:Legislador = this.GetById(id,legisladores);
      console.log(legislador);

      if(index)
      {
        // Borro el elemento del indice especificado
        //listadoJSON.splice(index,1);
        legisladores.splice(index,1);
      }
      return legisladores;
    }

    // Modificacion de un elemento del listado del local storage
    public static modificar(legisladores:Array<Legislador>):Array<Legislador> {
      let nombre:string = String($("#nombre").val());
      let apellido:string = String($("#apellido").val());
      let email:string = String($("#email").val());
      let edad:number = Number($("#edad").val());
      let sexo:string = String($("input[name='sexo']:checked").val());
      let cargo:tipoLegislador = this.TipoLegislador(String($("input[name='funcion']:checked").val()));
      let id = Number($("#id").val());
      let index:number = this.GetIndex(id, legisladores);

      let legislador = new Legislador(id,nombre, apellido, edad, email, sexo, cargo);

      legisladores.splice(index,1,legislador);

      return legisladores;
    }

    // Obtengo el index de un objeto del listado
    private static GetIndex(id:number, listado:Array<Legislador>):number
    {
      let index:number = 0;

      if(listado && id)
      {
        for(var i = 0 ; i < listado.length;i++)
        {
          if(listado[i].getId == id)
          {
            index = i;
            break;
          }
        }
      }
      return index;
    }

    // Busca el último ID de un objeto del listado y retorna el siguiente
    private static GenerateId(listado:Array<Legislador>): number
    {
      var IDMasAlto:number;

      if(listado)
      {
        IDMasAlto = listado.reduce(function (IDMasAlto, elemento, i, array) {
                   if (elemento.getId > IDMasAlto) {
                       IDMasAlto = elemento.getId;
                   };
                   return IDMasAlto;
               }, 0);
        return IDMasAlto+1;
      }
      return 0;
    }

    // Retorna un elemento de un listado de objetos por el Id
    private static GetById(id:number, listado:Array<Legislador>): Legislador
    {
      let objeto:Legislador[] = listado;
      if(listado)
      {
        objeto = listado.filter(elemento =>{
          if(elemento.getId == id) return elemento;
        });
      }
      return objeto[0];
    }

    // Funcion para castear el string en valor del ENUM tipoLegislador
    public static TipoLegislador(value:String):tipoLegislador
    {
      if(value.toLowerCase() == "diputado")
      {
        return tipoLegislador.Diputado;
      }
      else if(value.toLowerCase() == "senador")
      {
        return tipoLegislador.Senador;
      }
      return tipoLegislador.Vacio;
    }

    public static PromedioEdad(listado:Array<Legislador>, genero:String)
    {
      let promedio:Number = listado.map(elemento => parseInt(elemento.getEdad)).
                                      reduce((prev,curr) => (prev + curr)) / listado.length;

      $("#promedioEdad").val(promedio);
    }

    public static PorcentajeSexo(listado:Array<Legislador>, genero:String)
    {
      let porcentaje:Number = (listado.filter(elemento => String(elemento.getSexo).toLowerCase() === genero).length / listado.length) * 100;

      $("#porcentajeSexo").val(porcentaje);
    }
}
