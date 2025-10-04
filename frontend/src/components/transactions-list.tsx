import { useTransactions } from "@/modules/transactions/services";
import { formatCurrency, formatDate } from "@/utils/formatter";
import { Button } from "@mantine/core";
import Loading from "./ui/loading";

export default function TransactionsList() {
  const transactionsQuery = useTransactions();
  return (
    <div>
      {transactionsQuery.isLoading ? (
        <Loading />
      ) : transactionsQuery.isError ? (
        <div>
          <p className="text-red-500">
            Error loading transactions: {transactionsQuery.error.message}
          </p>
          <Button onClick={() => transactionsQuery.refetch()}>Retry</Button>
        </div>
      ) : transactionsQuery.data?.data &&
        transactionsQuery.data.data.length > 0 ? (
        <div className="grid gap-4">
          {transactionsQuery.data.data.map((transaction) => (
            <div
              data-type={transaction.type}
              className="group bg-gradient-to-r from-rose-200/50 p-1 to-teal-200/50  backdrop-blur-md rounded-xl "
              key={transaction.id}
            >
              <div className="bg-white/50 p-4 rounded-md flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-xl lg:text-2xl text-gray-900 font-bold">
                    {transaction.about}
                  </p>
                  <p className="text-xs tracking-wider text-teal-800 uppercase font-medium">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
                <p className="font-bold text-xl group-data-[type=expense]:text-red-700 group-data-[type=income]:text-green-700 tabular-nums">
                  {transaction.type === "expense" ? "-" : "+"}{" "}
                  {formatCurrency(
                    Number(transaction.amount),
                    transaction.currency
                  )}
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
