const functions = require('firebase-functions');

var api_key = '23c4a038cd5e016b50cf9ed1bd77f9c9-9525e19d-da325061';
var domain = 'www.jyskserviceudlejning.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <oestjacobsen93@gmail.com>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
