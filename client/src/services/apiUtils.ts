import { isAxiosError } from 'axios';
import { toast } from 'sonner';

/**
 * Handles API errors and displays appropriate toast notifications
 * @param error - The error caught from API calls
 * @param defaultMessage - Optional custom default message for non-axios errors
 */
export const handleApiErrorWithToast = (
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
): void => {
  let displayedMessage = defaultMessage;

  if (
    isAxiosError(error) &&
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    // Display the specific error message from the API response if available
    displayedMessage = error.response.data.error;
  }

  toast.error(displayedMessage, {
    duration: 5000,
  });
};
