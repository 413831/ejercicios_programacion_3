$(function() {
    $("#btnEnviar").click(function() {
        alert("Hiciste click en el boton");
    })

    $("p").hover(function() {
            console.log("Primer parrafo");
        },
        function(e) {
            console.log("Chau");
        });

    // Forma A de usar la funcion "on"
    $("p").on("click", function() {

    });

    // Forma B de usar la funcion "on"
    $("p.rojo").on({
        "click": function() {
            console.log("Has dado un CLICK");
        },
        "mouseenter": function() {
            console.log("HOLUS");
        },
        "mouseleave": function() {
            console.log("CIAO");
        }
    });


});