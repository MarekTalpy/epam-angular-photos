import { TestBed, waitForAsync } from '@angular/core/testing';

import { FavoritesStorageService } from './favorites-storage.service';
import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

describe('FavoritesStorageService', () => {
  let service: FavoritesStorageService;
  let localStorageService: LocalStorageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesStorageService],
    });
    service = TestBed.inject(FavoritesStorageService);
    localStorageService = TestBed.inject(LocalStorageService);
  }));

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('isInFavorites', () => {
    it('should return true if photo is already saved in local storage', () => {
      const dummyPhotos = [
        {
          id: '0',
          author: 'Author 0',
          width: 10,
          height: 20,
          url: 'https://unsplash.com/111',
          download_url: 'https://picsum.photos/111',
        },
        {
          id: '1',
          author: 'Author 1',
          width: 30,
          height: 40,
          url: 'https://unsplash.com/12345',
          download_url: 'https://picsum.photos/12345',
        },
      ];
      spyOn(localStorageService, 'getData').and.returnValue(dummyPhotos);

      expect(service.isInFavorites('0')).toBeTruthy();
    });

    it('should return false if photo was not yet saved in local storage', () => {
      const dummyPhotos = [
        {
          id: '0',
          author: 'Author 0',
          width: 10,
          height: 20,
          url: 'https://unsplash.com/111',
          download_url: 'https://picsum.photos/111',
        },
        {
          id: '1',
          author: 'Author 1',
          width: 30,
          height: 40,
          url: 'https://unsplash.com/12345',
          download_url: 'https://picsum.photos/12345',
        },
      ];
      spyOn(localStorageService, 'getData').and.returnValue(dummyPhotos);

      expect(service.isInFavorites('3')).toBeFalsy();
    });

    it('should return false if there is no data for "favorites" key in Local storage', () => {
      spyOn(localStorageService, 'getData').and.returnValue(null);

      expect(service.isInFavorites('3')).toBeFalsy();
    });
  });

  describe('toggleFavorites', () => {
    it('should save to local storage new photo if favorites are empty', () => {
      spyOn(localStorageService, 'getData').and.returnValue(null);
      const saveDataSpy = spyOn(localStorageService, 'saveData');
      const dummyPhoto = {
        id: '1',
        author: 'Author 1',
        width: 30,
        height: 40,
        url: 'https://unsplash.com/12345',
        download_url: 'https://picsum.photos/12345',
      };

      service.toggleFavorites(dummyPhoto);

      expect(saveDataSpy).toHaveBeenCalledWith(LocalStorageKeys.FAVORITES, [
        dummyPhoto,
      ]);
    });

    it('should remove existing photo from favorites (if there is at least one favorite photo already)', () => {
      const saveDataSpy = spyOn(localStorageService, 'saveData');
      const dummyPhotos = [
        {
          id: '0',
          author: 'Author 0',
          width: 10,
          height: 20,
          url: 'https://unsplash.com/111',
          download_url: 'https://picsum.photos/111',
        },
        {
          id: '1',
          author: 'Author 1',
          width: 30,
          height: 40,
          url: 'https://unsplash.com/12345',
          download_url: 'https://picsum.photos/12345',
        },
      ];
      spyOn(localStorageService, 'getData').and.returnValue(dummyPhotos);
      const photoToRemove = {
        id: '1',
        author: 'Author 1',
        width: 30,
        height: 40,
        url: 'https://unsplash.com/12345',
        download_url: 'https://picsum.photos/12345',
      };
      const expectedPhotos = [
        {
          id: '0',
          author: 'Author 0',
          width: 10,
          height: 20,
          url: 'https://unsplash.com/111',
          download_url: 'https://picsum.photos/111',
        },
      ];

      service.toggleFavorites(photoToRemove);

      expect(saveDataSpy).toHaveBeenCalledWith(
        LocalStorageKeys.FAVORITES,
        expectedPhotos
      );
    });

    it('should add a new photo to favorites (if there is at least one favorite photo already)', () => {
      const saveDataSpy = spyOn(localStorageService, 'saveData');
      const dummyPhotos = [
        {
          id: '0',
          author: 'Author 0',
          width: 10,
          height: 20,
          url: 'https://unsplash.com/111',
          download_url: 'https://picsum.photos/111',
        },
        {
          id: '1',
          author: 'Author 1',
          width: 30,
          height: 40,
          url: 'https://unsplash.com/12345',
          download_url: 'https://picsum.photos/12345',
        },
      ];
      spyOn(localStorageService, 'getData').and.returnValue(dummyPhotos);
      const photoToAdd = {
        id: '3',
        author: 'Author 1',
        width: 30,
        height: 40,
        url: 'https://unsplash.com/12345',
        download_url: 'https://picsum.photos/12345',
      };
      const expectedPhotos = [
        {
          id: '0',
          author: 'Author 0',
          width: 10,
          height: 20,
          url: 'https://unsplash.com/111',
          download_url: 'https://picsum.photos/111',
        },
        {
          id: '1',
          author: 'Author 1',
          width: 30,
          height: 40,
          url: 'https://unsplash.com/12345',
          download_url: 'https://picsum.photos/12345',
        },
        {
          id: '3',
          author: 'Author 1',
          width: 30,
          height: 40,
          url: 'https://unsplash.com/12345',
          download_url: 'https://picsum.photos/12345',
        },
      ];

      service.toggleFavorites(photoToAdd);

      expect(saveDataSpy).toHaveBeenCalledWith(
        LocalStorageKeys.FAVORITES,
        expectedPhotos
      );
    });
  });
});
