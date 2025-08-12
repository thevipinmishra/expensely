import { getToken, clearToken } from "@/store";
import ky from "ky";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        } else {
          request.headers.delete("Authorization");
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          clearToken();
          // Use router navigation if possible, else hard reload
          window.location.href = "/login";
        }
      },
    ],
  },
});
