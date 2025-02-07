class SundayRideOffersSummary {

  /**
   * Sends an email to a list of users, one for each supported locale, 
   * using the appropriate locale configuration for each user.
   */
  sendSummary() {
    Logger.log(`Current email quota: ${MailApp.getRemainingDailyQuota()}`)

    const usersByEmails = Services.userService.fetchUsersByEmailsMap()
    const nextWeekRides = Services.rideOfferService.fetchValidatedNextWeekRideOffers(usersByEmails)

    if (nextWeekRides.length > 0) Logger.log(`There are ${nextWeekRides.length} rides available`)
    else return Logger.log('No available rides to send, therefore no emails sent')

    Object.keys(I18N).forEach((locale) => {
      const userEmailsForCurrentLocale = [...usersByEmails.values()]
        .filter((user) => user.locale == locale)
        .map((user) => user.email)

      if (userEmailsForCurrentLocale.length != 0) {
        MailApp.sendEmail({
          name: I18N[locale].EMAIL_NAME,
          subject: I18N[locale].EMAIL_SUBJECT,
          body: SundayRideOffersSummary.generateSummary(usersByEmails, nextWeekRides, locale),
          bcc: userEmailsForCurrentLocale.join(',')
        })
      }
    })

    Logger.log(`Remaining email quota: ${MailApp.getRemainingDailyQuota()}`)

    Logger.log(`Deleting old ride offers`)
    Services.rideOfferService.deleteOldRideOffers()
  }

  activateTrigger() {
    const timeZone = PropertiesService.getScriptProperties().getProperty(TIMEZONE_PROPERTY)

    ScriptApp.newTrigger('Triggers.sundayRideOffersSummary.sendSummary')
      .timeBased()
      .inTimezone(timeZone)
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .atHour(19)
      .create()
  }

  static generateSummary(usersByEmails, nextWeekRides, locale) {
    let emailBody = `${I18N[locale].EMAIL_BODY_START}\n\n`

    nextWeekRides.forEach(ride => {
      const rideDriver = usersByEmails.get(ride.email)
      const rideDescription = I18N[locale].EMAIL_BODY_RIDE_TEMPLATE_FN(ride, rideDriver)

      emailBody += `${rideDescription}\n\n`
    })

    emailBody += I18N[locale].EMAIL_BODY_END
    return emailBody
  }
}

const Triggers = {
  sundayRideOffersSummary: new SundayRideOffersSummary()
}

function testRideOfferSummaryFn() {
  Triggers.sundayRideOffersSummary.sendSummary()
}
