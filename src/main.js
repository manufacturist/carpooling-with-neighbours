function main() {
  const language = 'en'
  setDefaultProperties(language)

  usersSetup()
  offerRideSetup()

  Triggers.sundayRideOffersSummary.activateTrigger()
}

function setDefaultProperties(language) {
  const supportedLanguage = Object.keys(I18N).includes(language) ? language : 'en'
  const replyToEmail = Session.getEffectiveUser().getEmail().replace('@', '+carpooling-unsubscribe@')

  const scriptProperties = PropertiesService.getScriptProperties()
  scriptProperties.setProperty(PROPERTY.LANGUAGE, supportedLanguage)
  scriptProperties.setProperty(PROPERTY.RIDE_OFFERS_TTL, 60 * 24 * 60 * 60 * 1000)
  scriptProperties.setProperty(PROPERTY.REPLY_TO_EMAIL, replyToEmail)
  scriptProperties.setProperty(PROPERTY.UNSUBSCRIBE_MODE, UNSUBSCRIBE_MODE.MANUAL)
}

function usersSetup() {
  Logger.log("Setting up users spreadsheet")

  const usersSheet = SpreadsheetApp.create(SPREADSHEETS.USERS).getActiveSheet()
  usersSheet.setName("Verified Users")
  usersSheet.getRange(1, 1, 1, SPREADSHEETS.USERS_HEADER.length).setValues([SPREADSHEETS.USERS_HEADER])

  SPREADSHEETS.USERS_COLUMN_WIDTHS.map((width, widthIndex) => usersSheet.setColumnWidth(widthIndex + 1, width))
}

function offerRideSetup() {
  const language = PropertiesService.getScriptProperties().getProperty(PROPERTY.LANGUAGE)
  const i18n = I18N[language]

  Logger.log("Setting up the offer ride form")

  const offerRideForm = FormApp.create(i18n.FORM_TITLE)
  offerRideForm.setDescription(i18n.FORM_DESCRIPTION)
  offerRideForm.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED)
  offerRideForm.setCollectEmail(true)

  offerRideForm.addTextItem().setTitle(i18n.FORM_DESTINATION).setRequired(true)
  offerRideForm.addDateTimeItem().setTitle(i18n.FORM_DEPARTURE_TIME).setHelpText(i18n.FORM_DEPARTURE_TIME_DESCRIPTION).setRequired(true)
  offerRideForm.addTextItem().setTitle(i18n.FORM_MEETING_POINT).setRequired(false)
  offerRideForm.addScaleItem().setTitle(i18n.FORM_AVAILABLE_SEATS).setBounds(1, 4).setRequired(true)
  offerRideForm.addTextItem().setTitle(i18n.FORM_PHONE_NUMBER).setHelpText(i18n.FORM_PHONE_NUMBER_DESCRIPTION).setRequired(false)

  Logger.log("Setting up the ride offers spreadsheet")

  const rideOffersSheet = SpreadsheetApp.create(SPREADSHEETS.RIDE_OFFERS)
  offerRideForm.setDestination(FormApp.DestinationType.SPREADSHEET, rideOffersSheet.getId())
  rideOffersSheet.deleteSheet(rideOffersSheet.getSheetByName("Sheet1"))
  rideOffersSheet.getActiveSheet().setName("Offer Ride Responses")

  const formShortUrl = offerRideForm.shortenFormUrl(offerRideForm.getPublishedUrl())
  PropertiesService.getScriptProperties().setProperty(PROPERTY.OFFER_RIDE_FORM_URL, formShortUrl)

  Logger.log(`Set form short url ${formShortUrl}`)

  Triggers.updatePhoneNumber.activateTrigger(offerRideForm)
}
