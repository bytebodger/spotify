import React from 'react';

class Allow {
   throwOnError = true;
   
   aBoolean = (value = false) => {
      if (typeof value !== 'boolean' && this.throwOnError) {
         console.error(value);
         throw new Error('is not a Boolean');
      }
      return this;
   };
   
   aFunction = (value = () => {}) => {
      if (typeof value !== 'function' && this.throwOnError) {
         console.error(value);
         throw new Error('is not a function');
      }
      return this;
   };
   
   anArray = (value = []) => {
      if (!Array.isArray(value) && this.throwOnError) {
         console.error(value);
         throw new Error('is not an array');
      }
      return this;
   };
   
   anArrayOfArrays = (value = []) => {
      this.anArray(value);
      value.forEach(item => this.anArray(item));
      return this;
   }
   
   anArrayOfObjects = (value = []) => {
      this.anArray(value);
      value.forEach(item => this.anObject(item));
      return this;
   }
   
   anArrayOfStrings = (value = []) => {
      this.anArray(value);
      value.forEach(item => this.aString(item));
      return this;
   }
   
   anInteger = (value = 0) => {
      if (!Number.isInteger(value) && this.throwOnError) {
         console.error(value);
         throw new Error('is not an integer');
      }
      return this;
   };
   
   anObject = (value = {}) => {
      if ((typeof value !== 'object' || Array.isArray(value) || value === null) && this.throwOnError) {
         console.error(value);
         throw new Error('is not an object');
      }
      return this;
   };
   
   aNonNegativeInteger = (value = -1) => {
      this.anInteger(value);
      if (value < 0 && this.throwOnError) {
         console.error(value);
         throw new Error('is not a non-negative integer');
      }
      return this;
   };
   
   aNumber = (value = 0) => {
      if (typeof value !== 'number' && this.throwOnError) {
         console.error(value);
         throw new Error('is not a number');
      }
      return this;
   };
   
   aPopulatedArray = (value = []) => {
      if ((!Array.isArray(value) || value.length === 0) && this.throwOnError) {
         console.error(value);
         throw new Error('is not a populated array');
      }
      return this;
   };
   
   aPopulatedArrayOfArrays = (value = []) => {
      this.anArray(value);
      value.forEach(item => this.anArray(item));
      if (value.length === 0) {
         console.error(value);
         throw new Error('is not a populated array of arrays');
      }
      return this;
   }
   
   aPopulatedArrayOfObjects = (value = []) => {
      this.anArray(value);
      value.forEach(item => this.anObject(item));
      if (value.length === 0) {
         console.error(value);
         throw new Error('is not a populated array of objects');
      }
      return this;
   }
   
   aPopulatedArrayOfStrings = (value = []) => {
      this.anArray(value);
      value.forEach(item => this.aString(item));
      if (value.length === 0) {
         console.error(value);
         throw new Error('is not a populated array of strings');
      }
      return this;
   }
   
   aPopulatedObject = (value = {}) => {
      this.anObject(value);
      if (Object.keys(value).length === 0 && this.throwOnError) {
         console.error(value);
         throw new Error('is not a populated object');
      }
      return this;
   };
   
   aPopulatedString = (value = '') => {
      if ((typeof value !== 'string' || value.trim() === '') && this.throwOnError) {
         console.error(value);
         throw new Error('is not a populated string');
      }
      return this;
   };
   
   aPositiveInteger = (value = 0) => {
      if ((!this.anInteger(value) || value <= 0) && this.throwOnError) {
         console.error(value);
         throw new Error('is not a positive integer');
      }
      return this;
   };
   
   aReactElement = (value = <></>) => {
      if (!React.isValidElement(value)) {
         console.error(value);
         throw new Error('is not a React element');
      }
      return this;
   }
   
   aString = (value = '') => {
      if (typeof value !== 'string' && this.throwOnError) {
         console.error(value);
         throw new Error('is not a string');
      }
      return this;
   };
   
   oneOf = (value, allowedValues = {}) => {
      this.aPopulatedObject(allowedValues);
      const entries = Object.entries(allowedValues);
      if (!entries.some(entry => entry[1] === value)) {
         console.error(value);
         throw new Error('is not an allowed value');
      }
      return this;
   }
}

export const allow = new Allow();