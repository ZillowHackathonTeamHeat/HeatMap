var map, pointarray, heatmap;
var seattleLatLng = new google.maps.LatLng(47.6097, -122.331);
var seattleLat = 47.6097;
var seattleLng = -122.331;

// testData needs to contain everything from schoolList and crimeList
var testData = [];
setTimeout(function () {
    // number of LatLngs at the intersections of a grid centered around a location (Seattle)
    var initialCount = 2;
    // add a point in the intersections of a grid centered around a location (Seattle)
    for (var xoffset = -0.0001; xoffset < 0.0001; xoffset += 0.0001) {
        for (var yoffset = -0.0001; yoffset < 0.0001; yoffset += 0.0001) {
            for (var i = 0; i < initialCount; i++) {
                testData.push(new google.maps.LatLng(seattleLat + xoffset, seattleLng + yoffset));
            }
        }
    }

    for (var i = 0; i < schoolList.length; i++) {
        for (var j = 0; j < educationPriority * 2; j++) {
            // school list is broken
            // could be strings? no, i just checked, javascript automatically casts strings to ints when it needs
            // there are many more crimes than schools, so you need to change the weighting for schools * 10? and crimes * 1
            testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
        }
    }


    // should remove 1 (or none if not possible) nearest LatLng from the spot
    for (var i = 0; i < crimeList.length; i++) {
        // need a function to remove a nearby LatLng given a nearest LatLng
        //removeNearestLatLngToHere(new google.maps.LatLng(crimeList[i]["lat"], crimeList[i]["long"]));

        // if i comment this out, the heatmap breaks
        //testData.push(new google.maps.LatLng(crimeList[i]["lat"], crimeList[i]["long"]));
    }

    //rest of the amenities
    for (var i = 0; i < foodBankList.length; i++) {
        for (var j = 0; j < 20; j++) {
            testData.push(new google.maps.LatLng(foodBankList[i]["lat"], foodBankList[i]["long"]));
        }
    }
    for (var i = 0; i < historicBuildingsList.length; i++) {
        for (var j = 0; j < 10; j++) {
            testData.push(new google.maps.LatLng(historicBuildingsList[i]["lat"], historicBuildingsList[i]["long"]));
        }
    }
    for (var i = 0; i < publicArtList.length; i++) {
        for (var j = 0; j < 10; j++) {
            testData.push(new google.maps.LatLng(publicArtList[i]["lat"], publicArtList[i]["long"]));
        }
    }
    for (var i = 0; i < publicParkList.length; i++) {
        for (var j = 0; j < 5; j++) {
            testData.push(new google.maps.LatLng(publicParkList[i]["lat"], publicParkList[i]["long"]));
        }
    }
    for (var i = 0; i < publicPoolList.length; i++) {
        for (var j = 0; j < 5; j++) {
            testData.push(new google.maps.LatLng(publicPoolList[i]["lat"], publicPoolList[i]["long"]));
        }
    }
}, 1000);
setTimeout(function () {
    console.log(testData);
    setHeatMap();
}, 3500);

// remove nearest LatLng for weighting
function removeNearestLatLngToHere(latLng) {
    var lat = latLng.lat;
    var long = latLng.long;
    var oneMileInDegrees = 0.01449275362;

    var timesToRemove = safetyPriority;

    for (var i = 0;
        (i < testData.length) && (timesToRemove > 0); i++) {
        // just set it to null to remove
        // then whereever you use it, check if not null
        if ((Math.abs(testData[i].lat - lat) < oneMileInDegrees) && (Math.abs(testData[i].long - long) < oneMileInDegrees)) {
            testData[i] = null;
            timesToRemove--;
        }
    }
}

function initialize() {
    var mapOptions = {
        zoom: 12,
        center: seattleLatLng,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}

function setHeatMap() {
    // need to remove the null references
    var cleanedTestData = [];
    for (var i = 0; i < testData.length; i++) {
        if (testData[i] != null) {
            cleanedTestData.push(testData[i]);
        }
    }

    var pointArray = new google.maps.MVCArray(cleanedTestData);


    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.setMap(map);
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ];
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}


google.maps.event.addDomListener(window, 'load', initialize);

//google.maps.event.addDomListener(window, 'load', initialize);