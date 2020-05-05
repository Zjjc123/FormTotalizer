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
        else
        {
            hours.push(0);
        }
        Logger.log("Email: " + email);
        emails.push(email);
    }

    var outputSheet = ss.getSheetByName("Total Hours");
    outputSheet.clear();

    var list = [];

    list.push(["Names", "Hours", "Emails"]);
    for (var i = 0; i < names.length; i++) {
        var found = false;
        for (var j = 0; j < list.length; j++) {
            if (list[j][0] == names[i]) {
                list[j][1] += hours[i];
                found = true;
                break;
            }
        }
        if (!found)
            list.push([names[i], hours[i], emails[i]]);
    }

    outputSheet.getRange(1, 1, list.length, 3).setValues(list);

    var totalSheet = ss.getSheetByName("Total KC Hours");
    totalSheet.getDataRange().getCell(1, 1).setValue(sum)

    SpreadsheetApp.flush();
}
