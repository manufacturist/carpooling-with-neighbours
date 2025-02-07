const TIMEZONE_PROPERTY = "TIMEZONE"
const RIDE_OFFERS_TTL_PROPERTY = "RIDE_OFFERS_TTL"

const SPREADSHEETS = {
  USERS: "[carpool][db][users]",
  USERS_HEADER: ["Email Address", "Name", "Phone Number", "Locale", "Identifying Reference"],
  RIDE_OFFERS: "[carpool][db][rideOffers]"
}

const I18N = {
  en: {
    FORM_TITLE: "[Carpooling with Neighbors] Offer a Ride",
    FORM_DESCRIPTION: null,
    FORM_DESTINATION: "What is your destination?",
    FORM_DEPARTURE_TIME: "When do you plan to depart?",
    FORM_MEETING_POINT: "Where would you like your neighbors to meet you?",
    FORM_AVAILABLE_SEATS: "How many seats are available?",

    EMAIL_NAME: "Carpooling with Neighbors",
    EMAIL_SUBJECT: "Available Rides for the Upcoming Week",
    EMAIL_BODY_START: "Here are the available rides:",
    EMAIL_BODY_END: "If any ride is helpful, talk with the driver to reserve a spot.\n\nBest regards,\nCarpooling with Neighbors",
    EMAIL_BODY_RIDE_TEMPLATE_FN: (ride, driver) => {
      const formattedDate = new Intl.DateTimeFormat('en', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(ride.when)

      const meetingPoint = ride.meetingPoint ? `Meet: ${ride.meetingPoint} | ` : ""
      const driverReference = driver.reference ? `${driver.reference}, ` : ""

      const line1 = `🚗 ${ride.destination} | ${formattedDate}`
      const line2 = `Driver: ${driver.name} (${driverReference}${driver.phoneNumber})`
      const line3 = `${meetingPoint}Seats: ${ride.seats}`

      return [line1, line2, line3].join("\n")
    }
  },
  ro: {
    FORM_TITLE: "[Drumuri cu vecinii] Oferă o cursă",
    FORM_DESCRIPTION: null,
    FORM_DESTINATION: "Care este destinația ta?",
    FORM_DEPARTURE_TIME: "Când plănuiești să pleci?",
    FORM_MEETING_POINT: "Unde ar trebui să te întâlnească vecinii?",
    FORM_AVAILABLE_SEATS: "Câte locuri sunt disponibile?",

    EMAIL_NAME: "Drumuri cu vecinii",
    EMAIL_SUBJECT: "Curse disponibile pentru săptămâna viitoare",
    EMAIL_BODY_START: "Iată cursele disponibile:",
    EMAIL_BODY_END: "Dacă o cursă îți este utilă, discută cu șoferul pentru a rezerva un loc.\n\nToate cele bune,\nDrumuri cu vecinii",
    EMAIL_BODY_RIDE_TEMPLATE_FN: (ride, driver) => {
      const formattedDate = new Intl.DateTimeFormat('ro', {
        weekday: 'long',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(ride.when)

      const meetingPoint = ride.meetingPoint ? `Plecare: ${ride.meetingPoint} | ` : ""
      const driverReference = driver.reference ? `${driver.reference}, ` : ""

      const line1 = `🚗 ${ride.destination} | ${formattedDate}`
      const line2 = `Șofer: ${driver.name} (${driverReference}${driver.phoneNumber})`
      const line3 = `${meetingPoint}Locuri: ${ride.seats}`

      return [line1, line2, line3].join("\n")
    }
  }
}
