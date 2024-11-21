import { FieldValues, Path, UseFormSetError } from "react-hook-form"; // Assuming you're using react-hook-form
import axios from "axios";

interface FormError {
  field?: string;
  message: string;
  type: string;
}

// TODO: add toast for non-field errors
export const handleFormError = <T extends FieldValues>(
  error: unknown,
  formSetError: UseFormSetError<T>
): void => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const errors: FormError[] = error.response?.data.errors;

    if (status === 400) {
      if (Array.isArray(errors)) {
        // Map validation errors to the form fields
        errors.forEach((err: FormError) => {
          if (err.field) {
            formSetError(err.field as Path<T>, { message: err.message });
          }
        });
      } else {
        console.error("Unexpected error format:", error.response?.data);
      }
    } else {
      // Handle generic errors for other statuses
      console.error(`ERROR STATUS: ${status} [${error.response?.data.message}]`);
    }
    return;
  }

  // Handle unexpected non-Axios errors
  console.error("Unexpected error:", error);
};
