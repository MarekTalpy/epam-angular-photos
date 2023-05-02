import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PhotosApiService } from './photos-api.service';

describe('Photos', () => {
  let service: PhotosApiService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotosApiService],
    });
    service = TestBed.inject(PhotosApiService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchPhotos', () => {
    it('should return an Observable<Photo[]>', () => {
      const dummyPhotos = [
        {
          id: '0',
          author: 'Author 1',
          width: 100,
          height: 200,
          url: 'https://unsplash.com/...',
          download_url: 'https://picsum.photos/...',
        },
        {
          id: '1',
          author: 'Author 2',
          width: 100,
          height: 200,
          url: 'https://unsplash.com/...',
          download_url: 'https://picsum.photos/...',
        },
      ];

      service.fetchPhotos().subscribe((photos) => {
        expect(photos.length).toBe(2);
        expect(photos).toEqual(dummyPhotos);
      });

      const req = httpMock.expectOne(`https://picsum.photos/v2/list?limit=30`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPhotos);
    });
  });

  describe('fetchPhotosDetail', () => {
    it('should return an Observable<Photo>', () => {
      const dummyPhoto = {
        id: '12345',
        author: 'Author 12345',
        width: 300,
        height: 400,
        url: 'https://unsplash.com/...',
        download_url: 'https://picsum.photos/...',
      };

      service.fetchPhotoDetail('12345').subscribe((photo) => {
        expect(photo).toEqual(dummyPhoto);
      });

      const req = httpMock.expectOne(`https://picsum.photos/id/12345`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPhoto);
    });
  });
});
