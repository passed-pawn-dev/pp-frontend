import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSizeInBytes: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;

    if (!file) {
      return null;
    }

    let actualFile: File;
    if (file instanceof FileList) {
      if (file.length === 0) return null;
      actualFile = file[0];
    } else if (file instanceof File) {
      actualFile = file;
    } else {
      return { invalidFile: true };
    }

    return actualFile.size > maxSizeInBytes
      ? {
          fileSize: {
            requiredSize: maxSizeInBytes,
            actualSize: actualFile.size
          }
        }
      : null;
  };
}
