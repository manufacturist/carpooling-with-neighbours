/**
 * This function serves the page with the available ride offers for the next 7 days
 * To better protect the identity of the drivers from external access, only the phone 
 * number is used
 */
function doGet() {
  const scriptProperties = PropertiesService.getScriptProperties()
  const language = scriptProperties.getProperty(PROPERTY.LANGUAGE)

  const scriptCache = CacheService.getScriptCache()
  const cachedPage = scriptCache.get(CACHE.RENDERED_PAGE)

  const rideOffersPage = cachedPage
    ? HtmlService.createHtmlOutput(cachedPage)
    : buildRideOffersPage(scriptProperties, scriptCache, language)

  return rideOffersPage
    .setTitle(I18N[language].WEBAPP_TITLE)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
}

function buildRideOffersPage(scriptProperties, scriptCache, language) {

  // The first time the user tests the web app, set the URL as a property
  const isWebAppUrlMissing = !scriptProperties.getProperty(PROPERTY.WEB_APP_URL)
  if (isWebAppUrlMissing) {
    scriptProperties.setProperty(PROPERTY.WEB_APP_URL, ScriptApp.getService().getUrl())
  }

  const i18n = I18N[language]

  const usersByEmails = Services.userService.fetchUsersByEmailsMap()
  const nextWeekRides = Services.rideOfferService.fetchNextWeekRideOffers(usersByEmails).map((rideOffer) => {
    const phoneNumber = usersByEmails.get(rideOffer.email).phoneNumber
    return new Ride(rideOffer.departureTimestamp, rideOffer.destination, rideOffer.meetingPoint, phoneNumber)
  })

  const pageTemplate = HtmlService.createTemplateFromFile("src/webapp/index.template")
  pageTemplate.lang = language
  pageTemplate.communityId = scriptProperties.getProperty(PROPERTY.COMMUNITY_ID)
  pageTemplate.tripsForNextDays = i18n.WEBAPP_TRIPS_FOR_NEXT_DAYS
  pageTemplate.departureTime = i18n.WEBAPP_DEPARTURE_TIME
  pageTemplate.destination = i18n.WEBAPP_TRIP
  pageTemplate.meetingPoint = i18n.WEBAPP_MEETING_POINT
  pageTemplate.phoneNumber = i18n.WEBAPP_PHONE_NUMBER
  pageTemplate.rides = nextWeekRides.map((ride) => ride.render(language)).join("")

  const evaluatedHtmlPage = pageTemplate.evaluate()
  scriptCache.put(CACHE.RENDERED_PAGE, evaluatedHtmlPage.getContent(), 60 * 3)

  return evaluatedHtmlPage
}