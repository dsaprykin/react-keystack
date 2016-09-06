var React = require('react');
var Children = React.Children;
var PropTypes = React.PropTypes;
var keyStack = require('./keyStack');
var ExecutionEnvironment = require('exenv');

var KeyDown = module.exports = React.createClass({

  propTypes: {
    shortcut: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    enableInTextField: PropTypes.bool
  },

  // using componentWillMount gives us a predictable call direction vs. componentDidMount
  // see: https://github.com/facebook/react/issues/4752
  componentWillMount: function() {
    if (ExecutionEnvironment.canUseDOM) { // or canUseDom from react extras
      keyStack.stack(this)
    }
  },

  // unpredictable call direction
  componentWillUnmount: function() {
    keyStack.remove(this)
  },

  render: function() {
    return Children.only(this.props.children)
  }
})

// TODO: - look for shouldComponentUpdate optimizations
//       - verify support for receiving new props
