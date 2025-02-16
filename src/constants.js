const PROPERTY = {
  LANGUAGE: "LANGUAGE",
  RIDE_OFFERS_TTL: "RIDE_OFFERS_TTL",
  REPLY_TO_EMAIL: "REPLY_TO_EMAIL",
  UNSUBSCRIBE_MODE: "UNSUBSCRIBE_MODE",
  OFFER_RIDE_FORM_URL: "OFFER_RIDE_FORM_URL",
  USERS_SSID: "USERS_SSID",
  RIDE_OFFERS_SSID: "RIDE_OFFERS_SSID",
  OFFER_RIDE_FID: "OFFER_RIDE_FID"
}

const UNSUBSCRIBE_MODE = {
  MANUAL: "manual",
  AUTO: "auto"
}

const SPREADSHEETS = {
  USERS: "[carpool][db][users]",
  USERS_HEADER: ["Email Address", "Language", "Name", "Phone Number", "Identifying Reference"],
  USERS_COLUMN_WIDTHS: [220, 70, 90, 120, 200],
  RIDE_OFFERS: "[carpool][db][rideOffers]"
}

const I18N = {
  en: {
    FORM_TITLE: "[Carpooling with Neighbors] Offer a Ride",
    FORM_DESCRIPTION: "\n🔹 Your ride for the upcoming week will be included in this Sunday's email\n\n🔸 Keep in mind that if you add a ride after the Sunday email is sent, it won't be visible to anyone for the upcoming week\n",
    FORM_DESTINATION: "What is your destination?",
    FORM_DEPARTURE_TIME: "When do you plan to depart?",
    FORM_DEPARTURE_TIME_DESCRIPTION: "\n🔹 Add the departure date and time for the ride in the upcoming week, NOT for this week",
    FORM_MEETING_POINT: "Where would you like your neighbors to meet you?",
    FORM_AVAILABLE_SEATS: "How many seats are available?",
    FORM_PHONE_NUMBER: "Phone Number",
    FORM_PHONE_NUMBER_DESCRIPTION: "\n🔸 If this is your first time offering a ride, you must enter your phone number",

    EMAIL_NAME: "Carpooling with Neighbors",
    EMAIL_SUBJECT: "Available Rides for the Upcoming Week",
    EMAIL_UNSUBSCRIBE_MANUAL: "If you'd rather not receive these updates, tell us by replying to this email, and we'll remove you manually.",
    EMAIL_UNSUBSCRIBE_AUTO: "If you'd rather not receive these updates, you can unsubscribe automatically by replying with the word 'unsubscribe'.",
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
    },

    UNSUBSCRIBE: "unsubscribe"
  },
  ro: {
    FORM_TITLE: "[Drumuri cu Vecinii] Oferă o cursă",
    FORM_DESCRIPTION: "\n🔹 Cursa ta pentru săptămâna viitoare va fi inclusă în emailul de duminica aceasta\n\n🔸 Reține că dacă adaugi o cursă după ce emailul de duminică a fost trimis, aceasta nu va fi vizibilă pentru nimeni în săptămâna următoare\n",
    FORM_DESTINATION: "Care este destinația ta?",
    FORM_DEPARTURE_TIME: "Când plănuiești să pleci?",
    FORM_DEPARTURE_TIME_DESCRIPTION: "\n🔹 Adaugă data și ora plecării pentru cursa de săptămâna viitoare, NU pentru această săptămână",
    FORM_MEETING_POINT: "Unde ar trebui să te întâlnească vecinii?",
    FORM_AVAILABLE_SEATS: "Câte locuri sunt disponibile?",
    FORM_PHONE_NUMBER: "Numărul de telefon",
    FORM_PHONE_NUMBER_DESCRIPTION: "\n🔸 Dacă este prima dată când oferiți o cursă, trebuie să introduceți numărul de telefon",

    EMAIL_NAME: "Drumuri cu Vecinii",
    EMAIL_SUBJECT: "Curse disponibile pentru săptămâna viitoare",
    EMAIL_UNSUBSCRIBE_MANUAL: "Dacă nu mai dorești să primești aceste actualizări, spune-ne răspunzând la acest email și te vom dezabona manual.",
    EMAIL_UNSUBSCRIBE_AUTO: "Dacă nu mai dorești să primești aceste actualizări, te poți dezabona automat răspunzând doar cu 'dezabonare'.",
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
    },

    UNSUBSCRIBE: "dezabonare"
  }
}
