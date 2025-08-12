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
import { createListCollection } from "@ark-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/add")({
  component: RouteComponent,
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
  return (
    <div className="container">
      <form className="p-5 bg-white rounded-xl shadow-sm space-y-6">
        <RadioGroup>
          <RadioGroupItem value="income">Income</RadioGroupItem>
          <RadioGroupItem value="expense">Expense</RadioGroupItem>
        </RadioGroup>

        <DatePicker locale="en-IN" />

        <Field>
          <Label>Amount</Label>

          <NumberInput />
        </Field>

        <Select collection={categories} className="w-full grid gap-2">
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

        <Checkbox>Recurring</Checkbox>

        <Select collection={recurringPeriods} className="w-full grid gap-2">
          <SelectLabel>Period</SelectLabel>
          <SelectTrigger />
          <SelectContent>
            {recurringPeriods.items.map((item) => (
              <SelectItem key={item} item={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Field>
          <Label>Notes (optional)</Label>

          <Textarea autoresize />
        </Field>
      </form>
    </div>
  );
}
