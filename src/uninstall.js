/**
 * This function will remove every file and trigger created. It will 
 * require extra permissions, which should be granted when running it
 */
function uninstall() {
  try {
    deleteUsersSpreadsheet()
    Logger.log("Deleted user spreadsheet.")
  } catch (e) {
    Logger.log("Failed to delete user spreadsheet: " + e)
  }

  try {
    deleteRideOfferDependencies()
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

function deleteUsersSpreadsheet() {
  const files = DriveApp.getFilesByName(SPREADSHEETS.USERS)
  while (files.hasNext()) {
    const file = files.next()
    file.setTrashed(true)
    Logger.log(`Deleted spreadsheet: ${file.getName()}`)
  }
}

function deleteRideOfferDependencies() {
  const locale = PropertiesService.getScriptProperties().getProperty(PROPERTY.LOCALE)
  const i18n = I18N[locale]

  const forms = DriveApp.getFilesByName(i18n.FORM_TITLE)
  while (forms.hasNext()) {
    const form = forms.next()
    form.setTrashed(true)
    Logger.log(`Deleted form: ${form.getName()}`)
  }

  const rideOffersSheets = DriveApp.getFilesByName(SPREADSHEETS.RIDE_OFFERS)
  while (rideOffersSheets.hasNext()) {
    const sheet = rideOffersSheets.next()
    sheet.setTrashed(true)
    Logger.log(`Deleted ride offers sheet: ${sheet.getName()}`)
  }
}

function deleteTriggers() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    ScriptApp.deleteTrigger(trigger)
    Logger.log(`Deleted trigger: ${trigger.getHandlerFunction()}`)
  })
}