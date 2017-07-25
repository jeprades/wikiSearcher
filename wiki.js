/**
 * Created by jesica on 7/23/2017.
 */

/*searchVal will store the input of the user*/
var searchVal;

/*htmlDiv will create div elements related to all the elements of the searched object*/


//Change the design of the website
function collapse() {
    $(".container").removeClass("containerInit").addClass("containerFinal");

    $(".title").css({ "font-size": "2em" });

    $("#titleCol").removeClass("col-md-12").addClass("col-md-3 col-sm-12 col-12");
    $("#searchCol").removeClass("col-md-12").addClass("col-md-7 col-sm-10 col-5");
    $("#buttonCol").removeClass("col-md-12").addClass("col-md-2 col-sm-2 col-4");
    $("#creditsCol").removeClass("sticky").addClass("centerCredit");
}

function runWeb() {
    collapse();

    var request =
        "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&inprop=url&generator=search&exsentences=1&exlimit=10&exintro=1&gsrnamespace=0&gsrlimit=10&origin=*&gsrsearch=";

    $.getJSON(request + searchVal, function(data) {

        var htmlDiv = "";

        for (var prop in data.query.pages) {
            console.log(data.query.pages[prop]);
            var article = data.query.pages[prop];

            htmlDiv += '<div class="col-md-10 col-sm-11 col-11" id="boxWiki">';
            htmlDiv += '<a target="_blank" href="' + article.fullurl + '">';
            htmlDiv += '<h3>' + article.title + '</h3>';
            htmlDiv += '<p>' + article.extract + '</p>';
            htmlDiv += '</a>';
            htmlDiv += '</div>';
        }

        $("#results").html(htmlDiv);

    });
}

$(document).ready(function() {


    $("input").on("input", function() {
        searchVal = $("input").val();

        if (searchVal.length >= 3) {
            runWeb();
        }

        console.log(searchVal);
    });

    $("input").keypress(function(e) {
        if (e.which == 13) {
            runWeb();
        }
    });
});
