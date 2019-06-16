var jsdom = require("jsdom");
var TelegramBot = require("node-telegram-bot-api");
const firebase = require("firebase-admin");
const serviceAccount = require("./jsbot-2dc5b-firebase-adminsdk-qvnnp-7ebff85b34.json");
const { JSDOM } = jsdom;
const URL =
  "https://sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D0%B5%D0%B2";

var token = "840467481:AAEJhI2lqfDQ4nRHZU__6unbYSVb6M_7Snw";
var bot = new TelegramBot(token, { polling: true });
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://jsbot-2dc5b.firebaseio.com"
});
var db = firebase.firestore();

function storeData(method, data) {
  db.collection("telegram_data").add({
    method,
    data
  });
}

bot.onText(/get/, async function(msg) {
  let fromId = msg.from.id;
  let date = msg.date;
  console.log(date);
  parseData().then(parsedDays => {
    console.log(parsedDays);
    bot.sendMessage(fromId, parsedDays);
    storeData("get", parsedDays);
  });
});

let prettifyDays = days => {
  let pretefiedDays = [];

  for (const day of days) {
    pretefiedDays.push(
      `День: ${day.date}\nМин. температура: ${
        day.min_temp
      }\nМакс. температура: ${day.max_temp}.`
    );
  }
  return pretefiedDays.join("\n\n");
};

let parseData = async () => {
  const dom = await JSDOM.fromURL(URL, {
    includeNodeLocations: true,
    storageQuota: 10000000,
    resources: "usable"
  });

  let days = [];
  let document = dom.window.document;
  let daysCount = 7;

  const prefixId = "bd";

  for (let index = 0; index < daysCount; index++) {
    let idName = prefixId + (index + 1) + "";
    let dayTab = document.getElementById(idName);
    let dayLink = dayTab.querySelector(".day-link").innerHTML;
    let date = dayTab.querySelector(".date").innerHTML;
    let month = dayTab.querySelector(".month").innerHTML;
    let minTemp = dayTab.querySelector(".temperature .min span").innerHTML;
    let maxTemp = dayTab.querySelector(".temperature .max span").innerHTML;
    let day = {
      date: dayLink + " " + date + " " + month,
      min_temp: minTemp,
      max_temp: maxTemp
    };
    days.push(day);
    // console.log(day);
  }
  return prettifyDays(days);
  exports.parsedDays = prettifyDays(days);

  //   console.log(prettifyDays(days));
};
