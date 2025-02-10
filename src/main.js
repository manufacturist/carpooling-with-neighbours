function main() {
  // Pick a valid IANA Time Zone https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  const scriptProperties = PropertiesService.getScriptProperties()
  scriptProperties.setProperty(PROPERTY.LOCALE, "ro")
  scriptProperties.setProperty(PROPERTY.TIMEZONE, "Europe/Bucharest")
  scriptProperties.setProperty(PROPERTY.RIDE_OFFERS_TTL, 60 * 24 * 60 * 60 * 1000)

  const unsubscribeUrl = scriptProperties.getProperty(PROPERTY.UNSUBSCRIBE_URL)
  if (!unsubscribeUrl) scriptProperties.setProperty(PROPERTY.UNSUBSCRIBE_URL, "TODO: make deployment; add in script properties after")

  usersSetup()
  offerRideSetup()

  Triggers.sundayRideOffersSummary.activateTrigger()
}

function usersSetup() {
  Logger.log("Setting up users spreadsheet")

  const usersSheet = SpreadsheetApp.create(SPREADSHEETS.USERS).getActiveSheet()
  usersSheet.setName("Verified Users")
  usersSheet.getRange(1, 1, 1, SPREADSHEETS.USERS_HEADER.length).setValues([SPREADSHEETS.USERS_HEADER])
}

function offerRideSetup() {
  const locale = PropertiesService.getScriptProperties().getProperty(PROPERTY.LOCALE)
  const i18n = I18N[locale]

  Logger.log("Setting up the offer ride form")

  const offerRideForm = FormApp.create(i18n.FORM_TITLE)
  offerRideForm.setDescription(i18n.FORM_DESCRIPTION)
  offerRideForm.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED)
  offerRideForm.setCollectEmail(true)

  offerRideForm.addTextItem().setTitle(i18n.FORM_DESTINATION).setRequired(true)
  offerRideForm.addDateTimeItem().setTitle(i18n.FORM_DEPARTURE_TIME).setHelpText(i18n.FORM_DEPARTURE_TIME_DESCRIPTION).setRequired(true)
  offerRideForm.addTextItem().setTitle(i18n.FORM_MEETING_POINT).setRequired(false)
  offerRideForm.addScaleItem().setTitle(i18n.FORM_AVAILABLE_SEATS).setBounds(1, 4).setRequired(true)

  Logger.log("Setting up the ride offers spreadsheet")

  const rideOffersSheet = SpreadsheetApp.create(SPREADSHEETS.RIDE_OFFERS)
  offerRideForm.setDestination(FormApp.DestinationType.SPREADSHEET, rideOffersSheet.getId())
  rideOffersSheet.deleteSheet(rideOffersSheet.getSheetByName("Sheet1"))
  rideOffersSheet.getActiveSheet().setName("Offer Ride Responses")

  const formShortUrl = offerRideForm.shortenFormUrl(offerRideForm.getPublishedUrl())
  PropertiesService.getScriptProperties().setProperty(PROPERTY.OFFER_RIDE_FORM_URL, formShortUrl)

  Logger.log(`Set form short url ${formShortUrl}`)
}
