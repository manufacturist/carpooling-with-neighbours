function main() {
  // Pick a valid IANA Time Zone https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  const scriptProperties = PropertiesService.getScriptProperties()
  scriptProperties.setProperty(TIMEZONE_PROPERTY, "Europe/Bucharest")
  scriptProperties.setProperty(RIDE_OFFERS_TTL_PROPERTY, 60 * 24 * 60 * 60 * 1000)

  createUsersSpreadsheet()
  createOfferRideForm()

  Triggers.sundayRideOffersSummary.activateTrigger()
}

function createUsersSpreadsheet() {
  const usersSheet = SpreadsheetApp.create(SPREADSHEETS.USERS).getActiveSheet()
  usersSheet.setName("Verified Users")
  usersSheet.getRange(1, 1, 1, SPREADSHEETS.USERS_HEADER.length).setValues([SPREADSHEETS.USERS_HEADER])
}

function createOfferRideForm() {
  const offerRideForm = FormApp.create(I18N.en.FORM_TITLE)
  offerRideForm.setDescription(I18N.en.FORM_DESCRIPTION)
  offerRideForm.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED)
  offerRideForm.setCollectEmail(true)

  offerRideForm.addTextItem().setTitle(I18N.en.FORM_DESTINATION).setRequired(true)
  offerRideForm.addDateTimeItem().setTitle(I18N.en.FORM_DEPARTURE_TIME).setRequired(true)
  offerRideForm.addTextItem().setTitle(I18N.en.FORM_MEETING_POINT).setRequired(false)
  offerRideForm.addScaleItem().setTitle(I18N.en.FORM_AVAILABLE_SEATS).setBounds(1, 4).setRequired(true)

  const rideOffersSheet = SpreadsheetApp.create(SPREADSHEETS.RIDE_OFFERS)
  offerRideForm.setDestination(FormApp.DestinationType.SPREADSHEET, rideOffersSheet.getId())
  rideOffersSheet.deleteSheet(rideOffersSheet.getSheetByName("Sheet1"))
  rideOffersSheet.getActiveSheet().setName("Offer Ride Responses")
}
