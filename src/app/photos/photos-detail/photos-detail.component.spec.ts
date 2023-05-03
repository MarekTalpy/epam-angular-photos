import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PhotosApiService } from 'src/app/shared/photos-api.service';
import { PhotosDetailComponent } from './photos-detail.component';

describe('PhotosDetailComponent', () => {
  let component: PhotosDetailComponent;
  let fixture: ComponentFixture<PhotosDetailComponent>;
  const mockPhotosApiService = jasmine.createSpyObj('PhotosApiService', [
    'fetchPhotoDetail',
  ]);

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
