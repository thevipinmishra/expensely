const formatter = (currency: string) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
  minimumFractionDigits: 0,
});

export const formatCurrency = (value: number, currency: string) => {
  return formatter(currency).format(value);
}

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}