import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceInputComponent } from './ace-input.component';

describe('AceInputComponent', () => {
  let component: AceInputComponent;
  let fixture: ComponentFixture<AceInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
