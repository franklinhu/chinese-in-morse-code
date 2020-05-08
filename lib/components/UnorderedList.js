const React = require('react');

/* takes an array prop 'items' and returns a <ul> element 
   with each item as <li> elements */
const UnorderedList = function ({ items }) {
  return React.createElement(
    'ul',
    null,
    items.map(function (item, i) {
      return React.createElement(
        'li',
        { key: i },
        item
      );
    })
  );
};

module.exports = UnorderedList;