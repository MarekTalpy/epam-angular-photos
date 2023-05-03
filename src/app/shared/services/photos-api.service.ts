import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, of } from 'rxjs';

import { Photo } from '../models/photo.model';

const ROOT_URL = 'https://picsum.photos';

@Injectable({ providedIn: 'root' })
export class PhotosApiService {
  constructor(private http: HttpClient) {}

  fetchPhotos(limit = 30): Observable<Photo[] | null> {
    const randomDelay = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    return this.http.get<Photo[]>(`${ROOT_URL}/v2/list?limit=${limit}`).pipe(
      delay(randomDelay),
      catchError((err) => of(null))
    );
  }

  fetchPhotoDetail(photoId: string): Observable<Photo | null> {
    return this.http
      .get<Photo>(`${ROOT_URL}/id/${photoId}/info`)
      .pipe(catchError((err) => of(null)));
  }
}
