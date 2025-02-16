/**
 * This function will remove every file and trigger created. It will 
 * require extra permissions, which should be granted when running it
 */
function uninstall() {
  const scriptProperties = PropertiesService.getScriptProperties()
  const usersSSID = scriptProperties.getProperty(PROPERTY.USERS_SSID)
  const offerRideFID = scriptProperties.getProperty(PROPERTY.OFFER_RIDE_FID)
  const rideOffersSSID = scriptProperties.getProperty(PROPERTY.RIDE_OFFERS_SSID)

  try {
    deleteUsersSpreadsheet(usersSSID)
    Logger.log("Deleted user spreadsheet.")
  } catch (e) {
    Logger.log("Failed to delete user spreadsheet: " + e)
  }

  try {
    deleteRideOfferFormAndSheet(offerRideFID, rideOffersSSID)
    Logger.log("Deleted ride offer dependencies.")
  } catch (e) {
    Logger.log("Failed to delete ride offer dependencies: " + e)
  }

  try {
    deleteTriggers()
    Logger.log("Deleted triggers.")
  } catch (e) {
    Logger.log("Failed to delete triggers: " + e)
  }
}

function deleteUsersSpreadsheet(id) {
  const file = DriveApp.getFileById(id)
  file.setTrashed(true)

  Logger.log(`Deleted spreadsheet: ${file.getName()}`)
}

function deleteRideOfferFormAndSheet(formId, sheetId) {
  const formFile = DriveApp.getFileById(formId)
  formFile.setTrashed(true)

  Logger.log(`Deleted form: ${formFile.getName()}`)

  const sheetFile = DriveApp.getFileById(sheetId)
  sheetFile.setTrashed(true)

  Logger.log(`Deleted ride offers sheet: ${sheetFile.getName()}`)
}

function deleteTriggers() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    ScriptApp.deleteTrigger(trigger)
    Logger.log(`Deleted trigger: ${trigger.getHandlerFunction()}`)
  })
}