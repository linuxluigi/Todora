// add list
$("#add-list").click(function () {

    // generate random color
    const random = Math.floor((Math.random() * 6) + 1);
    var color = "green";

    console.log(random)

    switch(random) {
        case 1:
            color = "green";
            break;
        case 2:
            color = "blue";
            break;
        case 3:
            color = "orange";
            break;
        case 4:
            color = "yellow";
            break;
        case 5:
            color = "red";
            break;
        case 6:
            color = "purple";
            break;
    }

    $(".todora-content").append("" +
        "<div id=\"post-1\" class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 center\">\n" +
        "        <div class=\"post-it post-it-" + color + "\">\n" +
        "            <div class=\"row\">\n" +
        "                <p class=\"post-it-title\">X-MAS</p>\n" +
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
        "                    <a href=\"#\" class=\"btn btn-danger\">\n" +
        "                        <span class=\"glyphicon glyphicon-minus\"></span> DELETE\n" +
        "                    </a>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>"
    );
});
