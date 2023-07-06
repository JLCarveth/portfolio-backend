/**
 * Class for handling email
 * Requires that the email settings are already populated in process.env:
 *  - process.env.emailAddress
 *  - process.env.oauth
 *      - oauth.clientID
 *      - oauth.clientSecret
 *      - oauth.refreshToken
 *
 * At the moment only going to work with Gmail as a provider as that's all I need
 * it for.
 */
const nodemailer = require("nodemailer");

class MailDispatcher {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Sends a message
   * @param {Object} mailOptions mail options
   * @property {String} mailOptions.from
   * @property {String} mailOptions.to
   * @property {String} mailOptions.subject
   * @property {String} mailOptions.text
   */
  sendMessage(mailOptions) {
    var that = this;
    return new Promise((resolve, reject) => {
      that.transporter.sendMail(mailOptions, (error, result) => {
        if (error) {
          console.error("didnt send..." + error.message);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = MailDispatcher;
