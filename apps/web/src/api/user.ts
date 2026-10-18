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
      const { data } = await apiFetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("access_token", data.session.access_token);
      return data;
    },
  },

  logout: () => {
    return apiFetch("/api/user/logout", { method: "POST" });
  },

  // Deck Control.
  getDeck: () => {
    return apiFetch("/api/user/deck");
  },
  saveDeck: async (deck: string) => {
    const response = await apiFetch("/api/user/deck", {
      method: "PUT",
      body: JSON.stringify({ deck }),
    });
    if (response.status !== 200) {
      throw new Error(response.message || "Failed to save deck");
    }
    return response;
  },
};
