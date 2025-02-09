[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[:uk: English](./README.md) | [:romania: Română](./README.ro.md)

# Carpooling with Neighbours

A zero-cost, minimal interaction solution for carpooling with your neighbours, using Google Apps Script (GAS).

This is a beneficial solution for:
* Residential buildings
* Offices / large companies
* Close-knit communities

<br/>

## Table of contents

* [How it works](#how-it-works)
* [Benefits of this solution](#benefits-of-this-solution)
* [Technical details](#technical-details)
* [Development process](#development-process)
* [Abandoned ideas](#abandoned-ideas)
* [FAQ](#faq)
* [Inspiration](#inspiration)

<br/>

## How it works

A neighbour can offer a ride by filling out a form. Every Sunday, an email is sent around 19:00 with a list of available rides for the upcoming week to all those interested:

```
Here are the available rides:

🚗 California International Speedway | Wednesday, Feb 30, 13:37 PM
Driver: Lightning McQueen (no. 42, +0123456789)
Meet: Mater's Garage (Radiator Springs) | Seats: 3

If any ride is helpful, talk with the driver to reserve a spot. If you want to unsubscribe from this service, click here.

Best regards,
Carpooling with Neighbors
```

Neighbours can contact the driver to reserve a seat.

To use this solution, someone in the community / neighbourhood must fulfill the role of the Admin. The Admin needs to manually add users to a spreadsheet. Only users listed in the spreadsheet can receive the Sunday email or offer rides via the form.

For drivers, collect their email, name, and phone number. For the rest, collect only email addresses.

<br/>

## Benefits of this solution

1. Zero costs! No app instalations or account registrations are required (except for drivers, unless they already have a Google account)

2. It works for up to 100 users (Sunday email)

3. Drivers are required to have a **verified** Google account. A verified email is required when filling out the form

4. There’s a social aspect to it. You need to contact the driving neighbour directly to reserve a spot

5. It’s a simple way to reduce pollution, to get in touch with your neighbours and to be friendly

:warning: 100 is the daily email quota for free accounts and 1500 for workspace ones

<br/>

## Technical details

To install, you’ll need a Google account. Download the code and choose one of the following methods:
* If you're technically proficient, I'd recommend using [clasp](https://github.com/google/clasp)
* If not, go to [Google Apps Script](https://script.google.com/home), create a new project, and add the `src` folder to it after you download the repo

In your project's dashboard, go to the editor and open the `main.gs` file. Set your time zone (code change) and then run the `main()` function, which will:
1. Create the `Users` spreadsheet
2. Create the `Offer Ride` form
3. Create the `Ride Offers` spreadsheet, where the form responses will be saved
4. Create a trigger that sends an email to users every Sunday at around 19:00

That’s it. Your only remaining task is to manually populate the users list. For each user, you’ll need to collect the email, name, phone number, the desired language `[en, ro]` and optionally a reference (apartment / house number / office / team / company / context specific).

If something breaks, good luck <3 *"The frail digital connective tissue holding this solution all together is broken. Destroy it and rebuild it."*

<br/>

## Development process

Clone this repo and make it your own. There’s no one-size-fits-all solution. Different communities, different needs.

Open the project in VSC and install the packages (`npm install`). This should provide suggestions while coding and make you feel saner. Use [clasp](https://github.com/google/clasp)!

If you make a change that benefits your community and might help others, feel free to open a PR. But keep these things in mind:
1. The UX must remain simple and minimalistic
2. If it’s too tailored to your community and wouldn’t help others, don’t bother :shrug:

If you want to make a quick contribution, add support for your native language if it’s not already present (`contants.js`).

<br/>

## Abandoned ideas

1. **A form for reserving a ride**
   * It complicates the UX and the code
   * We want to promote social interaction, not limit it
   * What if the driver doesn’t know or like the person who reserved the spot?

2. **Forms i18n for drivers (multiple forms)**
   * It complicates the code (requires one sheet per form)
   * English is king

<br/>

## FAQ

* **Why not add a form for users to allow them to easily subscribe to the ride offers email?** <br/>
   Zero trust in users. Always. Vet them one by one.

<br/>

## Inspiration

*"How can I create a ride-sharing solution for any community with minimal effort and zero costs?"*, was the challenge I set for myself after a neighbour gave me a ride to work (thanks Roli). I hope this solution inspires you to achieve maximum impact with minimal effort.
