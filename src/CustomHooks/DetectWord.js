export default (word, str) => {
  return RegExp("\\b" + word + "\\b").test(str.toLowerCase());
};
