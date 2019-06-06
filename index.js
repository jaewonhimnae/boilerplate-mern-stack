const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key')

const { User } = require('./models/user');

mongoose.connect(config.mongoURI,
     {useNewUrlParser: true }).then(() =>console.log('DB connected'))
                              .catch(err => console.error(err));


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.json({"hello ~": "Hi ~~ sadlaskdaskd"})
})


app.post('/api/users/register', (req, res) => {
        const user = new User(req.body);

        user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            userData: doc
        })
    })
})



app.listen(5000);