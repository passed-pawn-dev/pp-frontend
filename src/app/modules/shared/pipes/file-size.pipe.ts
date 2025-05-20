import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  private readonly units = ['B', 'KB', 'MB', 'GB', 'TB'];
  private readonly bytesInKB = 1024;

  public transform(
    bytes: number,
    decimals: number = 2,
    forceUnit?: 'B' | 'KB' | 'MB' | 'GB'
  ): string {
    if (bytes == null || isNaN(bytes)) {
      return 'Invalid value';
    }

    if (forceUnit) {
      const exponent = this.units.indexOf(forceUnit);
      const size = bytes / this.bytesInKB ** exponent;
      return `${size.toFixed(decimals)} ${forceUnit}`;
    }

    let exponent = 0;
    let size = bytes;

    while (size >= 1024 && exponent < this.units.length - 1) {
      size /= 1024;
      exponent++;
    }

    if (exponent > 0 && size < 1) {
      size *= 1024;
      exponent--;
    }

    return `${size.toFixed(decimals)} ${this.units[exponent]}`;
  }
}
