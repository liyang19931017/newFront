import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceRadioComponent } from './ace-radio.component';

describe('AceRadioComponent', () => {
  let component: AceRadioComponent;
  let fixture: ComponentFixture<AceRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
