var stack = require('../../lib/keyStack').stack;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
var createElement = require('../mocks/fakeComponent');
var expect = chai.expect;
chai.use(sinonChai);

describe('keyStack.stack', function() {
  before(function() {
    this.spy = sinon.spy(Array.prototype, 'push');
    this.listenerSpy = sinon.stub(document, 'addEventListener');
  });

  beforeEach(function() {
    this.element = createElement({});
  });

  after(function() {
    document.addEventListener.restore();
  });

  it('should add an event listener if there is nothing in the stack', function() {
    stack(this.element);
    expect(this.listenerSpy).to.have.been.calledOnce;
  });

  it('should not add an event listener if there is already something in the stack', function() {
    stack(this.element);
    expect(this.listenerSpy).to.have.been.calledOnce;
  });

  it('should have called push with the element passed', function() {
    stack(this.element);
    expect(this.spy).to.have.been.calledWith(this.element);
  });

});
