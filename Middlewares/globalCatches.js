const express = require("express")

const app = express();

app.use(express.json());

app.post("/health-checkup", function(req, res){
    // kidneys = [1, 2]
    // const kidneys = req.body.kidneys;
    
    // if(!kidneys){
    //     res.json({
    //         msg: "wrong input"
    //     })
    // } else{
    //     const kidneyLength  = kidneys.length;
    //     res.send("Your Kindey length is "+ kidneyLength);
    // }
    const kidneys = req.body.kidneys;

    res.send("Your Kindey length is "+ kidneyLength);
    

});

// global catches

app.use(function(err, req, res, next){
    res.json({
        msg: "Sorry something is up with our server"
    })
})

app.listen(3005);