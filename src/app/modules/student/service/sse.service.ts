import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private eventSource: EventSourcePolyfill | null = null;

  public constructor(private authService: AuthService) {}

  public connect(url: string): Observable<string> {
    this.disconnect();

    return new Observable<string>((observer) => {
      const jwtToken = this.authService.getToken();
      this.eventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: false
      });

      this.eventSource.onmessage = (event) => {
        observer.next(event.data);
        observer.complete();
        this.disconnect();
      };

      this.eventSource.onerror = (error) => {
        observer.error(error);
        this.disconnect();
      };

      return () => {
        this.disconnect();
      };
    });
  }

  public disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
