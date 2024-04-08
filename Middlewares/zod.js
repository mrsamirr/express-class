// const zod = require('zod');

// function validateInput(object) {
//     const schema = zod.object({
//         email: zod.string(),
//         password: zod.string().min(8)
//      })
//     const response = schema.safeParse(object)
//     console.log(response)
// }

// // {
// //     email => string => should look like email
// //     password => should have 8 character
// // }
//    validateInput({
//     email: "hitesh@example.com",
//     password: "12345678"
//    })


const z = require('zod')
const schema = z.string().email();

const response = schema.safeParse("sam@gmail.com")
console.log(response)