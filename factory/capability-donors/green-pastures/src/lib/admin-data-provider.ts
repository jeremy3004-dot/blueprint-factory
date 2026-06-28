type AdminMutationOptions<TBody> = {
  body?: TBody;
  method?: "POST" | "PATCH" | "DELETE";
};

type AdminMutationResult<TData> = {
  data: TData;
};

function messageFromPayload(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "message" in payload) {
    return String(payload.message);
  }

  return fallback;
}

async function requestJson<TData, TBody = unknown>(
  path: string,
  options: AdminMutationOptions<TBody> = {},
): Promise<AdminMutationResult<TData>> {
  const response = await fetch(path, {
    method: options.method ?? "POST",
    headers: options.body === undefined ? undefined : { "content-type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(messageFromPayload(payload, "The admin action failed."));
  }

  return { data: payload as TData };
}

export const adminOpsDataProvider = {
  create<TData, TBody>(resource: string, body: TBody) {
    return requestJson<TData, TBody>(`/api/admin/${resource}`, { method: "POST", body });
  },
  update<TData, TBody>(resource: string, id: string, body: TBody) {
    return requestJson<TData, TBody>(`/api/admin/${resource}/${id}`, { method: "PATCH", body });
  },
  deleteOne<TData>(resource: string, id: string) {
    return requestJson<TData>(`/api/admin/${resource}/${id}`, { method: "DELETE" });
  },
  custom<TData, TBody = unknown>(path: string, options: AdminMutationOptions<TBody> = {}) {
    return requestJson<TData, TBody>(path, options);
  },
};
