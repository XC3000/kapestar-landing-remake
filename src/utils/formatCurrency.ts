type CurrencyOptions = "INR";

function formatCurrency(
  value: number,
  sign?: boolean,
  currency?: CurrencyOptions
): string {
  if (sign) {
    return Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency,
    });
  }

  return Number(value).toLocaleString("en-IN", {
    currency,
  });
}

export default formatCurrency;
