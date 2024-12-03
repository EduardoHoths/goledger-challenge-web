import { AxiosError } from "axios";

export function handleApiError({ status }: AxiosError) {
  switch (status) {
    case 400:
      return "The request format is invalid. Please check your input.";

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
