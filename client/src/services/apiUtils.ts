import { toast } from 'sonner';
import { isAxiosError } from 'axios';

/**
 * Extracts the error message from API errors without displaying toast notifications
 * @param error - The error caught from API calls
 * @param defaultMessage - Optional custom default message for non-axios errors
 * @returns The extracted error message
 */
export const extractErrorMessage = (
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
): string => {
  if (
    isAxiosError(error) &&
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    // Extract the specific error message from the API response if available
    return error.response.data.error;
  }

  return defaultMessage;
};

/**
 * Handles API errors and displays appropriate toast notifications
 * @param error - The error caught from API calls
 * @param defaultMessage - Optional custom default message for non-axios errors
 */
export const handleApiErrorWithToast = (
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
): void => {
  const displayedMessage = extractErrorMessage(error, defaultMessage);

  toast.error(displayedMessage, {
    duration: 5000,
  });
};
