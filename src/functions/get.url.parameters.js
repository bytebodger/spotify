export const getUrlParameters = () => {
   const urlParams = new URLSearchParams(window.location.search);
   let processedUrlParams = {};
   for (let entry of urlParams.entries()) {
      let [key, value] = entry;
      if (value.toLowerCase() === 'true')
         value = true;
      else if (value.toLowerCase() === 'false')
         value = false;
      else if (value.toLowerCase() === 'null')
         value = null;
      else if (!isNaN(parseFloat(value)))
         value = parseFloat(value);
      processedUrlParams[key] = value;
   }
   return processedUrlParams;
};