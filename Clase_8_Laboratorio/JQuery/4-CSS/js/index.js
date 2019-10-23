$(function() {
    $("#btnEnviar").click(function() {
        console.log($("p.rojo").text());
        console.log($("p.rojo").html()); // Devuelve el innerHTML dentro de esa etiqueta
        console.log($("#btnEnviar").val()); // Valores
        console.log($("#btnEnviar").attr("id"));
    })

    $("#btnCambiar").click(function() {
            var boton = $("<input>").val("BOTONCITO").attr("type", "button").addClass("gray").css("border-radius", "15px");

            $("body").append(boton); // Mueve el boton Enviar antes del body


        })
        //$("input:last").toggleClass("gray");


});