// These are in traditional Chinese
export const LetterToChinese: any = {
  a: "爱",
  b: "比",
  c: "西",
  d: "諦",
  e: "依",
  f: "夫",
  g: "基",
  h: "鴟",
  i: "藹",
  j: "再",
  k: "凱",
  l: "而",
  m: "姆",
  n: "恩",
  o: "窩",
  p: "批",
  q: "摳",
  r: "阿",
  s: "司",
  t: "梯",
  u: "尤",
  v: "霏",
  w: "壼",
  x: "時",
  y: "喂",
  z: "特"
};

const chineseAlphas = Object.keys(LetterToChinese);

const letters = "abcdefghijklmnopqrstuvwxyz";

const randomLetter = () =>
  letters.charAt(Math.floor(Math.random() * letters.length));

const generateTrigraph = () => {
  const first = randomLetter();
  const second = randomLetter();
  const third = randomLetter();
  return `${first}${second}${third}`;
};

const getChineseTrigraph = (input: string): string => {
  return [...input]
    .map(char => {
      return LetterToChinese[char];
    })
    .join("");
};

// NB: we don't actually have a data source for character to trigraph mappings,
// so here we just pretend like the entire table is empty and return random ones
// to simulate what they would look like.
export default class LookupTrigraphs {
  freeTrigraphMap: Map<string, string>;
  usedTrigraphs: Map<string, boolean>;

  constructor() {
    // Maps single Chinese characters to 3 alphabetic letters
    this.freeTrigraphMap = new Map<string, string>();
    this.freeTrigraphMap.set("冬", "apb"); // hard code for demo

    this.usedTrigraphs = new Map<string, boolean>();
    this.usedTrigraphs.set("apb", true); // hard code for demo
  }

  getTrigraphForCharacter(key: string) {
    // Generate three random characters and see if it's already taken.
    // This admittedly performs worse over time as the map fills up,
    // but for a demo this should be fine
    for (let i = 0; i < 17576; i++) {
      const trigraph = generateTrigraph();
      if (this.usedTrigraphs.get(trigraph) === undefined) {
        return trigraph;
      }
    }

    // If we fall out of the loop, we've exhausted all possible trigraphs and
    // there are none left :(
    // Just generate another one and hope nobody notices
    return generateTrigraph();
  }

  // Returns the value for the key
  lookup(key: string) {
    const isCustom = true; // they're all custom

    let value = this.freeTrigraphMap.get(key);

    if (value === undefined) {
      value = this.getTrigraphForCharacter(key);
      this.freeTrigraphMap.set(key, value);
      this.usedTrigraphs.set(value, true);
    }

    const chineseTrigraph = getChineseTrigraph(value);

    return [value, chineseTrigraph, isCustom];
  }
}
