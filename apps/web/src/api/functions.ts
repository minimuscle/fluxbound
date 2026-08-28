export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(
    `${import.meta.env.PROD ? `https://${import.meta.env.VITE_BASE_URL}` : ""}${input}`,
    {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...init.headers,
      },
    },
  );

  if (response.status !== 200) {
    return {
      url: response.url,
      status: response.status,
      message: response.statusText,
    };
  }

  const json = await response.json();

  return {
    url: response.url,
    status: response.status,
    message: response.statusText,
    data: json,
  };
}
