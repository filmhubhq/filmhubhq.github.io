const client = require('@sendgrid/client')
const { parse } = require('querystring')

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
    client.request(request)
      .then(([response, _body]) => resolve(response))
      .catch(err => reject(err))
  })
}

const handler = async (event) => {
  const { httpMethod, body  } = event
  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  const { email, type } = parse(body)
  client.setApiKey(process.env.SENDGRID_API_KEY)
  return addSendgridRecipient(client, email, type)
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
    .catch((error) => {
      console.log('Error addSendgridRecipient', error)
      return {
        statusCode: 422,
        body: JSON.stringify(error)
      }
    })
}

module.exports = { handler }
