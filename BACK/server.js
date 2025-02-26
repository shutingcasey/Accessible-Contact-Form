require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ContactDB = require("./modules/ContactDB.js");

const app = express(); 
const HTTP_PORT = process.env.PORT || 3000;
const db = new ContactDB();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({ message: "API Listening" }); 
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);

        app.post("/api/messages", (req, res) => {
            db.addMessage(req.body)
                .then(message => res.status(201).json(
                    message                
                ))
                .catch(err => res.status(500).json({
                    // screen readers will read the spokenMessage so that users can better understand what is happening
                    status: "error",
                    error: "Failed to add message",
                    message: "We couldn't save your message due to a server issue. Please try again later.",
                    spokenMessage: "Please try submitting your message again later." 
                }));
        });

        app.get("/api/messages", (req, res) => {
            db.getAllMessages()
                .then(messages => res.json(messages))
                .catch(err => res.status(500).json({
                    status: "error",
                    message: "Failed to retrieve messages. Please try again later.",
                    spokenMessage: "We couldn't load your messages." 
                }));
        });

        app.get("/api/messages/:id", (req, res) => {
            db.getMessageById(req.params.id)
                .then(message => {
                    if (message) res.json(message);
                    else res.status(404).json({
                        status: "error",
                        message: "Message not found.",
                        spokenMessage: "We couldn't find the message."                         
                        });
                })
                .catch(err => res.status(500).json({
                    status: "error",
                    error: "Failed to add message",
                    message: "Failed to retrieve messages. Please try again later.",
                    spokenMessage: "We couldn't load your messages." 
                }));
        });

        app.delete("/api/messages/:id", (req, res) => {
            db.deleteMessageById(req.params.id)
                .then(result => {
                    if (result.deletedCount > 0) res.status(204).send();
                    else res.status(404).json({ 
                        status: "error",
                        message: "Message not found. It may have already been deleted.",
                        spokenMessage: "We couldn't find the message. It may have already been deleted."  
                    });
                })
                .catch(err => res.status(500).json({ error: "Failed to delete message", message: err.message }));
        });

    });
})
.catch((err) => {
    console.log(err);
});