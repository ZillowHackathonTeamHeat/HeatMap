var map, pointarray, heatmap;

var testData = [];
setTimeout(function () {
    for (var i = 0; i < crimeList.length; i++) {
        testData.push(new google.maps.LatLng(crimeList[i]["lat"], crimeList[i]["long"]));
    }
}, 1000);
setTimeout(function () {
    for (var i = 0; i < schoolList.length; i++) {
        testData.push(new google.maps.LatLng(schoolList[i]["lat"], schoolList[i]["long"]));
    }
}, 100);
setTimeout(function () {
    console.log(testData);
    initialize();
}, 5000);

function initialize() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(47.6097, -122.331),
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
//plz
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
