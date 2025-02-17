const ROW_INDEX_OFFSET = 2 // 1 for header + 1 for iterating index zero offset

class UserService {

  /**
   * Returns a map of email keys and User values. They are all returned from 
   * the "users" spreadsheet.
   * 
   * @returns {Map<Email, User>} A map of users identifiable by their email addresses
   */
  fetchUsersByEmailsMap() {
    const scriptProperties = PropertiesService.getScriptProperties()
    const usersSSID = scriptProperties.getProperty(PROPERTY.USERS_SSID)

    const usersSheet = SpreadsheetApp.openById(usersSSID).getActiveSheet()
    const usersData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, usersSheet.getLastColumn()).getValues()

    return new Map(usersData.map(([email, ...data]) =>
      [email, new User(email, ...data)]
    ))
  }

  /**
   * Updates the phone number of a specific user (identified by email)
   * 
   * @param {Email} userEmail - User email
   * @param {PhoneNumber} phoneNumber - User phone number
   */
  updateUserPhoneNumber(userEmail, phoneNumber) {
    const scriptProperties = PropertiesService.getScriptProperties()
    const usersSSID = scriptProperties.getProperty(PROPERTY.USERS_SSID)

    const usersSheet = SpreadsheetApp.openById(usersSSID).getActiveSheet()
    const usersData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, usersSheet.getLastColumn()).getValues()

    for (let rowIndex = 0; rowIndex < usersData.length; rowIndex++) {
      if (usersData[rowIndex][User.DATA_ROW.EMAIL] === userEmail) {
        usersSheet.getRange(rowIndex + ROW_INDEX_OFFSET, User.COLUMNS.PHONE_NUMBER).setNumberFormat("@STRING@").setValue(phoneNumber)
        break
      }
    }
  }

  /**
     * Deletes a specific user from the spreadsheet (identified by email)
     * 
     * @param {Email} email - User email
     */
  deleteUserByEmail(email) {
    const scriptProperties = PropertiesService.getScriptProperties()
    const usersSSID = scriptProperties.getProperty(PROPERTY.USERS_SSID)

    const usersSheet = SpreadsheetApp.openById(usersSSID).getActiveSheet()
    const usersData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, usersSheet.getLastColumn()).getValues()

    const foundIndex = usersData.findIndex((userRow) => userRow[User.COLUMNS.EMAIL] == email)
    if (foundIndex != -1) usersSheet.deleteRow(foundIndex + ROW_INDEX_OFFSET)
  }
}

class RideOfferService {

  /**
   * Fetches all the ride offers ever reported.
   * 
   * @returns {Array<RideOffer>} An array of ride offers
   */
  fetchAllUpcomingRideOffers() {
    const scriptProperties = PropertiesService.getScriptProperties()
    const rideOffersSSID = scriptProperties.getProperty(PROPERTY.RIDE_OFFERS_SSID)

    const rideOffersSheet = SpreadsheetApp.openById(rideOffersSSID).getActiveSheet()
    const rideOffersRows = rideOffersSheet.getRange(2, 1, rideOffersSheet.getLastRow() - 1, rideOffersSheet.getLastColumn()).getValues()

    return rideOffersRows.map((rideOfferRow) => new RideOffer(...rideOfferRow))
  }

  /**
   * A list of sorted and validated ride offers for the upcomming week. Validated implies 
   * here that if the drivers that completed the form are not mentioned in the "Verified 
   * Users" sheet, that ride offer will be filtered out. The ride offers are sorted by 
   * the departure time.
   * 
   * @param {Map<Email, User>} usersByEmails - A map of email keys and User values
   * @returns {Array<RideOffer>} An array of ride offers
   */
  fetchSortedNextWeekRideOffers(usersByEmails) {
    const validRideOffers = this.fetchAllUpcomingRideOffers().filter(offer => usersByEmails.has(offer.email))

    const now = new Date()
    const currentDay = now.getDay()
    const daysToMonday = (currentDay === 0) ? 1 : (7 - currentDay + 1)

    const nextMonday = new Date(now)
    nextMonday.setDate(now.getDate() + daysToMonday)
    nextMonday.setHours(0, 0, 0, 0)

    const nextSunday = new Date(nextMonday)
    nextSunday.setDate(nextMonday.getDate() + 6)
    nextSunday.setHours(23, 59, 59, 999)

    const activeRideOffers = validRideOffers.filter(activeRideOffer => {
      return activeRideOffer.when >= nextMonday && activeRideOffer.when <= nextSunday
    })

    return activeRideOffers.sort((a, b) => a.when - b.when)
  }

  /**
   * Deletes rides with a creation timestamp older than RIDE_OFFERS_TTL
   */
  deleteOldRideOffers() {
    const scriptProperties = PropertiesService.getScriptProperties()
    const rideOffersSSID = scriptProperties.getProperty(PROPERTY.RIDE_OFFERS_SSID)

    const rideOffersSheet = SpreadsheetApp.openById(rideOffersSSID).getActiveSheet()
    const rideOffers = this.fetchAllUpcomingRideOffers()
    if (rideOffers.length <= 50) return

    const rideOffersTtl = parseInt(PropertiesService.getScriptProperties().getProperty(PROPERTY.RIDE_OFFERS_TTL))
    const currentTimestamp = new Date().getTime()
    const ttlTimestamp = currentTimestamp - rideOffersTtl

    let rowsToDelete = null

    for (let rowIndex = 0; rowIndex < rideOffers.length; rowIndex++) {
      if (rideOffers[rowIndex].timestamp.getTime() < ttlTimestamp) {
        rowsToDelete = rowIndex + 1
        break
      }
    }

    if (rowsToDelete) {
      rideOffersSheet.deleteRows(2, rowsToDelete)
      Logger.log(`Deleting ${rowsToDelete} ride offers`)
    }
  }
}

const Services = {
  userService: new UserService(),
  rideOfferService: new RideOfferService()
}
