

const formatter = (currency: string) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
  minimumFractionDigits: 0,
});

export const formatCurrency = (value: number, currency: string) => {
  return formatter(currency).format(value);
}