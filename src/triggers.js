class SundayRideOffersSummary {

  /**
   * Sends an email to a list of users, one for each supported locale, 
   * using the appropriate locale configuration for each user.
   */
  sendSummary() {
    const scriptProperties = PropertiesService.getScriptProperties()
    const offerRideFormUrl = scriptProperties.getProperty(PROPERTY.OFFER_RIDE_FORM_URL)
    const unsubscribeUrl = scriptProperties.getProperty(PROPERTY.UNSUBSCRIBE_URL)

    Logger.log(`Current email quota: ${MailApp.getRemainingDailyQuota()}`)

    const usersByEmails = Services.userService.fetchUsersByEmailsMap()
    const nextWeekRides = Services.rideOfferService.fetchValidatedNextWeekRideOffers(usersByEmails)

    if (nextWeekRides.length > 0) { Logger.log(`There are ${nextWeekRides.length} rides available`) } else {
      return Logger.log('No available rides to send, therefore no emails sent')
    }

    const users = ([...usersByEmails.values()])

    const templates = {
      en: HtmlService.createTemplateFromFile('template/rideOffers.en'),
      ro: HtmlService.createTemplateFromFile('template/rideOffers.ro')
    }

    templates.en.offerRideFormUrl = offerRideFormUrl
    templates.ro.offerRideFormUrl = offerRideFormUrl

    users.forEach((user) => {
      const userUnsubscribeUrl = `${unsubscribeUrl}?unsubscribe=${user.id}`
      const message = SundayRideOffersSummary.generateTextSummary(
        usersByEmails, nextWeekRides, userUnsubscribeUrl, templates[user.locale], user.locale, user.name
      )

      MailApp.sendEmail({
        name: I18N[user.locale].EMAIL_NAME,
        subject: I18N[user.locale].EMAIL_SUBJECT,
        to: user.email,
        body: message
      })
    })

    Logger.log(`Remaining email quota: ${MailApp.getRemainingDailyQuota()}`)

    Logger.log(`Deleting old ride offers`)
    Services.rideOfferService.deleteOldRideOffers()
  }

  activateTrigger() {
    const timeZone = PropertiesService.getScriptProperties().getProperty(PROPERTY.TIMEZONE)

    ScriptApp.newTrigger('Triggers.sundayRideOffersSummary.sendSummary')
      .timeBased()
      .inTimezone(timeZone)
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .atHour(19)
      .create()
  }

  static generateTextSummary(usersByEmails, nextWeekRides, unsubscribeUrl, template, userLocale, userName) {
    const rides = nextWeekRides.map(ride => {
      const rideDriver = usersByEmails.get(ride.email)
      const rideDescription = I18N[userLocale].EMAIL_BODY_RIDE_TEMPLATE_FN(ride, rideDriver)

      return rideDescription
    })

    template.name = userName
    template.unsubscribeUrl = unsubscribeUrl
    template.rides = rides.join("\n\n")

    return template.evaluate().getContent()
  }
}

const Triggers = {
  sundayRideOffersSummary: new SundayRideOffersSummary()
}

function testRideOfferSummaryFn() {
  Triggers.sundayRideOffersSummary.sendSummary()
}
