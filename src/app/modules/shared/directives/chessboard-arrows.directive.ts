import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  inject
} from '@angular/core';
import { Severity } from '../enums/severities.enum';
import { Arrow } from '../models/arrow.model';

interface Vector {
  x: number;
  y: number;
}

@Directive({
  selector: '[appChessboardArrows]'
})
export class ChessboardArrowsDirective implements AfterViewInit, OnChanges {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @Input() public appChessboardArrows: Arrow[] = [];

  private severityToColors: Map<Severity, string> = new Map([
    [Severity.Warning, '#ffcb29'],
    [Severity.Danger, '#d40000'],
    [Severity.Info, '#008cff'],
    [Severity.Correct, '#39aa67']
  ]);

  public ngAfterViewInit(): void {
    this.setArrows(this.appChessboardArrows);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['appChessboardArrows'].previousValue) {
      const newArrows = changes['appChessboardArrows'].currentValue.filter(
        (item: Arrow) => !changes['appChessboardArrows'].previousValue.includes(item)
      );
      this.setArrows(newArrows);

      const deletedArrows = changes['appChessboardArrows'].previousValue.filter(
        (item: Arrow) => !changes['appChessboardArrows'].currentValue.includes(item)
      );
      this.deleteArrows(deletedArrows);
    }
  }

  private getArrowStyles(
    dangerColor: string,
    warningColor: string,
    infoColor: string,
    correctColor: string
  ): string {
    return `
    .arrow {
      height: 1rem;
      opacity: 0.7;
      z-index: 100;
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      box-sizing: content-box;
      pointer-events: none;
      &::after {
        transform-origin: right;
        rotate: 90deg;
        top: 50%;
        left: calc(100% - 1.3rem);
        position: absolute;
        width: 2rem;
        height: 2rem;
        content: "";
        background-size: contain; /* or cover */
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  
    .arrow-danger {
      &::after {
        background-image: url("data:image/svg+xml,<svg width='800px' height='800px' viewBox='0 0 512 512' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='drop' fill='${dangerColor}' transform='translate(32.000000, 42.666667)'><path d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z' id='Combined-Shape'></path></g></g></svg>");
      }
    }
    .arrow-warning {
      &::after {
        background-image: url("data:image/svg+xml,<svg width='800px' height='800px' viewBox='0 0 512 512' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='drop' fill='${warningColor}' transform='translate(32.000000, 42.666667)'><path d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z' id='Combined-Shape'></path></g></g></svg>");
      }
    }
    .arrow-info {
      &::after {
        background-image: url("data:image/svg+xml,<svg width='800px' height='800px' viewBox='0 0 512 512' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='drop' fill='${infoColor}' transform='translate(32.000000, 42.666667)'><path d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z' id='Combined-Shape'></path></g></g></svg>");
      }
    }
    .arrow-correct {
      &::after {
        background-image: url("data:image/svg+xml,<svg width='800px' height='800px' viewBox='0 0 512 512' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='drop' fill='${correctColor}' transform='translate(32.000000, 42.666667)'><path d='M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z' id='Combined-Shape'></path></g></g></svg>");
      }
    }
    `;
  }

  private calculateVector(index: number): Vector {
    return {
      x: index % 8,
      y: Math.floor(index / 8)
    };
  }

  private getAngle(source: number, destination: number): number {
    const sourceVector: Vector = this.calculateVector(source);
    const destinationVector: Vector = this.calculateVector(destination);

    const angleRad = Math.atan2(
      destinationVector.y - sourceVector.y,
      destinationVector.x - sourceVector.x
    );

    return angleRad * (180 / Math.PI);
  }

  private getDistance(source: number, destination: number, fieldWidth: number): number {
    const sourceVector: Vector = this.calculateVector(source);
    const destinationVector: Vector = this.calculateVector(destination);

    const dx = destinationVector.x - sourceVector.x;
    const dy = destinationVector.y - sourceVector.y;

    return Math.sqrt(dx * dx + dy * dy) * fieldWidth;
  }

  private generateArrowId(source: number, destination: number): string {
    return 'arrow-' + source.toString() + '-' + destination.toString();
  }

  private deleteArrows(arrows: Arrow[]): void {
    arrows.forEach((arrow) => {
      const id = this.generateArrowId(arrow.source, arrow.destination);
      const arrowToDelete: HTMLElement = document.getElementById(id)!;
      arrowToDelete.remove();
    });
  }

  private setArrows(arrows: Arrow[]): void {
    const children = this.el.nativeElement.children;

    const dangerColor: string = this.severityToColors
      .get(Severity.Danger)!
      .replace('#', '%23');
    const warningColor: string = this.severityToColors
      .get(Severity.Warning)!
      .replace('#', '%23');
    const infoColor: string = this.severityToColors
      .get(Severity.Info)!
      .replace('#', '%23');
    const correctColor: string = this.severityToColors
      .get(Severity.Correct)!
      .replace('#', '%23');

    const existingArrowStyles: HTMLElement | null =
      document.getElementById('arrowStyles');
    if (existingArrowStyles) {
      existingArrowStyles.remove();
    }

    const style: HTMLElement = this.renderer.createElement('style');
    style.id = 'arrowStyles';
    style.textContent = this.getArrowStyles(
      dangerColor,
      warningColor,
      infoColor,
      correctColor
    );
    this.renderer.appendChild(document.head, style);

    arrows.forEach((arrow) => {
      const sourceField: HTMLElement = children.item(arrow.source);
      const fieldWidth: number = sourceField.getBoundingClientRect().width;
      const arrowDiv: HTMLElement = this.renderer.createElement('div');
      arrowDiv.id = this.generateArrowId(arrow.source, arrow.destination);
      arrowDiv.style.backgroundColor = this.severityToColors.get(arrow.severity)!;

      const angle: number = this.getAngle(arrow.source, arrow.destination);
      const distance: number = this.getDistance(
        arrow.source,
        arrow.destination,
        fieldWidth
      );

      arrowDiv.style.transformOrigin = 'left center';
      arrowDiv.style.transform = `translateY(-50%) rotate(${angle}deg)`;
      arrowDiv.style.width = `calc(${distance}px - 1.4rem)`;

      switch (arrow.severity) {
        case Severity.Correct:
          arrowDiv.className = 'arrow arrow-correct';
          break;
        case Severity.Danger:
          arrowDiv.className = 'arrow arrow-danger';
          break;
        case Severity.Warning:
          arrowDiv.className = 'arrow arrow-warning';
          break;
        case Severity.Info:
          arrowDiv.className = 'arrow arrow-info';
      }

      this.renderer.appendChild(sourceField, arrowDiv);
    });
  }
}
