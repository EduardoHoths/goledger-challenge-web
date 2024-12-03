import { AxiosError } from "axios";

type ApiErrorResponse = { error: string };

export function handleApiError(error: AxiosError<ApiErrorResponse>) {
  const status = error.response?.status;
  const data = error.response?.data;

  switch (status) {
    case 400:
      return data?.error || "Invalid request with missing error details.";

    case 409:
      return "The asset already exists. Consider updating it instead.";

    case 500:
    case 501:
    case 502:
    case 503:
      return "An internal error occurred. Please try again later.";

    default:
      return "An unexpected error occurred.";
  }
}
