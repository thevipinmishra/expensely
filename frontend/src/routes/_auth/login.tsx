import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/modules/auth/services";
import { setToken } from "@/store";
import { toast } from "sonner";
import {
  Button,
  Card,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Login - Expensely",
      },
    ],
  }),
});

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long"),
});

function RouteComponent() {
  const navigate = useNavigate();
  const {
    redirect,
  }: {
    redirect?: string;
  } = Route.useSearch();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
    onSuccess: (data) => {
      toast.success("Welcome back!");
      setToken(data.token);
      navigate({ to: redirect || "/" });
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Invalid email or password. Please try again."
      );
    },
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zod4Resolver(loginSchema),
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="container space-y-6">
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
          <Title order={4} className="text-center">Welcome Back</Title>

          <form
            className="space-y-6"
            onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}
          >
            <TextInput 
              label="Email" 
              placeholder="Enter your email address"
              type="email"
              autoComplete="email"
              disabled={loginMutation.isPending}
              {...form.getInputProps("email")} 
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loginMutation.isPending}
              {...form.getInputProps("password")}
            />

            <Button 
              type="submit" 
              className="w-full"
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <Text ta="center" size="sm" c="dimmed">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 hover:text-teal-800 underline font-medium"
            >
              Create one here
            </Link>
          </Text>
        </Card>
      </div>
    </div>
  );
}
