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
