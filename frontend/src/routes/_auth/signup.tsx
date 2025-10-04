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
  head: () => ({
    meta: [
      {
        title: "Sign Up - Expensely",
      },
    ],
  }),
});

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters")
      .trim(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase(),
    currency: z
      .string()
      .min(1, "Please select your preferred currency")
      .length(3, "Invalid currency code"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password is too long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
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
      toast.success("Account created successfully! Please sign in to continue.");
      navigate({
        to: "/login",
      });
    },
    onError: (error) => {
      console.error("Signup error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create account. Please try again."
      );
    },
  });
  const currencyCollection = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
    { value: "JPY", label: "JPY - Japanese Yen" },
    { value: "CNY", label: "CNY - Chinese Yuan" },
  ];

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      currency: "USD",
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
          padding="xl"
          maw={{
            md: 480,
          }}
          mx={"auto"}
          radius="md"
          className="space-y-6"
        >
          <Title order={4} className="text-center">Create Your Account</Title>

          <form
            className="space-y-6"
            onSubmit={form.onSubmit((values) => signupMutation.mutate(values))}
          >
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="First name"
                placeholder="Enter your first name"
                autoComplete="given-name"
                disabled={signupMutation.isPending}
                {...form.getInputProps("firstName")}
              />
              <TextInput 
                label="Last name" 
                placeholder="Enter your last name"
                autoComplete="family-name"
                disabled={signupMutation.isPending}
                {...form.getInputProps("lastName")} 
              />
            </div>
            
            <TextInput 
              label="Email" 
              placeholder="Enter your email address"
              type="email"
              autoComplete="email"
              disabled={signupMutation.isPending}
              {...form.getInputProps("email")} 
            />
            
            <Select
              label="Preferred Currency"
              placeholder="Select your currency"
              data={currencyCollection}
              searchable
              disabled={signupMutation.isPending}
              {...form.getInputProps("currency")}
            />
            
            <PasswordInput
              label="Password"
              placeholder="Create a password"
              autoComplete="new-password"
              disabled={signupMutation.isPending}
              {...form.getInputProps("password")}
            />
            
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={signupMutation.isPending}
              {...form.getInputProps("confirmPassword")}
            />

            <Button
              type="submit"
              className="w-full"
              loading={signupMutation.isPending}
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <Text ta="center" size="sm" c="dimmed">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 hover:text-teal-800 underline font-medium"
            >
              Sign in here
            </Link>
          </Text>
        </Card>
      </div>
    </div>
  );
}
