var keyStack = require('../../lib/keyStack');
var stack = keyStack.stack;
var listen = keyStack.listen;
var remove = keyStack.remove;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
var createElement = require('../mocks/fakeComponent');
var expect = chai.expect;
chai.use(sinonChai);

describe('keyStack.listen', function() {

  before(function() {
    this.evt = {
      keyCode: 27,
      target: {
        tagName: 'DIV'
      }
    }
  });

  beforeEach(function() {
    this.stub = sinon.stub();
    this.elm = createElement({
      props: {
        shortcut: 'esc',
        action: this.stub
      }
    });
  });

  it.skip('should not call action if tag is an input', function() {

  });

  it.skip('should not call action if tag is a textarea', function() {

  });

  it.skip('should not call the element action if the shortcut doesn\'t match the mapping', function() {

  });

  it.skip('should call the element action if the shortcut does match the mapping', function() {

  });

  it.skip('should only call the most recently pushed element in the stack\'s callback', function() {

  });
});