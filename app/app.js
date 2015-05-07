var startDate;
var endDate;
$("#test").ionRangeSlider({
    grid: true,
    min: 0,
    max: 100,
    from: crimeWeight,
    prefix: "Priority: ",
    onChange: function (data) {
        crimeWeight = data['from'] / 10 //crimeList.length;
    }
}); -
$("#test2").ionRangeSlider({
    grid: true,
    min: 0,
    max: 100,
    from: schoolWeight,
    prefix: "Priority: ",
    onChange: function (data) {
        schoolWeight = data['from'] //schoolList.length;
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
    }
});
//$("#overlaybutton").click(function () {
$(function () {
    setTimeout(function () {
        $('#ajax').show(500);
    }, 500);
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 5 // Creates a dropdown of 15 years to control year
    });
    startDate = $('#start').pickadate().pickadate('picker');
    endDate = $('#end').pickadate().pickadate('picker');
    startDate.set('select', [2012, 4, 1]);
    endDate.set('select', [2015, 4, 20]);

    console.log(startDate.get());
    console.log(done);
    setTimeout(function () {
        if (done == 8) {
            //$('#ajax').hide(500);
        }
    }, 2050);
});

setTimeout(function () {
    $("#mainmenu").show(1000);
    $("#panel").show(1000);
    $("#overlay").hide(1000);
    $("#overlaybutton").hide(1000);
}, 1000);

$("#newmapButton").click(function () {
    $('#ajax').show(350);
    testData = [];
    populatePoints();
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

$('.safety').click(function () {
    var crime = $(this).attr('id')
    if (_.indexOf(includedCrimes, crime) == -1) {
        includedCrimes.push(crime);
    } else {
        _.pull(includedCrimes, crime);
    }
    console.log(includedCrimes);
});

$('.school').click(function () {
    var school = $(this).attr('id')
    if (_.indexOf(includedSchoolTypes, school) == -1) {
        includedSchoolTypes.push(school);
    } else {
        _.pull(includedSchoolTypes, school);
    }
    console.log(includedSchoolTypes);
});
