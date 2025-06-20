export interface FormErrors {
  required?: boolean;
  email?: boolean;
  maxlength?: { requiredLength: number; actualLength: number };
  minlength?: { requiredLength: number; actualLength: number };
  min?: { min: number; actual: number };
  max?: { min: number; actual: number };
  fileType?: { requiredTypes: string[]; actualType: string; message: string };
  fileSize?: { requiredSize: number; actualSize: number };
}
