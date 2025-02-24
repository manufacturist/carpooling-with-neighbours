function main() {
  const language = 'en'
  setDefaultProperties(language)

  usersSetup()
  offerRideSetup()
  setCommunityId()

  Triggers.sundayRideOffersSummary.activateTrigger()
}

function setDefaultProperties(language) {
  const supportedLanguage = Object.keys(I18N).includes(language) ? language : 'en'
  const replyToEmail = Session.getEffectiveUser().getEmail().replace('@', '+carpooling@')

  const scriptProperties = PropertiesService.getScriptProperties()
  scriptProperties.setProperty(PROPERTY.LANGUAGE, supportedLanguage)
  scriptProperties.setProperty(PROPERTY.RIDE_OFFERS_TTL, 60 * 24 * 60 * 60 * 1000)
  scriptProperties.setProperty(PROPERTY.REPLY_TO_EMAIL, replyToEmail)
  scriptProperties.setProperty(PROPERTY.UNSUBSCRIBE_MODE, UNSUBSCRIBE_MODE.MANUAL)
}

function usersSetup() {
  const scriptProperties = PropertiesService.getScriptProperties()

  Logger.log("Setting up users spreadsheet")

  const usersSpreadsheet = SpreadsheetApp.create(SPREADSHEETS.USERS)
  scriptProperties.setProperty(PROPERTY.USERS_SSID, usersSpreadsheet.getId())

  const usersSheet = usersSpreadsheet.getActiveSheet()
  usersSheet.setName("Verified Users")
  usersSheet.getRange(1, 1, 1, SPREADSHEETS.USERS_HEADER.length).setValues([SPREADSHEETS.USERS_HEADER])

  SPREADSHEETS.USERS_COLUMN_WIDTHS.map((width, widthIndex) => usersSheet.setColumnWidth(widthIndex + 1, width))

  Logger.log(`Set up users spreadsheet: ${usersSpreadsheet.getUrl()}`)
}

function offerRideSetup() {
  const scriptProperties = PropertiesService.getScriptProperties()
  const language = scriptProperties.getProperty(PROPERTY.LANGUAGE)
  const i18n = I18N[language]

  Logger.log("Setting up the offer ride form")

  const offerRideForm = FormApp.create(i18n.FORM_TITLE)
  scriptProperties.setProperty(PROPERTY.OFFER_RIDE_FID, offerRideForm.getId())

  offerRideForm.setDescription(i18n.FORM_DESCRIPTION)
  offerRideForm.setEmailCollectionType(FormApp.EmailCollectionType.VERIFIED)
  offerRideForm.setCollectEmail(true)

  offerRideForm.addTextItem().setTitle(i18n.FORM_DESTINATION).setRequired(true)
  offerRideForm.addDateTimeItem().setTitle(i18n.FORM_DEPARTURE_TIME).setRequired(true)
  offerRideForm.addTextItem().setTitle(i18n.FORM_MEETING_POINT).setRequired(false)
  offerRideForm.addScaleItem().setTitle(i18n.FORM_AVAILABLE_SEATS).setBounds(1, 4).setRequired(true)
  offerRideForm.addTextItem().setTitle(i18n.FORM_PHONE_NUMBER).setHelpText(i18n.FORM_PHONE_NUMBER_DESCRIPTION).setRequired(false)

  const formShortUrl = offerRideForm.shortenFormUrl(offerRideForm.getPublishedUrl())
  scriptProperties.setProperty(PROPERTY.OFFER_RIDE_FORM_URL, formShortUrl)

  Logger.log(`Set up form: ${formShortUrl}`)

  Logger.log("Setting up the ride offers spreadsheet")

  const rideOffersSpreadsheet = SpreadsheetApp.create(SPREADSHEETS.RIDE_OFFERS)
  scriptProperties.setProperty(PROPERTY.RIDE_OFFERS_SSID, rideOffersSpreadsheet.getId())

  offerRideForm.setDestination(FormApp.DestinationType.SPREADSHEET, rideOffersSpreadsheet.getId())
  rideOffersSpreadsheet.deleteSheet(rideOffersSpreadsheet.getSheetByName("Sheet1"))
  rideOffersSpreadsheet.getActiveSheet().setName("Offer Ride Responses")

  Logger.log(`Set up ride offers: ${rideOffersSpreadsheet.getUrl()}`)

  Triggers.updatePhoneNumber.activateTrigger(offerRideForm)
}

function setCommunityId() {
  const scriptProperties = PropertiesService.getScriptProperties()

  const isCommunityIdMissing = !scriptProperties.getProperty(PROPERTY.COMMUNITY_ID)
  if (isCommunityIdMissing) scriptProperties.setProperty(PROPERTY.COMMUNITY_ID, Utilities.getUuid())
}
