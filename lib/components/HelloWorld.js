const React = require('react');
const UnorderedList = require('./UnorderedList');

const dependenciesArray = ['express - middleware for the node server', 'react - for generating the views of the app', 'react-dom - powers the rendering of elements to the DOM, typically paired with React', 'webpack - for bundling all the javascript', 'webpack-cli - command line support for webpack', 'jsx-loader - allows webpack to load jsx files'];

const componentsMade = ['HelloWorld - which is the view you are seeing now!', 'UnorderedList - which takes an array of "items" and returns a <ul> element with <li>, elements of each of those items within it'];

/* the main page for the index route of this app */
const HelloWorld = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Hello World!'
    ),
    React.createElement(
      'p',
      null,
      'This is a starter ',
      React.createElement(
        'a',
        { href: 'http://glitch.com' },
        'Glitch'
      ),
      ' app for React! It uses only a few dependencies to get you started on working with React:'
    ),
    React.createElement(UnorderedList, { items: dependenciesArray }),
    React.createElement(
      'p',
      null,
      'Look in ',
      React.createElement(
        'code',
        null,
        'app/components/'
      ),
      ' for two example components:'
    ),
    React.createElement(UnorderedList, { items: componentsMade })
  );
};

module.exports = HelloWorld;