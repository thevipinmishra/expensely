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
});

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
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
      setToken(data.token);
      navigate({ to: redirect || "/" });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred during login"
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
          padding="lg"
          maw={{
            md: 480,
          }}
          mx={"auto"}
          radius="md"
          className="space-y-4"
        >
          <Title order={4}>Login to your account</Title>

          <form
            className="space-y-4"
            onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}
          >
            <TextInput label="Email" {...form.getInputProps("email")} />
            <PasswordInput
              label="Password"
              {...form.getInputProps("password")}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <Text>
            New here?
            <Link
              to="/signup"
              className="text-teal-800 inline-block ml-2 underline"
            >
              Create account
            </Link>
          </Text>
        </Card>
      </div>
    </div>
  );
}
