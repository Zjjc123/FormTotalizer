function Totalize() {
    var ss = SpreadsheetApp.openById("1Cz0QLRFAcNCdjdIoSGjlnkCA_zoRd3e7_jyNeEMcTaA")

    var names = [];
    var hours = [];

    var values = ss.getSheetByName("Submissions").getDataRange().getValues();

    // Get all names
    for (var i = 1; i < values.length; i++) {
        var cell = values[i][1];
        names.push(String(cell).toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' '));
    }

    // Get all hours
    for (var i = 1; i < values.length; i++) {
        var cell = values[i][5];
        hours.push(parseFloat(cell));
    }

    var outputSheet = ss.getSheetByName("Total Hours");
    outputSheet.clear();

    var list = [];

    list.push([names[0], hours[0]]);
    for (var i = 1; i < names.length; i++) {
        var found = false;
        for (var j = 0; j < list.length; j++) {
            if (list[j][0] == names[i]) {
                list[j][1] += hours[i];
                found = true;
                break;
            }
        }
        if (!found)
            list.push([names[i], hours[i]]);
    }

    outputSheet.getRange(1, 1, list.length, 2).setValues(list);

    SpreadsheetApp.flush();
}
