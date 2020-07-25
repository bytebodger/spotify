import { allow } from './allow';
import { is } from '../objects/is';
import { temp } from '../objects/temp';

/*
   a wrapper for localStorage() that will store every key value in a serialized JSON string
   this allows localStorage to hold string, booleans, numbers, nulls, objects, and arrays
   if localStorage() is not available, it will use a standard object for storage
 */
class Local {
   constructor(tempObject = {}) {
      allow.anObject(tempObject);
      this.temp = tempObject;
   }

   clear = () => {
      if (this.localStorageIsSupported())
         localStorage.clear();
      this.temp = {};
   };
   
   getItem = (itemName = '', defaultValue = '__noDefaultValueSupplied__') => {
      allow.aString(itemName, is.not.empty);
      if (this.localStorageIsSupported()) {
         const valueObject = JSON.parse(localStorage.getItem(itemName));
         if (valueObject === null && defaultValue !== '__noDefaultValueSupplied__') {
            this.setItem(itemName, defaultValue);
            return defaultValue;
         }
         if (valueObject.hasOwnProperty('value')) {
            if (valueObject.value === null && defaultValue !== '__noDefaultValueSupplied__') {
               this.setItem(itemName, defaultValue);
               return defaultValue;
            }
         }
         return valueObject.value;
      } else {
         if (this.temp.hasOwnProperty(itemName))
            return this.temp[itemName];
         else if (defaultValue !== '__noDefaultValueSupplied__') {
            this.temp[itemName] = defaultValue;
            return defaultValue;
         }
         return null;
      }
   };
   
   localStorageIsSupported = () => {
      try {
         const testKey = '__some_random_key_you_are_not_going_to_use__';
         localStorage.setItem(testKey, testKey);
         localStorage.removeItem(testKey);
         return true;
      } catch (error) {
         return false;
      }
   };
   
   removeItem = (itemName = '') => {
      allow.aString(itemName, is.not.empty);
      if (this.localStorageIsSupported())
         localStorage.removeItem(itemName);
      else if (this.temp.hasOwnProperty(itemName))
         delete this.temp[itemName];
      return true;
   };
   
   setItem = (itemName, itemValue = null) => {
      allow.aString(itemName, is.not.empty);
      if (this.localStorageIsSupported()) {
         const valueToBeSerialized = {value : itemValue};
         const serializedValue = JSON.stringify(valueToBeSerialized);
         localStorage.setItem(itemName, serializedValue);
      } else {
         this.temp[itemName] = itemValue;
      }
      return itemValue;
   };
}

export const local = new Local(temp);