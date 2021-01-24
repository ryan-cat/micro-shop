export const internalServerError = 'Oops! Something went wrong! Please try again.';

type ValidationErrorField = (string | number)[];

interface ValidationErrorItem {
  path: ValidationErrorField;
  message: string;
}

export class ValidationErrors {
  private items: ValidationErrorItem[];

  constructor(items: ValidationErrorItem[] = []) {
    this.items = items;
  }

  hasValidationError = (field: string | ValidationErrorField): boolean => {
    return !!this.getValidationError(field);
  };

  getValidationError = (field: string | ValidationErrorField): string => {
    const path = this.getPath(field);
    const errors = this.items.filter((x) => JSON.stringify(x.path) === JSON.stringify(path));

    let message = '';
    errors.forEach((x) => {
      message = `${message} ${x.message}`;
    });

    return message.trim();
  };

  filter = (field: string | ValidationErrorField): ValidationErrors => {
    const path = this.getPath(field);
    return new ValidationErrors(
      this.items
        .filter((x) => x.path.join().startsWith(path.join()))
        .map((x) => ({
          ...x,
          field: x.path.slice(path.length)
        }))
    );
  };

  private getPath = (field: string | ValidationErrorField): ValidationErrorField => {
    let key = null;
    if (field instanceof String || typeof field === 'string') {
      key = [field];
    } else {
      key = field;
    }
    return key as ValidationErrorField;
  };
}
