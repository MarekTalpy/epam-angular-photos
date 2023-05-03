import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PhotosApiService } from 'src/app/shared/photos-api.service';
import { PhotosDetailComponent } from './photos-detail.component';
import { FavoritesStorageService } from 'src/app/shared/favorites-storage.service';

describe('PhotosDetailComponent', () => {
  let component: PhotosDetailComponent;
  let fixture: ComponentFixture<PhotosDetailComponent>;
  const mockPhotosApiService = jasmine.createSpyObj('PhotosApiService', [
    'fetchPhotoDetail',
  ]);
  let favoritesStorageService: FavoritesStorageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PhotosDetailComponent],
      providers: [
        {
          provide: PhotosApiService,
          useValue: mockPhotosApiService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosDetailComponent);
    component = fixture.componentInstance;
    favoritesStorageService = TestBed.inject(FavoritesStorageService);
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
});
