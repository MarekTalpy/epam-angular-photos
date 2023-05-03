import { Injectable } from '@angular/core';

export enum LocalStorageKeys {
  FAVORITES = 'favorites',
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData<T>(key: string): T | null {
    const savedItem = localStorage.getItem(key);
    if (!savedItem) {
      return null;
    }
    return JSON.parse(savedItem);
  }
}
