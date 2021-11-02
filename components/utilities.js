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
