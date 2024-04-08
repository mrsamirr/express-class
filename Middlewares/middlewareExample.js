const express = require("express")

const app = express();
let nuberOfRequests = 0;

function calculateRequests(req, res, next){
    nuberOfRequests++;
    console.log(nuberOfRequests);
    next();
}

app.use(calculateRequests);
app.use(express.json())

app.post("/health-checkup", function (req, res) {
   res.json({
    msg: "hi there"
   })
});

app.get("/kidney-checkup", function (req, res) {
    
});

app.listen(3001);

// checking git commit signature