import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { KyRequest } from "ky";

export interface Transaction {
  id: string;
  about: string;
  type: "expense" | "income";
  amount: string;
  category: [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Health",
    "Education",
    "Other"
  ];
  recurring: "Daily" | "Weekly" | "Monthly" | "Yearly" | null;
  notes: string | null;
  userId: string;
  currency: string;
  createdAt: Date;
}

interface Transactions {
  message: string;
  data: Transaction[];
}

export const getTransactions = async (params?: KyRequest) => {
  const res = await api.get<Transactions>("transactions", params).json();
  return res;
};

export const useTransactions = (params?: KyRequest) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(params),
  });
};
