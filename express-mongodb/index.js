const mongoose = require('mongoose');
const express = require('express');	

const app = express();
mongoose.connect("mongodb+srv://sameransari45:prof-sam@cluster0.bk5rr4a.mongodb.net/appusenew?authSource=admin&readPreference=primary&appName=MongoDB%2520Compass&tls=true")

const User = mongoose.model('Users', {name: String, email: String, password: String });

app.use(express.json());


app.post("/signup", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existUser = await User.findOne({email: username });
    // CRUD => Create, Read, Update, Delete
    if(existUser) {
        return res.status(400).send("Username Already exists")
    }

    const user = new User({
        name: name,
        email: username,
        password: password
    });

    user.save();
    res.json({
        "msg" : "User created successfully"
    })

})

app.listen(3000, function() {
    console.log("Server is running")
});