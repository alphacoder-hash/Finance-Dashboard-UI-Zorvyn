export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1.0, name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, name: 'Euro' }
};

/**
 * Formats a given amount into the specified currency.
 * @param {number} amount - The amount in base currency (INR).
 * @param {string} currencyCode - The code of the target currency (INR, USD, EUR).
 * @returns {string} - The formatted string (e.g., "$1,200.00").
 */
export const formatCurrency = (amount, currencyCode = 'INR') => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = amount * currency.rate;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode === 'INR' ? 'INR' : (currencyCode === 'USD' ? 'USD' : 'EUR'),
    minimumFractionDigits: currencyCode === 'INR' ? 0 : 2,
    maximumFractionDigits: currencyCode === 'INR' ? 0 : 2
  }).format(converted)
    .replace('INR', '₹') // Ensure symbol is always the one we want
    .replace('USD', '$')
    .replace('EUR', '€');
};
