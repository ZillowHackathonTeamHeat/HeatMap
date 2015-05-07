//list of crime objects
var crimeList = [];
//list of school objects
var schoolList = [];
//list of food bank objects
var foodBankList = [];
//list of publicArt
var publicArtList = [];
//list of public park objects
var publicParkList = [];
//list of public pool objects
var publicPoolList = [];

//which crimes are included
var includedCrimes = ["ASSAULTS", "BURGLARY", "ROBBERY"];
var crimeBaseURL = "https://data.seattle.gov/resource/3k2p-39jp.json?initial_type_subgroup="

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
};

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
};

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
    });
    schoolList = lst;
}

var populateFoodBanks = function () {
    $.ajax({
        type: "GET",
        url: "./datasets/foodBanksXML.xml",
        dataType: "xml",
        // it calls parseXml and adds it to var lst
        success: parseXmlFoodBank
    });
};

function parseXmlFoodBank(xml) {
    var foodLst = [];
    $(xml).find("row").each(function () {
        var amenity = {};
        amenity["amenityType"] = $(this).find("city_feature").text();
        amenity["lat"] = $(this).find("latitude").text();
        amenity["long"] = $(this).find("longitude").text();
        foodLst.push(amenity);
    });
    foodBankList = foodLst;
}

var publicArtUrl = "https://data.seattle.gov/resource/82su-5fxf.json?City Feature='Public Art'"
var populatePublicArt = function () {
    var artLst = [];
    $.getJSON(publicArtUrl, function (data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
            var art = {};
            var curObj = data[i];
            art["long"] = curObj["longitude"];
            art["lat"] = curObj["latitude"];
            artLst.push(art);
        }
    }).done(function () {
        publicArtList = artLst;
    })
};

var publicParkUrl = "https://data.seattle.gov/resource/82su-5fxf.json?City Feature='Parks'"
var populatePublicParks = function () {
    var parkLst = [];
    $.getJSON(publicParkUrl, function (data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
            var park = {};
            var curObj = data[i];
            park["long"] = curObj["longitude"];
            park["lat"] = curObj["latitude"];
            parkLst.push(park);
        }
    }).done(function () {
        publicParkList = parkLst;
    })
};

var publicPoolUrl = "https://data.seattle.gov/resource/82su-5fxf.json?City Feature='Pools'"
var populatePublicPools = function () {
    var poolLst = [];
    $.getJSON(publicPoolUrl, function (data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
            var pool = {};
            var curObj = data[i];
            pool["long"] = curObj["longitude"];
            pool["lat"] = curObj["latitude"];
            poolLst.push(pool);
        }
    }).done(function () {
        publicPoolList = poolLst;
    })
};
populateCrime(includedCrimes);
populateSchools();
populateFoodBanks();
populatePublicArt();
populatePublicParks();
populatePublicPools();
