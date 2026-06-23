import { apiFetch } from "./functions";

export const user = {
  GET: () => {
    return apiFetch("/api/user");
  },
  details: {
    GET: () => {
      return apiFetch("/api/user/details");
    },
  },
  login: {
    POST: async ({ email, password }: { email: string; password: string }) => {
      const login = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await login.json();
      localStorage.setItem("access_token", data.session.access_token);
      return data;
    },
  },

  logout: () => {
    return apiFetch("/api/user/logout", { method: "POST" });
  },
};
