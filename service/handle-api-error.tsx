import { AxiosError } from "axios";

type ApiErrorResponse = { error: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleApiError(error: AxiosError<ApiErrorResponse>, translation: any) {
  const status = error.response?.status;
  const data = error.response?.data;

  switch (status) {
    case 400:
      return data?.error || translation("400");

    case 409:
      return translation("409");

    case 500:
    case 501:
    case 502:
    case 503:
      return translation("500");

    default:
      return translation("default");
  }
}
