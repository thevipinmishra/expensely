import { useTransactions } from "@/modules/transactions/services";
import { Button } from "./ui/button";
import { formatRelative } from "date-fns";
import { FormatNumber } from "@ark-ui/react";

export default function TransactionsList() {
  const transactionsQuery = useTransactions();
  return (
    <div>
      {transactionsQuery.isLoading ? (
        <div>
          <p className="text-gray-500">Loading transactions...</p>
        </div>
      ) : transactionsQuery.isError ? (
        <div>
          <p className="text-red-500">
            Error loading transactions: {transactionsQuery.error.message}
          </p>
          <Button onClick={() => transactionsQuery.refetch()}>Retry</Button>
        </div>
      ) : transactionsQuery.data?.data &&
        transactionsQuery.data.data.length > 0 ? (
        <div className="grid gap-1">
          {transactionsQuery.data.data.map((transaction) => (
            <div
              data-type={transaction.type}
              className="group bg-gradient-to-r from-rose-200/50 p-0.5 to-teal-200/50  backdrop-blur-md rounded-xl "
              key={transaction.id}
            >
              <div className="bg-white/50 p-4 rounded-xl flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-[10px] tracking-wider text-teal-800 uppercase font-medium">
                    {formatRelative(transaction.createdAt, new Date())}
                  </p>
                  <p className="text-base text-gray-900 font-semibold">
                    {transaction.about}
                  </p>
                </div>
                <p className="font-bold text-xl group-data-[type=expense]:text-red-700 tabular-nums">
                  {transaction.type === "expense" ? "-" : "+"}{" "}
                  <FormatNumber
                    value={Number(transaction.amount)}
                    style="currency"
                    currency={transaction.currency}
                    minimumFractionDigits={0}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No transactions found</p>
      )}
    </div>
  );
}
