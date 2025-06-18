import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileHandlingService {
  private httpClient = inject(HttpClient);
  private fileStorageBaseUrl = 'https://api.cloudinary.com/v1_1';

  public uploadVideo(formData: FormData, cloudName: string): Observable<any> {
    return this.httpClient.post(
      `${this.fileStorageBaseUrl}/${cloudName}/upload`,
      formData
    );
  }

  public uploadThumbnail(formData: FormData, cloudName: string): Observable<any> {
    return this.httpClient.post(
      `${this.fileStorageBaseUrl}/${cloudName}/upload`,
      formData
    );
  }

  public downloadPrivateVideo(temporaryVideoDownloadUrl: string): Observable<Blob> {
    return this.httpClient.get(temporaryVideoDownloadUrl, {
      responseType: 'blob'
    });
  }
}
