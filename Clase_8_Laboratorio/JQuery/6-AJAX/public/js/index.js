$(function() {
    $("#btnCargarJson").click(function() {
        // llamo a cargar
        var impresion_consola = function() {
            console.log(datos);
        }
        cargarDatos(impresion_consola);
    });
});