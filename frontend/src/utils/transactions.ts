import type { Transaction } from "@/modules/transactions/services";

export function getMonthlySummary(transactions: Transaction[]) {
  const now = new Date();
  let income = 0;
  let expense = 0;
  let currency = "";

  transactions.forEach((tx) => {
    const txDate = new Date(tx.createdAt);
    if (
      txDate.getMonth() === now.getMonth() &&
      txDate.getFullYear() === now.getFullYear()
    ) {
      if (!currency) currency = tx.currency;
      const amount = parseFloat(tx.amount);
      if (tx.type === "income") {
        income += amount;
      } else {
        expense += amount;
      }
    }
  });

  return {
    month: `${now.toLocaleString("default", { month: "long" })} ${now.getFullYear()}`,
    income,
    expense,
    net: income - expense,
    currency,
  };
}
