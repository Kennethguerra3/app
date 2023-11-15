"use strict";

const express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default;
const formProcessor = require('./formProcessor'); // Asegúrate de que esta ruta sea correcta

const app = express().use(body_parser.json());
const token = process.env.WHATSAPP_TOKEN;
let lastMessageTime = 0; // Variable para almacenar la hora del último mensaje enviado

app.listen(process.env.PORT || 3001, () => console.log("webhook is listening"));

app.post("/webhook", (req, res) => {
  let body = req.body;

  // Llamar al procesador de formularios para manejar los datos del formulario
  formProcessor.processFormData(body);

  // Lógica para enviar mensajes de plantilla cada 4 horas
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from;

      let currentTime = new Date().getTime();
      if (currentTime - lastMessageTime >= 4 * 60 * 60 * 1000) {
        lastMessageTime = currentTime;

        axios({
          method: "POST",
          url: "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" + token,
          data: {
            "messaging_product": "whatsapp",
            "to": from,
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
          },
          headers: { "Content-Type": "application/json" },
        }).then(response => {
          console.log('Mensaje de plantilla enviado con éxito');
        }).catch(error => {
          console.error('Error al enviar el mensaje de plantilla:', error);
        });
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// ... el resto del código para GET /webhook ...
