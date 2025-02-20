class Ride {

  constructor(departureTimestamp, destination, meetingPoint, phoneNumber) {
    this.departureTimestamp = departureTimestamp
    this.destination = destination
    this.meetingPoint = meetingPoint
    this.phoneNumber = phoneNumber

    this.template = HtmlService.createTemplateFromFile('src/webapp/components/ride/ride.template')

    Object.freeze(this)
  }

  render(language) {
    const departureTimestamp = I18N[language].DATE_TIME_FORMAT.format(this.departureTimestamp)
    const [day, date, time] = departureTimestamp.split(',')

    this.template.day = day.charAt(0).toUpperCase() + day.slice(1)
    this.template.date = date
    this.template.time = time

    this.template.departureTimestamp = departureTimestamp.charAt(0).toUpperCase() + departureTimestamp.slice(1)

    this.template.destination = this.destination
    this.template.meetingPoint = this.meetingPoint
    this.template.phoneNumber = this.phoneNumber

    return this.template.evaluate().getContent()
  }
}
