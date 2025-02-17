[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](./README.md) | [Română](./README.ro.md)

# Carpooling with Neighbours

A zero-cost, minimal interaction solution for carpooling with your neighbours, using Google Apps Script.

This is a beneficial solution for:
* Residential buildings
* Offices / large companies
* Close-knit communities

## Table of contents

* [How it works](#how-it-works)
* [Benefits](#benefits)
* [Setup](#setup)
* [Development](#development)
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

If you'd rather not receive these updates, tell us by replying to this email, 
and we'll remove you manually.

Cheers,
The Carpooling with Neighbors Team
```

To use this solution, someone in the community / neighbourhood must fulfill the role of the Admin. The Admin needs to manually add users to a spreadsheet. Only users listed in the spreadsheet can receive the Sunday email or offer rides using the form.

You only need the email addresses of those interested.

💡 To improve the chances of success with this solution, I recommend starting with a small group of neighbors. Once you've tested it together and seen how it works, you can announce within your community: "Hey, we are a group of X neighbors who have tried [...]"

<br/>

## Benefits

1. Zero costs! No app instalations or account registrations required (except for drivers<sup>(1)</sup>)

2. It works for up to 100<sup>(2)</sup> neighbours (Sunday email)

3. It’s a simple way to get in touch with your neighbours and help lessen the traffic in your area

<br/>

<sup>(1)</sup> Drivers must have a verified Google account to offer rides through the form

<sup>(2)</sup> 100 is the daily email quota for free accounts and 1500 for workspace ones

<br/>

## Setup

To get started, you’ll need to decide whether to use a personal Google account or a secondary account. Note that emails will be sent using your email address, with a plus address (`YOUR_EMAIL+carpooling@gmail.com`).

To install:
* The easiest way is to copy the public project from [Google Apps Script](https://script.google.com/home) into your account
* Alternatively, if you’re tech-savvy, you can use [clasp](https://github.com/google/clasp) on the downloaded project

Now, on your project page:  

1. Click the project settings icon '⚙️' on the left side of the page and choose your desired time zone

2. Also on the left, click the code editor symbol `< >` and open the `src/main.gs` file.

3. In this file, choose your desired language (spoken by most recipients) by modifying line 2, then save the change by clicking 💾, or using Ctrl + S or CMD + S. Possible options: <br/>
   `en` - English <br/>
   `ro` - Romanian

4. Still in this file, run the `main` function by pressing the `▷` button. This will create:  
   * The users file (Spreadsheet)  
   * The form for offering a ride
   * The ride offers file (Spreadsheet), where the form responses will be saved  
   * A trigger that sets the phone number in the users file when the driver adds it to the form  
   * A trigger that sends an email to recipients every Sunday, sometime between 18:00 - 19:00  

5. The default unsubscribe mode is `manual`. If you want your neighbors to be able to unsubscribe automatically, by replying with 'unsubscribe' to the received email, then:  
   * In project settings (⚙️), scroll to the bottom of the page and click the button to edit the script properties
   * Change the UNSUBSCRIBE_MODE property from `manual` to `auto` and save
   * Open the `src/unsubscribe.js` file and run the `activateAutomaticEmailUnsubscribeTrigger` function
   * This will activate an automatic check (every 30 minutes) for unsubscribe emails and remove subscribers from the user list

That’s it. Your only remaining task is to manually populate the user list. For each interested neighbor, you’ll need to add their email and desired language `[en, ro]`; optionally, you can also add their name, phone number, and a reference for driver identification (apartment/office).  

Names are useful for personalizing emails and reducing the chances of them being marked as spam. Phone numbers are necessary for drivers, and the optional reference helps email recipients better understand who the driver is.  

If something breaks, good luck <3 *"The fragile digital fabric holding this solution together is torn. Destroy it and rebuild it."* Save the data from the users file somewhere, then uninstall the solution. You’ll need to open the `src/uninstall.gs` file and run (`▷`) the `uninstall` function. Then, restart the installation process from step 2.  

Google authorization scopes used by `Carpooling with Neighbours`:

| OAuth 2.0 Scope                                    | Purpose | Usage |
|----------------------------------------------------|---------|-------|
| `https://www.googleapis.com/auth/spreadsheets`     | Interaction with `Spreadsheet` files | Creation of spreadsheet files: users and ride offers |
| `https://www.googleapis.com/auth/forms`            | Interaction with `Form` files | Creating the form for offering a ride |
| `https://www.googleapis.com/auth/drive.file`       | Creation of new files and interaction with them | Uninstall option |
| `https://www.googleapis.com/auth/userinfo.email`   | View the primary address of your Google account | Allows recipients to reply to the Sunday email (to unsubscribe) to the address `YOUR_EMAIL+carpooling-unsubscribe@gmail.com` |
| `https://www.googleapis.com/auth/script.scriptapp` | Code execution in your absence | Used to automatically send the Sunday email |
| `https://www.googleapis.com/auth/script.send_mail` | Sending emails on your behalf | Used to send the Sunday email |
| `https://mail.google.com/`                         | Access to Gmail | Used to check if unsubscribe replies have been received at the mentioned address (only for the "auto" unsubscribe mode) |  

<br/>

## Development

Clone this repo and make it your own. There’s no one-size-fits-all solution. Different communities, different needs.

Open the project in your preferred editor and install the packages (`npm install`). This will provide suggestions while coding. Use [clasp](https://github.com/google/clasp)!

If you make a change that benefits your community and might help others, feel free to open a PR, but keep these things in mind:
1. The UX must remain simple and minimalistic
2. If it’s too tailored to your community and wouldn’t help others, an extension might be more useful

An extension would be an independent script and should reuse the created files. However, be careful because it will require a more powerful authorization scope: `https://www.googleapis.com/auth/drive`. Most likely, users will need to retrieve the spreadsheet IDs (`USERS_SSID` & `RIDE_OFFERS_SSID`) from the current script’s properties and add them to the extension.  

If you want to make a quick contribution, add support for your native language if it’s not already present (`src/constants.js`).  

<br/>

## FAQ

* **Why not add a form for users to allow them to easily subscribe to the ride offers email?** <br/>
  * We vet each user individually because we handle personal data. Access must be limited to those who are part of the community

* **Why not add a form for ride reservations?**
  * We want to encourage direct social interaction between the driver and the potential rider, not limit it
  * If a form is used, the driver may need to initiate a refusal if they’re uncomfortable with the rider, but when the rider initiates contact, it allows the driver to assess, ask questions, and respond in their own way, making the process more personal and respectful
  * It complicates the UX and the code

* **What do you think about multilingual forms for drivers?**
  * This need hasn't come up yet
  * It complicates the code. It requires a spreadsheet with multiple sheets (one per form)

<br/>

## Inspiration

The challenge was *"How can I create a carpooling solution that works for any community with minimal effort and zero costs?"*. I created this solution after a neighbor gave me a ride to work (thanks, Roli!). I hope it inspires you to seek simplicity. Simple is hard.

If you'd like to learn more about me or support my work, feel free to visit my [GitHub](https://github.com/sponsors/manufacturist) page.
