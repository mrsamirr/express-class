const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
require('dotenv').config();
const { Admin, User, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exists
     await Admin.create({
        username,
        password,
    })
    res.json({
         message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.find({
        username,
        password
    })
    
    // check if a user with this username already exists
    if(admin) {
        const token = jwt.sign({
            username
        }, process.env.JWT_SECRET);

        res.json({
             token
        })
    } else { 
         res.status(411).json({
            message: "Incorrect username and password"
         })
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse)
     
    res.json( { 
    message: 'Course created successfully',
    courseId: newCourse._id
 })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;