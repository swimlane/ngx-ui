/**
 * String Complexity
 *
 * Inspiration:
 *  - https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/
 *  - https://www.npmjs.com/package/password-analyzer
 *  - https://github.com/kislyuk/node-complexify
 *  - https://www.npmjs.com/package/password.js
 *  - https://www.npmjs.com/package/password-ruler
 *  - https://www.npmjs.com/package/string-complexity
 *
 */
export class StringComplexity {

  minLength = 10;
  maxLength = 120;

  minLowerCase = 1;
  minUpperCase = 1;
  requireNumber = true;
  requireSpecialChars = true;

  blacklists = [
    'password'
  ];

  constructor(options) {
    Object.assign(this, options);
  }

  test(value) {
    if(!value) return;

    let results = [];
    let passRatio = 6;

    // ensure we have a string
    value = value.toString();

    this.testMinLength(value, results, passRatio);
    this.testMaxLength(value, results, passRatio);
    this.testLowercase(value, results, passRatio);
    this.testUppercase(value, results, passRatio);

    validated += (value.match(/[A-Z]/g) || []).length >= this._options.upperCase;
    validated += (value.match(/[0-9]/g) || []).length >= this._options.numeric;
    validated += (value.match(/[^a-zA-Z0-9]/g) || []).length >= this._options.symbol;

    return {
      results,
      passRatio
    };
  }

  testUppercase(value, results, passRatio) {
    if(this.lowerCaseCount) {
      const lowerCaseCount = (value.match(/[A-Z]/g) || []).length;

      if(this.lowerCaseCount < lowerCaseCount) {
        passRatio--;
        results.push({
          rule: 'lowerCase',
          current: lowerCaseCount,
          expected: this.lowerCaseCount
        });
      }
    }
  }

  testMinLength(value, results, passRatio) {
    if(this.minLength && value.length < this.minLength) {
      passRatio--;
      results.push({
        rule: 'minLength',
        current: value.length,
        expected: this.minLength
      });
    }
  }

  testMaxLength(value, results, passRatio) {
    if(this.maxLength && value.length > this.maxLength) {
      passRatio--;
      results.push({
        rule: 'maxLength',
        current: value.length,
        expected: this.maxLength
      });
    }
  }

  testLowercase(value, results, passRatio) {
    if(this.lowerCaseCount) {
      const lowerCaseCount = (value.match(/[a-z]/g) || []).length;

      if(this.lowerCaseCount < lowerCaseCount) {
        passRatio--;
        results.push({
          rule: 'lowerCase',
          current: lowerCaseCount,
          expected: this.lowerCaseCount
        });
      }
    }
  }

}
