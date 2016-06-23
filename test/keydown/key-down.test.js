var React = require('react');
var KeyDown = require('../../lib/KeyDown');
var keyStack = require('../../lib/keyStack');
var remove = keyStack.remove;
var Dummy = require('../mocks/Dummy');
var enzyme = require('enzyme');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var expect = chai.expect;
chai.use(sinonChai);

describe('KeyDown', function() {
  beforeEach(function() {
    this.spy = sinon.spy(keyStack, 'stack');
  });

  afterEach(function() {
    keyStack.remove(this.elm); // cleanup
    this.spy.restore();
  });

  it('should validate shortcut, action, and children', function() {
    expect(KeyDown.propTypes).to.be.an('object')
      .and.have.keys('shortcut', 'action', 'children');
  });

  it('should push the element called onto the stack', function() {

    this.elm = enzyme.shallow(
      <KeyDown shortcut="esc" action={function() {}}>
        <Dummy />
      </KeyDown>
    );

    expect(this.spy).to.have.been.called;
  });

  it('should not add the element to the stack if the DOM is unavailable', function() {
    require('exenv').canUseDOM = false;
    this.elm = enzyme.shallow(
      <KeyDown shortcut="esc" action={function() {}}>
        <Dummy />
      </KeyDown>
    );

    expect(this.spy).not.to.have.beenCalled;
    require('exenv').canUseDOM = true;
  });

  it('should not add any DOM elements', function() {
    expect(this.elm.contains(<Dummy />)).to.be.true;
  });

  context('unmounting', function() {
    beforeEach(function() {
      this.removeSpy = sinon.spy(keyStack, 'remove');
      this.elm = enzyme.shallow(
        <KeyDown shortcut="esc" action={function() {}}>
          <Dummy />
        </KeyDown>
      );
    });

    afterEach(function() {
      this.removeSpy.restore();
    });

    it('should remove the item when it unmounts', function() {
      this.elm.unmount();
      expect(this.removeSpy).to.have.been.called;
    });

  });

});
