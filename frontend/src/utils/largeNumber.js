/**
 * Formats number.
 * Ex: 1528 => '1.53K'
 */
const formatLargeNumber = (number) => {
  let formatter = Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 2 });
  return formatter.format(number);
}

export { formatLargeNumber }