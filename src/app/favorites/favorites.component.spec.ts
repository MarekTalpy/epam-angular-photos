import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FavoritesComponent } from './favorites.component';
import { Router } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FavoritesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
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
