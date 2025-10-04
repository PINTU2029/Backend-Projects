const express = require("express");
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));


mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
  .then(() => console.log('Connected Succesfully'))
  .catch( (err)=> {
    console.log(err);
  });


// Index Route 
app.get("/chats" , async (req , res) =>{
      let chats = await Chat.find();
      res.render("index.ejs" , {chats});
});

// New Route 
app.get("/chats/new",  (req , res) =>{
     res.render("new.ejs");
});

app.post("/chats" , (req , res) => {
  let {from , to ,message} = req.body;
  let newChat = new Chat({
    from : from ,
    to : to,
    message : message,
    created_at : new Date()
  });

  newChat.save()
    .then((result) => {
      console.log("chat saved", result);
      res.redirect("/chats");   // redirect yahin hona chahiye
    })
    .catch(err => {
      console.log("Error saving chat:", err);
      res.send("Error saving chat");
    });
});


// Edit route
app.get("/chats/:id/edit" , async(req , res) => {
  let {id} = req.params;
  let chat = await Chat.findById(id)
  res.render("edit.ejs" , {chat});
});

app.patch("/chats/:id", async (req ,res) => {
  let {id} = req.params;
  let {message : newMsg} = req.body;
  let updatedChat = await  Chat.findByIdAndUpdate(id , {message : newMsg} , {runValidators : true , new : true});
  console.log(updatedChat);
  res.redirect("/chats");
});


// delete route
app.delete("/chats/:id" ,  async (req , res) =>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});



// root route
app.get("/" , (req , res) =>{
    res.send("Root is working")
});

app.listen(port , () =>{
    console.log(`listening to port ${port}`)
});

