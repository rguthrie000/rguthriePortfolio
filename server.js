// Requiring necessary npm packages
const express = require('express');
const fc = require('./assets/fortuneCookie/fortuneCookie.js');
require("dotenv").config();

//***************
//*   Startup   *
//***************

// Get ready to serve freshly-baked fortune cookies!
let noCookies = fc.fortuneCookieInit();
if (noCookies) {
  console.log('cookies busted');
}

// Port assignments; use environment variable for web server if it exists.
let PORT = process.env.PORT ? process.env.PORT : 8080;

// Configure express
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// Register route handlers
require('./routes/routes.js')(app);

// Install mail port -- REMOVED
// let mailPORT = 4000;
// app.listen(mailPORT, (err) => {
//     console.log(`Mail server: ${mailPORT}`);
//     if (err) {console.log(`Mail Server installation failed.`);}
// });

// Install web port
app.listen(PORT, (err) => {
  console.log(`Server: ${PORT}`);
  if (err) {console.log(`Web Server installation failed.`);}
});

exports.noCookies = noCookies;