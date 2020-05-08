// @flow
const chineseToDigitsURL =
  "https://raw.githubusercontent.com/franklinhu/chinese-in-morse-code/master/data/chinese_to_morse_digits.json?token=AACUPYZOH7D2VSZRFS2JLE26SHHQE";

export const fetchChineseToDigitsJson = () => {
  return fetch(chineseToDigitsURL)
      .then(response => response.json())
}