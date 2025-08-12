import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { createListCollection } from "@ark-ui/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

function RouteComponent() {
  const currencyCollection = createListCollection({
    items: [
      { value: "CNY", label: "Chinese Yuan" },
      { value: "INR", label: "Indian Rupee" },
      { value: "EUR", label: "Euro" },
      { value: "USD", label: "US Dollar" },
      { value: "IDR", label: "Indonesian Rupiah" },
      { value: "BRL", label: "Brazilian Real" },
      { value: "PKR", label: "Pakistani Rupee" },
      { value: "RUB", label: "Russian Ruble" },
    ],
  });
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signupSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="container py-8 space-y-6">
        <h1 className="text-center font-bold text-xl text-teal-950">
          Expensely
        </h1>
        <div className="bg-white/90 w-full max-w-md mx-auto space-y-6 backdrop-blur-md p-6 border border-teal-100 rounded-xl shadow-sm">
          <h2 className="font-medium text-base tracking-tight text-gray-900">
            Sign up for a new account
          </h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="firstName"
              children={(field) => (
                <Field
                  invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label>First name</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            />
            <form.Field
              name="lastName"
              children={(field) => (
                <Field
                  invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label>Last name</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            />
            <form.Field
              name="email"
              children={(field) => (
                <Field
                  invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label>Email</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <Field
                  invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <Field
                  invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <Label>Confirm password</Label>
                  <Input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            />
            <Select collection={currencyCollection}>
              <SelectLabel>Currency</SelectLabel>
              <SelectTrigger />
              <SelectContent>
                {currencyCollection.items.map((currency) => (
                  <SelectItem key={currency.value} item={currency}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
