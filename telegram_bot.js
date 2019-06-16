const TelegramBot = require("node-telegram-bot-api");
const firebase = require("firebase-admin");
const serviceAccount = require("./jsbot-2dc5b-firebase-adminsdk-qvnnp-7ebff85b34.json");

const { parseData } = require("./parser");

const token = "840467481:AAEJhI2lqfDQ4nRHZU__6unbYSVb6M_7Snw";
const bot = new TelegramBot(token, { polling: true });

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://jsbot-2dc5b.firebaseio.com"
});
const db = firebase.firestore();

function storeData(method, data) {
  db.collection("telegram_data").add({
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
