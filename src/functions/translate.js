import { allow } from '../classes/allow';
import { is } from '../objects/is';
import { translation } from '../objects/constants/translation';
import { use } from '../objects/use';

export const translate = (english = '', replacements = {}, translateTo = '') => {
   const replace = (text = '', replacements = {}) => {
      allow.aString(text, is.not.empty).anObject(replacements);
      Object.entries(replacements).forEach(entry => {
         const [target, replacement] = entry;
         text = text.replaceAll(`{{${target}}`, replacement.toString());
      });
      return text;
   }
   
   allow.aString(english, is.not.empty).anObject(replacements).aString(translateTo);
   const targetLanguage = translateTo || use.global.language;
   if (targetLanguage === 'English')
      return replace(english, replacements);
   const translatedText = translation[targetLanguage][english];
   if (!translatedText) {
      console.warn(`No translation available for [${english}]`);
      return replace(english, replacements);
   }
   return replace(translatedText, replacements);
}