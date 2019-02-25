const client = require('@sendgrid/client');

function addSendgridRecipient(client, email, type) {
  return new Promise((resolve, reject) => {
    const data = [
      {
        email: email,
        type: type
      }
    ];
    const request = {
      method: "POST",
      url: "/v3/contactdb/recipients",
      body: data
    };
    client
      .request(request)
      .then(([response, body]) => {
        console.log(response.statusCode);
        console.log(body);
        resolve(response);
      })
      .catch(err => reject(err));
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const { SENDGRID_API_KEY } = process.env;
  const body = JSON.parse(event.body);

  addSendgridRecipient(client, body.email, body.type)
    .then(response => {
      return {
        statusCode: 200,
        body: SENDGRID_API_KEY
      };
    })
    .catch(err => {
      return {
        statusCode: 422,
        body: `Oops! Something went wrong. ${error}`
      }
    });
};


