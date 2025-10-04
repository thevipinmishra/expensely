import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "@fontsource-variable/dm-sans/index.css";
import { Toaster } from "sonner";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import {
  Button,
  createTheme,
  MantineProvider,
  NumberInput,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

dayjs.extend(customParseFormat);

const theme = createTheme({
  fontFamily: "DM Sans Variable, sans-serif",
  headings: { fontFamily: "DM Sans Variable, sans-serif" },
  defaultRadius: "md",
  primaryColor: "teal",
  components: {
    Button: Button.extend({
      defaultProps: {
        size: "md",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: "md",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: "md",
      },
    }),
    Select: Select.extend({
      defaultProps: {
        size: "md",
      },
    }),
    DatePickerInput: DatePickerInput.extend({
      defaultProps: {
        size: "md",
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: "md",
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        size: "md",
      },
    }),
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} withGlobalClasses>
        <RouterProvider router={router} />
      </MantineProvider>
      <Toaster position="top-center" richColors />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
