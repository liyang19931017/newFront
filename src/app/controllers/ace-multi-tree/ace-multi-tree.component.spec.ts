import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceMultiTreeComponent } from './ace-multi-tree.component';

describe('AceMultiTreeComponent', () => {
  let component: AceMultiTreeComponent;
  let fixture: ComponentFixture<AceMultiTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceMultiTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceMultiTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
