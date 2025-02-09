class UserService {

  /**
   * Returns a map of email keys and User values. They are all returned from 
   * the "users" spreadsheet.
   * 
   * @returns {Map<String, User>} A map of users identifiable by their email addresses
   */
  fetchUsersByEmailsMap() {
    const usersSheet = SpreadsheetApp.openById(getFileId(SPREADSHEETS.USERS)).getActiveSheet()
    const usersData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, usersSheet.getLastColumn()).getValues()

    return new Map(usersData.map(([email, ...data]) =>
      [email, new User(email, ...data)]
    ))
  }

  deleteUserByExternalId(externalUuid) {
    const usersSheet = SpreadsheetApp.openById(getFileId(SPREADSHEETS.USERS)).getActiveSheet()
    const usersData = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, usersSheet.getLastColumn()).getValues()
    const users = usersData.map(([...data]) => new User(...data))

    const foundIndex = users.findIndex((user) => user.externalUuid == externalUuid)
    if (foundIndex != -1) usersSheet.deleteRow(foundIndex + 2) // 1 for header + 1 for index offset to zero
  }
}

class RideOfferService {

  /**
   * Fetches all the ride offers ever reported.
   * 
   * @returns {Array<RideOffer>} An array of ride offers
   */
  fetchAllUpcomingRideOffers() {
    const rideOffersSheet = SpreadsheetApp.openById(getFileId(SPREADSHEETS.RIDE_OFFERS)).getActiveSheet()
    const rideOffersRows = rideOffersSheet.getRange(2, 1, rideOffersSheet.getLastRow() - 1, rideOffersSheet.getLastColumn()).getValues()

    return rideOffersRows.map((rideOfferRow) => new RideOffer(
      rideOfferRow[0],
      rideOfferRow[1],
      rideOfferRow[2],
      rideOfferRow[3],
      rideOfferRow[4],
      rideOfferRow[5]
    ))
  }

  /**
   * A list of validated ride offers for the upcomming week. Validated implies here 
   * that if the drivers that completed the form are not mentioned in the "Verified 
   * Users" sheet, that ride offer will be filtered out.
   * 
   * @param {Map<String, User>} usersByEmails - A map of email keys and User values
   * @returns {Array<RideOffer>} An array of ride offers
   */
  fetchValidatedNextWeekRideOffers(usersByEmails) {
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

  deleteOldRideOffers() {
    const rideOffersSheet = SpreadsheetApp.openById(getFileId(SPREADSHEETS.RIDE_OFFERS)).getActiveSheet()
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

function getFileId(fileName) {
  const files = DriveApp.getFilesByName(fileName)

  if (files.hasNext()) {
    return files.next().getId()
  }

  throw new Error(
    `File ${fileName} not found. The frail digital connective tissue holding this solution all together is broken. Destroy it and rebuild it.`
  )
}