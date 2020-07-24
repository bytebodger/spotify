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
   
   aGuid = (value = '') => {
      this.aPopulatedString(value);
      if (value.length !== 32 && this.throwOnError) {
         console.error(value);
         throw new Error('is not a GUID');
      }
      for (let i = 0; i < 32; i++) {
         const characterCode = value.charCodeAt(i);
         if (
            !this.throwOnError
            || (characterCode >= 65 && characterCode <= 90)
            || (i !== 0 && characterCode >= 48 && characterCode <= 57)
         )
            continue;
         console.error(value);
         throw new Error('is not a GUID');
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
   
   aString = (value = '') => {
      if (typeof value !== 'string' && this.throwOnError) {
         console.error(value);
         throw new Error('is not a string');
      }
      return this;
   };
   
   oneOf = (value, allowedValues = []) => {
      this.aPopulatedArray(allowedValues);
      if (!allowedValues.some(allowedValue => allowedValue === value)) {
         console.error(value);
         throw new Error('is not an allowed value');
      }
      return this;
   }
}

export const allow = new Allow();