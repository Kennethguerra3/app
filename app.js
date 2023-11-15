const request = require('request');

app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check if this is the first incoming message
  if (/* condición para verificar si es el primer mensaje */) {
    // Preparar la plantilla de respuesta
    let messageData = {
      "messaging_product": "whatsapp",
      "to": /* número del remitente del mensaje entrante */,
      "type": "template",
      "template": {
        "name": "warbush_support_2023",
        "language": {
          "code": "en_US"
        },
        "components": [
          {
            "type": "button",
            "sub_type": "flow",
            "index": "0",
            "parameters": [
              {
                "type": "action",
                "action": {
                  "flow_token": "EAAKTv1O8JSoBO8rk8g0uWf3E5xX9pIiRjucZCWJfdB89ynVgQOkrBoN72zoT0BnncfzQfuk64r0Lk1nSwnwErikDcZBCFCtvMMVQYvU8F97qWbypqDNBsVU2OQEKYZA7NZCETowkm6T5scTFzKPl1PdHcxVzXiXr7JE14D0moZAFaGQ4QLZBrTc5eU1LlHZCtd9",
                  "flow_action_data": {
                    "<CUSTOM_KEY>": "1445457552683984"
                  }
                }
              }
            ]
          }
        ]
      }
    };

    // Enviar la respuesta usando Request
    request({
      url: 'https://graph.facebook.com/v18.0/147014531836606/messages',
      method: 'POST',
      headers: {
        'Authorization': `EAAKTv1O8JSoBO8rk8g0uWf3E5xX9pIiRjucZCWJfdB89ynVgQOkrBoN72zoT0BnncfzQfuk64r0Lk1nSwnwErikDcZBCFCtvMMVQYvU8F97qWbypqDNBsVU2OQEKYZA7NZCETowkm6T5scTFzKPl1PdHcxVzXiXr7JE14D0moZAFaGQ4QLZBrTc5eU1LlHZCtd9`,
        'Content-Type': 'application/json'
      },
      json: messageData
    }, (error, response, body) => {
      if (error) {
        console.error('Error al enviar mensaje:', error);
      } else {
        console.log('Mensaje enviado con éxito', body);
      }
    });
  }

  // Resto del código para manejar otros tipos de mensajes entrantes
});
