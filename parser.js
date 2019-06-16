var jsdom = require("jsdom");
const { JSDOM } = jsdom;

const URL =
  "https://sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D0%B5%D0%B2";

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

  // Навіщо ось це ?
  exports.parsedDays = prettifyDays(days);

  //   console.log(prettifyDays(days));
};

module.exports = {
  parseData
};
