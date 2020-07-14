export const getEnvironment = () => {
   const url = window.location.href;
   if (url.includes('//localhost'))
      return 'localhost';
   if (url.includes('writing.voyage'))
      return 'production';
   return 'unknown';
}