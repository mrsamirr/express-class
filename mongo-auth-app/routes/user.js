const { Router } = require("express");
const router = Router();
require('dotenv').config();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })

    res.json({
        message: 'User created successfully'
   })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    
    // check if a user with this username already exists
    if(user) {
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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({ published: true })
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
   const  username = req.username;
   const courseId = req.params.courseId;
   console.log(username)
   await User.updateOne({
    username
   }, {
    $push: {
       purchasedCourses: courseId
    }
   })
   res.json({ 
    message: 'Course purchased successfully',
    courseId: "courseId"
 })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.username
    })
    const courses = await Course.find({
        _id: {
            $in : user.purchasedCourses
        }
    })

    res.json({
        courses: courses
    })


});

module.exports = router