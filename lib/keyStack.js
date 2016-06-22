/*
 * keyStack setups keyboard events without overwritting previosuly set mappings
 * but saving them in a stack, in order to restore them whenever the overwriting
 * component is removed.
 * It is meant to be used for document-wide keyboard events and will ignore key
 * strokes triggered from a input or textarea
 */

// TODO: fix same render batch with parent's componentDidMount called last
//       see: https://github.com/facebook/react/issues/4752

// TODO: refactor to write more like react-side-effect and removing reliance
//       on prop names, then setup as external lib (perferably open-source)

var MAPPINGS = { // TODO: setup external json mapping file
  27: 'esc'
}

var _ancestryStack = []

var keyStack = module.exports = {

  stack: function(element) {

    // first binding => setup
    if (_ancestryStack.length == 0) {
      document.addEventListener('keydown', keyStack.listener)
    }

    _ancestryStack.push(element)
  },

  remove: function(element) {

    // remove from stack
    var index = _ancestryStack.indexOf(this)
    _ancestryStack.splice(index, 1)

    // no more bindings => un-setup
    if (_ancestryStack.length == 0) {
      document.removeEventListener('keydown', keyStack.listener)
    }
  },

  listener: function(event) {

    if (['INPUT', 'TEXTAREA'].indexOf(event.target.tagName) >= 0) {
      return
    }

    var mapping = MAPPINGS[event.keyCode]

    for (var i = _ancestryStack.length - 1; i >= 0; --i) {

      var element = _ancestryStack[i]
      if (element.props.shortcut == mapping && element.isMounted()) { // WARNING: isMounted will be deprecated
        element.props.action() // TODO: check if should bind original 'this'
        return
      }
    }
  }
}

// WARNING: only call keyStack client-size, i.e. componentDidMount/WillUnmount
