// restore mainData from localStorage
var mainData = localStorage.getItem('todoraMainData');

// if localStorage was empty, create a new default mainData
if (mainData == undefined) {
    createDefaultData();
} else {
    // pare json
    mainData = JSON.parse(mainData);
}

// save mainData in local storage
function saveContents() {
    localStorage.setItem('todoraMainData', JSON.stringify(mainData));
}

// fill mainData with the default value
function createDefaultData() {
    mainData = {
        0: {
            color: "green",
            title: "Shopping",
            items: {
                0: {
                    value: "Food",
                    done: false,
                },
                1: {
                    value: "Food",
                    done: true,
                },
            }
        },
    };
}

// create random color
function getRandomColor() {
    // create random number
    const random = Math.floor((Math.random() * 6) + 1);

    // convert number into a color string
    switch (random) {
        case 1:
            return "green";
        case 2:
            return "blue";
        case 3:
            return "orange";
        case 4:
            return "yellow";
        case 5:
            return "red";
        case 6:
            return "purple";
    }
}

// create new card
function addCard(id, cardContent) {

    var color = cardContent["color"];
    var title = cardContent["title"];

    $(".todora-content").append("" +
        "<div class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 center post-" + id + "\">\n" +
        "        <div class=\"post-it post-it-" + color + "\">\n" +
        "            <div class=\"row\">\n" +
        "                <p class=\"post-it-title\">" + title + "</p>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <ul class=\"post-it-list\">\n" +
        "                    <li>\n" +
        "                        <div class=\"row\">\n" +
        "                            <div class=\"col-xs-10\">\n" +
        "                                <label class=\"checkbox-inline\"><input type=\"checkbox\" value=\"\">Option 1</label>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-xs-2 center\">\n" +
        "                                <button type=\"button\" class=\"close\" aria-label=\"Delete\">\n" +
        "                                    <span aria-hidden=\"true\">&times;</span>\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </li>\n" +
        "                    <li>\n" +
        "                        <div class=\"row\">\n" +
        "                            <div class=\"col-xs-10\">\n" +
        "                                <label class=\"checkbox-inline list-item-select\"><input type=\"checkbox\" value=\"\">Option 2</label>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-xs-2 center\">\n" +
        "                                <button type=\"button\" class=\"close\" aria-label=\"Delete\">\n" +
        "                                    <span aria-hidden=\"true\">&times;</span>\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </li>\n" +
        "                </ul>\n" +
        "            </div>\n" +
        "            <div class=\"row\">\n" +
        "                <div class=\"col-xs-6 center\">\n" +
        "                    <a href=\"#\" class=\"btn btn-primary\">\n" +
        "                        <span class=\"glyphicon glyphicon-plus\"></span> ADD\n" +
        "                    </a>\n" +
        "                </div>\n" +
        "                <div class=\"col-xs-6 center\">\n" +
        "                    <a href=\"#\" id=\"delete-single-card-" + id + "\" class=\"btn btn-danger\">\n" +
        "                        <span class=\"glyphicon glyphicon-minus\"></span> DELETE\n" +
        "                    </a>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>"
    );

    // add button function
    createDelButton(id);
}

// create mutiple cards
function createMutipleCards() {
    for (key in mainData) {
        addCard(key, mainData[key]);
    }
}

// delete single card
function deleteSingleCard(key) {
    return function () {
        // remove single card
        $(".post-" + key).remove();

        // delete card entry from mainData & save it to local storage
        delete mainData[key];
        saveContents();
    }
}

// Button area

// reset all list & create 1 single card
$("#reset-list").click(function () {
    // delete local storage
    localStorage.removeItem("todoraMainData");

    // remove all cards
    for (key in mainData) {
        $(".post-" + key).remove();
    }

    // create default mainData
    createDefaultData();

    // create a single card with the default mainData
    createMutipleCards();
});

// add new empty card
$("#add-list").click(function () {

    // default value
    var cardContent = {
        color: getRandomColor(),
        title: "ToDo List",
        items: {},
    };

    if (Object.keys(mainData).length == 0) {
        var nextKey = 0;
    } else {
        // last item of mainData
        var last_item = null;
        for (key in mainData) {
            last_item = key;
        }

        var nextKey = parseInt(key) + 1;
    }

    mainData[nextKey] = cardContent;

    // add new card with a default value
    addCard(nextKey, cardContent);

    saveContents();
});

// single card list delete button
function createDelButton(key) {
    $(document).ready(function () {
        $('#delete-single-card-' + key).click(deleteSingleCard(key));
    });
}

// run at script start

// create cards with saved content
createMutipleCards();

