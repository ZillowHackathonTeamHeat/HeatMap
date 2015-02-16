var safetyPriority;
var educationPriority;
var amenPriority;
$("#test").ionRangeSlider({
    grid: true,
    min: 0,
    max: 10,
    from: 1,
    prefix: "Priority: ",
    onChange: function (data) {
        safetyPriority = data['from'];
    }
});
$("#test2").ionRangeSlider({
    grid: true,
    min: 0,
    max: 10,
    from: 5,
    prefix: "Priority: ",
    onUpdate: function (data) {
        educationPriority = data['from'];
    }
});
$("#test3").ionRangeSlider({
    grid: true,
    min: 0,
    max: 10,
    from: 3,
    prefix: "Priority: ",
    onUpdate: function (data) {
        amenPriority = data['from'];
    }
});
$("#overlaybutton").click(function () {
    $("#mainmenu").show(1000);
    $("#panel").show(1000);
    $("#overlay").hide(1000);
    $("#overlaybutton").hide(1000);
});

$("#overlaybutton").show(800);
$("#newmap").click(function () {

});

$('#mainmenu').draggable({
    handle: "#menuheader"
});

$('#amenitiesoptions').click(function () {
    if (($('#aform').is(':hidden'))) {
        $('#aform').show(500);
    } else {
        $('#aform').hide(500);
    }
});

$('.amen').click(function () {
    var amen = $(this).attr('id')
    if (_.indexOf(includedAmen, amen) == -1) {
        includedAmen.push(amen);
    } else {
        _.pull(includedAmen, amen);
    }
    console.log(includedAmen);
});
