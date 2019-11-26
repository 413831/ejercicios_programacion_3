/// <reference path="anuncio.ts" />

  class Controller
  {
    // Alta de un elemento en el listado del local storage
    // Se toman los valores con JQuery de los elementos del DOM
    public static alta(anuncios:Array<Anuncio>):Array<Anuncio> {
      let id:number = this.GenerateId(anuncios);
      let titulo:string = String($("#titulo").val());
      let descripcion:string = String($("#descripcion").val());
      let precio:number = Number($("#precio").val());
      let num_wc:number = Number($("#num_wc").val());
      let estacionamientos:number = Number($("#num_estacionamiento").val());
      let dormitorios:number = Number($("#num_dormitorio").val());
      let transaccion:tipoTransaccion = this.tipoTransaccion(String($("input[name='transaccion']:checked").val()));

      let anuncio = new Anuncio(id, titulo,descripcion, transaccion, precio, num_wc, estacionamientos,dormitorios);

      anuncios.push(anuncio);
      return anuncios;
    }

    // Baja fisica de un elemento del listado del local storage
    public static baja(anuncios:Array<Anuncio>):Array<Anuncio> {
      let id:number = Number($("#id").val());
      let index:number = this.GetIndex(id, anuncios);
      let anuncio:Anuncio = this.GetById(id,anuncios);

      if(index)
      {
        // Borro el elemento del indice especificado
        //listadoJSON.splice(index,1);
        anuncios.splice(index,1);
      }
      return anuncios;
    }

    // Modificacion de un elemento del listado del local storage
    public static modificar(anuncios:Array<Anuncio>):Array<Anuncio> {
      let titulo:string = String($("#titulo").val());
      let descripcion:string = String($("#descripcion").val());
      let precio:number = Number($("#precio").val());
      let num_wc:number = Number($("#num_wc").val());
      let estacionamientos:number = Number($("#num_estacionamiento").val());
      let dormitorios:number = Number($("#num_dormitorio").val());
      let transaccion:tipoTransaccion = this.tipoTransaccion(String($("input[name='transaccion']:checked").val()));
      let id = Number($("#id").val());
      let index:number = this.GetIndex(id, anuncios);

      let anuncio = new Anuncio(id, titulo,descripcion, transaccion, precio, num_wc, estacionamientos,dormitorios);

      anuncios.splice(index,1,anuncio);

      return anuncios;
    }

    // Obtengo el index de un objeto del listado
    private static GetIndex(id:number, listado:Array<Anuncio>):number
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
    private static GenerateId(listado:Array<Anuncio>): number
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
    private static GetById(id:number, listado:Array<Anuncio>): Anuncio
    {
      let objeto:Anuncio[] = listado;
      if(listado)
      {
        objeto = listado.filter(elemento =>{
          if(elemento.getId == id) return elemento;
        });
      }
      return objeto[0];
    }

    // Funcion para castear el string en valor del ENUM tipoLegislador
    public static tipoTransaccion(value:String):tipoTransaccion
    {
      if(value.toLowerCase() == "venta")
      {
        return tipoTransaccion.Venta;
      }
      else if(value.toLowerCase() == "alquiler")
      {
        return tipoTransaccion.Alquiler;
      }
      return tipoTransaccion.Vacio;
    }

    public static PromedioPrecio(listado:Array<Anuncio>, genero:String)
    {
      let promedio:Number = listado.map(elemento => elemento.getPrecio).
                                      reduce((prev,curr) => (prev + curr)) / listado.length;

      //$("#promedioEdad").val(promedio);
    }

    public static PorcentajeTransaccion(listado:Array<Anuncio>, transaccion:tipoTransaccion)
    {
      let porcentaje:Number = (listado.filter(elemento => String(elemento.getTransaccion).toLowerCase() === transaccion).
                                length / listado.length) * 100;

      //$("#porcentajeSexo").val(porcentaje);
    }
}
