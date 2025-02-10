/**
 * https://developers.google.com/apps-script/guides/web
 * 
 * This function performs the unsubscribe for users. It removes them from the users spreadsheet
 */
function doGet(e) {
  Logger.log(e.parameter)

  const unsubscribeUuid = e.parameter.unsubscribe

  if (unsubscribeUuid) {
    Services.userService.deleteUserByExternalId(unsubscribeUuid)
  }

  return ContentService.createTextOutput('OK')
}