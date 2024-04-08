const express = require("express")
const zod = require("zod")

const app = express();

const schema = zod.array(zod.number());
// 
// {
//     email: string => email
//     password: atleast 8 letters
//    country: "IN", "US"
// }

const schema2 = zod.object({
    email: zod.string(),
    password: zod.string(),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys: zod.array(zod.number())
})

app.post("/health-checkup", function(req, res){

    const kidneys = req.body.kidneys;
    const response  = schema.safeParse(kidneys);
    if(!response.success) {
        res.status(411).json({
            msg: "input is Invalid"
        })
    } else {
        res.send({
            response 
        })
    }
});


app.listen(3000);