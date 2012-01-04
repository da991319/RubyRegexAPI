function SetOption() {
    var value = $j("input[name=language]:checked").val();
    switch (value) {
        case "js":
            $j(".JsOption").show();
            $j(".NetOption").hide();
            $j(".PhpOption").hide();
            $j("#PhpWarning").hide();
            break;
        case ".net":
            $j(".NetOption").show();
            $j(".JsOption").hide();
            $j(".PhpOption").hide();
            $j("#PhpWarning").hide();
            break;
        case "php":
            $j(".PhpOption").show();
            $j(".NetOption").hide();
            $j(".JsOption").hide();
            $j("#PhpWarning").show();
            break;
    }
    CheckReg();     
}

function CheckReg() {
    var value = $j("input[name=language]:checked").val();
    switch (value) {
        case "js":
            jsReg();
            break;
        case ".net":
            netReg();
            break;
        case "php":
            phpReg();
            break;
    }
}

function jsReg() {
    if ($j("#TxtSearchString").val().length > 0 && $j("#TxtPattern").val().length > 0) {
        var modifiers = "";
        if ($j("#IgnoreCase").is(":checked")) {
            modifiers = modifiers + "i";
        }

        if ($j("#Multiline").is(":checked")) {
            modifiers = modifiers + "m";
        }

        if ($j("#Global").is(":checked")) {
            modifiers = modifiers + "g"
        }

        var pattern = new RegExp($j("#TxtPattern").val(), modifiers);
        var results = $j("#TxtSearchString").val().match(pattern);
        writeResult(results);
    }
    else {
        $j("#LabelResponse").html("");
        if ($j("#TxtSearchString").val().length == 0) {
            $j("#LabelResponse").append("The searched string is empty <br/>");
        }
        if ($j("#TxtPattern").val().length == 0) {
            $j("#LabelResponse").append("The pattern string is empty");
        }
        if (!$j("#regexpresponse").hasClass("regexresponsenoresult")) {
            $j("#regexpresponse").addClass("regexresponsenoresult");
        }
    }
};

function netReg() {
    var input = $j("#TxtSearchString").val();
    var pattern = $j("#TxtPattern").val();
    if ($j("#TxtSearchString").val().length > 0 && $j("#TxtPattern").val().length > 0) {
        var options = getOptions().join(",");
        $j.ajax({
            type: "POST",
            url: "http://aspspider.net/tiphryam/RegExp.ashx?callback=?",
            data: { input: input, pattern: pattern, options: options },
            dataType: "jsonp",
            crossDomain: true,
            success: function (d) {
                var results = d;
                var i;
                writeResult(results);
            }
        });
    }
    else {
        $j("#LabelResponse").html("");
        if ($j("#TxtSearchString").val().length == 0) {
            $j("#LabelResponse").append("The searched string is empty <br/>");
        }
        if ($j("#TxtPattern").val().length == 0) {
            $j("#LabelResponse").append("The pattern string is empty");
        }
        if (!$j("#regexpresponse").hasClass("regexresponsenoresult")) {
            $j("#regexpresponse").addClass("regexresponsenoresult");
        }
    }
    
};


function phpReg() {
    var input = $j("#TxtSearchString").val();
    var pattern = $j("#TxtPattern").val();
    if ($j("#TxtSearchString").val().length > 0 && $j("#TxtPattern").val().length > 0) {
        var options = getOptions().join(",");
        $j.ajax({
            type: "POST",
            url: "RegExp/Regex.php",
            data: { input: input, pattern: pattern, options: options },
            dataType: "json",
            success: function (d) {
                var results = d;
                writeResult(results);
            }
        });
    }
    else {
        $j("#LabelResponse").html("");
        if ($j("#TxtSearchString").val().length == 0) {
            $j("#LabelResponse").append("The searched string is empty <br/>");
        }
        if ($j("#TxtPattern").val().length == 0) {
            $j("#LabelResponse").append("The pattern string is empty");
        }
        if (!$j("#regexpresponse").hasClass("regexresponsenoresult")) {
            $j("#regexpresponse").addClass("regexresponsenoresult");
        }
    }
    
};

function writeResult(results) {
    $j("#LabelResponse").html("");
    if (results.length > 0) {
        $j("#LabelResponse").html("");
        if (results.length == 1) {
            $j("#LabelResponse").append("1 match found:<br/>");
        }
        else {
            $j("#LabelResponse").append(results.length + " matches found:<br/>");
        }
        for (i = 0; i < results.length; i++) {
            $j("#LabelResponse").append((i + 1) + ": " + results[i] + "<br />");
        }
    }
    else {
        $j("#LabelResponse").html("No Match found");
    }
    if ($j("#regexpresponse").hasClass("regexresponsenoresult")) {
        $j("#regexpresponse").removeClass("regexresponsenoresult");
    }
}

function getOptions() {
    var options = [];
    $j("#OptionsDiv input:checked").each(function () {
        options.push($j(this).val());
    });

    return options;
}
