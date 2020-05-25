function Totalize() {
    var ss = SpreadsheetApp.openById("1Cz0QLRFAcNCdjdIoSGjlnkCA_zoRd3e7_jyNeEMcTaA")

    var names = [];
    var hours = [];
    var emails = [];

    var sum = 0;

    var values = ss.getSheetByName("Submissions").getDataRange().getValues();

    // Get all names
    for (var i = 1; i < values.length; i++) {
        var cell = values[i][1];
        names.push(String(cell).toLowerCase()
            .replace("  ", " ")
            .trim()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')

        );
    }

    // Get all hours
    for (var i = 1; i < values.length; i++) {
        var cell = values[i][5];
        var email = values[i][12];

        var hourValue = parseFloat(cell);
        if (!isNaN(hourValue)) {
            hours.push(hourValue);
            if (values[i][9] == "Yes")
                sum += hourValue;
        }
        else {
            hours.push(0);
        }
        Logger.log("Email: " + email);
        emails.push(email);
    }

    // Output

    var outputSheet = ss.getSheetByName("Total Hours");
    outputSheet.clear();

    var outputList = [];

    outputList.push(["Names", "Hours", "Emails"]);
    for (var i = 0; i < names.length; i++) {
        var found = false;
        for (var j = 0; j < outputList.length; j++) {
            if (outputList[j][0] == names[i]) {
                outputList[j][1] += hours[i];
                found = true;
                break;
            }
        }
        if (!found)
            outputList.push([names[i], hours[i], emails[i]]);
    }

    outputSheet.getRange(1, 1, outputList.length, 3).setValues(outputList);


    // Awards
    var awardSheet = ss.getSheetByName("Awards");
    awardSheet.clear();

    var awardList = [];

    awardList.push(["200 Hours", "", ""])
    for (var i = 0; i < outputList.length; i++) {
        if (outputList[i][1] >= 200)
        {
            awardList.push(outputList[i]);
        }
    }

    awardList.push(["150 Hours", "", ""])
    for (var i = 0; i < outputList.length; i++) {
        if (outputList[i][1] >= 150 && outputList[i][1] < 200)
        {
            awardList.push(outputList[i]);
        }
    }

    awardList.push(["100 Hours", "", ""])
    for (var i = 0; i < outputList.length; i++) {
        if (outputList[i][1] >= 100 && outputList[i][1] < 150)
        {
            awardList.push(outputList[i]);
        }
    }

    awardList.push(["50 Hours", "", ""])
    for (var i = 0; i < outputList.length; i++) {
        if (outputList[i][1] > 50 && outputList[i][1] < 100)
        {
            awardList.push(outputList[i]);
        }
    }
    awardSheet.getRange(1, 1, awardList.length, 3).setValues(awardList);

    var totalSheet = ss.getSheetByName("Total KC Hours");
    totalSheet.getDataRange().getCell(1, 1).setValue(sum)

    SpreadsheetApp.flush();
}
