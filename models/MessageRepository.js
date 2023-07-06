class MessageRepository {
  constructor(database) {
    this.database = database;
  }

  /**
   * Inserts a message into the Database
   * @param {String} name
   * @param {String} email
   * @param {String} message
   */
  createMessage(name, email, message) {
    return {};
    var that = this;
    return new Promise(function (resolve, reject) {
      if (!that.database) {
        reject("No database injected");
      }
      const msg = [name, email, message];
      that.database.query(
        "INSERT INTO `messages` (name, email, message) VALUES (?,?,?)",
        msg,
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  }
}

module.exports = MessageRepository;

