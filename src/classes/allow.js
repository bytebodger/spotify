import React from 'react';
import { is } from '../objects/is';

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
      this.anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      if (!Array.isArray(value))
         this.fail(value, 'is not an array');
      this.checkLength(value, minLength, maxLength);
      return this;
   };
   
   anArrayOfArrays = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      value.forEach(item => this.anArray(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anArrayOfIntegers = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      value.forEach(item => this.anInteger(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anArrayOfObjects = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      value.forEach(item => this.anObject(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anArrayOfStrings = (value = [], minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anArray(value).anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      value.forEach(item => this.aString(item));
      this.checkLength(value, minLength, maxLength);
      return this;
   }
   
   anInteger = (value = 0, minValue = Number.MIN_SAFE_INTEGER, maxValue = Number.MAX_SAFE_INTEGER) => {
      if (!Number.isInteger(value))
         this.fail(value, 'is not an integer');
      this.checkRange(value, minValue, maxValue);
      return this;
   };
   
   anObject = (value = {}, minNumberOfKeys = 0, maxNumberOfKeys = Number.MAX_SAFE_INTEGER) => {
      this.anInteger(minNumberOfKeys, is.not.negative).anInteger(maxNumberOfKeys, is.not.negative);
      if ((typeof value !== 'object' || Array.isArray(value) || value === null))
         this.fail(value, 'is not an object');
      this.checkLength(Object.keys(value), minNumberOfKeys, maxNumberOfKeys);
      return this;
   };

   aNumber = (value = 0) => {
      if (typeof value !== 'number')
         this.fail(value, 'is not a number');
      return this;
   };

   aReactElement = (value = <></>) => {
      if (!React.isValidElement(value))
         this.fail(value, 'is not a React element');
      return this;
   }
   
   aString = (value = '', minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      this.anInteger(minLength, is.not.negative).anInteger(maxLength, is.not.negative);
      if (typeof value !== 'string')
         this.fail(value, 'is not a string');
      this.checkLength(value, minLength, maxLength);
      return this;
   };
   
   checkLength = (value, minLength = 0, maxLength = Number.MAX_SAFE_INTEGER) => {
      if (value.length < minLength)
         this.fail(value, 'is too short');
      if (value.length > maxLength)
         this.fail(value, 'is too long');
   }
   
   checkRange = (value = 0, minValue = Number.MIN_SAFE_INTEGER, maxValue = Number.MAX_SAFE_INTEGER) => {
      if (value < minValue)
         this.fail(value, 'is too small');
      if (value > maxValue)
         this.fail(value, 'is too large');
   }
   
   fail = (value, message = '') => {
      if (!this.throwOnFailure)
         return;
      console.error(value);
      throw new Error(message);
   }
   
   oneOf = (value, allowedValues) => {
      if (typeof allowedValues !== 'object' || allowedValues === null) {
         this.fail(allowedValues, 'oneOf alloweValues must be an object or an array');
         return this;
      }
      if (Array.isArray(allowedValues)) {
         if (!allowedValues.some(allowedValue => value === allowedValue))
            this.fail(value, 'is not an allowed value');
         return this;
      }
      const entries = Object.entries(allowedValues);
      if (!entries.some(entry => entry[1] === value))
         this.fail(value, 'is not an allowed value');
      return this;
   }
}

export const allow = new Allow();