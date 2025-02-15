class SundayRideOffersSummary {

  /**
   * Sends an email to a list of users using the appropriate language configuration for each user
   */
  fn() {
    const scriptProperties = PropertiesService.getScriptProperties()
    const offerRideFormUrl = scriptProperties.getProperty(PROPERTY.OFFER_RIDE_FORM_URL)
    const unsubscribeMode = scriptProperties.getProperty(PROPERTY.UNSUBSCRIBE_MODE)

    Logger.log(`Current email quota: ${MailApp.getRemainingDailyQuota()}`)

    const replyToEmail = Session.getEffectiveUser().getEmail().replace('@', '+carpooling-unsubscribe@')

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
      const unsubscribeMessage =
        unsubscribeMode == UNSUBSCRIBE_MODE.MANUAL ? I18N[user.language].EMAIL_UNSUBSCRIBE_MANUAL :
          unsubscribeMode == UNSUBSCRIBE_MODE.AUTO ? I18N[user.language].EMAIL_UNSUBSCRIBE_AUTO
            : null

      const message = SundayRideOffersSummary.generateTextSummary(
        usersByEmails, nextWeekRides, unsubscribeMessage, templates[user.language], user
      )

      MailApp.sendEmail({
        name: I18N[user.language].EMAIL_NAME,
        subject: I18N[user.language].EMAIL_SUBJECT,
        to: user.email,
        body: message,
        replyTo: replyToEmail
      })
    })

    Logger.log(`Remaining email quota: ${MailApp.getRemainingDailyQuota()}`)

    Logger.log(`Deleting old ride offers`)
    Services.rideOfferService.deleteOldRideOffers()
  }

  activateTrigger() {
    const timeZone = Session.getScriptTimeZone()

    ScriptApp.newTrigger('Triggers.sundayRideOffersSummary.fn')
      .timeBased()
      .inTimezone(timeZone)
      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
      .atHour(18)
      .create()

    Logger.log("Activated Sunday email trigger")
  }

  static generateTextSummary(usersByEmails, nextWeekRides, unsubscribeMessage, template, user) {
    const rides = nextWeekRides.map(ride => {
      const rideDriver = usersByEmails.get(ride.email)
      const rideDescription = I18N[user.language].EMAIL_BODY_RIDE_TEMPLATE_FN(ride, rideDriver)

      return rideDescription
    })

    template.name = user.name
    template.rides = rides.join("\n\n")

    if (unsubscribeMessage) template.unsubscribeMessage = unsubscribeMessage

    return template.evaluate().getContent()
  }
}

class UpdatePhoneNumber {

  /**
   * Updates the phone number of a user, using the one specified at the 
   * end of the offer ride form
   * 
   * @argument e - Form Submit event [https://developers.google.com/apps-script/guides/triggers/events#google_forms_events] 
   * @argument e.response - [https://developers.google.com/apps-script/reference/forms/form-response]
   */
  fn(e) {
    const email = e.response.getRespondentEmail()
    const responses = e.response.getItemResponses()
    const phoneNumberResponse = responses[responses.length - 1].getResponse()

    if (phoneNumberResponse) {
      Services.userService.updateUserPhoneNumber(email, phoneNumberResponse)
    }
  }

  activateTrigger(form) {
    ScriptApp.newTrigger('Triggers.updatePhoneNumber.fn')
      .forForm(form)
      .onFormSubmit()
      .create()

    Logger.log("Activated phone number update trigger")
  }
}

const Triggers = {
  sundayRideOffersSummary: new SundayRideOffersSummary(),
  updatePhoneNumber: new UpdatePhoneNumber()
}

function testRideOfferSummaryFn() {
  Triggers.sundayRideOffersSummary.fn()
}
