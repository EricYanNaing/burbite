type QueryParam =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

type QueryParams = Record<string, QueryParam>;

type ApiRequestOptions<TBody = unknown> = Omit<RequestInit, "body"> & {
  params?: QueryParams;
  body?: TBody;
  errorMessage?: string;
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api").replace(
  /\/$/,
  "",
);

export async function apiGet<TResponse>(
  path: string,
  options: Omit<ApiRequestOptions, "body"> = {},
) {
  return apiRequest<TResponse>(path, {
    ...options,
    method: "GET",
  });
}

export async function apiPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options: Omit<ApiRequestOptions<TBody>, "body"> = {},
) {
  return apiRequest<TResponse, TBody>(path, {
    ...options,
    method: "POST",
    body,
  });
}

export async function apiPatch<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options: Omit<ApiRequestOptions<TBody>, "body"> = {},
) {
  return apiRequest<TResponse, TBody>(path, {
    ...options,
    method: "PATCH",
    body,
  });
}

export async function apiDelete<TResponse>(
  path: string,
  options: Omit<ApiRequestOptions, "body"> = {},
) {
  return apiRequest<TResponse>(path, {
    ...options,
    method: "DELETE",
  });
}

async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  { params, body, errorMessage = "Request failed.", headers, ...init }: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const resolvedHeaders = new Headers(headers);
  const resolvedBody = createRequestBody(body, resolvedHeaders);
  const response = await fetch(buildApiUrl(path, params), {
    ...init,
    headers: resolvedHeaders,
    body: resolvedBody,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, errorMessage));
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<TResponse>;
  }

  return (await response.text()) as TResponse;
}

function buildApiUrl(path: string, params?: QueryParams) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === null || value === undefined || value === "") {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => {
        searchParams.append(key, String(entry));
      });
      continue;
    }

    searchParams.set(key, String(value));
  }

  const query = searchParams.toString();

  return `${API_BASE_URL}${normalizedPath}${query ? `?${query}` : ""}`;
}

function createRequestBody<TBody>(
  body: TBody | undefined,
  headers: Headers,
): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function getErrorMessage(response: Response, fallback: string) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = (await response.json()) as { message?: string };

    return data.message ?? fallback;
  }

  const text = await response.text();

  return text || fallback;
}
