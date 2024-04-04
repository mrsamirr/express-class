const express = require("express")
const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/",function(req,res){
        // write logic
        const johnKidneys = users[0].kidneys;
        // console.log(johnKidneys)
        const numberOfKidneys = johnKidneys.length;
        let numberOfHealthyKidneys = 0;
        for(let i=0;i<johnKidneys.length;i++){
            if(johnKidneys[i].healthy){
                numberOfHealthyKidneys++;
            }
        }
        const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
        res.json({
            numberOfKidneys,
            numberOfHealthyKidneys,
            numberOfUnhealthyKidneys
        })
})

app.post("/",function(req,res){
        // write logic
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        message: "Done!"
    })
    
})

app.put("/",function(req,res){
        // write logic
        if(isThereAtleastOneUnhealthyKidney()){
            for(let i=0;i<users[0].kidneys.length;i++){
                users[0].kidneys[i].healthy = true;
            }
            res.json({
                message: "All Unhealthy Kidneys Replaced"
            })  
        } else{
            res.status(411).json({
                message: "You have no Unhealthy kidneys"
            })
        } 
})
// removing all the unhealthy kidneys

// -- what should happen if they try to delete when there are no kidneys?
// -- what should happen if they try to make a kidney healthy when all are already healthy?
app.delete("/",function(req,res){
        // you should return a 411 
        //  only if atleast one unhealthy kidney is there do this, else return 411
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys = [];
        for(let i=0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){ // if its true then insert into new kidney
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            message: "All Unhealthy Kidneys Removed"
        })
    } else{
        res.status(411).json({
            message: "You have no Unhealthy kidneys"
        })
    }
   
})

 function isThereAtleastOneUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<users[0].kidneys.length;i++){
    if(!users[0].kidneys[i].healthy){ // if its true then insert into new kidney
        atleastOneUnhealthyKidney = true
    }
}
    return atleastOneUnhealthyKidney
}
 
app.listen(3000); 
