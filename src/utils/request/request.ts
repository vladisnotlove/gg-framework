const post = <TBody = unknown, TResponse = unknown>(
  url: string,
  token: string,
  body?: TBody
) => {
  return fetch(process.env.API_URL + "/" + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    method: "POST",
  }).then(async (response) => {
    const data = await response.json();
    const status = await response.status;
    if (response.ok) {
      return data as TResponse;
    }
    throw new Error("API error", { cause: { data, status } });
  });
};

export const request = {
  post,
};
