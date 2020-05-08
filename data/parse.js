const fs = require('fs');
const jsdom = require('jsdom');

try {
  const data = fs.readFileSync('./chinese_telegraph_code.html', 'utf8');
  const dom = new jsdom.JSDOM(data);

  const elements = dom.window.document.getElementsByTagName('td');
  const output = Object.values(elements).reduce((map, elem) => {
    const parts = elem.innerHTML.split('<br>')
    if (parts.length <= 1) {
      // There's no break, so it's an unused number
      return map;
    }
    const digits = parts[0];
    const anchors = elem.getElementsByTagName('a');

    if (anchors.length > 0) {
      const character = anchors[0].title;
      map[character] = digits;
    }

    return map;
  }, {});

  const outputJson = JSON.stringify(output);

  fs.writeFileSync('./chinese_to_morse_digits.json', outputJson);
} catch (err) {
  console.error(err);
}
