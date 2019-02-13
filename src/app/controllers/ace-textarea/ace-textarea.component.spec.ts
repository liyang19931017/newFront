import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceTextareaComponent } from './ace-textarea.component';

describe('AceTextareaComponent', () => {
  let component: AceTextareaComponent;
  let fixture: ComponentFixture<AceTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
