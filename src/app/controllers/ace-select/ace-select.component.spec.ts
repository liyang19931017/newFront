import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceSelectComponent } from './ace-select.component';

describe('AceSelectComponent', () => {
  let component: AceSelectComponent;
  let fixture: ComponentFixture<AceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
