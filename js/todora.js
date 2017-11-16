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
            title: "ToDo List",
            items: {
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
        "<div class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 center post-it post-it-"+color+" post-" + id + "\">\n" +
        "    <div class=\"row\">\n" +
        "        <input class=\"post-it-title\" type=\"text\" value='" + title + "' id=\"input-title-" + id + "\">" +
        "    </div>\n" +
        "    <div class=\"row post-it-list post-card-" +id+ "\">" +
        "    </div>\n" +
        "    <div class=\"row\">\n" +
        "        <div class=\"col-xs-6 center\">\n" +
        "            <a href=\"#\" id='add-single-card-item-"+id+"' class=\"btn btn-primary\">\n" +
        "                <span class=\"glyphicon glyphicon-plus\"></span> ADD\n" +
        "            </a>\n" +
        "        </div>\n" +
        "        <div class=\"col-xs-6 center\">\n" +
        "            <a href=\"#\" id=\"delete-single-card-" + id + "\" class=\"btn btn-danger\">\n" +
        "                <span class=\"glyphicon glyphicon-minus\"></span> DELETE\n" +
        "            </a>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>"
    );

    for (item in mainData[key]["items"]) {
        addCardItem(key, item);
    }

    // add button function
    deleteSingleCardButton(id);
    updateSingleCardTitleButton(id);
    addSingleCardItemButton(id);
}

// create card item
function addCardItem(key, item) {
    // item value
    var value = mainData[key]["items"][item]["value"];

    // if the item was checked
    if (mainData[key]["items"][item]["done"]) {
        var checked = "checked";
        var itemSelect = "list-item-select";
    } else {
        var checked = "";
        var itemSelect = "";
    }

    // vars for html id
    var itemId = "card-" + key + "-item-" + item;
    var updateItemId = "update-" + itemId;
    var deleteItemId = "delete-" + itemId;
    var valueItemId = "value-" + itemId;

    $(".post-card-"+key).append("" +
        "<div class='row "+itemId+"'>" +
        "    <label class='item-entry' class='"+itemSelect+"'>" +
        "        <input id='"+updateItemId+"' type=\"checkbox\" "+checked+"> " +
        "        <input id='"+valueItemId+"' class='post-it-title "+itemSelect+"' type='text' value='"+value+"'>" +
        "     </label>" +
        "     <span id='"+deleteItemId+"' class=\"glyphicon glyphicon-remove-circle item-entry-delete\" aria-hidden=\"true\"></span>" +
        "</div>"
    );

    // add buttons function
    updateCardItemButton(key, item);
    deleteCardItemButton(key, item);
    updateSingleCardItemTitleButton(key, item);
}

// create mutiple cards
function createMutipleCards() {
    for (key in mainData) {
        addCard(key, mainData[key]);
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
        items: {
        },
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
function deleteSingleCardButton(key) {
    $(document).ready(function () {
        $('#delete-single-card-' + key).click(deleteSingleCard(key));
    });
}

function deleteSingleCard(key) {
    return function () {
        // remove single card
        $(".post-" + key).remove();

        // delete card entry from mainData & save it to local storage
        delete mainData[key];
        saveContents();
    }
}

// single card list add button
function addSingleCardItemButton(key) {
    $(document).ready(function () {
        $('#add-single-card-item-' + key).click(addSingleCardItem(key));
    });
}

function addSingleCardItem(key) {
    return function () {
        // default value
        var defaultItemContent = {
            value: "",
            done: false,
        };

        if (Object.keys(mainData[key]["items"]).length == 0) {
            var nextItem = 0;
        } else {
            // last item of mainData
            var last_item = null;
            for (item in mainData[key]["items"]) {
                last_item = item;
            }

            var nextItem = parseInt(item) + 1;
        }

        mainData[key]["items"][nextItem] = defaultItemContent;

        // add new card with a default value
        addCardItem(key, nextItem);

        saveContents();
    }
}

// single card title
function updateSingleCardTitleButton(key) {
    $(document).ready(function () {
        $('#input-title-' + key).keyup(updateSingleCardTitle(key));
    });
}

// update title
function updateSingleCardTitle(key) {
    return function () {
        // get title from card
        var cardTitle = $('#input-title-' + key).val();

        // update mainData
        mainData[key]['title'] = cardTitle;

        // save mainData
        saveContents();
    }
}

// update card item
function updateCardItemButton(key, item) {
    $(document).ready(function () {
        $("#update-card-" + key + "-item-" + item).click(updateCardItem(key, item));
    });
}

function updateCardItem(key, item) {
    return function () {
        var itemChecked = mainData[key]["items"][item]["done"];
        var labelId = "#value-card-" + key + "-item-" + item

        // switch html checked
        if (itemChecked) {
            $(labelId).removeClass("list-item-select");
        } else {
            $(labelId).addClass("list-item-select");
        }

        // switch checked status in mainData
        mainData[key]["items"][item]["done"] = !mainData[key]["items"][item]["done"];

        // save mainData to localStorage
        saveContents();
    }
}

// delete card item
function deleteCardItemButton(key, item) {
    $(document).ready(function () {
        $("#delete-card-" + key + "-item-" + item).click(deleteCardItem(key, item));
    });
}

function deleteCardItem(key, item) {
    return function () {
        // remove item
        $(".card-" + key + "-item-" + item).remove();

        // delete item
        delete mainData[key]["items"][item];

        // save mainData
        saveContents();
    }
}

// update title card item
function updateSingleCardItemTitleButton(key, item) {
    $(document).ready(function () {
        var itemId = "#value-card-" + key + "-item-" + item;
        $(itemId).keyup(updateSingleCardItemTitle(key, item));
    });
}

// update title
function updateSingleCardItemTitle(key, item) {
    return function () {
        // get title from card
        var itemId = "#value-card-" + key + "-item-" + item;
        var itemValue = $(itemId).val();

        // update mainData
        mainData[key]["items"][item]["value"] = itemValue;

        // save mainData
        saveContents();
    }
}


// run at script start

// create cards with saved content
createMutipleCards();
