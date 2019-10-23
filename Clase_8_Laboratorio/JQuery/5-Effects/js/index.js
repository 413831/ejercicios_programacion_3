$(function() {
    $("p:last").hide(400, function() {
        $("p:last").show(400);
    });

    $("p:last").hide(4000);
    $("p:last").show(4000);
    $("p:last").toggle(4000, function() {
        $("p:last").toggle(4000);
    });

    $("#btnEnviar").click(function() {
        $("#btnEnviar").animate({
            height: '+=500px',
            width: '+=500px'
        }, 5000).animate({
            height: '-=500px',
            width: '-=500px'
        }, 2000);
    });

});