import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private httpClient = inject(HttpClient);
  private fileStorageBaseUrl = 'https://api.cloudinary.com/v1_1';

  public uploadVideo(formData: FormData, cloudName: string): Observable<any> {
    console.log(
      formData.get('api_key'),
      formData.get('timestamp'),
      formData.get('signature'),
      formData.get('resource_type'),
      formData.get('folder'),
      formData.get('file'),
      cloudName
    );
    return this.httpClient.post(
      `${this.fileStorageBaseUrl}/${cloudName}/auto/upload`,
      formData
    );
  }
}
