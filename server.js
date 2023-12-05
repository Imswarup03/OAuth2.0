import express from "express";
// import connectDb from "./database.js";
import passport from "passport";
import session from 'express-session'
import path from 'path'
import { connectDb } from "./database.js";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

import { fileURLToPath } from 'url';
import './auth.js'
// import { connect } from "http2";

const DATABASE_URI= process.env.DATABASE_URI

const app = express();
app.use(cors())


app.use(express.json());

// app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());



function isloggedIn(req,res,next){
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()){
        next()
    }else{
        res.status(401).send("Unauthorized")
        return false
    }
}



const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname,"Frontend")))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","index.html"))
})

app.get('/auth/protected', isloggedIn,(req, res) => {
    let name = req.user.displayName
    console.log("request=======",req)
    res.send(`Hello ${name}`)
})



app.get('/auth/google/failure', isloggedIn,(req, res) => {
    res.send('SomeThing Went Wrong!')
})


app.use('/auth/logout',(req,res) =>{
    req.session.destroy()
    res.send("See you Again")
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
    
));




app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));



// connectDb(DATABASE_URI)
// .then(()=>{
//     app.listen(8000,()=>{
//         console.log(`APP is listening on 8000`);
//     })
// })
// .catch((err) =>{
//     console.log("mongo db connection failed",err)
// })


app.listen(8000,()=>{
    console.log("Listening on port 8000")
})