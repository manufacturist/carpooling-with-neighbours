const PROPERTY = {
  LOCALE: "LOCALE",
  TIMEZONE: "TIMEZONE",
  RIDE_OFFERS_TTL: "RIDE_OFFERS_TTL",
  UNSUBSCRIBE_URL: "UNSUBSCRIBE_URL",
  OFFER_RIDE_FORM_URL: "OFFER_RIDE_FORM_URL"
}

const SPREADSHEETS = {
  USERS: "[carpool][db][users]",
  USERS_HEADER: ["Id [UUID]", "Email Address", "Locale", "Name", "Phone Number", "Identifying Reference"],
  RIDE_OFFERS: "[carpool][db][rideOffers]"
}

const I18N = {
  en: {
    FORM_TITLE: "[Carpooling with Neighbors] Offer a Ride",
    FORM_DESCRIPTION: "\n❗ Before offering a ride, ask the Admin if he has your email, name and phone number\n\n🔹 Your ride for the upcoming week will be included in this Sunday's email\n\n🔹 Also, keep in mind that if you add a ride after the Sunday email is sent, it won't be visible to anyone for the upcoming week\n",
    FORM_DESTINATION: "What is your destination?",
    FORM_DEPARTURE_TIME: "When do you plan to depart?",
    FORM_DEPARTURE_TIME_DESCRIPTION: "\n🔹 Add the departure date and time for the ride in the upcoming week, NOT for this week",
    FORM_MEETING_POINT: "Where would you like your neighbors to meet you?",
    FORM_AVAILABLE_SEATS: "How many seats are available?",

    EMAIL_NAME: "Carpooling with Neighbors",
    EMAIL_SUBJECT: "Available Rides for the Upcoming Week",
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

      const line1 = `🚘 ${ride.destination} | ${formattedDate}`
      const line2 = `Driver: ${driver.name} (${driverReference}${driver.phoneNumber})`
      const line3 = `${meetingPoint}Seats: ${ride.seats}`

      return [line1, line2, line3].join("\n")
    }
  },
  ro: {
    FORM_TITLE: "[Drumuri cu Vecinii] Oferă o cursă",
    FORM_DESCRIPTION: "\n❗ Înainte de a oferi o cursă, întreabă Adminul dacă are emailul, numele și numărul tău de telefon\n\n🔹 Cursa ta pentru săptămâna viitoare va fi inclusă în emailul de duminica aceasta\n\n🔹 De asemenea, reține că dacă adaugi o cursă după ce emailul de duminică a fost trimis, aceasta nu va fi vizibilă pentru nimeni în săptămâna următoare\n",
    FORM_DESTINATION: "Care este destinația ta?",
    FORM_DEPARTURE_TIME: "Când plănuiești să pleci?",
    FORM_DEPARTURE_TIME_DESCRIPTION: "\n🔹 Adaugă data și ora plecării pentru cursa de săptămâna viitoare, NU pentru această săptămână",
    FORM_MEETING_POINT: "Unde ar trebui să te întâlnească vecinii?",
    FORM_AVAILABLE_SEATS: "Câte locuri sunt disponibile?",

    EMAIL_NAME: "Drumuri cu Vecinii",
    EMAIL_SUBJECT: "Curse disponibile pentru săptămâna viitoare",
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

      const line1 = `🚘 ${ride.destination} | ${formattedDate}`
      const line2 = `Șofer: ${driver.name} (${driverReference}${driver.phoneNumber})`
      const line3 = `${meetingPoint}Locuri: ${ride.seats}`

      return [line1, line2, line3].join("\n")
    }
  }
}
