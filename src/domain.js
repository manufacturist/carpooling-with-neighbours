class RideOffer {
  constructor(timestamp, email, destination, when, meetingPoint, seats) {
    this.timestamp = timestamp
    this.email = email
    this.destination = destination
    this.when = when
    this.meetingPoint = meetingPoint
    this.seats = seats

    Object.freeze(this)
  }
}

class User {
  constructor(id, email, locale, name, phoneNumber, reference) {
    this.id = id
    this.email = email
    this.locale = locale
    this.name = name
    this.phoneNumber = phoneNumber
    this.reference = reference

    Object.freeze(this)
  }
}

User.DATA_ROW = Object.freeze({
  ID: 0,
  EMAIL: 1,
  LOCALE: 2,
  NAME: 3,
  PHONE_NUMBER: 4,
  REFERENCE: 5
})

User.COLUMNS = Object.freeze({
  ID: 1,
  EMAIL: 2,
  LOCALE: 3,
  NAME: 4,
  PHONE_NUMBER: 5,
  REFERENCE: 6
})
