/**
 * Created by Shrinivas on 2/7/2015.
 */
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://api.greatschools.org/schools/nearby?key=qjprfbqvcj6wh3k5ugcwywxx&state=WA&zip=98101&radius=200&limit=1000",
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