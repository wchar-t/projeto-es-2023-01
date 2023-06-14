export function simplifyNumber(num: number) {
  const suffixes = ['', 'mil', 'M', 'B', 'T'];
  const suffixGroups = Math.floor(Math.log10(Math.abs(num)) / 3);

  if (suffixGroups >= suffixes.length) {
    return num.toString();
  }

  const simplifiedNumber = parseFloat((num / 1000 ** suffixGroups).toFixed(1));

  return simplifiedNumber.toString().replace('.', ',') + suffixes[suffixGroups];
}

export function dummy() {
  return 'dummy';
}
