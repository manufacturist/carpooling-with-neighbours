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
  constructor(email, name, phoneNumber, locale, reference, externalUuid) {
    this.email = email
    this.name = name
    this.phoneNumber = phoneNumber
    this.locale = locale
    this.reference = reference
    this.externalUuid = externalUuid

    Object.freeze(this)
  }
}
