const express = require('express');

const app = express();

const cors = require('cors');

const parser = require('body-parser');

var Anuncios = require('./data/data.json');

//var arrayAnuncios = [{ id:20000, nombre:"Juan", apellido:"Perez", edad:20}];

var id = 20000;

var puerto = 3000;

var todoOk;



app.use(cors());



//app.use(express.json());



app.use(express.static(__dirname + '/public'));



//app.use(parser.urlencoded({ extended: true }));



// Express 4.0

app.use(parser.json({
  limit: '20mb'
}));

app.use(parser.urlencoded({
  extended: true,
  limit: '20mb'
}));



//--------------Traer Anuncios-----------------------------------



app.get("/traerAnuncios", function(request, response) {

  console.log("Enviando Anuncios");

  //console.log(Anuncios);

  require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function(err, data) {

    if (err) {

      throw err;

    } else if (data === undefined) {

      throw ("No se encontro la data solicitada");

    }



    var array = JSON.parse(data);

    array = array.filter(function(a) {

      return a.active == true || a.active == "true";

    });



    setTimeout(function() {
      response.send({
        "message": "Carga exitosa",
        "data": array
      });
    }, 50); // Time original 2000

  });



});



//------------Alta Anuncio----------------------------------------



app.post('/altaAnuncio', (request, response) => {



  var nuevoAnuncio = request.body;

  var Anuncio = {};



  if (validarAnuncio(nuevoAnuncio)) {

    require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function(err, data) {

      if (err) {

        throw err; // error handling

      } else {





        //guardo el objeto

        var array = [];

        array = JSON.parse(data);

        Anuncio.id = getID(array);

        /*Anuncio.foto = "public/img/"+Anuncio.id+".jpg";

        //guardo la imagen

        nuevoAnuncio.foto = nuevoAnuncio.foto.split(';base64,').pop();

        require("fs").writeFile(Anuncio.foto, nuevoAnuncio.foto, 'base64', function(err) {

            console.log(err);

          });*/

        Anuncio.titulo = nuevoAnuncio.titulo;

        Anuncio.descripcion = nuevoAnuncio.descripcion;

        Anuncio.transaccion = nuevoAnuncio.transaccion;

        Anuncio.precio = nuevoAnuncio.precio;

        Anuncio.num_wc = nuevoAnuncio.num_wc;

        Anuncio.num_estacionamiento = nuevoAnuncio.num_estacionamiento;

        Anuncio.num_dormitorio = nuevoAnuncio.num_dormitorio;

        Anuncio.active = "true";



        array.push(Anuncio);

        require('fs').writeFileSync(__dirname + '\\data\\data.json', JSON.stringify(array));

        //build response

        /*var respuesta = {

            message: "Alta exitosa",

            data: array

        }*/

        setTimeout(function() {
          response.send("Alta Exitosa");
        }, 2000);

      }



    });

  }

});



//----------Baja Anuncio--------------------------------------------



app.post('/bajaAnuncio', (request, response) => {

  var indice = request.body.id;

  var array;

  require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function(err, data) {

    if (err) {

      // error handling

    }

    array = JSON.parse(data);

    var objectToDelete = array.filter(function(a) {

      return a.id == indice;

    });

    remove(objectToDelete[0]);

    require('fs').writeFileSync(__dirname + '\\data\\data.json', JSON.stringify(array));

    //res.send({"message":"Baja exitosa"});

  });



  setTimeout(() => {

    response.send({
      "message": "Baja exitosa"
    });

  }, 2000);



});



//-----------------Modificar Anuncio-------------------------------



app.post('/modificarAnuncio', (request, response) => {



  var respuesta = {
    "todoOk": 0
  };

  var Anuncio = request.body;

  var AnuncioModificada = request.body;



  if (validarAnuncio(Anuncio, true)) {

    var array = new Array();

    require('fs').readFile(__dirname + '\\data\\data.json', 'utf8', function(err, data) {

      if (err) {

        // error handling

      }

      array = JSON.parse(data);

      //obtengo index del id que necesito

      var index = array.findIndex(function(obj) {
        return obj.id === Anuncio.id || obj.id.toString() === Anuncio.id;
      })

      array[index] = Anuncio;



      require('fs').writeFileSync(__dirname + '\\data\\data.json', JSON.stringify(array));

      //response.send('Modificacion exitosa');

    });

  } else {

    console.log("Anuncio invalida");

  }



  setTimeout(function() {

    response.send(respuesta);

  }, 60);

});



//-----------------------------------------------------------------





const server = app.listen(puerto, () => {

  console.log('Servidor web iniciado en el puerto ' + puerto);

});



// ---------------------Validar Anuncio---------------------------------------

// pasar objeto Anuncio y true si tiene id (modificacion) o false si no (alta)

function validarAnuncio(Anuncio, full) {



  var esValida = false;



  if (full) {

    if (Anuncio.hasOwnProperty('id') && Anuncio.hasOwnProperty('descripcion') && Anuncio.hasOwnProperty('num_dormitorio') && Anuncio.hasOwnProperty('num_estacionamiento') && Anuncio.hasOwnProperty('num_wc') && Anuncio.hasOwnProperty('precio') && Anuncio.hasOwnProperty('titulo') && Anuncio.hasOwnProperty('transaccion')) {

      esValida = true;

    }

  } else {

    if (Anuncio.hasOwnProperty('descripcion') && Anuncio.hasOwnProperty('num_dormitorio') && Anuncio.hasOwnProperty('num_estacionamiento') && Anuncio.hasOwnProperty('num_wc') && Anuncio.hasOwnProperty('precio') && Anuncio.hasOwnProperty('titulo') && Anuncio.hasOwnProperty('transaccion')) {

      esValida = true;

    }



  }



  return esValida;



}





app.get('/', function(req, res) {

  res.sendFile(__dirname + '/public/index.html');

});



app.get('/admin', function(req, res) {

  res.sendFile(__dirname + '/public/admin.html');

});



function remove(a) {

  a.active = "false";

}



function getID(array) {

  if (array.length == 0) {

    return 1;

  } else if (array.length == 1) {

    return 2;

  } else {

    var maxIndex = array.reduce(function(prev, curr, index) {

      if (parseInt(prev.id) > parseInt(curr.id))

        return parseInt(prev.id);

      else

        return parseInt(curr.id);

    });

    return (maxIndex + 1).toString();

  }

}
