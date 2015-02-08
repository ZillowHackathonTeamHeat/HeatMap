var crimeBaseURL = "https://data.seattle.gov/resource/3k2p-39jp.json?initial_type_subgroup="

//list of crime objects
var crimeList = [];
//list of school objects
var schoolList = [];

//which crimes are included
var includedCrimes = ["ASSAULTS", "BURGLARY"];

var populateCrime = function (includedCrimes) {
    var lst = [];
    for (var j = 0; j < includedCrimes.length; j++) {
        var URL = crimeBaseURL + includedCrimes[j];
        var idx = 0;
        $.getJSON(URL, function (data) {
            for (var i = 0; i < Object.keys(data).length; i++) {
                var crime = {};
                var curObj = data[i];
                crime["long"] = curObj["longitude"];
                crime["lat"] = curObj["latitude"];
                crime["type"] = includedCrimes[idx];
                lst.push(crime);
            }
            idx++;
        }).done(function () {
            crimeList = lst;
        })
    }
}
console.log(includedCrimes);
populateCrime(includedCrimes);

////////////////////////////////
/////////////////////////
var safety;
var education;
var transportation;
$("#test").ionRangeSlider({
    grid: true,
    min: 1,
    max: 10,
    from: 3,
    prefix: "Priority ",
    onChange: function (data) {
        safety = data['from'];
    }
});
$("#test2").ionRangeSlider({
    grid: true,
    min: 1,
    max: 10,
    from: 3,
    prefix: "Priority ",
    onUpdate: function (data) {
        education = data['from'];
    }
});
$("#test3").ionRangeSlider({
    grid: true,
    min: 1,
    max: 10,
    from: 3,
    prefix: "Priority ",
    onUpdate: function (data) {
        transportation = data['from'];
    }
});
/////////////////////////////////////////////////////////////////

var includedSchoolTypes = ["public", "private"];
var includedSchoolLevels = ["elementary", "middle"];
var populateSchools = function () {
    $.ajax({
        type: "GET",
        //url: "http://api.greatschools.org/schools/nearby?key=qjprfbqvcj6wh3k5ugcwywxx&state=WA&zip=98101&radius=200&limit=1000",
        url: "./datasets/nearbySchools.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXml
    });
}

function parseXml(xml) {
    var lst = [];
    $(xml).find("school").each(function () {
        var schools = {};

        schools["gsID"] = $(this).find("gsId").text();
        schools["name"] = $(this).find("name").text();
        schools["type"] = $(this).find("type").text();
        schools["long"] = $(this).find("lat").text();
        schools["lat"] = $(this).find("lon").text();

        lst.push(schools);
    })
    schoolList = lst;
}

populateSchools();
setTimeout(function () {
    console.log(schoolList);
}, 1000);
