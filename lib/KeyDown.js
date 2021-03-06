var React = require('react');
var Children = React.Children;
var PropTypes = require('prop-types');
var keyStack = require('./keyStack');

function canUseDom() {
  return typeof window != 'undefined' && window.document;
}

class KeyDown extends React.PureComponent {
  // using componentWillMount gives us a predictable call direction vs. componentDidMount
  // see: https://github.com/facebook/react/issues/4752
  componentWillMount() {
    if (canUseDom()) {
      keyStack.stack(this)
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  // unpredictable call direction
  componentWillUnmount() {
    keyStack.remove(this);
    this.mounted = false;
  }

  render() {
    return Children.only(this.props.children);
  }
}

KeyDown.propTypes = {
  shortcut: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  enableInTextField: PropTypes.bool
};

module.exports = KeyDown;
