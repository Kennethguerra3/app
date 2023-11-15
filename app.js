app.post("/webhook", (req, res) => {
  let body = req.body;

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;

      // Datos del mensaje de la plantilla
      let messageData = {
        messaging_product: "whatsapp",
        to: "51999443948", // Número de teléfono fijo en el mensaje
        type: "template",
        template: {
          name: "warbush_support_2023",
          language: {
            code: "en_US"
          },
          components: [
            {
              type: "button",
              sub_type: "flow",
              index: "0",
              parameters: [
                {
                  type: "action",
                  action: {
                    flow_token: "EAAKTv1O8JSoBO8rk8g0uWf3E5xX9pIiRjucZCWJfdB89ynVgQOkrBoN72zoT0BnncfzQfuk64r0Lk1nSwnwErikDcZBCFCtvMMVQYvU8F97qWbypqDNBsVU2OQEKYZA7NZCETowkm6T5scTFzKPl1PdHcxVzXiXr7JE14D0moZAFaGQ4QLZBrTc5eU1LlHZCtd9",
                    flow_action_data: {
                      "<CUSTOM_KEY>": "1445457552683984"
                    }
                  }
                }
              ]
            }
          ]
        }
      };

      axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/147014531836606/messages?access_token=EAAKTv1O8JSoBO8rk8g0uWf3E5xX9pIiRjucZCWJfdB89ynVgQOkrBoN72zoT0BnncfzQfuk64r0Lk1nSwnwErikDcZBCFCtvMMVQYvU8F97qWbypqDNBsVU2OQEKYZA7NZCETowkm6T5scTFzKPl1PdHcxVzXiXr7JE14D0moZAFaGQ4QLZBrTc5eU1LlHZCtd9`,
        data: messageData,
        headers: { "Content-Type": "application/json" },
      }).then(response => {
        console.log('Template message sent successfully', response.data);
      }).catch(error => {
        console.error('Error sending template message', error.response.data);
      });
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
