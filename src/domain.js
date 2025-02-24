class RideOffer {
  constructor(timestamp, email, destination, departureTimestamp, meetingPoint, seats) {
    this.timestamp = timestamp
    this.email = email
    this.destination = destination
    this.departureTimestamp = departureTimestamp
    this.meetingPoint = meetingPoint
    this.seats = seats

    Object.freeze(this)
  }
}

class User {
  constructor(email, language, name, phoneNumber, notification, reference) {
    this.email = email
    this.language = language
    this.name = name
    this.phoneNumber = phoneNumber
    this.notification = notification
    this.reference = reference

    Object.freeze(this)
  }
}

User.DATA_ROW = Object.freeze({
  EMAIL: 0,
  LANGUAGE: 1,
  NAME: 2,
  PHONE_NUMBER: 3,
  NOTIFICATION: 4,
  REFERENCE: 5
})

User.COLUMNS = Object.freeze({
  EMAIL: 1,
  LANGUAGE: 2,
  NAME: 3,
  PHONE_NUMBER: 4,
  NOTIFICATION: 5,
  REFERENCE: 6
})
