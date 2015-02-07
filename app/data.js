var crimeBaseURL = "https://data.seattle.gov/resource/3k2p-39jp.json?initial_type_subgroup="

//list of crime objects
var crimeList = [];

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
