import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisTripComponent } from './this-trip.component';

describe('ThisTripComponent', () => {
  let component: ThisTripComponent;
  let fixture: ComponentFixture<ThisTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
