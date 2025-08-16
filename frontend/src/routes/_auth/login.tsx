import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { FieldError } from "@/components/ui/field-error";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/modules/auth/services";
import { setToken } from "@/store";
import { toast } from "sonner";

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
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value);
    },
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="container space-y-6">
        <h1 className="text-center font-bold text-xl text-teal-950">
          Expensely
        </h1>
        <div className="bg-white/90 w-full max-w-md mx-auto space-y-6 backdrop-blur-md p-6 border border-teal-100 rounded-xl shadow-sm">
          <h2 className="font-medium text-base tracking-tight text-gray-900">
            Login to your account
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
           <p className="text-sm font-medium">New here? <Link to='/signup' className="text-teal-800 underline">Create account</Link></p>
        </div>
      </div>
    </div>
  );
}
