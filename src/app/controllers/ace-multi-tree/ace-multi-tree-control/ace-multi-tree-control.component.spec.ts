import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceMultiTreeControlComponent } from './ace-multi-tree-control.component';

describe('AceMultiTreeControlComponent', () => {
  let component: AceMultiTreeControlComponent;
  let fixture: ComponentFixture<AceMultiTreeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceMultiTreeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceMultiTreeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
