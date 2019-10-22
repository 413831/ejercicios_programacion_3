$(function() {
    $("#btnEnviar").click(function() {
        console.log($("p.rojo").text());
        console.log($("p.rojo").html()); // Devuelve el innerHTML dentro de esa etiqueta
        console.log($("#btnEnviar").val()); // Valores
        console.log($("#btnEnviar").attr("id"));
    })

    $("#btnCambiar").click(function() {
        $("p.rojo").text("Este es el nuevo texto del nuevo parrafo rojo");
        $("p:last").html("<strong>Este es el nuevo texto del nuevo parrafo rojo PERO EN NEGRITA</strong>");
        $("p:last").html(function(i, prevHTML) {
            return prevHTML + " Agrego mas HTML";
        })
        $("#btnCambiar").val("Nuevo cambiar");
        // $("#btnCambiar").attr("class", "gray"); OPCION A
        $("#btnCambiar").attr({ // OPCION B
            "class": "gray"
        });
        var boton = $("<input>").val("Nuevo Boton").attr("type", "button");
        $("#btnCambiar").after(boton);
        $("body").prepend(btnEnviar); // Mueve el boton Enviar antes del body

    })


});