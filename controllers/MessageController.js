/**
 * Mail Service
 */
const MailDispatcher = new (require("../services/mail"))();

/**
 * Handles the business logic for Message domain objects
 */
class MessageController {
  /**
   * Create a new MessageController, injecting the required repository
   * @param {MessageRepository} MessageRepository
   */
  constructor(MessageRepository) {
    this.repository = MessageRepository;
  }

  /**
   *
   * @param {*} name
   * @param {*} email
   * @param {*} message
   */
  onMessage(name, email, message) {
    return new Promise((resolve, reject) => {
      this.repository
        .createMessage(name, email, message)
        .then(
          MailDispatcher.sendMessage({
            from: email,
            to: process.env.EMAIL,
            subject: "You've got mail!",
            text:
              "Sender: " + email + "\nName: " + name + "\nMessage: " + message,
          })
            .catch((_error) => {
              // Error sending the message
              reject("Error dispatching email");
            })
            .then(resolve())
        )
        .catch((_error) => {
          // Error creating the message in the database
          reject("Error inserting to the database");
        });
    });
  }
}
module.exports = MessageController;
