export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem("access_token");

  return fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...init.headers,
    },
  });
}
