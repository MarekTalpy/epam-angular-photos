import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AllPhotosComponent } from './all-photos.component';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';

describe('AllPhotosComponent', () => {
  let component: AllPhotosComponent;
  let fixture: ComponentFixture<AllPhotosComponent>;
  let photosApiService: PhotosApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AllPhotosComponent],
      providers: [PhotosApiService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPhotosComponent);
    component = fixture.componentInstance;
    photosApiService = TestBed.inject(PhotosApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handlePhotoClicked', () => {
    it('should navigate to the correct url', () => {
      const router = TestBed.inject(Router);
      const dummyPhoto = {
        id: '123',
        author: 'Author 123',
        width: 100,
        height: 200,
        url: 'https://unsplash.com/123',
        download_url: 'https://picsum.photos/123',
      };
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

      component.handlePhotoClicked(dummyPhoto);

      expect(navigateByUrlSpy).toHaveBeenCalledWith('/photos/123');
    });
  });

  describe('handleScroll', () => {
    it('should show spinner and notify about repeating of new photos fetching', () => {
      const nextSpy = spyOn(component.bottomPageReached$, 'next');

      component.handleScroll();
      fixture.detectChanges();

      expect(component.isLoading).toBeTruthy();
      expect(nextSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('should set isError and isLoading boolean values in case of the error correctly', fakeAsync(() => {
      spyOn(photosApiService, 'fetchPhotos').and.returnValue(of(null));

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.isError).toBeTruthy();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should set isError and isLoading boolean values in case of the success correctly', fakeAsync(() => {
      spyOn(photosApiService, 'fetchPhotos').and.returnValue(
        of([
          {
            id: '1',
            author: 'Author 1',
            width: 100,
            height: 200,
            url: 'https://unsplash.com/1',
            download_url: 'https://picsum.photos/1',
          },
          {
            id: '2',
            author: 'Author 2',
            width: 100,
            height: 200,
            url: 'https://unsplash.com/2',
            download_url: 'https://picsum.photos/2',
          },
        ])
      );

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.isError).toBeFalsy();
      expect(component.isLoading).toBeFalsy();
      expect(component.allLoadedPhotos.length).toBeGreaterThan(0);
    }));
  });
});
