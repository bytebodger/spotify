import { getEnvironment } from './get.environment';

export const getRedirectUri = () => {
   const environment = getEnvironment();
   switch (environment) {
      case 'localhost':
         return 'http://localhost:3000';
      case 'production':
         return 'https://www.spotifytoolz.com';
      default:
         return 'http://localhost:3000';
   }
}