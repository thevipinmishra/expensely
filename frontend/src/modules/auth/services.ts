import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface LoginResponse {
  message: string;
  token: string;
}

interface RegisterResponse {
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface MetaResponse {
  message: string;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    currency: string;
  };
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await api
    .post<LoginResponse>("auth/login", {
      json: {
        email,
        password,
      },
    })
    .json();

  return res;
};

export const singup = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = api
    .post<RegisterResponse>("auth/signup", {
      json: {
        firstName,
        lastName,
        email,
        password,
      },
    })
    .json();
  return res;
};

export const getMeta = async () => {
  const res = await api.get<MetaResponse>("meta").json();
  return res;
};

export const useMeta = () => {
  return useQuery({
    queryKey: ["meta"],
    queryFn: getMeta,
    staleTime: 1000 * 60 * 60,
  });
};
