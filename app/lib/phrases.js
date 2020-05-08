export const ChinesePhrases = [
  "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
  "寧我負人，毋人負我！",
  "千里之行﹐始於足下。"
];

export const GetRandomPhrase = oldValue => {
  const index = Math.floor(Math.random() * ChinesePhrases.length);
  if (ChinesePhrases[index] !== oldValue) {
    return ChinesePhrases[index];
  }

  return ChinesePhrases[(index + 1) % ChinesePhrases.length];
};
