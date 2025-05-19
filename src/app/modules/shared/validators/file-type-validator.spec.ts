import { AbstractControl, FormControl } from '@angular/forms';
import {
  validateFileAgainstAcceptTypes,
  fileTypeValidator
} from './file-type-validator';

describe('FileTypeValidator', () => {
  // Helper function to create a mock File object
  function createMockFile(name: string, type: string): File {
    return new File([''], name, { type });
  }

  describe('validateFileAgainstAcceptTypes (core function)', () => {
    it('should return true when no patterns are provided', () => {
      const file = createMockFile('test.mp4', 'video/mp4');
      expect(validateFileAgainstAcceptTypes(file, [])).toBeTrue();
      expect(validateFileAgainstAcceptTypes(file, null as any)).toBeTrue();
    });

    it('should match exact MIME types', () => {
      const file = createMockFile('test.mp4', 'video/mp4');
      expect(validateFileAgainstAcceptTypes(file, ['video/mp4'])).toBeTrue();
      expect(validateFileAgainstAcceptTypes(file, ['VIDEO/MP4'])).toBeTrue(); // case insensitive
      expect(validateFileAgainstAcceptTypes(file, ['video/webm'])).toBeFalse();
    });

    it('should handle wildcard subtypes (video/*)', () => {
      const mp4File = createMockFile('test.mp4', 'video/mp4');
      const webmFile = createMockFile('test.webm', 'video/webm');
      const pngFile = createMockFile('test.png', 'image/png');

      expect(validateFileAgainstAcceptTypes(mp4File, ['video/*'])).toBeTrue();
      expect(validateFileAgainstAcceptTypes(webmFile, ['video/*'])).toBeTrue();
      expect(validateFileAgainstAcceptTypes(pngFile, ['video/*'])).toBeFalse();
    });

    it('should handle file extensions', () => {
      const mp4File = createMockFile('test.mp4', '');
      const pdfFile = createMockFile('document.pdf', '');

      expect(validateFileAgainstAcceptTypes(mp4File, ['.mp4'])).toBeTrue();
      expect(validateFileAgainstAcceptTypes(mp4File, ['.MP4'])).toBeTrue(); // case insensitive
      expect(validateFileAgainstAcceptTypes(mp4File, ['.mov'])).toBeFalse();
      expect(validateFileAgainstAcceptTypes(pdfFile, ['.pdf'])).toBeTrue();
    });

    it('should handle mixed patterns', () => {
      const mp4File = createMockFile('test.mp4', 'video/mp4');
      const movFile = createMockFile('test.mov', 'video/quicktime');
      const jpgFile = createMockFile('test.jpg', 'image/jpeg');

      const patterns = ['video/*', '.jpg', 'image/png'];

      expect(validateFileAgainstAcceptTypes(mp4File, patterns)).toBeTrue();
      expect(validateFileAgainstAcceptTypes(movFile, patterns)).toBeTrue();
      expect(validateFileAgainstAcceptTypes(jpgFile, patterns)).toBeTrue();
    });
  });

  describe('fileTypeValidator (Angular validator)', () => {
    let control: AbstractControl;

    beforeEach(() => {
      control = new FormControl();
    });

    it('should return null when no file is selected', () => {
      control.setValue(null);
      const validator = fileTypeValidator(['image/*']);
      expect(validator(control)).toBeNull();
    });

    it('should return null when file type matches', () => {
      const file = createMockFile('test.png', 'image/png');
      control.setValue(file);

      const validator = fileTypeValidator(['image/*']);
      expect(validator(control)).toBeNull();
    });

    it('should return validation error when file type does not match', () => {
      const file = createMockFile('test.mp4', 'video/mp4');
      control.setValue(file);

      const validator = fileTypeValidator(['image/*']);
      const result = validator(control);

      expect(result).not.toBeNull();
      expect(result?.['fileType']).toBeDefined();
      expect(result?.['fileType'].requiredTypes).toBe('image/*');
      expect(result?.['fileType'].actualType).toBe('video/mp4');
    });

    it('should handle files with no type but matching extension', () => {
      const file = createMockFile('test.pdf', '');
      control.setValue(file);

      const validator = fileTypeValidator(['.pdf']);
      expect(validator(control)).toBeNull();
    });

    it('should return proper error for files with unknown type', () => {
      const file = createMockFile('test.unknown', '');
      control.setValue(file);

      const validator = fileTypeValidator(['image/*']);
      const result = validator(control);

      expect(result?.['fileType'].actualType).toContain('Unknown (extension: unknown)');
    });

    it('should work with multiple allowed patterns', () => {
      const mp4File = createMockFile('test.mp4', 'video/mp4');
      const jpgFile = createMockFile('test.jpg', 'image/jpeg');
      const txtFile = createMockFile('notes.txt', 'text/plain');

      const validator = fileTypeValidator(['video/*', 'image/*']);

      control.setValue(mp4File);
      expect(validator(control)).toBeNull();

      control.setValue(jpgFile);
      expect(validator(control)).toBeNull();

      control.setValue(txtFile);
      expect(validator(control)).not.toBeNull();
    });
  });
});
