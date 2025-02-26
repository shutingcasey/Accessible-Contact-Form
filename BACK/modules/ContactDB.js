const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}
);

module.exports = class ContactDB {
  constructor() {
    this.Movie = null;
  }


  initialize(connectionString) {
    return new Promise((resolve, reject) => {
      const db = mongoose.createConnection(
        connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );

      db.once('error', (err) => {
        reject(err);
      });
      db.once('open', () => {
        this.Contact = db.model("contacts", contactSchema);
        resolve();
      });
    });
  }

      async addMessage(data) {
        const newMessage = new this.Contact(data);
        await newMessage.save();
        return newMessage;
    }

    getAllMessages() {
        return this.Contact.find().sort({ createdAt: -1 }).exec();
    }


    getMessageById(id) {
        return this.Contact.findOne({ _id: id }).exec();
    }

    deleteMessageById(id) {
        return this.Contact.deleteOne({ _id: id }).exec();
    }
}