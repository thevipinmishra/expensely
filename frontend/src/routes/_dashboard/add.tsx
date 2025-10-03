import {
  addTransaction,
  type Transaction,
} from "@/modules/transactions/services";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/_dashboard/add")({
  component: RouteComponent,
});

const addTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  about: z.string().min(1, "About is required"),
  createdAt: z.date(),
  amount: z.number().min(0, "Amount must be a positive number"),
  category: z.string().min(1, "Category is required"),
  recurring: z.boolean(),
  period: z.string().optional(),
  notes: z.string().optional(),
});

function RouteComponent() {
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Health",
    "Education",
    "Other",
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
      notes: values.notes,
    });
  };

  const form = useForm({
    initialValues: {
      type: "expense" as const,
      about: "",
      createdAt: new Date(),
      amount: 0,
      category: "",
      recurring: false,
      period: "",
      notes: "",
    },
    validate: zod4Resolver(addTransactionSchema),
  });

  const addTransactionMutation = useMutation({
    mutationFn: (data: Partial<Transaction>) => addTransaction(data),
    onSuccess: (data) => {
      console.log("Transaction added:", data);
    },
  });
  return (
    <div className="container">
      <form
        className="p-5 bg-white rounded-xl shadow-sm space-y-6"
        onSubmit={form.onSubmit(handleAddTransaction)}
      >
        <RadioGroup label="Transaction Type" {...form.getInputProps("type")}>
          <div className="flex gap-4 mt-2">
            <Radio value="income" label="Income" />
            <Radio value="expense" label="Expense" />
          </div>
        </RadioGroup>

        <TextInput
          label="About"
          placeholder="What is this transaction for?"
          {...form.getInputProps("about")}
        />

        <DatePickerInput label="Date" {...form.getInputProps("createdAt")} />

        <NumberInput label="Amount" min={0} {...form.getInputProps("amount")} />

        <Select
          label="Category"
          data={categories}
          {...form.getInputProps("category")}
        />

        <Checkbox label="Recurring" {...form.getInputProps("recurring")} />

        {form.values.recurring && (
          <Select
            label="Period"
            data={recurringPeriods}
            {...form.getInputProps("period")}
          />
        )}

        <Textarea label="Notes (optional)" {...form.getInputProps("notes")} />

        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}
