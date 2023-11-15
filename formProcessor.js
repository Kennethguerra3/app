const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: '51.222.24.163:33061',
  user: 'root',
  password: '684712',
  database: 'Formulario_Flow'
});

db.connect((err) => {
  if (err) { throw err; }
  console.log('Conectado a la base de datos');
});

function processFormData(body) {
  if (body.object === "whatsapp_business_account" && body.entry) {
    body.entry.forEach(entry => {
      entry.changes.forEach(change => {
        if (change.field === "messages" && change.value.messages) {
          change.value.messages.forEach(message => {
            if (message.interactive && message.interactive.type === "nfm_reply") {
              let responseJson = message.interactive.nfm_reply.response_json;
              if (responseJson) {
                try {
                  let formData = JSON.parse(responseJson);
                  let firstName = formData.screen_0_firstName_0;
                  let lastName = formData.screen_0_lastName_1;
                  let businessName = formData.screen_0_TextInput_3;
                  let email = formData.screen_0_email_2;
                  let options = formData.screen_0_CheckboxGroup_4;

                  // Insertar estos datos en la base de datos
                  let query = "INSERT INTO tu_tabla (firstName, lastName, businessName, email, options) VALUES (?, ?, ?, ?, ?)";
                  db.query(query, [firstName, lastName, businessName, email, JSON.stringify(options)], (err, result) => {
                    if (err) {
                      console.error("Error al insertar en la base de datos", err);
                    } else {
                      console.log("Datos insertados en la base de datos", result);
                    }
                  });
                } catch (error) {
                  console.error("Error al parsear response_json", error);
                }
              }
            }
          });
        }
      });
    });
  }
}

module.exports = {
  processFormData
};
