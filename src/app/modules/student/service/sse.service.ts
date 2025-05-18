import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  public constructor(private authService: AuthService) {}

  public connect(url: string): Observable<string> {
    return new Observable<string>((observer) => {
      const jwtToken = this.authService.getToken();
      const eventSource = new EventSourcePolyfill(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: false
      });

      eventSource.onmessage = (event) => {
        observer.next(event.data);
        observer.complete();
        eventSource.close();
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
