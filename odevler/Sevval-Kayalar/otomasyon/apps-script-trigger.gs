function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('VALEO Dashboard')
    .addItem('CSV export notu olustur', 'writeDashboardExportNote')
    .addToUi();
}

function writeDashboardExportNote() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const note = [
    ['Son Guncelleme', new Date()],
    ['Kullanim', 'Bu Sheet, S6 Enerji ve Surdurulebilirlik dashboard veri kaynagidir.'],
    ['Kural', 'Veri dashboard koduna gomulmez; Sheet/CSV kaynagindan okunur.'],
  ];

  let target = sheet.getSheetByName('dashboard_export_notu');
  if (!target) {
    target = sheet.insertSheet('dashboard_export_notu');
  }

  target.clearContents();
  target.getRange(1, 1, note.length, note[0].length).setValues(note);
}
