export default function detectWord(word, str) {
  if (!str) return;
  return RegExp("\\b" + word + "\\b").test(str.toLowerCase());
}
