import { Injectable } from '@angular/core';

export enum LocalStorageKeys {
  FAVORITES = 'favorites',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData<T>(key: LocalStorageKeys, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(key: LocalStorageKeys): T | null {
    const savedItem = localStorage.getItem(key);
    if (!savedItem) {
      return null;
    }
    return JSON.parse(savedItem);
  }
}
