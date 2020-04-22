function createSpreadsheetChangeTrigger() {
    var ss = SpreadsheetApp.openById("1Cz0QLRFAcNCdjdIoSGjlnkCA_zoRd3e7_jyNeEMcTaA");
    ScriptApp.newTrigger('Totalize')
        .forSpreadsheet(ss)
        .onChange()
        .create();
  }