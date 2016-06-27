# react-keystack

Coordinate adding and removing keystroke listeners with the elements in the DOM using an idiomatic React approach.

This package let components request their shortcuts rather than declaring them on a shared component. As an added benefit, it can manage conflicts and priority in a way that a shared component could not without leaking abstractions.

## Motivation

We wanted to display a modal that could be closed by using the esc key, the problem is, we also want our player to stop playing when hitting esc, which means that after closing the modal, esc should go back to the player.

We needed an idiomatic way to manage keyboard events with React elements that would naturally assign the right keyboard shortcuts at any given moment without managing state on the outside.

## Installation

```
$ npm install react-keystack --save-dev
```

## Usage

In this example, pressing esc once will close the modal, assuming `removeModal` succefully unmount the `Modal` element from the DOM, the subsequent esc presses will call `stopMusic`.

```js
var KeyDown = require('react-keystack').KeyDown;

var container = function () {
  return (<div>
    <KeyDown shortcut="esc" action={removeModal}>
      <MusicPlayer />
    </KeyDown>
    <KeyDown shortcut="esc" action={stopMusic}>
      <Modal />
    </KeyDown>
  <div>);
};
```
## Prioritization

First, a component on the DOM will always have a higher priotity than its previous sibling. Second, within a component, the last child will have the highest priority.
