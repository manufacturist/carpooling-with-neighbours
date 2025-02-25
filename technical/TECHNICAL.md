[Back](./../README.md)

# Development

Clone this repo and make it your own. There’s no one-size-fits-all solution. Different communities, different needs.

Open the project in your preferred editor and install the packages (`npm install`). This will provide suggestions while coding. Use [clasp](https://github.com/google/clasp)!

If you make a change that benefits your community and might help others, feel free to open a PR, but keep these things in mind:
1. The UX must remain simple and minimalistic
2. If it’s too tailored to your community and wouldn’t help others, an extension might be more useful

An extension would be an independent script and should reuse the created files. However, be careful because it will require a more powerful authorization scope: `https://www.googleapis.com/auth/drive`. Most likely, users will need to retrieve the spreadsheet IDs (`USERS_SSID` & `RIDE_OFFERS_SSID`) from the current script’s properties and add them to the extension.  

If you want to make a quick contribution, add support for your native language if it’s not already present (`src/constants.js`).  

<br/>

## OAuth 2.0 scopes

List of required Google authorization scopes:

| OAuth 2.0 Scope                        | Purpose | Usage |
|----------------------------------------|---------|-------|
| `googleapis.com/auth/spreadsheets`     | Interaction with `Spreadsheet` files | Creation of spreadsheet files: users and ride offers |
| `googleapis.com/auth/forms`            | Interaction with `Form` files | Creating the form for offering a ride |
| `googleapis.com/auth/drive.file`       | Creation of new files and interaction with them | Uninstall option |
| `googleapis.com/auth/userinfo.email`   | View the primary address of your Google account | Allows recipients to reply to the Sunday email (to unsubscribe) to the address `YOUR_EMAIL+carpooling@gmail.com` |
| `googleapis.com/auth/script.scriptapp` | Code execution in your absence | Used to automatically send the Sunday email |
| `googleapis.com/auth/script.send_mail` | Sending emails on your behalf | Used to send the Sunday email |
| `mail.google.com`                      | Access to Gmail | Used to check if unsubscribe replies have been received at the mentioned address (only for the "auto" unsubscribe mode) |  

<br/>

## Documented challenges / gotchas 

| Category | Challenge | Solution |
|----------|-----------|----------|
| Web App  | Avoid using CDNs & adding styles | A basic tailwind setup. There's a single entry point in the web app via the `doGet()` function. One could argue that you could multiplex the entry point and serve content depending on a specific parameter in the endpoint, however that felt a bit awkward to do. I ended up embedding the generated css in the `index.template.html`, using the `<?!= tailwind-css-here ?>` notation. This notation enables the XSS attack vector, however since we control the generated css, it's fine.|
|          | Track page views | Ended using [Pirsch](https://pirsch.io) for this and a cloudfront worker. It's GDPR friendly and doesn't use cookies. The worker's purpose is to safe guard against bursts of requests that consume the page views quota from pirsch. It works using a sliding rate window and a simple IP blocking mechanism. Too many requests from the same IP and boom, block tracking page views for that IP. During the setup of the project, a community id is generated, which is used as the referrer when we call pirsch. This is done in order to segment the page views per community and to avoid displaying the internal iframe URL in the metrics dashboard.|
|          | Components | Only using one component for the ride. It uses the `<?= ?>` notation to inject text safely during rendering. For the |
|          | Rendered page cached | The rendered page is cached for 3 minutes to avoid doing all the work of fetching data and rendering. |
| DevX     | Slow development cycles | Use clasp. Use VSC for suggestions. Update web app with `npm run update` |
|          | Code structure | Split the code in files based on purpose |
|          | Project setup  | Tried to reduce the number of steps one needs to take in order to setup the project. Boiled down, you only need to run `main()` and manually deploy as web app. |
| Email    | Email marked as spam | Avoided HTML email; using text-only and a single link |
|          | Unsubscribe | Happens by replying with `unsubscribe` to any email. The received emails use the plus notation `your-email+carpooling@gmail.com`. This way, the user can filter these emails in his inbox as such. |
| i18n     | Multiple languages | All translations are defined in the `constants.js` file |
