var crimeBaseURL = "https://data.seattle.gov/resource/3k2p-39jp.json?initial_type_subgroup="

//list of crime objects
var crimeList = [];
//list of school objects
var schoolList = [];
//list of food bank objects
var foodBankList = [];
//list of historic building objects
var historicBuildingsList = [];
//list of publicArt
var publicArtList = [];
//list of public park objects
var publicParkList = [];
//list of public pool objects
var publicPoolList = [];

//which crimes are included
var includedCrimes = ["ASSAULTS", "BURGLARY", "ROBBERY"];

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
var safetyPriority;
var educationPriority;
var transportationPriority;
$("#test").ionRangeSlider({
    grid: true,
    min: 1,
    max: 10,
    from: 1,
    prefix: "Priority ",
    onChange: function (data) {
        safetyPriority = data['from'];
    }
});
$("#test2").ionRangeSlider({
    grid: true,
    min: 1,
    max: 10,
    from: 5,
    prefix: "Priority ",
    onUpdate: function (data) {
        educationPriority = data['from'];
    }
});
$("#test3").ionRangeSlider({
    grid: true,
    min: 1,
    max: 10,
    from: 3,
    prefix: "Priority ",
    onUpdate: function (data) {
        transportationPriority = data['from'];
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
}, 3000);

var populateFoodBanks = function () {
    $.ajax({
        type: "GET",
        url: "./datasets/foodBanksXML.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXmlFoodBank()
    });
}

function parseXmlFoodBank(xml) {
    var lst = [];
    $(xml).find("row").each(function () {
        var amenity = {};

        amenity["amenityType"] = $(this).find("city_feature").text();
        amenity["lat"] = $(this).find("latitude").text();
        amenity["long"] = $(this).find("longitude").text();

        lst.push(amenity);
    })
    foodBankList = lst;
}

var populateHistoricBuildings = function () {
    $.ajax({
        type: "GET",
        url: "./datasets/historicBuildingsXML.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXmlHistoricBuildings()
    });
}

function parseXmlHistoricBuildings(xml) {
    var lst = [];
    $(xml).find("row").each(function () {
        var amenity = {};

        amenity["amenityType"] = $(this).find("city_feature").text();
        amenity["lat"] = $(this).find("latitude").text();
        amenity["long"] = $(this).find("longitude").text();

        lst.push(amenity);
    })
    historicBuildingsList = lst;
}

var populatePublicArt = function () {
    $.ajax({
        type: "GET",
        url: "./datasets/PublicArtXML.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXmlPublicArt()
    });
}

function parseXmlPublicArt(xml) {
    var lst = [];
    $(xml).find("row").each(function () {
        var amenity = {};

        amenity["amenityType"] = $(this).find("city_feature").text();
        amenity["lat"] = $(this).find("latitude").text();
        amenity["long"] = $(this).find("longitude").text();

        lst.push(amenity);
    })
    publicArtList = lst;
}


var populatePublicParks = function () {
    $.ajax({
        type: "GET",
        url: "./datasets/PublicParksXML.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXmlPublicParks()
    });
}

function parseXmlPublicParks(xml) {
    var lst = [];
    $(xml).find("row").each(function () {
        var amenity = {};

        amenity["amenityType"] = $(this).find("city_feature").text();
        amenity["lat"] = $(this).find("latitude").text();
        amenity["long"] = $(this).find("longitude").text();

        lst.push(amenity);
    })
    publicParkList = lst;
}

var populatePublicPools = function () {
    $.ajax({
        type: "GET",
        url: "./datasets/PublicPoolsXML.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXmlPublicPools()
    });
}

function parseXmlPublicPools(xml) {
    var lst = [];
    $(xml).find("row").each(function () {
        var amenity = {};

        amenity["amenityType"] = $(this).find("city_feature").text();
        amenity["lat"] = $(this).find("latitude").text();
        amenity["long"] = $(this).find("longitude").text();

        lst.push(amenity);
    })
    publicPoolList = lst;
}