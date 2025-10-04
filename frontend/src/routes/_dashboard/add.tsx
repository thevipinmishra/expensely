import {
  addTransaction,
  type Transaction,
} from "@/modules/transactions/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import z from "zod";
import {
  Radio,
  RadioGroup,
  Textarea,
  NumberInput,
  Select,
  Checkbox,
  Button,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { toast } from "sonner";
import { useMeta } from "@/modules/auth/services";

export const Route = createFileRoute("/_dashboard/add")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Add Transaction - Expensely",
      },
    ],
  }),
});

const addTransactionSchema = z
  .object({
    type: z.enum(["income", "expense"], {
      message: "Please select a transaction type",
    }),
    about: z
      .string()
      .min(1, "Description is required")
      .max(100, "Description must be less than 100 characters")
      .trim(),
    createdAt: z.iso.date().min(1, "Date is required"),
    amount: z
      .number({
        message: "Please enter a valid amount",
      })
      .min(1, "Amount must be greater than 0")
      .max(1000000, "Amount cannot exceed 1,000,000")
      .refine((val) => {
        const decimals = val.toString().split(".")[1];
        return !decimals || decimals.length <= 2;
      }, "Amount can have maximum 2 decimal places"),
    category: z
      .string()
      .min(1, "Please select a category")
      .refine((val) => val !== "", "Category is required"),
    currency: z
      .string()
      .min(1, "Currency is required")
      .length(3, "Currency code must be 3 characters")
      .toUpperCase(),
    recurring: z.boolean(),
    period: z.string().optional(),
    notes: z
      .string()
      .max(500, "Notes must be less than 500 characters")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.recurring && (!data.period || data.period === "")) {
        return false;
      }
      return true;
    },
    {
      message: "Period is required for recurring transactions",
      path: ["period"],
    }
  );

function RouteComponent() {
  const navigate = useNavigate();
  const metaQuery = useMeta();
  const queryClient = useQueryClient();
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Health",
    "Education",
    "Other",
  ];

  const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "JPY", label: "JPY - Japanese Yen" },
  ];

  const recurringPeriods = ["Daily", "Weekly", "Monthly", "Yearly"];

  const handleAddTransaction = (
    values: z.infer<typeof addTransactionSchema>
  ) => {
    addTransactionMutation.mutate({
      type: values.type,
      amount: values.amount.toString(),
      category: values.category,
      about: values.about,
      createdAt: values.createdAt,
      currency: values.currency,
      recurring: values.recurring
        ? (values.period as Transaction["recurring"])
        : null,
      notes: values.notes || null,
    });
  };

  const form = useForm({
    initialValues: {
      type: "expense" as const,
      about: "",
      createdAt: new Date().toISOString().split("T")[0],
      amount: 0,
      category: "",
      currency: metaQuery?.data?.data.currency || "",
      recurring: false,
      period: "",
      notes: "",
    },
    validate: zod4Resolver(addTransactionSchema),
  });

  const addTransactionMutation = useMutation({
    mutationFn: (data: Partial<Transaction>) => addTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction added successfully");
      form.reset();
      navigate({
        to: "/",
      });
    },
    onError: (error: Error) => {
      console.error("Failed to add transaction:", error);
      toast.error(
        error?.message ||
          "Failed to add transaction. Please check your input and try again."
      );
    },
  });

  return (
    <div className="container max-w-3xl">
      <form
        className="p-5 bg-white rounded-xl shadow-sm space-y-6"
        onSubmit={form.onSubmit(handleAddTransaction)}
      >
        <RadioGroup
          label="Transaction Type"
          withAsterisk
          {...form.getInputProps("type")}
        >
          <div className="flex gap-4 mt-2">
            <Radio value="income" label="Income" />
            <Radio value="expense" label="Expense" />
          </div>
        </RadioGroup>

        <TextInput
          label="About"
          placeholder="What is this transaction for?"
          withAsterisk
          maxLength={100}
          {...form.getInputProps("about")}
        />

        <DatePickerInput
          label="Date"
          withAsterisk
          maxDate={new Date()}
          placeholder="Select transaction date"
          {...form.getInputProps("createdAt")}
        />

        <NumberInput
          label="Amount"
          withAsterisk
          min={1}
          max={1000000}
          step={1}
          decimalScale={2}
          {...form.getInputProps("amount")}
        />

        <Select
          label="Category"
          placeholder="Select a category"
          data={categories}
          withAsterisk
          searchable
          {...form.getInputProps("category")}
        />

        <Select
          label="Currency"
          placeholder="Select currency"
          data={currencies}
          withAsterisk
          searchable
          {...form.getInputProps("currency")}
        />

        <Checkbox
          label="This is a recurring transaction"
          {...form.getInputProps("recurring")}
        />

        {form.values.recurring && (
          <Select
            label="Recurring Period"
            placeholder="Select frequency"
            data={recurringPeriods}
            withAsterisk
            {...form.getInputProps("period")}
          />
        )}

        <Textarea
          label="Notes (optional)"
          placeholder="Any additional notes..."
          maxLength={500}
          autosize
          minRows={3}
          maxRows={6}
          {...form.getInputProps("notes")}
        />

        <Button
          type="submit"
          loading={addTransactionMutation.isPending}
          disabled={addTransactionMutation.isPending}
          fullWidth
        >
          {addTransactionMutation.isPending ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
}
