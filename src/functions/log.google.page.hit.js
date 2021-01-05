import { allow } from '../classes/allow';
import { is } from '../objects/is';
import { getEnvironment } from './get.environment';

export const logGooglePageHit = (page = '') => {
   allow.aString(page, is.not.empty);
   if (getEnvironment() === 'localhost')
      return;
   // eslint-disable-next-line no-undef
   gtag('config', 'G-LMTP2XDE5V', {'page_title': page});
}