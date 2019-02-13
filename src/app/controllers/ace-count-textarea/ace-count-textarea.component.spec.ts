import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceCountTextareaComponent } from './ace-count-textarea.component';

describe('AceCountTextareaComponent', () => {
  let component: AceCountTextareaComponent;
  let fixture: ComponentFixture<AceCountTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceCountTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceCountTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
