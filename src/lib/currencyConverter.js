import Currency from "currency.js";

const USD = (value) => Currency(value);
const ARS = (value) => Currency(value, { precision: 0, symbol: "$" });
const EUR = (value) =>
  Currency(value, { symbol: "€", decimal: ",", separator: "." });

const CURRENCIES = {
  EUR: EUR,
  USD: USD,
  ARS: ARS,
};

export default (exchangeRates, price, selectedCurrency) => {
  let convertedPrice = USD(price).format();
  if (exchangeRates && exchangeRates[selectedCurrency]) {
    const rate = exchangeRates[selectedCurrency];
    const outputPrice = price * rate;
    convertedPrice = CURRENCIES[selectedCurrency](outputPrice).format();

    return convertedPrice;
  }
  return `${convertedPrice} (${selectedCurrency})`;
};
