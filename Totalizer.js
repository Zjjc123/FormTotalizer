function Totalize() {
    var ss = SpreadsheetApp.openById("1Cz0QLRFAcNCdjdIoSGjlnkCA_zoRd3e7_jyNeEMcTaA")
    
    var names = [];
    var hours = [];

    var values = ss.getSheetByName("Submissions").getDataRange().getValues();

    // Get all names
    for (var i = 1; i < values.length; i++) {
        var cell = values[i][1]; 
        names.push(cell);
    }

    // Get all hours
    for (var i = 1; i < values.length; i++) {
        var cell = values[i][5]; 
        hours.push(cell);
    }

    var outputSheet = ss.getSheetByName("Total Hours");
    outputSheet.clear();

    var list = [];

    for (var i = 0; i < names.length; i++)
    {
        list.push([names[i], hours[i]])
    }

    outputSheet.getRange(1, 1, list.length, 2).setValues(list);

    SpreadsheetApp.flush();
}
