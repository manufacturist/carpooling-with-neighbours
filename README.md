[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[:uk: English](./README.md) | [:romania: Română](./README.ro.md)

# Carpool with Neighbours

A zero-cost, minimal interaction solution for carpooling with your neighbours, using Google Apps Script (GAS).

This is a beneficial solution for:
* Residential buildings
* Offices / large companies
* Close-knit communities

<br/>

### How it works?

A neighbour can offer a ride by filling out a form. Every Sunday, an email is sent around 19:00 with a list of available rides for the upcoming week to all those interested:

```
Here are the available rides:

🚗 California International Speedway | Wednesday, Feb 30, 13:37 PM
Driver: Lightning McQueen (no. 42, +0123456789)
Meet: Mater's Garage (Radiator Springs) | Seats: 3

If any ride is helpful, talk with the driver to reserve a spot.

Best regards,
Carpool with Neighbors
```

Neighbours can contact the driver to reserve a seat.

To use this solution, someone in the community / neighbourhood must fulfill the role of the Admin. The Admin needs to manually add users to a spreadsheet. Only users listed in the spreadsheet can receive the Sunday email and offer rides via the form.

<br/>

### Benefits of this solution

1. It has zero costs! No instalations are required, and users don’t need to register on any platform unless they offer a ride

2. It works for up to 100 users (Sunday email)

3. Drivers are required to have a **verified** Google account. A verified email is required when filling out the form

4. There’s a social aspect to it. You need to contact the driving neighbour directly to reserve a spot

5. It’s a simple way to reduce pollution, get in touch with your neighbours, and be friendly

:warning: 100 is the daily email quota for free accounts and 1500 for workspace ones

<br/>

### Technical details

To install, you’ll need a Google account. Download the code and choose one of the following methods:
* If you're technically proficient, I'd recommend using [clasp](https://github.com/google/clasp)
* If not, go to [Google Apps Script](https://script.google.com/home), create a new project, and add the files from the `src` folder

Once set up, go to the `main.gs` file and set your time zone (code change). Then run the `main()` function, which will:
1. Create the `Users` spreadsheet
2. Create the `Offer Ride` form
3. Create the `Ride Offers` spreadsheet, where the form responses will be saved
4. Create a trigger that sends an email to users every Sunday at around 19:00

That’s it. Your only remaining task is to manually populate the users list. For each user, you’ll need to collect the email, name, phone number, the desired language `[en, ro]` and optionally a reference (apartment / house number / office / team / company / context specific).

If something breaks, good luck <3. I came up with this line: *"The frail digital connective tissue holding this solution all together is broken. Destroy it and rebuild it"*. It sums up my feelings about working with GAS:
1. Development cycles are long because you have to manually test everything
2. Regression is required when making big changes :(
3. I appreciate `clasp` because it lets me code from VSC
4. Simple... for the most part

<br/>

### Development process

Clone this repo and make it your own. There’s no one-size-fits-all solution. Different communities, different needs.

Open the project in VSC and install the packages (`npm install`). This should provide suggestions while coding and make you feel saner. Use [clasp](https://github.com/google/clasp)!

If you make a change that benefits your community and might help others, feel free to open a PR. But keep these things in mind:
1. The UX must remain simple and minimalistic
2. If it’s too tailored to your community and wouldn’t help others, don’t bother :shrug:

If you want to make a quick contribution, add support for your native language if it’s not already present (`contants.js`).

<br/>

### Ideas I tried and abandoned

1. **A form for reserving a ride**
   * It complicates the UX and the code
   * We want to promote social interaction, not limit it
   * What if the driver doesn’t know or like the person who reserved the spot?

2. **Forms i18n for drivers (multiple forms)**
   * It complicates the code (requires one sheet per form)
   * English is king

<br/>

### About this solution

*"How can I create a ride-sharing solution for any community with minimal effort and zero costs?"*, that was the challenge I set for myself after a neighbour gave me a ride to work:
* Spent half a workday reading about various solutions to implement this as effortless as possible
* Spent about 1.5 workdays on this solution (development, clean-up, simplifying, testing)
* Using ChatGPT I accelerated the development, having completed the first PoC in 3 hours

I hope this solution inspires you to achieve maximum impact with minimal effort.
