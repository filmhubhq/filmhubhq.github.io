import client from '@sendgrid/client'
import { parse } from 'querystring'

function addSendgridRecipient (client, email, type) {
  return new Promise((resolve, reject) => {
    const data = [
      {
        email: email,
        type: type
      }
    ]
    const request = {
      method: 'POST',
      url: '/v3/contactdb/recipients',
      body: data
    }
    console.log('addSendgridRecipient request', request)
    client.request(request)
      .then(([response, body]) => resolve(response))
      .catch(err => reject(err))
  })
}

// netlify-lambda has touble with async handler, keeping callback for now
exports.handler = function (event, context, done) {
  try {
    if (event.httpMethod !== 'POST') {
      done({ statusCode: 405, body: 'Method Not Allowed' })
      return
    };
    if (!process.env.SENDGRID_API_KEY) {
      done({ statusCode: 401, body: 'API key missing' })
      return
    };

    const body = parse(event.body)
    client.setApiKey(process.env.SENDGRID_API_KEY)
    addSendgridRecipient(client, body.email, body.type)
      .then( response => done( null, { statusCode: 200, body: JSON.stringify(response) }) )
      .catch(err => {
        console.log('handler .catch', err)
        done(null, { statusCode: 422, body: JSON.stringify(err) })
      });
  } catch(err) {
    console.log('handler catch block', err)
    done(null, { statusCode: 422, body: JSON.stringify(err) })
  }
}
