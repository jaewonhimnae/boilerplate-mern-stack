const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

//Socket.io
const server = require("http").createServer(app);
const io = require("socket.io")(server);


const { Chat } = require("./models/Chat");
const { User } = require("./models/user");
const { auth } = require("./middleware/auth");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true })
                .then(() => console.log("DB connected"))
                .catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


//=================================
//            Socket.io
//=================================

io.on("connection", socket => {
  console.log(" User is connected :) ");

  socket.on("Input Chat Message", msg => {
    // Save a message that come from the client to Mongo DB
    connect.then(db => {
      try {
        let chat = new Chat({ message: msg.chatMessage, sender: msg.userID });

        chat.save((err, doc) => {
          if (err) return res.json({ succes: false, err });

          Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc) => {
              console.log(doc);
              return io.emit("Output Chat Message", doc);
            })
        });

      } catch (err) {
        console.error(err);
      }
    });
  });
});


//=================================
//             CHAT
//=================================

app.get("/api/chat/getChats", async (req, res) => {
  await Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});


//=================================
//            User
//=================================

app.get("/api/users/auth", auth,  (req,res) =>{
  res.status(200).json({
    _id:req.user._id,
    isAuth: true,
    email:req.user.email,
    name: req.user.name,
    lastname:req.user.lastname,
    role: req.user.role
  })
})


app.post("/api/users/register",  (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userData: doc
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });
    //comparePassword

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "wrong password" });
      }
    });

    //generateToken
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({
          loginSuccess: true
        });
    });
  });
});

app.get("/api/users/logout", auth, (req,res) =>{
  User.findOneAndUpdate({_id: req.user._id}, { token: ""}, (err, doc)=>{
      if(err) return res.json({ success: false, err })
      return res.status(200).send({
        success: true
      })
  })
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
