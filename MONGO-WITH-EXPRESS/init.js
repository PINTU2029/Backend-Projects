const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
  .then(() => console.log('Connected Succesfully'))
  .catch( (err)=> {
    console.log(err);
  });


let allChats = [
          {
        from : "Neha",
        to : "priya",
        message : "send me your exam sheets",
        created_at : new Date()
         },

        {
        from : "meenu",
        to : "mahi",
        message : "i like your hope",
        created_at : new Date()
        },
                {
        from : "pooja",
        to : "pintu",
        message : "hello my brother",
        created_at : new Date()
        },
]

Chat.insertMany(allChats);
