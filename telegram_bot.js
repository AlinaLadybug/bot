const TelegramBot = require("node-telegram-bot-api");
const firebase = require("firebase-admin");
const serviceAccount = {
  type: "service_account",
  project_id: "jsbot-2dc5b",
  private_key_id: "7ebff85b342923a3adf575da297ec4360058bb25",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC02qwgKVH5mtKT\nxqwjJq/YoegrnbDiwNpngjE10wbEU6rKjO/+fypAlG/pGKMvT8LNiEUCOHGTaw1G\ngTOVANkyyWJVl8NAl2s1MiT5xmlBcjosQeioUaTkdoTWVLQRXCRPD7LXOvRzyh1/\nxILrmVCPxr5NhxbNp7DLAkGFSnpZc9j2aq7XdYfxHdGag1ZhVmjRM04HOHzAD2F6\nOO4UatD+14YCD1ZAlOQrK/EMnrtq7e2uevaTxE1zlVXO7jTiY9srTErAz5NtBkLv\nyVok+0D7oK4C1Hwn7DzOG5F0ILefbDGfTNdHFLybWsW2U1Sw0NlvEJ11qy3nm2Ds\nPk3T3KIXAgMBAAECggEAGecZ8Q9J/OiGUYEKhYxUckAaOyj+PTPm9B1LBA0B8puT\nIiiWdQpsmExKTQXo1W1klsB2Nc+0wKr7/0WhCC3Tbfk2+tBeOEGXqspQTm/zAlsk\nZtNXycfLyKcK9pGyKqxaTPKQKFB605y2peaU476VMcqC1iLLitACO8lKbhdRN79o\nj/yqOJF91Qr+wnh2eiMBCougnn3xwuus3U78zPU1bDvj0413TAHWo6DaiyrMjMfV\nU/H8/kQvmT03xvJdQNkyhC+RNzdgT5INjEKgNNi+aGpeixIlpW3gH/mZAd7kb3OY\nF3MIOR9vorOa1LuDFSgND33ubKD+hgAW2JOx5OWkVQKBgQDqIkjyPWkN+z34WaZH\nbeEA4Cb+Eg6KbuEF/l6Qd0xzw74zGY87XPDg1M5IhXfNVel9vaD33Uh3MtYpM5mi\nkRBCnphRSFt0ATpoflCl+sOaYjCg+RWdZOkbDPUy0bwCrhkzeO8dbfwRIxMi4DZg\n372pUmgGQH4Arrzfc6Z7LFFP1QKBgQDFvpDshy76z9HA9670V+EMbMuyloYp/ESF\nz/C6C01YdajcctX3GAdhBZG0XStUJmFCOSvl6h7kvK5mmUfwSB+I91bI3Kci9FRo\nM2uSl6OM4Fqn/hFFLynfOb72uWoqr3VlkZZeIzv3ykiobowfgPhKZvN1OUGLq19n\nM9KR9bxMOwKBgHfb4VgRVAySR+Exk8wRVhRqq8t5VvRLWusEk0iFqh/BX0ctmIOd\nSrrudkPt/6yghI2YXCVHpOdQoQ4qmkX82UQhiHxj/F1gm5QOxh6SRzxrc9WUbhpL\nJIJymbvQXt1IXyJYkKCSQ25KdGtwOKZTI/bgdtxse5TB33LM87custmZAoGBAJET\n2RvPqmYVJpzemxtlhhUplOD3koMnM9bA0qqMNDjcSgFCtzxMAs3p2hZr7KgWaHC/\npTdPZ08GJyXa+26MW6aPYLqJOI5ql6rDXv70BegLijeKLX2Gtr+xjCtTqVKb3BOi\nlqGGVC7d2CTKxj8uzfs4QRIV6cLg/mOnH6w6j+WVAoGBAKeK2hL5qo+uenh5AGve\nu9W+SpLF8iwKHqd+gxNkS+UCbGfpMfRGznoRdiEGs+9ZS23GT5GG4m+ovACBI6gH\nMWDU01bU/0d/h3JOH+9rCWnn1G4wABIxAoFz+Biar4VocH89GE9BnlUvK3CL0+QM\nBeE3UYqOPmCdhrSDrJHg7pK+\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-qvnnp@jsbot-2dc5b.iam.gserviceaccount.com",
  client_id: "116004834149482552902",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qvnnp%40jsbot-2dc5b.iam.gserviceaccount.com"
};
const { parseData } = require("./parser");

const BOT_TOKEN = "840467481:AAEJhI2lqfDQ4nRHZU__6unbYSVb6M_7Snw";
const url = "https://bot.alinaladybug23.now.sh";

const options = {
  webHook: {
    port: 8080
  }
};

const bot = new TelegramBot(BOT_TOKEN);
bot.setWebHook(url);
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://jsbot-2dc5b.firebaseio.com"
});
const db = firebase.database();
const ref = db.ref("telegram_data");

function storeData(method, data) {
  // throw { method, data };
  return ref.push().set({
    method,
    data
  });
}

bot.onText(/get/, async msg => {
  let fromId = msg.from.id;
  let date = msg.date;

  console.log(date);

  parseData().then(parsedDays => {
    console.log(parsedDays);
    bot.sendMessage(fromId, parsedDays);
    storeData("get", parsedDays);
  });
});

module.exports = (req, res) => {
  // http
  //   .createServer((req, res) => {
  let data = "";

  req.on("data", chunk => {
    data += chunk;
  });

  req.on("end", async () => {
    const parsedUpdate = JSON.parse(data);
    const msg = parsedUpdate.message;
    let fromId = msg.from.id;

    parseData().then(parsedDays => {
      // bot.sendMessage(fromId, parsedDays);
      bot.sendMessage(fromId, "test");

      storeData("get", parsedDays);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end();
    });
  });
};
// .listen(options.webHook.port);
