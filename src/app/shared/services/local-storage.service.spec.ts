import { TestBed, waitForAsync } from '@angular/core/testing';

import { LocalStorageKeys, LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);
  }));

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('saveData', () => {
    it('should save data to local storage', () => {
      const setItemSpy = spyOn(localStorage, 'setItem');
      const dummyData = [
        {
          id: '0',
          author: 'Author 1',
        },
      ];
      const dummyDataStringified = '[{"id":"0","author":"Author 1"}]';
      const dummyKey = LocalStorageKeys.FAVORITES;

      service.saveData(dummyKey, dummyData);

      expect(setItemSpy).toHaveBeenCalledWith(dummyKey, dummyDataStringified);
    });
  });

  describe('getData', () => {
    it('should return null if no data are stored in local storage for given key', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const dummyKey = LocalStorageKeys.FAVORITES;

      const savedDummyData = service.getData(dummyKey);

      expect(savedDummyData).toEqual(null);
    });

    it('should return data stored in local storage if they exist already', () => {
      const dummyDataStringified = '[{"id":"1","author":"Author 1"}]';
      const dummyDataParsed = [
        {
          id: '1',
          author: 'Author 1',
        },
      ];
      spyOn(localStorage, 'getItem').and.returnValue(dummyDataStringified);
      const dummyKey = LocalStorageKeys.FAVORITES;

      const savedDummyData = service.getData(dummyKey);

      expect(savedDummyData).toEqual(dummyDataParsed);
    });
  });
});
