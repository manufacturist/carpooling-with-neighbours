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
      SitesApp
      return rideDescription
    })

    template.name = user.name ? user.name : I18N[user.language].NEIGHBOUR_VOCATIVE
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


class AutomaticEmailUnsubscribe {

  /**
   * 1. Searches Gmail for emails replies to <YOUR_EMAIL>+carpooling-unsubscribe@gmail.com
   * 2. Checks if they start with the unsubscribe words in the i18n dictionaries
   * 3. Removes the user from the users spreadsheet and deleted the email thread
   * 
   * The email thread is deleted to remove noise from the inbox
   */
  fn() {
    const unsubscribeWords = Object.keys(I18N).map((key) => I18N[key].UNSUBSCRIBE.toLowerCase())

    const scriptProperties = PropertiesService.getScriptProperties()
    const replyToEmail = scriptProperties.getProperty(PROPERTY.REPLY_TO_EMAIL)

    GmailApp.search(`to:${replyToEmail}`).forEach((thread) => {
      let userEmail = undefined

      thread.getMessages().forEach((message) => {
        const userRepliedWithUnsubscribeWord = unsubscribeWords.some((unsubscribeWord) => {
          message.getPlainBody().toLowerCase().startsWith(unsubscribeWord)
        })

        if (userRepliedWithUnsubscribeWord) {
          userEmail = AutomaticEmailUnsubscribe.extractEmail(message.getFrom())
        }
      })

      if (userEmail) {
        Services.userService.deleteUserByEmail(userEmail)

        thread.markRead()
        thread.moveToTrash()
      }
    })
  }

  activateTrigger() {
    ScriptApp.newTrigger('Triggers.automaticEmailUnsubscribe.fn')
      .timeBased()
      .everyMinutes(30)
      .create()

    Logger.log("Activated Sunday email trigger")
  }

  static extractEmail(sender) {
    const match = sender.match(/<(.+)>/)
    return match ? match[1] : sender
  }
}

const Triggers = {
  sundayRideOffersSummary: new SundayRideOffersSummary(),
  updatePhoneNumber: new UpdatePhoneNumber(),
  automaticEmailUnsubscribe: new AutomaticEmailUnsubscribe()
}

function testRideOfferSummaryFn() {
  Triggers.sundayRideOffersSummary.fn()
}
