import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatButtonModule],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home (Photos) page', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    component.navigateToPhotos();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/');
  });

  it('should navigate to favorites page', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

    component.navigateToFavorites();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/favorites');
  });
});
