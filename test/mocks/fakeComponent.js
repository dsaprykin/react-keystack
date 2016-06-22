module.exports = function(props) {
  return {
    isMounted: function() {
      return true;
    },
    props: props
  };
}