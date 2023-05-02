import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';

import { PhotosGridComponent } from './photos-grid.component';
import { Photo } from '../photo.model';

describe('PhotosGridComponent', () => {
  let component: PhotosGridComponent;
  let fixture: ComponentFixture<PhotosGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatButtonModule],
      declarations: [PhotosGridComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleImageClick', () => {
    it('should emit correct image data', () => {
      const handlePhotoClickSpy = spyOn(component.photoClick, 'emit');
      const dummyPhoto: Photo = {
        id: '123',
        author: 'Author 123',
        width: 100,
        height: 200,
        url: 'https://unsplash.com/...',
        download_url: 'https://picsum.photos/...',
      };

      component.handlePhotoClick(dummyPhoto);

      expect(handlePhotoClickSpy).toHaveBeenCalledWith(dummyPhoto);
    });
  });
});
