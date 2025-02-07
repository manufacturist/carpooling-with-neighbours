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
  constructor(email, name, phoneNumber, locale, reference) {
    this.email = email
    this.name = name
    this.phoneNumber = phoneNumber
    this.locale = locale
    this.reference = reference

    Object.freeze(this)
  }
}
