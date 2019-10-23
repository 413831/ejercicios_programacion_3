$(function() {
    $("#btnCargarJson").click(function() {
        // llamo a cargar
        var impresion_consola = function() {
            console.log(datos);
            $("#content").text(datos);
        }
        cargarDatos(impresion_consola);
    });

    $("#btnAlta").click(function() {
        // llamo a cargar
        var impresion_consola = function() {
            console.log(datos);
            $("#content").text(datos);
        }
        guardarDatos(new Anuncio(300, "Casita bonita", "ALTA CHOZA", "Venta", 30000, 2, 1, 3), impresion_consola);
    });
});