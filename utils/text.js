function normalizeComparableText(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

module.exports = {
  normalizeComparableText
};
