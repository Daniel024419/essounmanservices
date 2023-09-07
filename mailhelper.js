const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config()
var EMAIL_USERNAME=process.env.EMAIL_USERNAME;
var PASSWORD=process.env.PASSWORD;
var CLIENT_ID=process.env.CLIENT_ID;
var CLIENT_SECRET=process.env.CLIENT_SECRET;
var REFRESH_TOKEN=process.env.REFRESH_TOKEN;
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

//PROTON
var PROTON_USERNAME=process.env.PROTON_USERNAME;
var PROTON_PASSWORD=process.env.PROTON_PASSWORD;

var EMAIL_USERNAME_MAIL_TRAP=process.env.EMAIL_USERNAME_MAIL_TRAP;
var PASSWORD_MAIL_TRAP=process.env.PASSWORD_MAIL_TRAP;

//google mail auth 2 API

// Function to send an email
//async function sendEmailWithRefreshedToken() {

  const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

    const accessToken = oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_USERNAME,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });


   // Example email sending
//   const mailConfigurations = {
//   from: EMAIL_USERNAME,
//   to: 'daniel.mensah@amalitech.org',
//   subject: 'Hello, World!',
//   text: 'This is a test email sent from Nodemailer with Gmail OAuth2 authentication.',
// };
//     transporter.sendMail(mailConfigurations, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });

//}

//initializing
//sendEmailWithRefreshedToken();



  //token expires in 10mins
const token = jwt.sign({
		data: 'Token Data'}, 'ourSecretKey', { expiresIn: '10m' }
);	



//exports

module.exports={
transporter:transporter,
token:token

}