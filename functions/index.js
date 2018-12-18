const functions = require('firebase-functions');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function sendOwnTestMail() {
  const msg = {
    to: 'oestjacobsen93@gmail.com',
    from: 'redbird.world.solution@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sendgrid.send(msg);
}

const testMsg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

function sendTestMail() {
  console.log("mail send: " + testMsg.html);
  sendgrid.send(testMsg);
}


exports.httpEmail = functions.https.onRequest((req, res) => {
  if(req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin');
    res.set('Access-Control-Max-Age', '3600');
    console.log("OPTIONS");
    console.log(req);
    res.status(204).send('');
  } else {
    console.log("OTHER");
    console.log(req.body);
    console.log(req.body.name)
    var namesh = req.body.name;
    res.set('Access-Control-Allow-Origin', '*');
    sendTestMail();
    res.send({'name': req.body.name});
  }
});

// return Promise.resolve()
  //   .then(() => {
  //     if (req.method !== 'POST') {
  //       const error = new Error('Only POST requests are accepted');
  //       error.code = 405;
  //       throw error;
  //     }

  //     const request = client.emptyRequest({
  //       method: 'POST',
  //       path: '/v3/mail/send',
  //       body: parseBody(req.body)
  //     });
  //     return client.API(request)
  //   })
  //   .then((response) => {
  //     if (response.body) {
  //       res.send(response.body);
  //     } else {
  //       res.end();
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     return Promise.reject(err);
  //   })