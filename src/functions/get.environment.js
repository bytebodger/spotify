export const getEnvironment = () => {
   const url = window.location.href;
   if (url.includes('//localhost'))
      return 'localhost';
   if (url.includes('spotifytoolz.com') || url.includes('playlist.help'))
      return 'production';
   return 'unknown';
}