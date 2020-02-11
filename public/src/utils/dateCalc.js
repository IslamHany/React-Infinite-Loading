const dateCalc = (date) => {
  const prodDate = new Date(date);
  const now = new Date().getTime();
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerWeek = msPerDay * 7;
  var elapsed = now - prodDate.getTime();
  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' seconds ago';   
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';   
  } else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour ) + ' hours ago';   
  } else if (elapsed < msPerWeek) {
    return Math.round(elapsed/msPerDay) + ' days ago';   
  } else {
    return `${prodDate.getMonth() + 1} / ${prodDate.getDate()} / ${prodDate.getFullYear()}`;
  }
};
export default dateCalc;