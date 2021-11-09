/**
 *
 * MAPD712 Web Techs Fall2021 React Native App Project
 * Group 13
 *
 */
export const getLatestData = (inArray, searchField) => {
   var latestData;
   for (var i=0 ; i<inArray.length ; i++) {
       if (latestData == null || inArray[i][searchField] > latestData[searchField])
           latestData = inArray[i];
   }
   return latestData;
}

export const getISODate = (dt) => {
  var dtDay = "0" + (dt.getDate());
  var dtMonth = "0" + (dt.getMonth() + 1);    // January = 0

  // convert today's date to ISO format yyyy-mm-dd
  return dt.getFullYear() + "-" +
    dtMonth.substr(dtMonth.length - 2) + "-" +
    dtDay.substr(dtDay.length - 2);
}

export const getTime24hoursFormat = (dt) => {
  // convert hour, minute to 2 digits with leading zero
  var hh = "0" + dt.getHours();
  var mm = "0" + dt.getMinutes();
  return hh.substr(hh.length - 2) + ":" + mm.substr(mm.length - 2);
}
