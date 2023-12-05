import PassportGoogleOAuth2 from "passport-google-oauth2";
import passport from "passport";
import { connectDb } from "./database.js";

import mongoose from "mongoose";

var GoogleStrategy= PassportGoogleOAuth2.Strategy

// Define the user schema
const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  username: String,
  email: {
    type: String,
    unique: true,
  }
});

// Define the User model using the userSchema
const User = mongoose.model('User', userSchema);



// const findOrCreate= async (profile) => {
//     try {
//       // Try to find the user in the database based on the profile ID
//       let user = await User.findOne({ googleId: profile.id });
  
//       // If the user doesn't exist, create a new user
//       if (!user) {
//         user = await User.create({
//           googleId: profile.id,
//           // Add other fields based on the profile or default values
//           // For example: username, email, etc.
//         });
//       }
  
//       // Return the found or created user
//       return user;
//     } catch (error) {
//       console.error("Error finding or creating user:", error);
//       throw error;
//     }
//   };



// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;




passport.use(new GoogleStrategy({
    clientID: '681825743835-su3jcf8tau3popj4686k2uns2dja6afg.apps.googleusercontent.com'    ,
    clientSecret: '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',
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    // Assuming User is the model or collection for your users in the database
    // const user = await User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //         done(err, user);
    //         });
    done(null, profile);
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
  



// function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }