//date object
const dates = new Date();
const day = dates.getDate();
const month = dates.getMonth();
const year = dates.getFullYear();
const hour = dates.getHours();
const minutes = dates.getMinutes();
const secs = dates.getSeconds();
const MilSecs = dates.getMilliseconds();
const FulTime = hour + ":" + minutes + ":" + secs;
const FullYear = day + "/" + month + "/" + year;

module.exports={
FulTime:FulTime,FullYear:FullYear
}