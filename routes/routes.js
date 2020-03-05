// rguthrie Portfolio route handling - consolidated file
const nodeMailer = require("nodemailer");
const fc         = require("../assets/fortuneCookie/fortuneCookie.js");
const fcInit     = require('../server.js');
require("dotenv").config();

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendfile('./public/index.html');
  });

  app.get("/api/fcookie", function(req, res) {
    let cookieObj = {};
    if (fcInit.noCookies) {
      cookieObj = {
        fortuneCookiesCount:"don't know",
        fortuneCookieIndex : "nada",
        fortuneCookie: "Sorry, not available."
      }
    } else {
      cookieObj = fc.fortuneCookie();
    }
    res.json(cookieObj);
  });

  app.post('/api/send-email', (req, res) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // sender's account
            user: 'rguthrie404@gmail.com',
            pass: fc.monitorCal()
        }
    });
    let mailOptions = {
        // also sender's account, as purpose is to send in form data.
        to: 'rguthrie404@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).send({ error: 'Email failed!' })
        } else {
          res.end();
        }
    });
  });

}
