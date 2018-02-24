import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormChatComponent } from './signup-form-chat.component';

describe('SignupFormChatComponent', () => {
  let component: SignupFormChatComponent;
  let fixture: ComponentFixture<SignupFormChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
