const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// ****** Middleware ******** functions that alter incoming requests before they get to the corresponding route handlers.
// To make use of cookies available in Express.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // expiration on 30 days
    keys: [keys.cookieKey] // key to encrypt/decrypt the cookie, so cookie cannot be intercepted
  })
);

app.use(passport.initialize());
app.use(passport.session());
// ****** Middleware ********

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
