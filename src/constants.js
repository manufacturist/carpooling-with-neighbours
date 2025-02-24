const PROPERTY = {
  LANGUAGE: "LANGUAGE",
  RIDE_OFFERS_TTL: "RIDE_OFFERS_TTL",
  REPLY_TO_EMAIL: "REPLY_TO_EMAIL",
  UNSUBSCRIBE_MODE: "UNSUBSCRIBE_MODE",
  OFFER_RIDE_FORM_URL: "OFFER_RIDE_FORM_URL",
  USERS_SSID: "USERS_SSID",
  RIDE_OFFERS_SSID: "RIDE_OFFERS_SSID",
  OFFER_RIDE_FID: "OFFER_RIDE_FID",
  WEB_APP_URL: "WEB_APP_URL",
  COMMUNITY_ID: "COMMUNITY_ID"
}

const UNSUBSCRIBE_MODE = {
  MANUAL: "manual",
  AUTO: "auto"
}

const CACHE = {
  RENDERED_PAGE: "RENDERED_PAGE"
}

const SPREADSHEETS = {
  USERS: "[carpool][db][users]",
  USERS_HEADER: ["Email Address", "Language", "Name", "Phone Number", "Identifying Reference"],
  USERS_COLUMN_WIDTHS: [220, 70, 90, 120, 200],
  RIDE_OFFERS: "[carpool][db][rideOffers]"
}

const I18N = {
  en: {
    DATE_TIME_FORMAT: new Intl.DateTimeFormat('en', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }),

    FORM_TITLE: "[Carpooling with Neighbors] Offer a Ride",
    FORM_DESCRIPTION: "\n🔹 Your ride for the upcoming week will be included in the next Sunday email\n\n🔸 Make sure the admin has added your email address to the users spreadsheet before adding a trip!\n",
    FORM_DESTINATION: "What is your destination?",
    FORM_DEPARTURE_TIME: "When do you plan to depart?",
    FORM_MEETING_POINT: "Where would you like your neighbors to meet you?",
    FORM_AVAILABLE_SEATS: "How many seats are available?",
    FORM_PHONE_NUMBER: "Phone Number",
    FORM_PHONE_NUMBER_DESCRIPTION: "\n🔸 If this is your first time offering a ride, you must enter your phone number",

    WEBAPP_TITLE: "Vroom vroom!",
    WEBAPP_TRIPS_FOR_NEXT_DAYS: "Trips for the next 7 days",
    WEBAPP_DEPARTURE_TIME: "Departure",
    WEBAPP_TRIP: "Trip",
    WEBAPP_MEETING_POINT: "Meet",
    WEBAPP_PHONE_NUMBER: "Phone",

    EMAIL_NAME: "Carpooling with Neighbors",
    EMAIL_SUBJECT: "Available Rides for the Upcoming Week",
    EMAIL_UNSUBSCRIBE_MANUAL: "If you'd rather not receive these updates, tell us by replying to this email, and we'll remove you manually.",
    EMAIL_UNSUBSCRIBE_AUTO: "If you'd rather not receive these updates, you can unsubscribe automatically by replying with the word 'unsubscribe'.",
    EMAIL_BODY_RIDE_TEMPLATE_FN: (ride, driver) => {
      const formattedDate = I18N['en'].DATE_TIME_FORMAT.format(ride.departureTimestamp)

      const meetingPoint = ride.meetingPoint ? `Meet: ${ride.meetingPoint} | ` : ""
      const driverReference = driver.reference ? `${driver.reference}, ` : ""

      const line1 = `🚘 ${ride.destination} | ${formattedDate}`
      const line2 = `Driver: ${driver.name} (${driverReference}${driver.phoneNumber})`
      const line3 = `${meetingPoint}Seats: ${ride.seats}`

      return [line1, line2, line3].join("\n")
    },

    NEIGHBOUR_VOCATIVE: "neighbour",
    UNSUBSCRIBE: "Unsubscribe"
  },
  ro: {
    DATE_TIME_FORMAT: new Intl.DateTimeFormat('ro', {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),

    FORM_TITLE: "[Drumuri cu Vecinii] Oferă o cursă",
    FORM_DESCRIPTION: "\n🔹 Cursa ta pentru săptămâna viitoare va fi inclusă în emailul de duminica aceasta\n\n🔸 Reține că dacă adaugi o cursă după ce emailul de duminică a fost trimis, aceasta nu va fi vizibilă pentru nimeni în săptămâna următoare\n",
    FORM_DESTINATION: "Care este destinația ta?",
    FORM_DEPARTURE_TIME: "Când plănuiești să pleci?",
    FORM_MEETING_POINT: "Unde ar trebui să te întâlnească vecinii?",
    FORM_AVAILABLE_SEATS: "Câte locuri sunt disponibile?",
    FORM_PHONE_NUMBER: "Numărul de telefon",
    FORM_PHONE_NUMBER_DESCRIPTION: "\n🔸 Dacă este prima dată când oferiți o cursă, trebuie să introduceți numărul de telefon",

    WEBAPP_TITLE: "Vrum vrum!",
    WEBAPP_TRIPS_FOR_NEXT_DAYS: "Cursele pe următoarele 7 zile",
    WEBAPP_DEPARTURE_TIME: "Ora",
    WEBAPP_TRIP: "Drum",
    WEBAPP_MEETING_POINT: "Plecare",
    WEBAPP_PHONE_NUMBER: "Telefon",

    EMAIL_NAME: "Drumuri cu Vecinii",
    EMAIL_SUBJECT: "Curse disponibile pentru săptămâna viitoare",
    EMAIL_UNSUBSCRIBE_MANUAL: "Dacă nu mai dorești să primești aceste actualizări, spune-ne răspunzând la acest email și te vom dezabona manual.",
    EMAIL_UNSUBSCRIBE_AUTO: "Dacă nu mai dorești să primești aceste actualizări, te poți dezabona automat răspunzând doar cu 'dezabonare'.",
    EMAIL_BODY_RIDE_TEMPLATE_FN: (ride, driver) => {
      const formattedDate = I18N['ro'].DATE_TIME_FORMAT.format(ride.departureTimestamp)

      const meetingPoint = ride.meetingPoint ? `Plecare: ${ride.meetingPoint} | ` : ""
      const driverReference = driver.reference ? `${driver.reference}, ` : ""

      const line1 = `🚘 ${ride.destination} | ${formattedDate}`
      const line2 = `Șofer: ${driver.name} (${driverReference}${driver.phoneNumber})`
      const line3 = `${meetingPoint}Locuri: ${ride.seats}`

      return [line1, line2, line3].join("\n")
    },

    NEIGHBOUR_VOCATIVE: "vecine",
    UNSUBSCRIBE: "Dezabonare"
  }
}
