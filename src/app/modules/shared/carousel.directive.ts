import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appCarousel]',
  exportAs: 'appCarousel'
})
export class CarouselDirective {
  private el = inject(ElementRef);
  private shift = { percentage: 0, rem: 0 };

  public right(): void {
    this.shift = { percentage: this.shift.percentage - 100, rem: this.shift.rem - 3 };
    this.el.nativeElement.style.transform = `translateX(calc(${this.shift.percentage}% + ${this.shift.rem}rem))`;
  }

  public left(): void {
    this.shift = { percentage: this.shift.percentage + 100, rem: this.shift.rem + 3 };
    this.el.nativeElement.style.transform = `translateX(calc(${this.shift.percentage}% + ${this.shift.rem}rem))`;
  }
}
