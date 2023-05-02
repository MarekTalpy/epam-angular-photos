import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Photo } from './photo.model';
import { Observable, delay } from 'rxjs';

const ROOT_URL = 'https://picsum.photos';

@Injectable({ providedIn: 'root' })
export class PhotosApiService {
  constructor(private http: HttpClient) {}

  fetchPhotos(limit = 100): Observable<Photo[]> {
    const randomDelay = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    return this.http
      .get<Photo[]>(`${ROOT_URL}/v2/list?limit=${limit}`)
      .pipe(delay(randomDelay));
  }

  fetchPhotoDetail(photoId: string): Observable<Photo> {
    return this.http.get<Photo>(`${ROOT_URL}/id/${photoId}`);
  }
}
