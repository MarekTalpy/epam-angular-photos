import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  const eventSubject = new ReplaySubject<RouterEvent>(1);
  const routerMock = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    events: eventSubject.asObservable(),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatButtonModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
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
    component.navigateToPhotos();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should navigate to favorites page', () => {
    component.navigateToFavorites();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/favorites');
  });

  it('should set a correct url', (done) => {
    const dummyUrl = '/dummyUrl';
    const dummyRedirectUrl = '/dummyUrlTo';
    const dummyId = 123;
    const dummyNavigationObj = new NavigationEnd(
      dummyId,
      dummyUrl,
      dummyRedirectUrl
    );
    eventSubject.next(dummyNavigationObj);

    component.ngOnInit();
    fixture.detectChanges();

    component.currentUrl$.subscribe((url) => {
      expect(url).toBe(dummyUrl);
      done();
    });
  });
});
