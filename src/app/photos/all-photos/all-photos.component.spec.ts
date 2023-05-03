import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllPhotosComponent } from './all-photos.component';
import { Router } from '@angular/router';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';

describe('AllPhotosComponent', () => {
  let component: AllPhotosComponent;
  let fixture: ComponentFixture<AllPhotosComponent>;
  const mockPhotosApiService = jasmine.createSpyObj('PhotosApiService', [
    'fetchPhotos',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AllPhotosComponent],
      providers: [
        {
          provide: PhotosApiService,
          useValue: mockPhotosApiService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPhotosComponent);
    component = fixture.componentInstance;
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
});
