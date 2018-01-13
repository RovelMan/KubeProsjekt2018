import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTripComponent } from './make-trip.component';

describe('MakeTripComponent', () => {
  let component: MakeTripComponent;
  let fixture: ComponentFixture<MakeTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
