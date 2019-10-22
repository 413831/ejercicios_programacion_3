$(function() {
    // selecciono por ID
    console.log($("#btnEnviar")); // Siempre con comillas para cualquier selector

    // selecciono por tag
    console.log($("p"));

    // selecciono por clase
    console.log($("p.rojo"));

    // selecciono por clase
    console.log($("p.last"));

    // selecciono por atributo
    console.log($("p[class = rojo]"));

});