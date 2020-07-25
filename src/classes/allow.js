import React from 'react';

class Allow {
   throwOnFailure = true;
   
   aBoolean = (value = false) => {
      if (typeof value !== 'boolean')
         this.fail(value, 'is not a Boolean');
      return this;
   };
   
   aFunction = (value = () => {}) => {
      if (typeof value !== 'function')
         this.fail(value, 'is not a function');
      return this;
   };
   
   anArray = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.aNonNegativeInteger(minLength).aNonNegativeInteger(maxLength);
      if (!Array.isArray(value))
         this.fail(value, 'is not an array');
      this.checkLength(value, minLength, maxLength);
      return this;
   };
   
   anArrayOfArrays = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).aNonNegativeInteger(minLength).aNonNegativeInteger(maxLength);
      value.forEach(item => this.anArray(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anArrayOfObjects = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).aNonNegativeInteger(minLength).aNonNegativeInteger(maxLength);
      value.forEach(item => this.anObject(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anArrayOfStrings = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).aNonNegativeInteger(minLength).aNonNegativeInteger(maxLength);
      value.forEach(item => this.aString(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anInteger = (value = 0) => {
      if (!Number.isInteger(value))
         this.fail(value, 'is not an integer');
      return this;
   };
   
   anObject = (value = {}) => {
      if ((typeof value !== 'object' || Array.isArray(value) || value === null))
         this.fail(value, 'is not an object');
      return this;
   };
   
   anObjectLike = (object = {}, template = {}) => {
      this.aPopulatedObject(object).aPopulatedObject(template);
      
   }
   
   aNonNegativeInteger = (value = -1) => {
      this.anInteger(value);
      if (value < 0)
         this.fail(value, 'is not a non-negative integer');
      return this;
   };
   
   aNumber = (value = 0) => {
      if (typeof value !== 'number')
         this.fail(value, 'is not a number');
      return this;
   };

   aPopulatedObject = (value = {}) => {
      this.anObject(value);
      if (Object.keys(value).length === 0)
         this.fail(value, 'is not a populated object');
      return this;
   };
   
   aPopulatedString = (value = '') => {
      if ((typeof value !== 'string' || value.trim() === ''))
         this.fail(value, 'is not a populated string');
      return this;
   };
   
   aPositiveInteger = (value = 0) => {
      if ((!this.anInteger(value) || value <= 0))
         this.fail(value, 'is not a positive integer');
      return this;
   };
   
   aReactElement = (value = <></>) => {
      if (!React.isValidElement(value))
         this.fail(value, 'is not a React element');
      return this;
   }
   
   aString = (value = '') => {
      if (typeof value !== 'string')
         this.fail(value, 'is not a string');
      return this;
   };
   
   checkLength = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.aNonNegativeInteger(minLength).aNonNegativeInteger(maxLength);
      if (value.length < minLength)
         this.fail(value, 'is too short');
      if (value.length > maxLength)
         this.fail(value, 'is too long');
   }
   
   fail = (value, message = '') => {
      this.aPopulatedString(message);
      if (!this.throwOnFailure)
         return;
      console.error(value);
      throw new Error(message);
   }
   
   oneOf = (value, allowedValues = {}) => {
      this.aPopulatedObject(allowedValues);
      const entries = Object.entries(allowedValues);
      if (!entries.some(entry => entry[1] === value))
         this.fail(value, 'is not an allowed value');
      return this;
   }
}

export const allow = new Allow();