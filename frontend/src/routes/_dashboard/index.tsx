import TransactionsList from "@/components/transactions-list";
import { useTransactions } from "@/modules/transactions/services";
import { getMonthlySummary } from "@/utils/transactions";
import { FormatNumber } from "@ark-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const transactionsQuery = useTransactions();
  const transactions = getMonthlySummary(transactionsQuery?.data?.data || []);

  return (
    <>
      <div className="container space-y-5">
        {transactions && (
          <div className="bg-teal-50/50 shadow-2xs grid gap-4 shadow-teal-50 backdrop-blur-sm relative  p-4 rounded-xl">
            <div className="flex">
              <p className="text-sm font-medium text-teal-900">
                {transactions.month}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-red-200/50 text-red-900 p-2 rounded-lg flex-1">
                <p>
                  <FormatNumber
                    value={Number(transactions.expense)}
                    style="currency"
                    currency={transactions.currency}
                    minimumFractionDigits={0}
                  />
                </p>
              </div>
              <div className="bg-green-200/50 text-green-900 p-2 rounded-lg flex-1">
                <p>
                  <FormatNumber
                    value={Number(transactions.income)}
                    style="currency"
                    currency={transactions.currency}
                    minimumFractionDigits={0}
                  />
                </p>
              </div>
            </div>
          </div>
        )}

        <TransactionsList />
      </div>
    </>
  );
}
