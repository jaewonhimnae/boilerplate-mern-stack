const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://JohnAhn:abc1234@react-blog-dc5kl.mongodb.net/test?retryWrites=true&w=majority',
     {useNewUrlParser: true }).then(() =>console.log('DB connected'))
                              .catch(err => console.error(err));


app.get('/', (req,res)=>{
    res.send('hello world')
});




app.listen(5000);