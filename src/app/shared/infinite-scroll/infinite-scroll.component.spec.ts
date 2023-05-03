import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfiniteScrollComponent } from './infinite-scroll.component';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set root option to truthy value if host element is scrollable', () => {
    spyOn(component as any, 'isHostScrollable').and.callFake(() => true);

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect((component as any).observer.root).toBeTruthy();
  });

  it('should set root option to null if host element is NOT scrollable', () => {
    spyOn(component as any, 'isHostScrollable').and.callFake(() => false);

    component.ngAfterViewInit();
    fixture.detectChanges();

    expect((component as any).observer.root).toBeFalsy();
  });
});
