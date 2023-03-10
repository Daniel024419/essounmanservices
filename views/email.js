
const nodemailer = require('nodemailer');


const EMAIL_USERNAME=process.env.EMAIL;
const PASSWORD=process.env.EMAIL_PASSWORD;
const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRETE;
const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
const SERVICE=process.env.SERVICE;
const AUTH_TYPE=process.env.AUTH_TYPE

const transporter = nodemailer.createTransport({
service:SERVICE,
auth: {
	type: AUTH_TYPE,
	user:EMAIL_USERNAME,
	pass:PASSWORD,
	clientId:CLIENT_ID,
	clientSecret:CLIENT_SECRET,
	refreshToken:REFRESH_TOKEN
}
});


const mailConfigurations = {

	// It should be a string of sender email
	from:EMAIL_USERNAME,
	
	// Comma Separated list of mails
	to: '0720000312@ttu.edu.gh',

	// Subject of Email
	subject: 'Sending Email using Node.js',
	
	// This would be the text of email body
	text: 'Hi! There, You know I am using the'
	+ ' NodeJS Code along with NodeMailer '
	+ 'to send this email.'
};

transporter.sendMail(mailConfigurations, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});



// client secrete  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
// client id      428834127125-p0jbo1n4f7j6otob3qtap6q95m59f64o.apps.googleusercontent.com
// access token   ya29.a0AX9GBdUti_DqO2fGk_wejA1avzv9Ki32q2M70RsYVmTKchO9Fj0m-4yxFi7KdjGL-ObpXSGmhHwWPMSW12NmYqr4P4vyAmQjOVmg54tejd_tgWa06uGlKnap8D8OEsqEXuWx-O5IAdLBy42d_Kyb1gvEd33eaCgYKAQwSARMSFQHUCsbC92OrbaE5LnMWoRUe6W3lxg0163
// refresh token  1//04lgGjCkwCS8ZCgYIARAAGAQSNwF-L9IrKF0A7wB6-FVBb9xtC0142FwwNm30z7zbvWGNhGWWLPCymgN4LoFIfPUJtTZ-x0dgl98
// auoth token 4/0AWgavdfbWUNqnDFuXOZfDMhZ9Md1dSNwHCsDSHJgcQflqk4OUHGHnlO8VNv6SNwXSdtkYQ