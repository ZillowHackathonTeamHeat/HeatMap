var map, pointarray, heatmap;
var seattleLatLng = new google.maps.LatLng(47.6097, -122.331);
var seattleLat = 47.6097;
var seattleLng = -122.331;

// testData needs to contain everything from schoolList and crimeList
var testData = [];
setTimeout(function () {
    //this anonymous function adds a point in the intersections of a grid centered around a location
    for (var xoffset = -0.0001; xoffset < 0.0001; xoffset += 0.0001) {
        for (var yoffset = -0.0001; yoffset < 0.0001; yoffset += 0.0001) {
            testData.push(new google.maps.LatLng(seattleLat + xoffset, seattleLng + yoffset));
        }
    }

    for (var i = 0; i < crimeList.length; i++) {
        testData.push(new google.maps.LatLng(crimeList[i]["lat"], crimeList[i]["long"]));
    }

    for (var i = 0; i < schoolList.length; i++) {
        testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
        testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
        testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
        testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
        testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
    }
    
    //rest of the amenities
    for (var i = 0; i < foodBankList.length; i++) {
        testData.push(new google.maps.LatLng(foodBankList[i]["lat"], foodBankList[i]["long"]));
    }
    for (var i = 0; i < historicBuildingsList.length; i++) {
        testData.push(new google.maps.LatLng(historicBuildingsList[i]["lat"], historicBuildingsList[i]["long"]));
    }
    for (var i = 0; i < publicArtList.length; i++) {
        testData.push(new google.maps.LatLng(publicArtList[i]["lat"], publicArtList[i]["long"]));
    }
    for (var i = 0; i < publicParkList.length; i++) {
        testData.push(new google.maps.LatLng(publicParkList[i]["lat"], publicParkList[i]["long"]));
    }
    for (var i = 0; i < publicPoolList.length; i++) {
        testData.push(new google.maps.LatLng(publicPoolList[i]["lat"], publicPoolList[i]["long"]));
    }
}, 1000);
setTimeout(function () {
    console.log(testData);
    initialize();
}, 3000);

function initialize() {
    var mapOptions = {
        zoom: 12,
        center: seattleLatLng,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var pointArray = new google.maps.MVCArray(testData);

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

//google.maps.event.addDomListener(window, 'load', initialize);
