var crimeBaseURL = "https://data.seattle.gov/resource/3k2p-39jp.json?event_clearance_group=ACCIDENT%20INVESTIGATION&event_clearance_code=430"

var crimeList = [];

var populateCrime = function () {
    $.getJSON(crimeBaseURL, function (data) {
        for (var i = 0; i < Object.keys(data).length; i++) {
            console.log(data[i]);
        }
    });
}

populateCrime();
