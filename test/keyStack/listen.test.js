var keyStack = require('../../lib/keyStack');
var stack = keyStack.stack;
var listener = keyStack.listener;
var remove = keyStack.remove;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
var createElement = require('../mocks/fakeComponent');
var expect = chai.expect;
chai.use(sinonChai);

function excludedTag(name) {
  return function() {
    stack(this.elm);
    this.evt.target.tagName = name;
    listener(this.evt);
    expect(this.stub).not.to.have.been.called;
  }
}

describe('keyStack.listen', function() {

  beforeEach(function() {
    this.evt = {
      keyCode: 27,
      target: {
        tagName: 'DIV'
      }
    }
    this.stub = sinon.stub();
    this.elm = createElement({
      shortcut: 'esc',
      action: this.stub
    });
    this.stub2 = sinon.stub();
    this.elm2 = createElement({
      shortcut: 'esc',
      action: this.stub2
    });
  });

  afterEach(function() {
    remove(this.elm)
    remove(this.elm2)
  })

  it('should not call action if tag is an input', excludedTag('INPUT'));

  it('should not call action if tag is a textarea', excludedTag('TEXTAREA'));

  it('should not call the element action if the shortcut doesn\'t match the mapping', function() {
    this.elm.props.shortcut = 'ctrl'
    stack(this.elm)
    listener(this.evt)
    expect(this.stub).not.to.have.been.called
  });

  it('should call the element action if the shortcut does match the mapping', function() {
    stack(this.elm)
    listener(this.evt)
    expect(this.stub).to.have.been.called
  });

  it('should only call the most recently pushed element in the stack\'s callback', function() {
    stack(this.elm)
    stack(this.elm2)
    listener(this.evt)
    expect(this.stub).not.to.have.been.called
    expect(this.stub2).to.have.been.called
  });
});
