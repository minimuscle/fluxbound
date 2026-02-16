import { apiFetch } from "./functions";

export const user = {
  GET: async () => {
    return await apiFetch("/api/user");
  },
  details: {
    GET: async () => {
      return await apiFetch("/api/user/details");
    },
  },
  login: {
    POST: async ({ email, password }: { email: string; password: string }) => {
      const login = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await login.json();
      localStorage.setItem("access_token", data.access_token);
      return data;
    },
  },
};
