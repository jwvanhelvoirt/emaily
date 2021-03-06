const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // pull the user schema out of mongoose.

// for sending serialized user object as cookie to the client.
// this is applicable for all oAuth services (f.i. Twitter, Facebook, Google etc..).
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// for receiving the cookie from the client and deserialize it to a user object.
// this is applicable for all oAuth services (f.i. Twitter, Facebook, Google etc..).
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      // new User({ googleId: profile.id }).save();
      const newUser = await User.create({ googleId: profile.id });
      done(null, user);
    }
  )
);
