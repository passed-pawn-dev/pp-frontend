import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function fileTypeValidator(
  acceptPatterns: string[],
  message = 'Invalid file type provided'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const file: File = control.value;

    if (!validateFileAgainstAcceptTypes(file, acceptPatterns)) {
      return {
        fileType: {
          requiredTypes: acceptPatterns.join(', '),
          actualType: file.type || `Unknown (extension: ${file.name.split('.').pop()})`,
          message
        }
      };
    }

    return null;
  };
}

export function validateFileAgainstAcceptTypes(
  file: File,
  acceptPatterns: string[]
): boolean {
  if (!acceptPatterns || acceptPatterns.length === 0) return true;

  return acceptPatterns.some((pattern) => {
    const lowerPattern = pattern.toLowerCase();
    const lowerFileType = file.type.toLowerCase();

    if (lowerFileType === lowerPattern) return true;

    if (lowerPattern.endsWith('/*')) {
      const [type] = lowerPattern.split('/');
      return lowerFileType.startsWith(`${type}/`);
    }

    if (pattern.startsWith('.')) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return `.${fileExtension}` === lowerPattern;
    }

    return false;
  });
}
