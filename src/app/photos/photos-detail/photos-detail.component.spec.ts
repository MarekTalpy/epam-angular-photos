import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PhotosDetailComponent } from './photos-detail.component';
import { PhotosApiService } from 'src/app/shared/services/photos-api.service';
import { FavoritesStorageService } from 'src/app/shared/services/favorites-storage.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PhotosDetailComponent', () => {
  let component: PhotosDetailComponent;
  let fixture: ComponentFixture<PhotosDetailComponent>;
  let favoritesStorageService: FavoritesStorageService;
  let photosApiService: PhotosApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      declarations: [PhotosDetailComponent],
      providers: [PhotosApiService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosDetailComponent);
    component = fixture.componentInstance;
    favoritesStorageService = TestBed.inject(FavoritesStorageService);
    photosApiService = TestBed.inject(PhotosApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getButtonLabel', () => {
    it('should return correct button label if photo stored in favorites', () => {
      spyOn(favoritesStorageService, 'isInFavorites').and.returnValue(true);

      expect(component.getButtonLabel('id123')).toBe('Remove from Favorites');
    });

    it('should return correct button label if photo NOT stored in favorites', () => {
      spyOn(favoritesStorageService, 'isInFavorites').and.returnValue(false);

      expect(component.getButtonLabel('id345')).toBe('Add to Favorites');
    });
  });

  describe('toggleFavorites', () => {
    it('should call toggleFavorites with selected photo', () => {
      const selectedDummyPhoto = {
        id: '1',
        author: 'Author 2',
        width: 100,
        height: 200,
        url: 'https://unsplash.com/...',
        download_url: 'https://picsum.photos/...',
      };
      const toggleFavoritesSpy = spyOn(
        favoritesStorageService,
        'toggleFavorites'
      );

      component.toggleFavorites(selectedDummyPhoto);

      expect(toggleFavoritesSpy).toHaveBeenCalledWith(selectedDummyPhoto);
    });
  });

  describe('ngOnInit', () => {
    it('should set isError and isLoading boolean values in case of the error correctly', fakeAsync(() => {
      spyOn(photosApiService, 'fetchPhotoDetail').and.returnValue(of(null));

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.isError).toBeTruthy();
      expect(component.isLoading).toBeFalsy();
    }));

    it('should set isError and isLoading boolean values in case of the success correctly', fakeAsync(() => {
      spyOn(photosApiService, 'fetchPhotoDetail').and.returnValue(
        of({
          id: '1',
          author: 'Author 2',
          width: 100,
          height: 200,
          url: 'https://unsplash.com/...',
          download_url: 'https://picsum.photos/...',
        })
      );

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(component.isError).toBeFalsy();
      expect(component.isLoading).toBeFalsy();
      expect(component.selectedPhoto).toBeTruthy();
    }));
  });
});
