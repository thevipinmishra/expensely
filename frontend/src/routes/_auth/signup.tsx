import { signup } from "@/modules/auth/services";
import {
  Button,
  Card,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    currency: z.string().min(1, "Currency is required"),
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
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      currency?: string;
    }) => signup(data),
    onSuccess: () => {
      toast.success("Account created successfully! Please log in.");
      navigate({
        to: "/login",
      });
    },
  });
  const currencyCollection = [
    { value: "CNY", label: "Chinese Yuan" },
    { value: "INR", label: "Indian Rupee" },
    { value: "EUR", label: "Euro" },
    { value: "USD", label: "US Dollar" },
    { value: "IDR", label: "Indonesian Rupiah" },
    { value: "BRL", label: "Brazilian Real" },
    { value: "PKR", label: "Pakistani Rupee" },
    { value: "RUB", label: "Russian Ruble" },
  ];

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      currency: "",
    },
    validate: zod4Resolver(signupSchema),
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="container py-8 space-y-6">
        <Title order={2} ta={"center"}>
          Expensely
        </Title>
        <Card
          shadow="sm"
          padding="lg"
          maw={{
            md: 480,
          }}
          mx={"auto"}
          radius="md"
          className="space-y-4"
        >
          <Title order={4}>Sign up for a new account</Title>

          <form
            className="space-y-6"
            onSubmit={form.onSubmit((values) => signupMutation.mutate(values))}
          >
            <TextInput
              label="First name"
              {...form.getInputProps("firstName")}
            />
            <TextInput label="Last name" {...form.getInputProps("lastName")} />
            <TextInput label="Email" {...form.getInputProps("email")} />
            <PasswordInput
              label="Password"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm password"
              {...form.getInputProps("confirmPassword")}
            />
            <Select
              label="Currency"
              data={currencyCollection}
              {...form.getInputProps("currency")}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Signing up..." : "Get Started"}
            </Button>
          </form>
          <Text>
            Already have an account?
            <Link
              to="/login"
              className="text-teal-800 inline-block ml-2 underline"
            >
              Login
            </Link>
          </Text>
        </Card>
      </div>
    </div>
  );
}
