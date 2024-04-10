const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://sameransari45:prof-sam@cluster0.bk5rr4a.mongodb.net/newsave?authSource=admin&readPreference=primary&appName=MongoDB%2520Compass&tls=true")

const User = mongoose.model('User', {
  name: String,
  email: String,
  username: String,
  password: String,
  });

const user = new User({
  name: "Samer",
  email: "tugrp@example.com",
  username: "sameransari45",
  password: "123456",
});

user.save()
