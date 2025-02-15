function setAutomaticUnsubscribeTrigger() {
  const unsubscribeWords = Object.keys(I18N).map((key) => I18N[key].UNSUBSCRIBE)

  const scriptProperties = PropertiesService.getScriptProperties()
  const replyToEmail = scriptProperties.getProperty(PROPERTY.REPLY_TO_EMAIL)

  GmailApp.search(`to:${replyToEmail}`).forEach((thread) => {
    let userEmail = undefined

    thread.getMessages().forEach((message) => {
      const repliedWithUnsubscribeWord = unsubscribeWords.some((unsubscribeWord) => {
        message.getPlainBody().startsWith(unsubscribeWord)
      })

      if (repliedWithUnsubscribeWord) {
        userEmail = extractEmail(message.getFrom())
      }
    })

    if (userEmail) {
      Services.userService.deleteUserByEmail(userEmail)
      thread.moveToTrash()
    }
  })
}

function extractEmail(sender) {
  const match = sender.match(/<(.+)>/)
  return match ? match[1] : sender
}
