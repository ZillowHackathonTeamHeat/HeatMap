$("#test").ionRangeSlider({
    grid: true,
    min: 0,
    max: 100,
    from: crimeWeight,
    prefix: "Priority: ",
    onChange: function (data) {
        crimeWeight = data['from']/10 //crimeList.length;
        console.log(crimeWeight);
    }
});
$("#test2").ionRangeSlider({
    grid: true,
    min: 0,
    max: 100,
    from: schoolWeight,
    prefix: "Priority: ",
    onChange: function (data) {
        schoolWeight = data['from']//schoolList.length;
        console.log(schoolWeight);
    }
});
$("#test3").ionRangeSlider({
    grid: true,
    min: 0,
    max: 100,
    from: amenWeight,
    prefix: "Priority: ",
    onChange: function (data) {
        amenWeight = data['from'] //amenWeight.length;
        console.log(amenWeight);
    }
});
//$("#overlaybutton").click(function () {
$(function(){
    setTimeout(function(){
        $('#ajax').show(500);
    }, 500);
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 5 // Creates a dropdown of 15 years to control year
    });

});

var $input = $('.datepicker').pickadate()
var picker = $input.pickadate('picker')

setTimeout(function(){
    $("#mainmenu").show(1000);
    $("#panel").show(1000);
    $("#overlay").hide(1000);
    $("#overlaybutton").hide(1000);
}, 1000);

$("#newmapButton").click(function () {
    $('#ajax').show(350);
    testData = [];
    populatePoints();
    setHeatMap();
    $('#ajax').hide(350);
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

$('#educationoptions').click(function () {
    if (($('#eform').is(':hidden'))) {
        $('#eform').show(500);
    } else {
        $('#eform').hide(500);
    }
});

$('#safetyoptions').click(function () {
    console.log("HI");
    if (($('#sform').is(':hidden'))) {
        $('#sform').show(500);
        $('#dateRange').show(500);
    } else {
        $('#sform').hide(500);
        $('#dateRange').hide(500);
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
