import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceMultySelectComponent } from './ace-multy-select.component';

describe('AceMultySelectComponent', () => {
  let component: AceMultySelectComponent;
  let fixture: ComponentFixture<AceMultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceMultySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceMultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
