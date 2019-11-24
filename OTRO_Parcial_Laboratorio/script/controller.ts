/// <reference path="legislador.ts" />

  class Controller
  {
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    public static alta(legisladores:Array<Legislador>):Array<Legislador> {
      let nombre: string = String($("#nombre").val());
      let apellido: string = String($("#apellido").val());
      let email: string = String($("#email").val());
      let edad: number = Number($("#edad").val());
      let sexo:string = String($("input[name='sexo']:checked").val());
      let tipo:tipoLegislador = this.TipoLegislador(String($("input[name='funcion']:checked").val()));
      let id = this.GenerateId(legisladores);

      let legislador = new Legislador(id,nombre, apellido, edad, email, sexo, tipo);

      legisladores.push(legislador);
      return legisladores;
    }

    // Baja fisica de un elemento del listado del local storage
    public static baja(legisladores:Array<Legislador>):Array<Legislador> {
      let id:number = Number($("#id").val());
      let index:number = this.GetIndex(id, legisladores);

      if(index)
      {
        // Borro el elemento del indice especificado
        //listadoJSON.splice(index,1);
        legisladores.splice(index,1);
      }
      return legisladores;
    }

    // Obtengo el index de un elemento del listado JSON
    private static GetIndex(id:number, listadoJSON:Array<Legislador>):number
    {
      let index:number = 0;

      if(listadoJSON && id)
      {
        for(var i = 0 ; i < listadoJSON.length;i++)
        {
          if(listadoJSON[i].getId == id)
          {
            index = i;
            break;
          }
        }
      }
      return index;
    }

    // Busca el último ID del listado y retorna el siguiente
    private static GenerateId(listado:Array<Legislador>): Number
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
      return 0;
    }

}
