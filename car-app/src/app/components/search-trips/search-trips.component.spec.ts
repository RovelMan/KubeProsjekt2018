import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTripsComponent } from './search-trips.component';

describe('SearchTripsComponent', () => {
  let component: SearchTripsComponent;
  let fixture: ComponentFixture<SearchTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
