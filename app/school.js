/**
 * Created by Shrinivas on 2/7/2015.
 */

/*
$(document).ready(function () {
    $.ajax({
        type: "GET",
        //url: "http://www.api.greatschools.org/schools/nearby?key=qjprfbqvcj6wh3k5ugcwywxx&state=WA&zip=98101&radius=200&limit=1000",
        url:"./nearbySchools.xml",
        //url: "api.greatschools.org/schools/nearby?key=qjprfbqvcj6wh3k5ugcwywxx&state=WA&zip=98101&radius=200&limit=1000",
        //url: "http://api.greatschools.org/schools/nearby?key=qjprfbqvcj6wh3k5ugcwywxx&state=WA&zip=98101&radius=200&limit=1000",
        dataType: "xml",
        success: parseXml
    });
});

function parseXml(xml) {
    $(xml).find("school").each(function () {
        $("#output").append("latitude: " + $(this).find("lat").text());
        $("#output").append("   longitude: " + $(this).find("lon").text() + "<br />");
        console.log($(this).find("lat").text());
    });
}
*/
var schoolList = [];
var includedSchoolTypes = ["public", "private"];
var includedSchoolLevels = ["elementary", "middle"];
var populateSchools = function () {
    $.ajax({
        type: "GET",
        //url: "http://api.greatschools.org/schools/nearby?key=qjprfbqvcj6wh3k5ugcwywxx&state=WA&zip=98101&radius=200&limit=1000",
        url:"./datasets/nearbySchools.xml",
        dataType: "xml",
        success: parseXml
    });
}

function parseXml(xml) {
    var lst = [];
    $(xml).find("school").each(function () {
        var schools = {};
        var curObj = data[i];

        schools["gsID"] = $(this).find("gsId").text();
        schools["name"] = $(this).find("name").text();
        schools["type"] = $(this).find("type").text();
        schools["long"] = $(this).find("lat").text();
        schools["lat"] = $(this).find("lon").text();

        lst.push(schools);
        console.log(schools);
    });
    schoolList = lst;
    console.log(lst);
}

parseXml();
setTimeout(function(){
    console.log(schoolList);
}, 2000);

function filterSchoolType(typeSelected) {
    var found_names = $.grep(schoolList, function(v) {
        return v.type === typeSelected;
    });
}
function filterSchoolLevel(levelSelected) {
    var found_names = $.grep(schoolList, function(v) {
        return v.type === levelSelected;
    });
}


