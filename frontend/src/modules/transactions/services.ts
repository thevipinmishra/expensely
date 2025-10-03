import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { KyRequest } from "ky";

export type Transaction = {
    about: string;
    amount: string;
    category: string;
    userId: string;
    recurring?: "Daily" | "Weekly" | "Monthly" | "Yearly" | null | undefined;
    id?: string | undefined;
    createdAt: string;
    type?: "income" | "expense" | undefined;
    notes?: string | null | undefined;
    currency: string;
}

interface Transactions {
  message: string;
  data: Transaction[];
}

export const getTransactions = async (params?: KyRequest) => {
  const res = await api.get<Transactions>("transactions", params).json();
  return res;
};

export const addTransaction = async (data: Partial<Transaction>) => {
    const res = await api.post<Transaction>("transactions", { json: data }).json();
    return res;
}

export const useTransactions = (params?: KyRequest) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(params),
  });
};
