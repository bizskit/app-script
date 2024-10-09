function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('user');
let data = ss.getDataRange().getDisplayValues();

function saveData(obj) {
  ss.appendRow([
    "", 
    obj.cid, 
    obj.name, 
    "'"+obj.phone, 
    obj.date, 
    obj.status,
    obj.role,
  ]);
}

function updateData(obj) {
  let row = data.findIndex(r => r[1] == obj.edit_cid)
  let dataArray = [[
    obj.edit_cid, 
    obj.edit_name, 
    "'"+obj.edit_phone, 
    obj.edit_date, 
    obj.edit_status,
    obj.edit_role,
  ]]
  ss.getRange(row+1,2,1,6).setValues(dataArray)
}

function delData(uid){
  let row = data.findIndex(r => r[0] == uid)
  ss.deleteRow(row+1)
}

function getData(){
  let header = data.shift();
  return {data:data,header:header}
}

function findUser(obj){
  let record = data.find(r => r[1] == obj.idUser)
  return record
}

function getURL() {  var url = ScriptApp.getService().getUrl();  return url;}

/** Login */
let userlog = ""
function checkLogin(cid){
  var ws = SpreadsheetApp.getActive().getSheetByName('user')
  var data = ws.getDataRange().getDisplayValues()
  var userlog = data.find(r => r[1] == cid)      
  return userlog;
}
