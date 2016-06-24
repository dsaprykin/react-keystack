# react-keystack

React-keystack allows developers to coordinate adding and removing keystroke listeners with the elements in the dom using an idiomatic react approach.


## Example:
Imagine that we have a music player component, and we want the music to stop when the user hits space, but we also have a Modal, and while it's present, we want hitting space to remove it, without stopping our music.  KeyStack allows us to do this simply.

```
var KeyDown = require('react-keystack').KeyDown;

var container = function () {
  return (<div>
    <KeyDown shortcut="space" action={removeModal}>
      <MusicPlayer />
    </KeyDown>
    <KeyDown shortcut="space" action={stopMusic}>
      <Modal />
    </KeyDown>
  <div>);
};
```
