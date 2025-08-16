import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/datepicker";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumberInput } from "@/components/ui/number-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { createListCollection, parseDate, type DateValue } from "@ark-ui/react";
import { useForm, useStore } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createFileRoute("/_dashboard/add")({
  component: RouteComponent,
});

const addTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  createdAt: z.custom<DateValue[]>(),
  amount: z.string().min(0, "Amount must be a positive number"),
  category: z.array(z.string()),
  recurring: z.boolean(),
  period: z.array(z.string()),
  notes: z.string(),
});

function RouteComponent() {
  const categories = createListCollection({
    items: [
      "Food",
      "Transport",
      "Entertainment",
      "Utilities",
      "Health",
      "Education",
      "Other",
    ],
  });

  const recurringPeriods = createListCollection({
    items: ["Daily", "Weekly", "Monthly", "Yearly"],
  });

  const form = useForm({
    defaultValues: {
      type: "expense",
      createdAt: [parseDate(new Date().toISOString().split("T")[0])],
      amount: "",
      category: [""],
      recurring: false,
      period: [""],
      notes: "",
    },
    validators: {
      onChange: addTransactionSchema,
    },
  });

  const values = useStore(form.store, (state) => state.values);

  console.log("Form values:", values);
  return (
    <div className="container">
      <form
        className="p-5 bg-white rounded-xl shadow-sm space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="type"
          children={(field) => (
            <RadioGroup
              value={field.state.value}
              onValueChange={(details) =>
                field.handleChange(details.value as string)
              }
            >
              <RadioGroupItem value="income">Income</RadioGroupItem>
              <RadioGroupItem value="expense">Expense</RadioGroupItem>
            </RadioGroup>
          )}
        />

        <form.Field
          name="createdAt"
          children={(field) => (
            <DatePicker
              locale="en-IN"
              value={field.state.value}
              onValueChange={(e) => field.handleChange(e.value)}
            />
          )}
        />

        <form.Field
          name="amount"
          children={(field) => (
            <Field
              invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            >
              <Label>Amount</Label>
              <NumberInput
                value={field.state.value}
                onValueChange={(e) => field.handleChange(e.value)}
              />
            </Field>
          )}
        />

        <form.Field
          name="category"
          children={(field) => (
            <Select
              value={field.state.value}
              onValueChange={(details) => field.handleChange(details.value)}
              collection={categories}
              className="w-full grid gap-2"
            >
              <SelectLabel>Category</SelectLabel>
              <SelectTrigger />
              <SelectContent>
                {categories.items.map((item) => (
                  <SelectItem key={item} item={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <form.Field
          name="recurring"
          children={(field) => (
            <Checkbox
              checked={field.state.value}
              onCheckedChange={(e) => field.handleChange(e.checked as boolean)}
            >
              Recurring
            </Checkbox>
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.recurring}
          children={(recurring) => (
            <form.Field name="period">
              {(field) => recurring &&   <Select
                  value={field.state.value}
                  onValueChange={(details) => field.handleChange(details.value)}
                  collection={recurringPeriods}
                  className="w-full grid gap-2"
                >
                  <SelectLabel>Period</SelectLabel>
                  <SelectTrigger />
                  <SelectContent>
                    {recurringPeriods.items.map((item) => (
                      <SelectItem key={item} item={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>}
            </form.Field>
          )}
        />

        <form.Field
          name="notes"
          children={(field) => (
            <Field
              invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            >
              <Label>Notes (optional)</Label>

              <Textarea
                autoresize
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        />
      </form>
    </div>
  );
}
