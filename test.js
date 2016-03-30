var expect = require('chai').expect;
var shouldComponentUpdateDev = require('./dist');

describe('should-component-update-dev', () => {
  it ('should export a function', () => {
    expect(shouldComponentUpdateDev).to.be.a('function');
  })
})
