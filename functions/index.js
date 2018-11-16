const functions = require('firebase-functions');

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

function parseBody(body) {
  var fromEmail = new sendgrid.Email(bode.from);
  var toEmail = new sendgrid.Email(body.to);
  var subject = body.subject;
  var content = new sendgrid.Content('text/html', body.content);
  var mail = new sendgrid.Mail(fromEmail, subject, toEmail, content);
  return mail.toJSON();
}

exports.httpEmail = functions.https.onRequest((req, res) => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }
      const request = client.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: parseBody(req.body)
      });
      return client.API(request)
    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end();
      }
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    })
})