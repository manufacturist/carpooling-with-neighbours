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
* [Setup](#setup)
* [Development process](#development-process)
* [Abandoned ideas](#abandoned-ideas)
* [FAQ](#faq)
* [Inspiration](#inspiration)

<br/>

## How it works

A neighbour offers a ride by filling out a form. Every Sunday, an email is sent around 18:00 with a list of available rides for the upcoming week to all those interested:

```
Hey Sally Carrera,

Here are the available rides for next week:

🚗 California International Speedway | Wednesday, Aug 20, 13:37 PM
Driver: Lightning McQueen (no. 42, +0123456789)
Meet: Mater's Garage (Radiator Springs) | Seats: 3

If any of them work for you, just reach out to the driver to save your spot.

You can also offer a ride here: https://forms.gle/ABCDEFGHIJKLMNOPQ

If you'd rather not receive these updates, you can unsubscribe anytime 
here: https://rb.gy/123456?unsubscribe=00000000-0000-0000-0000-000000000000

Cheers,
The Carpooling with Neighbors Team
```

To use this solution, someone in the community / neighbourhood must fulfill the role of the Admin. The Admin needs to manually add users to a spreadsheet. Only users listed in the spreadsheet can receive the Sunday email or offer rides via the form.

You only need the email addresses of those interested.

💡 To improve the chances of success with this solution, I recommend starting with a small group of neighbors. Once you've tested it together and seen how it works, you can announce within your community: "Hello, we are a group of X neighbors who have tried [...]"

<br/>

## Benefits of this solution

1. Zero costs! No app instalations or account registrations are required (except for drivers, unless they already have a Google account)

2. It works for up to 100 users (Sunday email)

3. Drivers are required to have a **verified** Google account. A verified email is required when filling out the form

4. There’s a social aspect to it. You need to contact the driving neighbour directly to reserve a spot

5. It’s a simple way to reduce pollution and to get in touch with your neighbours

:warning: 100 is the daily email quota for free accounts and 1500 for workspace ones

<br/>

## Setup

To install, you’ll need a Google account. Download the code and choose one of the following methods:
* If you're technically proficient, I'd recommend using [clasp](https://github.com/google/clasp)
* If not, go to [Google Apps Script](https://script.google.com/home), create a new project, and add the `src` and `template` folders to it after you download the code

In your project's dashboard, go to the editor and open the `main.gs` file. Set your time zone (code change) and then run the `main()` function, which will create:
1. The `Users` spreadsheet
2. The `Offer Ride` form
3. The `Ride Offers` spreadsheet, where the form responses will be saved
4. A trigger that updates the phone number in `Users`, when the driver specifies it in the form
5. A trigger that sends an email to users every Sunday, at around 18:00

That’s it. Your only remaining task is to manually populate the user list. For each user, you’ll need to enter a random identifier UUID, email, and their preferred language `[en, ro]`; optionally, you can also add their name, phone number, and a reference for the driver (apartment/office).

The identifier will be used for unsubscribing the user. The name is helpful for personalizing the email and reducing the chances of it being marked as spam. The phone number is necessary for drivers, and the reference helps email recipients better understand who the driver is.

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

The challenge was *"How can I create a carpooling solution that works for any community with minimal effort and zero costs?"* I created this solution after a neighbor gave me a ride to work (thanks, Roli!). I hope it inspires you to seek simplicity. Simple is hard.

If you'd like to learn more about me or support my work, feel free to visit my [GitHub](https://github.com/sponsors/manufacturist) page.
